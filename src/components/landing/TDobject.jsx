import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function EyeFollowMouse() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    // On first mount the container can still report 0x0 (layout not settled
    // yet, especially inside iframes/artifact panels), which would create a
    // renderer with no visible size. Fall back to the window size instead.
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // ---------- Basic scene setup ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // ---------- Lighting ----------
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8899ff, 0.4);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // ---------- Eyeball group ----------
    const eyeGroup = new THREE.Group();
    scene.add(eyeGroup);

    // Sclera (white of the eye)
    const scleraGeo = new THREE.SphereGeometry(2, 64, 64);
    const scleraMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f0,
      roughness: 0.4,
      metalness: 0.0,
    });
    const sclera = new THREE.Mesh(scleraGeo, scleraMat);
    eyeGroup.add(sclera);

    // Iris + pupil group, rotated toward the mouse
    const irisGroup = new THREE.Group();
    eyeGroup.add(irisGroup);

    const irisGeo = new THREE.CircleGeometry(0.75, 48);
    const irisMat = new THREE.MeshStandardMaterial({
      color: 0x3b6ea5, // change this for a different eye color
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const iris = new THREE.Mesh(irisGeo, irisMat);
    iris.position.z = 1.98;
    irisGroup.add(iris);

    const pupilGeo = new THREE.CircleGeometry(0.32, 48);
    const pupilMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.2,
    });
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.z = 2.0;
    irisGroup.add(pupil);

    const highlightGeo = new THREE.CircleGeometry(0.09, 24);
    const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const highlight = new THREE.Mesh(highlightGeo, highlightMat);
    highlight.position.set(0.18, 0.22, 2.02);
    irisGroup.add(highlight);

    // ---------- Mouse tracking ----------
    const mouse = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);

    const MAX_YAW = 0.5;
    const MAX_PITCH = 0.4;

    const handlePointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const rect = mount.getBoundingClientRect();
        const t = event.touches[0];
        const x = t.clientX - rect.left;
        const y = t.clientY - rect.top;
        mouse.x = (x / rect.width) * 2 - 1;
        mouse.y = -(y / rect.height) * 2 + 1;
      }
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // ---------- Blinking ----------
    let blinkTimer = 0;
    let nextBlinkAt = 2 + Math.random() * 3;
    let blinkProgress = 0;
    const BLINK_SPEED = 10;

    // ---------- Animation loop ----------
    const clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      targetRotation.x += (mouse.y * MAX_PITCH - targetRotation.x) * 0.08;
      targetRotation.y += (mouse.x * MAX_YAW - targetRotation.y) * 0.08;

      irisGroup.rotation.x = targetRotation.x;
      irisGroup.rotation.y = targetRotation.y;

      eyeGroup.rotation.z = Math.sin(clock.elapsedTime * 0.4) * 0.02;

      blinkTimer += delta;
      if (blinkTimer > nextBlinkAt && blinkProgress === 0) {
        blinkProgress = 0.0001;
      }
      if (blinkProgress > 0) {
        blinkProgress += delta * BLINK_SPEED;
        const t = blinkProgress;
        const closeAmount = t < 0.5 ? t * 2 : (1 - t) * 2;
        eyeGroup.scale.y = 1 - closeAmount * 0.9;
        if (t >= 1) {
          blinkProgress = 0;
          blinkTimer = 0;
          nextBlinkAt = 2 + Math.random() * 4;
          eyeGroup.scale.y = 1;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // ---------- Resize handling ----------
    // ResizeObserver catches container-size changes reliably (including the
    // case where the container was 0x0 on mount and gets its real size a
    // moment later), not just window resizes.
    const handleResize = (w, h) => {
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        handleResize(w, h);
      }
    });
    resizeObserver.observe(mount);
    const handleWindowResize = () =>
      handleResize(mount.clientWidth, mount.clientHeight);
    window.addEventListener("resize", handleWindowResize);

    // ---------- Cleanup ----------
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleWindowResize);
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement);
      scleraGeo.dispose();
      scleraMat.dispose();
      irisGeo.dispose();
      irisMat.dispose();
      pupilGeo.dispose();
      pupilMat.dispose();
      highlightGeo.dispose();
      highlightMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
      }}
    />
  );
}