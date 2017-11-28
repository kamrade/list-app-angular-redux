import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewChecked,
  OnInit,
  HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ListsService } from '../lists.service';

@Component({
  selector: 'cp-list-item-new',
  templateUrl: './list-item-new.component.html',
  styleUrls: ['./list-item-new.component.sass']
})
export class ListItemNewComponent implements AfterViewChecked, OnInit {

  private newListInput: ElementRef;
  editMode = false;
  inputValue = '';

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    if (ev.keyCode === 27) {
      if (this.checkStatus()) {
        this.deactivate();
      }
    }
  }

  @ViewChild('newListInput') set content(content: ElementRef) {
    this.newListInput = content;
  }

  constructor(private renderer: Renderer2, private listService: ListsService) {}

  ngOnInit() {}

  ngAfterViewChecked() {
    if (this.newListInput) {
      this.newListInput.nativeElement.focus();
    }
  }

  checkStatus() {
    return this.editMode;
  }

  activate() {
    this.editMode = true;
  }

  addNewList() {
    const newListTitle = this.inputValue;
    if (newListTitle !== '') {
      this.listService.addListItem(newListTitle);
    }
    console.log(this.newListInput.nativeElement);
    // this.newListInput.nativeElement.value = '';
    this.inputValue = '';
    this.deactivate();
  }

  onKeyPressHandler(event) {
    if (event.keyCode === 13) {
      this.addNewList();
    }
  }

  deactivate() {
    this.editMode = false;
  }

}
