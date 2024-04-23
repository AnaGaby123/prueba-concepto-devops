import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ValidateAdjustmentDashboardComponent} from './validate-adjustment-dashboard.component';

describe('ValidateAdjustmentListComponent', () => {
  let component: ValidateAdjustmentDashboardComponent;
  let fixture: ComponentFixture<ValidateAdjustmentDashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ValidateAdjustmentDashboardComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateAdjustmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
