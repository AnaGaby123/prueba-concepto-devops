import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PurchaseOrderItemsComponent} from './purchase-order-items.component';

describe('PurchaseOrderItemsComponent', () => {
  let component: PurchaseOrderItemsComponent;
  let fixture: ComponentFixture<PurchaseOrderItemsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PurchaseOrderItemsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
