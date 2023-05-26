export default function canvasSize(canvas: {height: number; width: number}) {
  if (window.matchMedia('(max-width: 600px)').matches) {
    canvas.height = window.innerHeight / 2.5;
    canvas.width = window.innerWidth / 1;
  } else if (window.matchMedia('(max-width: 768px)').matches) {
    canvas.height = window.innerHeight / 3;
    canvas.width = window.innerWidth / 1.2;
  } else {
    canvas.height = window.innerHeight / 1.5;
    canvas.width = window.innerWidth / 2.1;
  }
}
