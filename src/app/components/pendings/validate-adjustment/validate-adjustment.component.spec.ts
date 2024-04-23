import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ValidateAdjustmentComponent} from './validate-adjustment.component';

describe('ValidateAdjustmentComponent', () => {
  let component: ValidateAdjustmentComponent;
  let fixture: ComponentFixture<ValidateAdjustmentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ValidateAdjustmentComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
