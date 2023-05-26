import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import CanvasHelper from 'app/utils/canvas-pos-helper';
import canvasSize from 'app/utils/canvas-size';
import getMousePos from 'app/utils/mouse-pos-helper';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
})
export class DrawComponent implements AfterViewInit {
  constructor() {}
  ngAfterViewInit() {
    let canvas = CanvasHelper.getCanvas();

    canvasSize(canvas);
    window.addEventListener('resize', () => {
      canvasSize(canvas);
    });

    let ctx = CanvasHelper.getCtx(canvas);

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
    CanvasHelper.getCtx(canvas);
  }

  imgLink() {
    let canvas = CanvasHelper.getCanvas();
    const link = canvas.toDataURL('image/png');
    return link;
  }
}
