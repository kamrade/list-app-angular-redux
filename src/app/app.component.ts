import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from './store';
import { INCREMENT } from './actions';
import { Map } from 'immutable';

@Component({
  selector: 'cp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Cardpay Dashboard';
  @select(s => s.get('counter')) count;
  // messaging.newMessages
  // @select([ 'messaging', 'newMessages' ]) newMessages;
  // @select( (s: IAppState) => s.messaging.newMessages ) newMessagesCount;

  constructor(private ngRedux: NgRedux<Map<string, any>>) {}

  increment() {
    this.ngRedux.dispatch({ type: INCREMENT });
  }
}
