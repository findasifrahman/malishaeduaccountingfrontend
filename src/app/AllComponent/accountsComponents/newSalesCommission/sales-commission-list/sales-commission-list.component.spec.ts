import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCommissionListComponent } from './sales-commission-list.component';

describe('SalesCommissionListComponent', () => {
  let component: SalesCommissionListComponent;
  let fixture: ComponentFixture<SalesCommissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesCommissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesCommissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
