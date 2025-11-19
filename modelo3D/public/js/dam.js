// public/js/dam.js
import * as THREE from 'three';

// Nota: para “tocar montañas”, normalmente aumentás L (largo a lo largo de la presa).
// Si querés un talud más tendido aguas arriba, subí 'mup'. Aquí dejo valores amplios por tu escena.
export function buildCFRD({ H=2.0, crest=0.7, mup=1.45, mdown=1.7, L=60.0 }) {
  const g = new THREE.Group();
  const runUp = mup * H;     // corrida horizontal talud aguas arriba
  const runDn = mdown * H;   // corrida horizontal talud aguas abajo

  // Perfil a extruir (se extruye en Z a lo largo de la presa)
  const sec = new THREE.Shape();
  sec.moveTo(0, 0);
  sec.lineTo(runUp, H);
  sec.lineTo(runUp + crest, H);
  sec.lineTo(runUp + crest + runDn, 0);
  sec.closePath();

  // Terraplén
  const embGeo = new THREE.ExtrudeGeometry(sec, { depth: L, bevelEnabled:false });
  embGeo.translate(0, 0, -L/2);
  const embMat = new THREE.MeshStandardMaterial({
    color: 0x6b7280, roughness: 0.88, metalness: 0.08
  });
  const emb = new THREE.Mesh(embGeo, embMat);
  g.add(emb);

  // Losa aguas arriba (cara impermeable)
  const slopeLen = Math.sqrt(runUp*runUp + H*H);
  const slabGeo  = new THREE.PlaneGeometry(L, slopeLen);
  const slabMat  = new THREE.MeshStandardMaterial({
    color: 0xdce3ea, metalness: 0.2, roughness: 0.4, side: THREE.DoubleSide
  });
  const slab     = new THREE.Mesh(slabGeo, slabMat);
  const axisX = new THREE.Vector3(0,0,1).normalize();
  const axisY = new THREE.Vector3(runUp, H, 0).normalize();
  const axisZ = new THREE.Vector3().crossVectors(axisX, axisY).normalize();
  const mat = new THREE.Matrix4().makeBasis(axisX, axisY, axisZ);
  slab.setRotationFromMatrix(mat);
  slab.position.set(runUp/2, H/2, 0);
  g.add(slab);

  // Corona (camino)
  const road = new THREE.Mesh(
    new THREE.BoxGeometry(crest, 0.08, L),
    new THREE.MeshStandardMaterial({ color: 0x3a3e45, roughness: 0.6, metalness: 0.3 })
  );
  road.position.set(runUp + crest/2, H + 0.06, 0);
  g.add(road);

  // 🔹 Losa/apron aguas abajo (piso seco)
  const toeX = runUp + crest + runDn;   // pie aguas abajo de la presa
  const apronLen = 3.0;                 // extensión aguas abajo
  const apronTh  = 0.05;
  const apron = new THREE.Mesh(
    new THREE.BoxGeometry(apronLen, apronTh, L + 0.8), // +0.8 para sobresalir a lo largo
    new THREE.MeshStandardMaterial({ color: 0xc7d0da, roughness: 0.55, metalness: 0.08 })
  );
  apron.position.set(toeX + apronLen/2, apronTh/2, 0);
  g.add(apron);

  // (Opcional) Cuneta/zanja de drenaje al inicio del apron
  const drainW = 0.2, drainH = 0.08;
  const drain = new THREE.Mesh(
    new THREE.BoxGeometry(drainW, drainH, L + 0.8),
    new THREE.MeshStandardMaterial({ color: 0x79838d, roughness: 0.8 })
  );
  drain.position.set(toeX + 0.05, drainH/2, 0);
  g.add(drain);

  // Coordenada de la cara aguas arriba (para posicionar el agua)
  const X_FACE_UP = runUp;

  return { group:g, H, crest, runUp, runDn, L, X_FACE_UP };
}


export function addDownstreamStair(
  scene,
  CFRD,
  {
    z = 0,            // alineación en Z (p. ej. la de la caseta)
    tread = 0.22,     // profundidad de huella
    rise  = 0.08,     // alzada por peldaño
    width = 0.55,     // ancho (a lo largo de Z)
    inset = 0.03,     // cuánto se “mete” en el terraplén
    startMargin = 0.12, // arranque desde el pie (margen sobre la cara)
    topMargin   = 0.05, // cuánto dejar por debajo de la corona
    color = 0xbfc7cf,
  } = {}
) {
  const g = new THREE.Group();
  g.userData = { kind: 'obra civil', name: 'Escalera de acceso' };

  // Geometría del talud aguas abajo
  const xCrest = CFRD.runUp + CFRD.crest;
  const xToe   = xCrest + CFRD.runDn;

  // Ejes locales sobre la cara del talud
  const axisSlope = new THREE.Vector3(-CFRD.runDn, CFRD.H, 0).normalize(); // “sube” por el talud
  const axisX     = new THREE.Vector3(0,0,1);                               // a lo largo de la presa
  const axisZ     = new THREE.Vector3().crossVectors(axisX, axisSlope).normalize(); // normal de la cara
  const embed     = axisZ.clone().multiplyScalar(-inset); // metemos piezas en el terraplén

  const slopeLen  = Math.sqrt(CFRD.runDn*CFRD.runDn + CFRD.H*CFRD.H);       // largo de la cara
  const theta     = Math.atan2(CFRD.H, CFRD.runDn);                         // ángulo de la cara
  const stepAlong = rise / Math.sin(theta);                                 // avance sobre la cara por peldaño

  // Límite superior (a un margen de la corona)
  const sMax = ((CFRD.H - topMargin) / CFRD.H) * slopeLen;

  const matTread = new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.1 });
  const matRiser = new THREE.MeshStandardMaterial({ color: 0xaab3bc, roughness: 0.7 });

  const basis = new THREE.Matrix4().makeBasis(axisX, axisSlope, axisZ);

  const Ptoe   = new THREE.Vector3(xToe,   0, z);
  const Pcrest = new THREE.Vector3(xCrest, CFRD.H, z);

  // Generamos peldaños hasta rozar la corona (s <= sMax)
  for (let s = startMargin; s <= sMax + 1e-6; s += stepAlong) {
    const t = Math.min(s / slopeLen, 1);         // 0..1 sobre la recta toe→crest
    const y = t * CFRD.H;                         // y sube linealmente
    const p = new THREE.Vector3().lerpVectors(Ptoe, Pcrest, t).add(embed);

    // Huella (horizontal)
    const treadBox = new THREE.Mesh(new THREE.BoxGeometry(tread, 0.03, width), matTread);
    treadBox.setRotationFromMatrix(basis);
    treadBox.rotateX(-theta);                    // corregimos para que la huella quede horizontal
    treadBox.position.copy(p);
    g.add(treadBox);

    // Contrahuella (vertical contra la cara)
    const riserBox = new THREE.Mesh(new THREE.BoxGeometry(0.02, rise, width*0.98), matRiser);
    riserBox.setRotationFromMatrix(basis);
    riserBox.rotateX(Math.PI/2 - theta);
    riserBox.position.copy(p).add(axisSlope.clone().multiplyScalar(-0.012));
    g.add(riserBox);

    // Si ya estamos en el borde, salimos
    if (y >= CFRD.H - topMargin - 1e-3) break;
  }

  scene.add(g);
  return g;
}
