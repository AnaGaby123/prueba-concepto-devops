import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SecureShipmentListComponent} from './secure-shipment-list.component';

describe('SecureShipmentListComponent', () => {
  let component: SecureShipmentListComponent;
  let fixture: ComponentFixture<SecureShipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecureShipmentListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureShipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
