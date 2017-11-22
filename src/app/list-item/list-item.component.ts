import { Component, OnInit, Input } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';
import { REMOVE_LIST_ITEM } from '../actions';

@Component({
  selector: 'cp-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.sass']
})
export class ListItemComponent implements OnInit {

  @Input() listTitle;
  @Input() listId;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {}

  removeList() {
    this.ngRedux.dispatch({ type: REMOVE_LIST_ITEM, id: this.listId });
  }

}
