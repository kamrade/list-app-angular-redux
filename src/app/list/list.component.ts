import { Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';

@Component({
  selector: 'cp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy {

  @ViewChild('listContainer') listContainer: ElementRef;

  multiplier = 3;

  @select('filteredList') list;
  renderList;
  scroll: any;
  mouseDown: any;
  mouseMove: any;
  mouseUp: any;
  mouseLeave: any;

  constructor(private renderer: Renderer2, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.list.subscribe(x => this.renderList = x);

    const listCont = this.listContainer.nativeElement;

    // EVENTS HANDLER
    this.mouseDown = this.renderer.listen(listCont, 'mousedown', (evt) => {
      const initialScroll = listCont.scrollLeft;
      const initialX      = evt.clientX;
      this.mouseMove = this.renderer.listen(listCont, 'mousemove', (evt) => {
        if(evt.stopPropagation) evt.stopPropagation();
        if(evt.preventDefault) evt.preventDefault();
        evt.cancelBubble=true;
        evt.returnValue=false;

        const newX = evt.clientX;
        let diff   = newX - initialX;
        listCont.scrollLeft = initialScroll - diff*this.multiplier;

        return false;
      });
      this.mouseUp = this.renderer.listen(listCont, 'mouseup', (evt) => {
        this.mouseMove();
        this.mouseUp();
        this.mouseLeave();
      });
      this.mouseLeave = this.renderer.listen(listCont, 'mouseleave', (evt) => {
        this.mouseMove();
        this.mouseUp();
        this.mouseLeave();
      });
    });
  }

  ngOnDestroy() {
    this.mouseDown();
  }

}
