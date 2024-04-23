import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PhysicalReviewComponent} from './physical-review.component';

describe('PhysicalReviewComponent', () => {
  let component: PhysicalReviewComponent;
  let fixture: ComponentFixture<PhysicalReviewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PhysicalReviewComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
