import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { NgRedux } from 'ng2-redux';
import { IAppState } from './store';

import { FETCH_TODOS_SUCCESS, FETCH_TODOS_REQUEST, FETCH_TODOS_ERROR } from './actions';

@Injectable()
export class ListsService {

  private readonly url = 'http://localhost:1111/v1/lists';

  constructor(
    private http: Http,
    private ngRedux: NgRedux<IAppState>) {}

  loadList() {
    this.ngRedux.dispatch({ type: FETCH_TODOS_REQUEST });
    this.http.get(this.url)
      .subscribe(list => {
        this.ngRedux.dispatch({ type: FETCH_TODOS_SUCCESS, list: list.json() });
      }, err => {
        this.ngRedux.dispatch({ type: FETCH_TODOS_ERROR, errorMessage: err });
      });
    }

  addListItem() {

  }

  removeListItem(id) {

  }

}
