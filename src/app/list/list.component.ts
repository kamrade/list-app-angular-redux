import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';

@Component({
  selector: 'cp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  renderList = [];
  scroll: any;
  @select('list') list;
  @select('listLoading') listLoading;
  loading = true;

  constructor(private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {

    this.listLoading.subscribe(loading => {
      this.loading = loading;
    });

    this.list.subscribe(l => {
      this.renderList = l;
    });

  }

}
