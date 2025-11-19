// public/js/markers.js
import * as THREE from 'three';
import { lerp } from './utils.js';

export function setupPicking(renderer, camera, { onPick } = {}) {
  const raycaster = new THREE.Raycaster();
  const pointer   = new THREE.Vector2();
  const pickables = [];

  // Tooltip flotante
  const tip = document.createElement('div');
  Object.assign(tip.style, {
    position:'fixed', padding:'7px 10px', background:'rgba(5,15,25,.85)', color:'#b8f0e8',
    font:'13px system-ui,Segoe UI,Roboto', fontWeight:'500', border:'1px solid rgba(45,255,187,.25)',
    borderRadius:'6px', pointerEvents:'none', transform:'translate(-50%,-120%)', display:'none',
    zIndex:12, boxShadow:'0 4px 12px rgba(0,0,0,.4)'
  });
  document.body.appendChild(tip);

  function setPointerFromEvent(e){
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    return rect;
  }

  // Hover (tooltip)
  renderer.domElement.addEventListener('pointermove', (e) => {
    const rect = setPointerFromEvent(e);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(pickables, true)[0];
    if (hit) {
      const p = hit.point.clone().project(camera);
      const x = (p.x * .5 + .5) * rect.width + rect.left;
      const y = (-p.y * .5 + .5) * rect.height + rect.top;
      tip.style.left = `${x}px`;
      tip.style.top  = `${y}px`;

      // Mostrar el nombre desde el nodo más “alto” con userData
      let o = hit.object;
      while (o && !o.userData?.name && o.parent) o = o.parent;
      tip.textContent = o?.userData?.name || '—';
      tip.style.display = 'block';
    } else {
      tip.style.display = 'none';
    }
  });

  // Click -> onPick(obj)
  renderer.domElement.addEventListener('click', (e) => {
    setPointerFromEvent(e);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(pickables, true)[0];
    if (!hit) return;

    // Subo hasta el grupo que tenga userData.kind
    let obj = hit.object;
    while (obj && !obj.userData?.kind && obj.parent) obj = obj.parent;

    if (onPick && obj) onPick(obj);
  });

  return {
    pickables,
    addPickable(obj){ pickables.push(obj); }
  };
}

export function addMarkers(scene, CFRD){
  const markers = [];
  const markerMat = new THREE.MeshBasicMaterial({ color: 0x2dffbb, transparent: true });
  const markerGeo = new THREE.SphereGeometry(0.06, 14, 14);
  const pad = (n,s=2)=>String(n).padStart(s,'0');

  const add = (x,y,z,name)=>{
    const m = new THREE.Mesh(markerGeo, markerMat.clone());
    m.position.set(x,y,z);
    m.userData = { name, kind:'pz' };
    scene.add(m);
    markers.push(m);
    return m;
  };

  // Corona
  { const N=9, mz=0.35, z0=-CFRD.L/2+mz, z1=CFRD.L/2-mz, x=CFRD.runUp + CFRD.crest*0.5, y=CFRD.H+0.12;
    for(let i=0;i<N;i++){ const t=N===1?0.5:i/(N-1); add(x,y, lerp(z0,z1,t), `PZ-C${pad(i+1)}`); } }

  // Media
  { const N=7, mz=0.5, z0=-CFRD.L/2+mz, z1=CFRD.L/2-mz, x=CFRD.runUp*0.5, y=CFRD.H*0.5;
    for(let i=0;i<N;i++){ const t=N===1?0.5:i/(N-1); add(x,y, lerp(z0,z1,t), `PZ-M${pad(i+1)}`); } }

  // Base
  { const N=7, mz=0.5, z0=-CFRD.L/2+mz, z1=CFRD.L/2-mz, x=CFRD.runUp*0.15, y=0.25;
    for(let i=0;i<N;i++){ const t=N===1?0.5:i/(N-1); add(x,y, lerp(z0,z1,t), `PZ-B${pad(i+1)}`); } }

  return markers;
}

// Caseta agrupada + plataforma de hormigón
export function addCaseta(scene, CFRD){
  const toeX = CFRD.runUp + CFRD.crest + CFRD.runDn;
  const g = new THREE.Group();
  g.position.set(toeX + 0.6, 0, 0);

  // Piso / Losa de la caseta
  const padSize = 0.9;
  const padTh   = 0.06;
  const pad = new THREE.Mesh(
    new THREE.BoxGeometry(padSize, padTh, padSize),
    new THREE.MeshStandardMaterial({ color: 0xcfd6de, roughness: 0.55, metalness: 0.08 })
  );
  pad.position.set(0, padTh/2, 0);
  pad.userData = { name:'Plataforma caseta', kind:'obra civil' };
  g.add(pad);

  // Caseta
  const casetaH = 0.35;
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, casetaH, 0.45),
    new THREE.MeshStandardMaterial({
      color:0xf5d84a, roughness:0.45, metalness:0.15,
      emissive:0x3a2f0a, emissiveIntensity:0.1
    })
  );
  body.position.set(0, padTh + casetaH/2, 0);
  g.add(body);

  // Techo
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(0.32, 0.15, 4),
    new THREE.MeshStandardMaterial({ color:0x8b4513, roughness:0.7 })
  );
  roof.position.set(0, padTh + casetaH + 0.075, 0);
  roof.rotation.y = Math.PI/4;
  g.add(roof);

  // Cordón opcional alrededor del pad
  const cordon = new THREE.Mesh(
    new THREE.BoxGeometry(padSize+0.1, 0.02, padSize+0.1),
    new THREE.MeshStandardMaterial({ color: 0xb9c5cf, roughness: 0.6 })
  );
  cordon.position.set(0, 0.01, 0);
  g.add(cordon);

  // userData en el grupo (lo que usa el modal)
  g.userData = {
    kind: 'caseta',
    name: 'Caseta N°3 (ingesta automática)',
    status: 'Operativa',
    lastSeen: '2025-12-12 21:28',
    position: { x: toeX + 0.6, y: padTh + casetaH/2, z: 0.0 },
    note: 'Alimentación OK. Telemetría estable.'
  };

  scene.add(g);
  return g;
}

export function pulseMarkers(markers, now){
  markers.forEach((m,i)=>{
    const s = 1 + Math.sin(now*0.003 + i*0.5)*0.12;
    m.scale.set(s,s,s);
  });
}
