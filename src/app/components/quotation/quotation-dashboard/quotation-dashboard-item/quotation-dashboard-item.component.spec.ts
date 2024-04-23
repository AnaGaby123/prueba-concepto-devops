import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuotationDashboardItemComponent} from './quotation-dashboard-item.component';

describe('QuotationDashboardItemComponent', () => {
  let component: QuotationDashboardItemComponent;
  let fixture: ComponentFixture<QuotationDashboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuotationDashboardItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
