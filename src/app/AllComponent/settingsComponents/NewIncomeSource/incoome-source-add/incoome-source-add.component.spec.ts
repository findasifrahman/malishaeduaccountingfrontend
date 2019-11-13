import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncoomeSourceAddComponent } from './incoome-source-add.component';

describe('IncoomeSourceAddComponent', () => {
  let component: IncoomeSourceAddComponent;
  let fixture: ComponentFixture<IncoomeSourceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncoomeSourceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncoomeSourceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
