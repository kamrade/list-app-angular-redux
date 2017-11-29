import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';

@Component({
  selector: 'cp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @select('list') itemsList;
  count: Number;

  constructor(private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
    this.itemsList.subscribe(items => this.count = items.length);
  }

}
