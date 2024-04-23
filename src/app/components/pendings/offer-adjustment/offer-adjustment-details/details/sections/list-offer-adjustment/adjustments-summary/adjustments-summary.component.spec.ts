import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AdjustmentsSummaryComponent} from './adjustments-summary.component';

describe('AdjustmentsSummaryComponent', () => {
  let component: AdjustmentsSummaryComponent;
  let fixture: ComponentFixture<AdjustmentsSummaryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AdjustmentsSummaryComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
