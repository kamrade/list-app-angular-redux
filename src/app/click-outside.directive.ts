import { Directive, Renderer2, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[cpClickOutside]'
})
export class ClickOutsideDirective implements OnInit {

  documentClick: () => void;
  @Output() clickOutside = new EventEmitter();
  counter = 1;

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) { }

  ngOnInit() {
    const el = this.elementRef.nativeElement;
    const that = this;

    this.documentClick = this.renderer.listen(document, 'click', function(event) {
      if (!el.contains(event.target)) {
        if (that.counter === 1) {
          that.counter = 0;
        } else {
          that.clickOutside.emit();
        }
      }
    });
  }

}
