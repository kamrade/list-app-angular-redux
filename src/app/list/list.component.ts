import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';

@Component({
  selector: 'cp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  @select('filteredList') list;
  renderList;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.list.subscribe(x => this.renderList = x);
  }

}
