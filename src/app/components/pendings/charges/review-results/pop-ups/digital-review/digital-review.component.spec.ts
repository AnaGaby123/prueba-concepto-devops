import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DigitalReviewComponent} from './digital-review.component';

describe('DigitalReviewComponent', () => {
  let component: DigitalReviewComponent;
  let fixture: ComponentFixture<DigitalReviewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DigitalReviewComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
