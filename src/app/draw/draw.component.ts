import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import CanvasHelper from 'app/utils/canvas-pos-helper';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
})
export class DrawComponent implements AfterViewInit {
  constructor() {}
  ngAfterViewInit() {
    let canvas = CanvasHelper.getCanvas();
    canvas.width = window.innerWidth - window.innerWidth / 3;
    canvas.height = window.innerHeight - window.innerHeight / 2;

    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function canvasSize() {
      if (window.matchMedia('(max-width: 600px)').matches) {
        canvas.height = window.innerHeight / 2.5;
        canvas.width = window.innerWidth / 1;
      } else if (window.matchMedia('(max-width: 768px)').matches) {
        canvas.height = window.innerHeight / 3;
        canvas.width = window.innerWidth / 1.2;
      } else {
        canvas.height = window.innerHeight / 1.5;
        canvas.width = window.innerWidth / 2;
      }
    }
    canvasSize();
    window.addEventListener('resize', () => {
      canvasSize();
    });

    // Canvas position
    function getMousePos(canvas: any, e: any) {
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

    // PAINTING

    let painting = false;
    const startPosition = function () {
      painting = true;
    };
    const finishPosition = function () {
      painting = false;
      ctx.beginPath();
    };

    function draw(e: any) {
      if (!painting) return;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      var mousePos = getMousePos(canvas, e);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
      ctx.save();
    }

    // Canvas event listeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', finishPosition);
    canvas.addEventListener('touchmove', draw);
  }
  clear() {
    let canvas = CanvasHelper.getCanvas();
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  imgLink() {
    let canvas = CanvasHelper.getCanvas();
    const link = canvas.toDataURL('image/png');
    return link;
  }
}
