import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ValidateAdjustmentDashboardItemComponent} from './validate-adjustment-dashboard-item.component';

describe('ValidateAdjustmentDashboardItemComponent', () => {
  let component: ValidateAdjustmentDashboardItemComponent;
  let fixture: ComponentFixture<ValidateAdjustmentDashboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValidateAdjustmentDashboardItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateAdjustmentDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
