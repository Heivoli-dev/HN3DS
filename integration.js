
(() => {
  const viewport = document.querySelector('.device-viewport');
  const resize = () => viewport.style.setProperty('--device-scale', viewport.clientWidth / 500);
  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(viewport);
  else window.addEventListener('resize', resize);
})();
