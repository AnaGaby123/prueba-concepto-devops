import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SecureShipmentComponent} from './secure-shipment.component';

describe('SecureShipmentComponent', () => {
  let component: SecureShipmentComponent;
  let fixture: ComponentFixture<SecureShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecureShipmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
