import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Emoji} from './model/emoji';
import {RenderedEmoji} from './model/rendered-emojis';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import CanvasHelper from 'app/utils/canvas-pos-helper';
import getMousePos from 'app/utils/mouse-pos-helper';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.scss'],
})
export class EmojisComponent implements OnInit {
  ngOnInit(): void {
    this.getEmojis(this.id);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  emojis: RenderedEmoji[];
  id: number = 0;
  mousePos: any;

  constructor(private http: HttpClient) {}

  emojiList = `https://emoji-api.com/emojis?access_key=b2d5f5b8a462e384858bbfeaf3f0bf1b84fcd82e`;

  getEmojis(id: number) {
    this.http.get<RenderedEmoji[]>(this.emojiList).subscribe((response: RenderedEmoji[]) => {
      this.emojis = [];
      for (let i = id; i < id + 10; i++) {
        this.emojis.push(response[i]);
      }
    });
  }

  onPageChange(event: PageEvent) {
    const nextPage = event.pageIndex * 10;
    this.getEmojis(nextPage);
  }
  firstEmoji() {
    this.paginator.pageIndex = 0;
    this.getEmojis(0);
  }

  copyAndPasteEmoji(emoji: Emoji) {
    let canvas = CanvasHelper.getCanvas();
    let ctx = canvas.getContext('2d');
    ctx.font = '8vh verdana';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    canvas.addEventListener(
      'click',
      e => {
        var mousePos = getMousePos(canvas, e);
        ctx.fillText(emoji.character, mousePos.x, mousePos.y);
      },
      {once: true},
    );
    canvas.addEventListener(
      'touchstart',
      e => {
        var mousePos = getMousePos(canvas, e);
        ctx.fillText(emoji.character, mousePos.x, mousePos.y);
      },
      {once: true},
    );
  }
}
