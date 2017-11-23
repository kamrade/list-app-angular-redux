import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';
import { SET_FILTER_STRING, FILTER_LIST } from '../actions';

@Component({
  selector: 'cp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @select('list') list;
  @select('filterString') filterString;
  listCount = 0;
  @ViewChild('filterInput') filterInput: ElementRef;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.list.subscribe(x => this.listCount = x.length);
  }

  keypressHandler(event) {
    const value = this.filterInput.nativeElement.value;
    this.ngRedux.dispatch({ type: SET_FILTER_STRING, filterString: value });
    this.ngRedux.dispatch({ type: FILTER_LIST });
  }

}
