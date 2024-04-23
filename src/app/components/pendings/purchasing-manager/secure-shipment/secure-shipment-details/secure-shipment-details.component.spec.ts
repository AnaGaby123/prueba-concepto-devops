import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SecureShipmentDetailsComponent} from './secure-shipment-details.component';

describe('SecureShipmentDetailsComponent', () => {
  let component: SecureShipmentDetailsComponent;
  let fixture: ComponentFixture<SecureShipmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecureShipmentDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureShipmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
