import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {StrategyDashboardComponent} from './strategy-dashboard.component';

describe('StrategyListComponent', () => {
  let component: StrategyDashboardComponent;
  let fixture: ComponentFixture<StrategyDashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StrategyDashboardComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
