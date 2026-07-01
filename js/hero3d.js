// =========================================================
// AURUM HOUSE — hero 3D signature (Three.js r128)
// A slowly rotating gold ring, lit softly, as the page's
// single moment of motion. Degrades gracefully if WebGL
// or the library is unavailable.
// =========================================================
(function () {
  const wrap = document.querySelector('.hero-canvas-wrap');
  const canvas = document.querySelector('#hero-canvas');
  if (!wrap || !canvas || typeof THREE === 'undefined') return;

  let renderer, scene, camera, ring, ring2, animationId;
  let mouseX = 0, mouseY = 0;

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(38, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);

    // Lighting: warm key light + olive rim light for a jewellery-case feel
    const key = new THREE.PointLight(0x9a3e3e, 2.4, 30);
    key.position.set(6, 5, 8);
    scene.add(key);

    const rim = new THREE.PointLight(0x4a5a40, 1.1, 30);
    rim.position.set(-7, -3, -4);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0xf3ede0, 1.2));

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0x7a2e2e,
      metalness: 1,
      roughness: 0.28,
      emissive: 0x3a1616,
      emissiveIntensity: 0.15,
    });

    // Primary ring — the "Aurum" mark
    const geo = new THREE.TorusGeometry(2.4, 0.16, 48, 160);
    ring = new THREE.Mesh(geo, goldMaterial);
    scene.add(ring);

    // Secondary inner ring, offset axis, for depth
    const geo2 = new THREE.TorusGeometry(1.55, 0.05, 32, 140);
    const material2 = goldMaterial.clone();
    material2.roughness = 0.4;
    ring2 = new THREE.Mesh(geo2, material2);
    ring2.rotation.x = Math.PI / 2.6;
    scene.add(ring2);

    ring.rotation.x = Math.PI / 2.4;
    ring.rotation.y = Math.PI / 6;

    window.addEventListener('resize', onResize);
    wrap.addEventListener('pointermove', onPointerMove);

    wrap.classList.add('is-ready');
    animate();
  }

  function onResize() {
    if (!renderer || !camera) return;
    const w = wrap.clientWidth, h = wrap.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function onPointerMove(e) {
    const rect = wrap.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }

  const clock = new THREE.Clock();
  function animate() {
    animationId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    ring.rotation.z = t * 0.18;
    ring.rotation.y += (mouseX * 0.4 - (ring.rotation.y - Math.PI / 6)) * 0.02;
    ring.position.y = Math.sin(t * 0.5) * 0.15;

    ring2.rotation.z = -t * 0.26;
    ring2.rotation.y += (mouseY * 0.3 - ring2.rotation.y) * 0.02;

    camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  // Respect reduced-motion preference: render one static frame only
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    init();
    cancelAnimationFrame(animationId);
    renderer.render(scene, camera);
  } else {
    init();
  }
})();
