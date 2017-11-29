import { Renderer2, Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';
import { ListsService } from '../lists.service';

@Component({
  selector: 'cp-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass']
})
export class ListItemComponent implements OnInit, AfterViewChecked {

  @Input() listTitle;
  @Input() listId;
  editMode = false;
  clickOutsideHandler: () => void;

  private editListNameInput: ElementRef;
  @ViewChild('editListNameInput') set content(content: ElementRef) {
    this.editListNameInput = content;
  }

  ngAfterViewChecked() {
    if (this.editListNameInput) {
      this.editListNameInput.nativeElement.focus();
      this.editListNameInput.nativeElement.value = this.listTitle;
    }
  }

  constructor(private listService: ListsService, private renderer: Renderer2) { }

  ngOnInit() {}

  switchToEditMode($event) {
    this.editMode = true;
  }

  removeList() {
    this.listService.removeListItem(this.listId);
  }

  deactivateEditMode() {
    this.editMode = false;
  }

}
