import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeliveryAddressesTooltipComponent} from './delivery-addresses-tooltip.component';

describe('DeliveryAddressesTooltipComponent', () => {
  let component: DeliveryAddressesTooltipComponent;
  let fixture: ComponentFixture<DeliveryAddressesTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryAddressesTooltipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAddressesTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
