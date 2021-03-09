(() => {
  const modelViewer = document.querySelector('#victory');
  const time = performance.now();
  const oscillate = function(min, max, period, time) {
  const mag = max - min;
  return Math.cos(Math.PI + 2 * Math.PI * time / period) * (min + mag / 2.0) +
      mag / 2.0;
};

  const animate = (now) => {
    modelViewer.cameraOrbit = oscillate("0deg 45deg 180.7m", "0deg -10deg 180.7m", 40, now - time);
    requestAnimationFrame(animate);
  };

  animate();
})();