import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AddPurchaseOrderItemsComponent} from './add-purchase-order-items.component';

describe('AddPurchaseOrderItemsComponent', () => {
  let component: AddPurchaseOrderItemsComponent;
  let fixture: ComponentFixture<AddPurchaseOrderItemsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddPurchaseOrderItemsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
