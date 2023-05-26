export default function getMousePos(canvas: any, e: any) {
  var rect = canvas.getBoundingClientRect();
  if (window.matchMedia('(max-width: 600px)').matches) {
    const {clientX, clientY} = e.touches[0];
    const {left, top} = rect;
    return {
      x: clientX - left,
      y: clientY - top,
    };
  } else {
    return {
      x: ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
  }
}
