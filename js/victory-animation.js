(() => {
  const modelViewer = document.querySelector('#victory');
  const time = performance.now();

  const animate = (now) => {
    modelViewer.cameraOrbit = oscillate("0deg 45deg 180.7m", "0deg -10deg 180.7m", 4000, now - time);
    requestAnimationFrame(animate);
  };

  animate();
})();