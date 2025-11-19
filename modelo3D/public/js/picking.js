// public/js/picking.js
import * as THREE from 'three';

export function setupPicking(renderer, camera, { onPick } = {}) {
  const raycaster = new THREE.Raycaster();
  const pointer   = new THREE.Vector2();
  const pickables = [];

  // tooltip (hover)
  const tip = document.createElement('div');
  Object.assign(tip.style, {
    position:'fixed', padding:'7px 10px', background:'rgba(5,15,25,.85)', color:'#b8f0e8',
    font:'13px system-ui,Segoe UI,Roboto', fontWeight:'500', border:'1px solid rgba(45,255,187,.25)',
    borderRadius:'6px', pointerEvents:'none', transform:'translate(-50%,-120%)', display:'none',
    zIndex:12, boxShadow:'0 4px 12px rgba(0,0,0,.4)'
  });
  document.body.appendChild(tip);

  function setFromEvent(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    return rect;
  }

  renderer.domElement.addEventListener('pointermove', (e)=>{
    const rect = setFromEvent(e);
    const hit = raycaster.intersectObjects(pickables, false)[0];
    if (hit) {
      const p = hit.point.clone().project(camera);
      const x = (p.x*.5+.5)*rect.width + rect.left;
      const y = (-p.y*.5+.5)*rect.height + rect.top;
      tip.style.left = `${x}px`; tip.style.top = `${y}px`;
      tip.textContent = hit.object.userData?.name || '—';
      tip.style.display = 'block';
    } else tip.style.display = 'none';
  });

  // click -> dispara onPick con el objeto
  renderer.domElement.addEventListener('click', (e)=>{
    setFromEvent(e);
    const hit = raycaster.intersectObjects(pickables, false)[0];
    if (hit && typeof onPick === 'function') onPick(hit.object);
  });

  return {
    pickables,
    addPickable(obj){ pickables.push(obj); }
  };
}
