import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ReviewResultsComponent} from './review-results.component';

describe('ReviewResultsComponent', () => {
  let component: ReviewResultsComponent;
  let fixture: ComponentFixture<ReviewResultsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ReviewResultsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
