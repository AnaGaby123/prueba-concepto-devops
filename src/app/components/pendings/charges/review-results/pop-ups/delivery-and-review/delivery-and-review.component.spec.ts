import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DeliveryAndReviewComponent} from './delivery-and-review.component';

describe('DeliveryAndReviewComponent', () => {
  let component: DeliveryAndReviewComponent;
  let fixture: ComponentFixture<DeliveryAndReviewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DeliveryAndReviewComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAndReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
