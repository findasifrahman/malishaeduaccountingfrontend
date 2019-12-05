import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCommissionEditComponent } from './sales-commission-edit.component';

describe('SalesCommissionEditComponent', () => {
  let component: SalesCommissionEditComponent;
  let fixture: ComponentFixture<SalesCommissionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesCommissionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesCommissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
