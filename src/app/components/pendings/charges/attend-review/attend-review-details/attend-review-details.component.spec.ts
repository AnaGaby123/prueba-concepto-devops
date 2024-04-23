import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AttendReviewDetailsComponent} from './attend-review-details.component';

describe('AttendReviewDetailsComponent', () => {
  let component: AttendReviewDetailsComponent;
  let fixture: ComponentFixture<AttendReviewDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AttendReviewDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendReviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
