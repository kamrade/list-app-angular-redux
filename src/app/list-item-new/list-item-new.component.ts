import { Component, ViewChild, ElementRef, Renderer2, AfterViewChecked, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';
import { ADD_LIST_ITEM } from '../actions';

@Component({
  selector: 'cp-list-item-new',
  templateUrl: './list-item-new.component.html',
  styleUrls: ['./list-item-new.component.sass']
})
export class ListItemNewComponent implements AfterViewChecked, OnInit {

  @select('list') list;
  renderList: any;

  private newListInput: ElementRef;
  @ViewChild('newListInput') set content(content: ElementRef) {
    this.newListInput = content;
  }
  editMode = false;

  constructor(private renderer: Renderer2, private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
    this.list.subscribe(x => {
      console.log(x);
      return this.renderList = x;
    });
  }

  ngAfterViewChecked() {
    if (this.newListInput) {
      this.newListInput.nativeElement.focus();
    }
  }

  activate() {
    this.editMode = true;
  }

  addNewList() {
    this.deactivate();
    this.ngRedux.dispatch({ type: ADD_LIST_ITEM, newItem: this.newListInput.nativeElement.value });
  }

  deactivate() {
    this.editMode = false;
  }

}
