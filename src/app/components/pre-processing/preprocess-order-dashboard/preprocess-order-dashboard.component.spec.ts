import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PreprocessOrderDashboardComponent} from './preprocess-order-dashboard.component';

describe('ClientPreProcessingComponent', () => {
  let component: PreprocessOrderDashboardComponent;
  let fixture: ComponentFixture<PreprocessOrderDashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PreprocessOrderDashboardComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PreprocessOrderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
