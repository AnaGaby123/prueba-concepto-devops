import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QuotationDashboardComponent} from './quotation-dashboard.component';

describe('ClientQuotationsComponent', () => {
  let component: QuotationDashboardComponent;
  let fixture: ComponentFixture<QuotationDashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuotationDashboardComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
