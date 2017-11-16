import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { fromJS, Map } from 'immutable';

import { AppComponent } from './app.component';
import { IAppState, rootReducer, INITIAL_STATE } from './store';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // configure initial store
  constructor(ngRedux: NgRedux<Map<string, any>>) {
    ngRedux.configureStore(rootReducer, fromJS(INITIAL_STATE));
  }
}
