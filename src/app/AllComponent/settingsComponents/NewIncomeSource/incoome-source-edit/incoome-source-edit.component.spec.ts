import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncoomeSourceEditComponent } from './incoome-source-edit.component';

describe('IncoomeSourceEditComponent', () => {
  let component: IncoomeSourceEditComponent;
  let fixture: ComponentFixture<IncoomeSourceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncoomeSourceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncoomeSourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
