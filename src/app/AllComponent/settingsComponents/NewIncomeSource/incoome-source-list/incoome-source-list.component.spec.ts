import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncoomeSourceListComponent } from './incoome-source-list.component';

describe('IncoomeSourceListComponent', () => {
  let component: IncoomeSourceListComponent;
  let fixture: ComponentFixture<IncoomeSourceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncoomeSourceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncoomeSourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
