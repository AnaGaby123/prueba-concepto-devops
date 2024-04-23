import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ReplacePurchaseOrderItemComponent} from './replace-purchase-order-item.component';

describe('ReplacePurchaseOrderItemComponent', () => {
  let component: ReplacePurchaseOrderItemComponent;
  let fixture: ComponentFixture<ReplacePurchaseOrderItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ReplacePurchaseOrderItemComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacePurchaseOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
