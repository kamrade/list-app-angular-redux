import { Renderer2, Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ListsService } from '../lists.service';

@Component({
  selector: 'cp-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass']
})
export class ListItemComponent implements OnInit {

  @Input() listTitle;
  @Input() listId;
  editMode = false;

  private editListNameInput: ElementRef;
  @ViewChild('editListNameInput') set content(content: ElementRef) {
    this.editListNameInput = content;
    if (this.editListNameInput) {
      this.editListNameInput.nativeElement.value = this.listTitle;
      this.editListNameInput.nativeElement.focus();
      this.editListNameInput.nativeElement.select();
    }
  }

  constructor(
    private listService: ListsService,
    private renderer: Renderer2) { }

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

  editKeyupHandler(e) {
    if (e.keyCode === 13) {
      const editedValue = this.editListNameInput.nativeElement.value;
      if (editedValue !== '') {
        this.listService.editListItem(this.listId, editedValue);
      }
      this.deactivateEditMode();
    }
  }

}
