import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ListsService {

  private readonly url = 'http://localhost:1111/v1/lists'

  constructor(private http: Http) {}

  getLists() {
    return this.http.get(this.url);
  }

}
