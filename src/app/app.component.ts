import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from './store';
import { INCREMENT, DECREMENT } from './actions';
import { ListsService } from './lists.service';

@Component({
  selector: 'cp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  title = 'Cardpay Dashboard';
  @select('counter') count;
  @select('list') itemsList;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private listService: ListsService
  ) {}

  ngOnInit() {
    this.listService.loadList();
  }

  increment() {
    this.ngRedux.dispatch({ type: INCREMENT });
  }
  decrement() {
    this.ngRedux.dispatch({ type: DECREMENT });
  }
}
