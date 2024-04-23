import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {HybridReviewComponent} from './hybrid-review.component';

describe('HybridReviewComponent', () => {
  let component: HybridReviewComponent;
  let fixture: ComponentFixture<HybridReviewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HybridReviewComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HybridReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
