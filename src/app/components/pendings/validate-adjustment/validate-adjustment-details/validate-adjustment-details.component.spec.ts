import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ValidateAdjustmentDetailsComponent} from './validate-adjustment-details.component';

describe('ValidateAdjustmentDetailsComponent', () => {
  let component: ValidateAdjustmentDetailsComponent;
  let fixture: ComponentFixture<ValidateAdjustmentDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ValidateAdjustmentDetailsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateAdjustmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
