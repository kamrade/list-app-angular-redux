import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'cp-list-item-new',
  templateUrl: './list-item-new.component.html',
  styleUrls: ['./list-item-new.component.sass']
})
export class ListItemNewComponent implements AfterViewInit, AfterViewChecked {

  private newListItem: ElementRef;
  @ViewChild('newListItem') set content(content: ElementRef) {
    this.newListItem = content;
  }
  editMode: boolean = false;

  constructor(private renderer: Renderer2) {
    let inputElement = this.renderer.createElement('input');
  }

  ngAfterViewChecked() {
    if(this.newListItem) {
      this.newListItem.nativeElement.focus();
      this.newListItem.nativeElement.value = 'test';
    }
  }

  ngAfterViewInit() {
  }

  activate() {
    this.editMode = true;
  }

  deactivate() {
    this.editMode = false;
  }

}
