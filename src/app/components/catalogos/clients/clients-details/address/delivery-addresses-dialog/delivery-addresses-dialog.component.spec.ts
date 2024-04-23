import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeliveryAddressesDialogComponent} from './delivery-addresses-dialog.component';

describe('DeliveryAddressesDialogComponent', () => {
  let component: DeliveryAddressesDialogComponent;
  let fixture: ComponentFixture<DeliveryAddressesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryAddressesDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryAddressesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
