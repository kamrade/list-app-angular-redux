import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgRedux } from 'ng2-redux';
import { IAppState } from './store';

import { FETCH_TODOS_SUCCESS, FETCH_TODOS_REQUEST, FETCH_TODOS_ERROR } from './actions';

@Injectable()
export class ListsService {

  private readonly ROOT_URL = 'http://localhost:1111';

  constructor(private http: HttpClient,
    private ngRedux: NgRedux<IAppState>) {}

  loadList() {
    this.ngRedux.dispatch({ type: FETCH_TODOS_REQUEST });
    this.http.get(this.ROOT_URL + '/v1/lists')
      .subscribe(list => {
        this.ngRedux.dispatch({ type: FETCH_TODOS_SUCCESS, list: list });
      }, err => {
        this.ngRedux.dispatch({ type: FETCH_TODOS_ERROR, errorMessage: err });
      });
    }

  addListItem(listItemTitle) {
    const newList = { title: listItemTitle };
    this.http.post(this.ROOT_URL + '/v1/lists', newList)
      .subscribe(res => {

        // Надо создать интерфейс для этой шняги
        const title = res.title;
        const id = res._id;

        this.ngRedux.dispatch({ type: 'ADD_LIST_ITEM', listItem: { _id: id, title: title} });
      }, err => {
        console.log('error', err);
      });
  }

  removeListItem(id) {
    console.log('remove:', id);
    this.http.delete(this.ROOT_URL + '/v1/lists/' + id)
      .subscribe(res => {
        this.ngRedux.dispatch({ type: 'REMOVE_LIST_ITEM', id: id});
      }, err => {
        console.log('error', err);
      });
  }

}
