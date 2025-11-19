// public/js/terrain.js
import * as THREE from 'three';
import { CONFIG } from './config.js';
import { fbm, smoothstep } from './utils.js';

export function buildTerrain() {
  // Tamaño global del terreno
  const L = 220;   // largo (eje X: aguas arriba/abajo)
  const W = 120;   // ancho total (eje Z: cordones montañosos a ambos lados)
  const SEGS_X = 240;
  const SEGS_Z = 120;

  // Geometría base (plano en XY; lo rotamos luego)
  const geo = new THREE.PlaneGeometry(L, W, SEGS_X, SEGS_Z);

  // Utilidades para modelar “garganta” en la presa
  // x=0 aprox es la presa; x<0 es aguas arriba (embalse), x>0 aguas abajo.
  const xDam = 0;

  // Mitad del valle (de borde de agua a pared) como función de x:
  // - Cerca de la presa (x ≈ 0): valle muy angosto → dos paredes altas
  // - Aguas arriba (x << 0): se abre progresivamente
  // - Aguas abajo (x > 0): vuelve a angostarse y baja rápido
  function valleyHalfWidth(x) {
    // normalizamos x en [-L/2, L/2]
    const nx = THREE.MathUtils.clamp((x - (-L * 0.45)) / (L * 0.45 - (-L * 0.45)), 0, 1);
    // Arriba: ancho → 24..30; en la presa: 8..10; abajo: 10..14
    const upstream   = 28;           // muy ancho lejos de la presa hacia el embalse
    const atDam      = 20;          // muy angosto en la presa
    const downstream = 12;           // vuelve a angostarse aguas abajo
    // Curva por tramos (arriba → presa → abajo)
    const tDam = smoothstep(-8, 8, x);        // transición al pasar por la presa
    const tUp  = smoothstep(-L*0.5, -L*0.15, x); // abre aguas arriba
    // Interpolamos: primero del ancho upstream a atDam y luego a downstream
    const wUpToDam   = upstream * (1 - tUp) + atDam * tUp;      // aguas arriba hacia presa
    const wDamToDown = atDam * (1 - tDam) + downstream * tDam;  // presa hacia abajo
    // Mezclamos con prioridad local según zona:
    return x <= 0 ? wUpToDam : wDamToDown;
  }

// PERFIL DE TERRENO — COSTAS AGUAS ARRIBA MUCHO MÁS IRREGULARES
for (let i = 0; i < geo.attributes.position.count; i++) {

  const x = geo.attributes.position.getX(i);
  const z = geo.attributes.position.getY(i);  // -W/2 .. W/2

  // 1) Ancho del valle según X (ya existe)
  const half = valleyHalfWidth(x);

  // 2) Costas irregulares (ruido fuerte + modulación suave)
  const shoreNoise = fbm((x*0.05 + 200) * 0.5, (z*0.05 + 80) * 0.5) * 10;
  const shoreCurve = Math.sin(z * 0.08 + x * 0.03) * 4;

  // esto mueve el "borde" de las montañas hacia adentro/afuera
  const dynamicHalf = half 
                    + shoreNoise * smoothstep(-L*0.55, -L*0.15, x)   // fuerte arriba
                    + shoreCurve * smoothstep(-L*0.45, -L*0.15, x);  // curvas amplias

  // 3) Distancia lateral al nuevo valle
  const dist = Math.max(0, Math.abs(z) - dynamicHalf);

  // 4) Altura base — paredes laterales más fuertes e irregulares
  let wallT = smoothstep(0, 22, dist);
  let wall = 9.5 * wallT;

  // 5) V-shape en el centro del valle
  const vShape   = 0.20 * (dynamicHalf - Math.abs(z));
  const riverCut = 0.45 * Math.max(0, dynamicHalf - Math.abs(z));

  // 6) Rugosidad fuerte en los bordes (erosión)
  const ridgeNoise = fbm((x+120)/10, (z+80)/9) * 2.4;

  // 7) Aguas arriba: mesetas redondeadas + ruido
  const upBand = smoothstep(-L*0.55, -L*0.18, x);
  const upstreamLift = upBand * (2.0 + fbm(x/15, z/15) * 1.5);

  // 8) Aguas abajo: se aplana
  const downstreamFlatten = smoothstep(0, L*0.25, x) * 1.4;

// 9) Altura base (primer cordón montañoso)
let h = 0;
h += wall;                // paredes laterales
h += vShape * 1.2;        // forma central
h -= riverCut;            // cauce
h += ridgeNoise * 0.8;    // borde erosionado
h += upstreamLift;        // mesetas aguas arriba
h -= downstreamFlatten;   // aguas abajo

// =============================================
// ⭐ 10) Segunda hilera de montañas (cordillera atrás)
// =============================================

// Zona donde comienza el segundo cordón (lado izquierdo/derecho)
const farLeft  = smoothstep(W * 0.10, W * 0.35,  Math.abs(z));
const farRight = smoothstep(W * 0.10, W * 0.35,  Math.abs(z));

// Ruido grande y suave para cordillera al fondo
const backNoise = fbm((x+50)/45, (z+300)/38) * 14;
const backShape = Math.sin((z * 0.015) + (x * 0.012)) * 6;

// Elevación adicional (más alta y más suave)
const backLift = (backNoise + backShape + 14) * farLeft;

// Aplico solo lejos del valle
h += backLift * smoothstep(18, 38, dist); 





  geo.attributes.position.setZ(i, h);




}


  geo.computeVertexNormals();

  // Material (roca)
  const mat = new THREE.MeshStandardMaterial({
    color: 0x3d4654,
    roughness: 0.92,
    metalness: 0.05
  });

  const terrain = new THREE.Mesh(geo, mat);
  terrain.rotation.x = -Math.PI / 2;
  terrain.position.set(0, 0.0, 0);

  // Wireframe
  const terrWire = new THREE.LineSegments(
    new THREE.EdgesGeometry(geo, 10),
    new THREE.LineBasicMaterial({ color: 0x8a99aa, opacity: 0.18, transparent: true })
  );
  terrWire.rotation.copy(terrain.rotation);
  terrWire.position.copy(terrain.position);
  terrWire.visible = false;

  return { terrain, terrWire };
}
