import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidPageComponent } from './paid-page.component';

describe('PaidPageComponent', () => {
  let component: PaidPageComponent;
  let fixture: ComponentFixture<PaidPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
