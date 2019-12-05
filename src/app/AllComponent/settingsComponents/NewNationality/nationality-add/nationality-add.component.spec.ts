import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalityAddComponent } from './nationality-add.component';

describe('NationalityAddComponent', () => {
  let component: NationalityAddComponent;
  let fixture: ComponentFixture<NationalityAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalityAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
