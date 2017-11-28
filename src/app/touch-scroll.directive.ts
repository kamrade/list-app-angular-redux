import { Directive, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[cpTouchScroll]'
})
export class TouchScrollDirective implements OnInit, OnDestroy {

  el: ElementRef;
  mouseDown: () => void;
  mouseMove: () => void;
  mouseUp: () => void;
  mouseLeave: () => void;
  multiplier = 2;

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {}

  ngOnInit() {
    const el = this.elementRef.nativeElement;
    this.mouseDown = this.renderer.listen(el, 'mousedown', event => {
      const initialScroll = el.scrollLeft;
      const initialX      = event.clientX;
      this.mouseMove = this.renderer.listen(el, 'mousemove', event => {
        if ( event.stopPropagation ) { event.stopPropagation(); }
        if ( event.preventDefault ) { event.preventDefault(); }
        event.cancelBubble = true;
        event.returnValue  = false;

        const newX = event.clientX;
        const diff = newX - initialX;
        const newScrollleft = initialScroll - diff * this.multiplier;
        el.scrollLeft = newScrollleft;

        return false;
      });

      this.mouseUp = this.renderer.listen(el, 'mouseup', event => {
        this.mouseMove();
        this.mouseUp();
        this.mouseLeave();
      });

      this.mouseLeave = this.renderer.listen(el, 'mouseleave', event => {
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
