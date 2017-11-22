import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[cpTest]'
})
export class TestDirective {

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    // console.dir(this.elementRef.nativeElement);
    const buttonElement = this.renderer.createElement('button');
    buttonElement.setAttribute('class', 'btn btn-sm btn-primary');
    // this.renderer.listen()
    this.renderer.listen(buttonElement, 'click', () => console.log('dynamic click'));
    const text = this.renderer.createText('text');
    this.renderer.appendChild(buttonElement, text);
    this.renderer.appendChild(this.elementRef.nativeElement, buttonElement);
  }

}
