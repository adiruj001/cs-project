import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountReservationAdminComponent } from './amount-reservation-admin.component';

describe('AmountReservationAdminComponent', () => {
  let component: AmountReservationAdminComponent;
  let fixture: ComponentFixture<AmountReservationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountReservationAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountReservationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
