import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ShippingDashboardComponent} from './shipping-dashboard.component';

describe('ShippingDashboardComponent', () => {
  let component: ShippingDashboardComponent;
  let fixture: ComponentFixture<ShippingDashboardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ShippingDashboardComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
