import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemNewComponent } from './list-item-new.component';

describe('ListItemNewComponent', () => {
  let component: ListItemNewComponent;
  let fixture: ComponentFixture<ListItemNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
