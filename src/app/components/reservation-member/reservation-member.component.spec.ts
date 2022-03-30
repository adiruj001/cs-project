import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationMemberComponent } from './reservation-member.component';

describe('ReservationMemberComponent', () => {
  let component: ReservationMemberComponent;
  let fixture: ComponentFixture<ReservationMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
