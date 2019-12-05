import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalityListComponent } from './nationality-list.component';

describe('NationalityListComponent', () => {
  let component: NationalityListComponent;
  let fixture: ComponentFixture<NationalityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
