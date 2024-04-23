import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StrategyDashboardItemComponent} from './strategy-dashboard-item.component';

describe('QuotationDashboardItemComponent', () => {
  let component: StrategyDashboardItemComponent;
  let fixture: ComponentFixture<StrategyDashboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrategyDashboardItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
