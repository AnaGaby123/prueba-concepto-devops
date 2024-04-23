import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShippingPaidByCustomerDetailsComponent} from './shipping-paid-by-customer-details.component';
import {ShippingPaidByCustomerDetailsRoutingModule} from '@appComponents/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-details/shipping-paid-by-customer-details-routing.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';

@NgModule({
  declarations: [ShippingPaidByCustomerDetailsComponent],
  imports: [
    CommonModule,
    ShippingPaidByCustomerDetailsRoutingModule,
    DropDownListModule,
    GenericTextAreaModule,
    GenericInputModule,
    VirtualScrollerModule,
  ],
  exports: [ShippingPaidByCustomerDetailsComponent],
})
export class ShippingPaidByCustomerDetailsModule {}
