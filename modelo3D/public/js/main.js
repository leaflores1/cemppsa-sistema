// public/js/main.js
import { CONFIG } from './config.js';
import { scene, camera, renderer, resize } from './scene.js';
import { buildTerrain } from './terrain.js';
import { buildCFRD, addDownstreamStair } from './dam.js';
import { buildReservoir } from './water.js';
import { setupControls } from './controls.js';
import { setupPicking, addMarkers, addCaseta, pulseMarkers } from './markers.js';
import { initModal } from './ui.js';
import { addSpillway } from './spillway.js';

// 1) Responsive inicial
resize();

// 2) Terreno
const { terrain, terrWire } = buildTerrain();
scene.add(terrain);
scene.add(terrWire);

// 3) Presa — este es el único largo efectivo REAL
const DAM_LENGTH = 70;

const CFRD = buildCFRD({
  H: 5.8,
  crest: 0.9,
  mup: 1.45,
  mdown: 2.3,
  L: DAM_LENGTH
});

CFRD.group.position.set(0, 0.02, 0);
scene.add(CFRD.group);

// 4) Embalse aguas arriba
const { reservoir, edge, animateWaves } = buildReservoir(CFRD.X_FACE_UP);
scene.add(reservoir);
scene.add(edge);

// 5) Modal UI
const { show: showModal } = initModal();

// 6) Picking (hover + click con modal)
const picking = setupPicking(renderer, camera, {
  onPick: (obj) => {
    if (!obj || !obj.userData) return;

    const pos = obj.userData.position || obj.position;
    showModal({
      name: obj.userData.name ?? 'Instrumento',
      kind: obj.userData.kind ?? '—',
      status: obj.userData.status ?? '—',
      lastSeen: obj.userData.lastSeen ?? '—',
      position: pos,
      note: obj.userData.note ?? '—'
    });
  }
});

// 7) Marcadores + caseta
const markers = addMarkers(scene, CFRD);
markers.forEach(m => picking.addPickable(m));

const caseta = addCaseta(scene, CFRD);
picking.addPickable(caseta);

// 8) Escalera incrustada en talud
addDownstreamStair(scene, CFRD, {
  z: caseta.position.z,
  rise: 0.08,
  tread: 0.22,
  width: 0.55,
  inset: 0.035,
  startMargin: 0.12,
  topMargin: 0.05
});

const spillway = addSpillway(scene, CFRD, {
  xPos: -10,
  zPos: 20,
  yLevel: 5.8,   // altura segura sobre la montaña
  radius: 6.2,
  innerRatio: 0.75,
  height: 3.5
});



picking.addPickable(spillway);

// 10) Controles UI
const controls = setupControls(camera, renderer, CFRD);
const labAuto = document.getElementById('lab-autorotate');
const labWire = document.getElementById('lab-wire');

document.getElementById('btn-autorotate').onclick = () => {
  controls.autoRotate = !controls.autoRotate;
  labAuto.textContent = controls.autoRotate ? 'ON' : 'OFF';
};

let wireOn = false;
document.getElementById('btn-wire').onclick = () => {
  wireOn = !wireOn;
  terrWire.visible = wireOn;
  labWire.textContent = wireOn ? 'ON' : 'OFF';
};

document.getElementById('btn-reset').onclick = () => {
  camera.position.set(22, 10, 28);
  controls.target.set(CFRD.runUp + CFRD.crest * 0.5 - 0.6, CFRD.H * 0.6, 0);
  controls.update();
};

// 11) Loop de animación
let t = 0;
function loop() {
  requestAnimationFrame(loop);
  t += 0.01;

  animateWaves(t);
  pulseMarkers(markers, performance.now());

  controls.update();
  renderer.render(scene, camera);
}
loop();

// 12) Resize
window.addEventListener('resize', resize);
