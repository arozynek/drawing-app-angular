import {Directive, ElementRef, ViewChild} from '@angular/core';

@Directive()
export default class CanvasHelper {
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  static canvasPos: {x: number; y: number};
  static canvas: ElementRef<any>;

  static getCanvas() {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    return canvas;
  }
  static getCtx(canvas: any) {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return ctx;
  }
}
