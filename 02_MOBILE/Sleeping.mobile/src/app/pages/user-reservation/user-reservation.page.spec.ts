import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservationPage } from './user-reservation.page';

describe('UserReservationPage', () => {
  let component: UserReservationPage;
  let fixture: ComponentFixture<UserReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReservationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
