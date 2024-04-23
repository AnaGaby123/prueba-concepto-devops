import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AttendReviewListComponent} from './attend-review-list.component';

describe('AttendReviewListComponent', () => {
  let component: AttendReviewListComponent;
  let fixture: ComponentFixture<AttendReviewListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AttendReviewListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
