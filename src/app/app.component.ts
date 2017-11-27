import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from './store';
import { INCREMENT, DECREMENT, SET_LIST, FILTER_LIST } from './actions';
import { ListsService } from './lists.service';

@Component({
  selector: 'cp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Cardpay Dashboard';
  @select('counter') count;
  @select('mainTitle') mainTitle;
  @select('list') itemsList;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private listService: ListsService
  ) {
    /*
    const data = localStorage.getItem('listAppData');
    if (data) {
      this.ngRedux.dispatch({ type: SET_LIST, list: JSON.parse(data) });
    } else {
      localStorage.setItem('listAppData', JSON.stringify(this.ngRedux.getState().list));
    }
    this.itemsList.subscribe(items => {
      localStorage.setItem('listAppData', JSON.stringify(items));
    }); */
    this.ngRedux.dispatch({ type: FILTER_LIST });
  }

  ngOnInit() {
    this.listService.getLists().subscribe(list => {
      console.log(list);
    })
  }

  increment() {
    this.ngRedux.dispatch({ type: INCREMENT });
  }
  decrement() {
    this.ngRedux.dispatch({ type: DECREMENT });
  }
}
