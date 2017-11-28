import { Component, OnInit, Input } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';
import { ListsService } from '../lists.service';

@Component({
  selector: 'cp-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass']
})
export class ListItemComponent implements OnInit {

  @Input() listTitle;
  @Input() listId;

  constructor(private listService: ListsService) { }

  ngOnInit() {}

  removeList() {
    this.listService.removeListItem(this.listId);
  }

}
