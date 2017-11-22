import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';

@Component({
  selector: 'cp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @select('list') list;
  listCount = 0;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.list.subscribe(x => this.listCount = x.length);
  }

}
