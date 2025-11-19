// public/js/spillway.js
import * as THREE from 'three';

export function addSpillway(
  scene,
  CFRD,
  {
    // Ubicación del aliviadero según tu screenshot:
    xPos = -20,      // aguas arriba (X)
    zPos = -10,      // lado izquierdo (Z)
    yLevel = 3.50,   // nivel del agua

    radius = 4.2,    // radio exterior del cilindro
    innerRatio = 0.65, // relación para el radio interno (grosor de pared)
    height = 2.2,    // altura del cilindro visible
    wallH = 2.0      // altura del muro vertical
  } = {}
) {

  // ============================================================
  // 1) GRUPO PRINCIPAL E INFO PARA PICKING
  // ============================================================
  const g = new THREE.Group();
  g.userData = {
    kind: "Aliviadero",
    name: "Aliviadero",
    status: "Operativo",
    lastSeen: "2025-12-13 10:00",
    note: "Sin descargas activas. Nivel dentro de condición normal."
  };

  // ============================================================
  // 2) CILINDRO HUECO (ALIVIADERO REAL)
  // ============================================================

  const outerR = radius;             // radio exterior
  const innerR = radius * innerRatio; // radio interior ajustable

  // --- Shape del cilindro hueco ---
  const shape = new THREE.Shape();

  // círculo exterior
  shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);

  // círculo interior (en CCW para hacer hueco)
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  // --- Extrusión vertical del anillo ---
  const extrudeSettings = {
    depth: height,
    bevelEnabled: false,
    steps: 1
  };

  const wallGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  wallGeo.computeVertexNormals();

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0d0,
    roughness: 0.40,
    metalness: 0.95,
    side: THREE.DoubleSide
  });

  const wall = new THREE.Mesh(wallGeo, wallMat);

  // Rotar para dejarlo vertical
  wall.rotation.x = Math.PI / 2;

  // Posicionarlo en el agua
  wall.position.set(xPos, yLevel - height * 0.5, zPos);

  g.add(wall);

  

  // ============================================================
  // 4) AGREGAR TODO A LA ESCENA
  // ============================================================

  scene.add(g);
  return g;
}
