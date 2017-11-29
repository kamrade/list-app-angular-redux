import { Directive, OnInit, OnDestroy, Output, EventEmitter, Renderer2 } from '@angular/core';

@Directive({
  selector: '[cpGlobalEsc]'
})
export class GlobalEscDirective implements OnInit, OnDestroy {

  @Output() globalEsc = new EventEmitter();
  globalEscHandler: () => void;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    const that = this;
    this.globalEscHandler = this.renderer.listen(document, 'keyup', function(event) {
      if (event.keyCode === 27) {
        that.globalEsc.emit();
      }
    });
  }

  ngOnDestroy() {
    this.globalEscHandler();
  }

}
