import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnEditComponent } from './sales-return-edit.component';

describe('SalesReturnEditComponent', () => {
  let component: SalesReturnEditComponent;
  let fixture: ComponentFixture<SalesReturnEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReturnEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
