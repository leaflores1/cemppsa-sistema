// public/js/water.js
import * as THREE from 'three';
import { CONFIG } from './config.js';

export function buildReservoir(X_FACE_UP) {
  // Embalse extendido aguas arriba y con margen lateral para que se vean las laderas
  const RES_W = 100;   // largo del espejo (eje X, hacia upstream)
  const RES_H = 130;   // ancho del espejo (eje Z)
  const WATER_LEVEL = 3.50;

  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x1e5a9e,
    transparent: true,
    opacity: 0.75,
    roughness: 0.25,
    metalness: 0.2
  });

  // Ubicación: desde aguas arriba (xMin) hasta casi tocar la cara aguas arriba (xMax)
  const xMin = X_FACE_UP - RES_W;
  const xMax = X_FACE_UP - 0.005;          // pequeño gap contra la losa
  const centerX = (xMin + xMax) * 0.5;
  const widthX  = (xMax - xMin);

  // Malla del agua (más densa para olas suaves)
  const reservoirGeo = new THREE.PlaneGeometry(widthX, RES_H, 110, 70);
  const reservoir = new THREE.Mesh(reservoirGeo, waterMat);
  reservoir.rotation.x = -Math.PI / 2;

  // Un pelín por debajo para evitar z-fighting con la losa
  reservoir.position.set(centerX, WATER_LEVEL - 0.01, 0);

  // Borde “espuma” pegado a la cara aguas arriba
  const edgeH = 0.18;
  const edge = new THREE.Mesh(
    new THREE.PlaneGeometry(RES_H, edgeH),
    new THREE.MeshStandardMaterial({
      color: 0xd4e8ff,
      transparent: true,
      opacity: 0.55,
      emissive: 0x0a1b2e,
      emissiveIntensity: 0.3,
      side: THREE.DoubleSide
    })
  );
  edge.rotation.y = Math.PI / 2;
  edge.position.set(X_FACE_UP - 0.003, WATER_LEVEL + edgeH * 0.5, 0);

  // Animación de olas
  function animateWaves(t) {
    const pos = reservoir.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const w1 = Math.sin((x + t) * 0.35) * 0.016;
      const w2 = Math.cos((y - t * 0.7) * 0.32) * 0.020;
      const w3 = Math.sin((x * 0.28 + y * 0.28 + t * 0.58)) * 0.011;
      pos.setZ(i, w1 + w2 + w3);
    }
    pos.needsUpdate = true;
    reservoir.geometry.computeVertexNormals();
  }

  return { reservoir, edge, animateWaves };
}
