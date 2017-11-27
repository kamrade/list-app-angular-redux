import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IAppState, rootReducer, INITIAL_STATE } from './store';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListItemNewComponent } from './list-item-new/list-item-new.component';
import { TestDirective } from './test.directive';
import { ListsService } from './lists.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    ListItemComponent,
    ListItemNewComponent,
    TestDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgReduxModule
  ],
  providers: [ListsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  // configure initial store
  // configure devTools
  constructor(ngRedux: NgRedux<IAppState>,
  devTools: DevToolsExtension) {
    const enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}
