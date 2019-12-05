import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRecieptEditComponent } from './sales-reciept-edit.component';

describe('SalesRecieptEditComponent', () => {
  let component: SalesRecieptEditComponent;
  let fixture: ComponentFixture<SalesRecieptEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesRecieptEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRecieptEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
