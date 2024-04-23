import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AttendReviewComponent} from './attend-review.component';

describe('AttendReviewComponent', () => {
  let component: AttendReviewComponent;
  let fixture: ComponentFixture<AttendReviewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AttendReviewComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
