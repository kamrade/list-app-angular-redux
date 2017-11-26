import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from './store';
import { INCREMENT, DECREMENT, SET_LIST, FILTER_LIST } from './actions';

@Component({
  selector: 'cp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Cardpay Dashboard';
  @select('counter') count;
  @select('mainTitle') mainTitle;
  @select('list') itemsList;

  constructor(private ngRedux: NgRedux<IAppState>) {

    // LocalStorage operations
    const data = localStorage.getItem('listAppData');

    if (data) {
      this.ngRedux.dispatch({ type: SET_LIST, list: JSON.parse(data) });
    } else {
      localStorage.setItem('listAppData', JSON.stringify(this.ngRedux.getState().list));
    }

    this.itemsList.subscribe(items => {
      localStorage.setItem('listAppData', JSON.stringify(items));
    });
    // end of LocalStorage operations >>>

    this.ngRedux.dispatch({ type: FILTER_LIST });
  }

  increment() {
    this.ngRedux.dispatch({ type: INCREMENT });
  }
  decrement() {
    this.ngRedux.dispatch({ type: DECREMENT });
  }
}
