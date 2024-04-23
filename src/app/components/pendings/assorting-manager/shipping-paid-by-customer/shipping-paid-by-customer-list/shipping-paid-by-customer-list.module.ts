import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShippingPaidByCustomerListComponent} from './shipping-paid-by-customer-list.component';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {ShippingPaidByCustomerListRoutingModule} from '@appComponents/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-list/shipping-paid-by-customer-list-routing.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';

@NgModule({
  declarations: [ShippingPaidByCustomerListComponent],
  imports: [
    CommonModule,
    SearchModule,
    TranslateModule,
    ShippingPaidByCustomerListRoutingModule,
    VirtualScrollerModule,
  ],
  exports: [ShippingPaidByCustomerListComponent],
})
export class ShippingPaidByCustomerListModule {}
