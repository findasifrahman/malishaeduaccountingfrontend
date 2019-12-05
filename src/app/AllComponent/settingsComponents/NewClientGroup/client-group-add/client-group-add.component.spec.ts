import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroupAddComponent } from './client-group-add.component';

describe('ClientGroupAddComponent', () => {
  let component: ClientGroupAddComponent;
  let fixture: ComponentFixture<ClientGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
