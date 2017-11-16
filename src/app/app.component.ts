import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store';
import { INCREMENT } from './actions';

@Component({
  selector: 'cp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Cardpay Dashboard';
  counter = 0;

  constructor(private ngRedux: NgRedux<IAppState>) {
    ngRedux.subscribe(() => {
      const store = ngRedux.getState();
      this.counter = store.counter;
    });
  }

  increment() {
    this.ngRedux.dispatch({ type: INCREMENT });
  }
}
