import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PreprocessDashboardItemComponent} from './preprocess-dashboard-item.component';

describe('ClientPreProcessingComponent', () => {
  let component: PreprocessDashboardItemComponent;
  let fixture: ComponentFixture<PreprocessDashboardItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PreprocessDashboardItemComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PreprocessDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
