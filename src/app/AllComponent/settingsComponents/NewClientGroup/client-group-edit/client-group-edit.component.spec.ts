import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroupEditComponent } from './client-group-edit.component';

describe('ClientGroupEditComponent', () => {
  let component: ClientGroupEditComponent;
  let fixture: ComponentFixture<ClientGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
