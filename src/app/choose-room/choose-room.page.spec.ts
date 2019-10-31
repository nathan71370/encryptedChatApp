import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRoomPage } from './choose-room.page';

describe('ChooseRoomPage', () => {
  let component: ChooseRoomPage;
  let fixture: ComponentFixture<ChooseRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
