import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRecieptAddComponent } from './sales-reciept-add.component';

describe('SalesRecieptAddComponent', () => {
  let component: SalesRecieptAddComponent;
  let fixture: ComponentFixture<SalesRecieptAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesRecieptAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesRecieptAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
