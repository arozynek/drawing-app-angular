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
}
