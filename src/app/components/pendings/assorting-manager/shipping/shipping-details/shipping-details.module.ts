import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShippingDetailsComponent} from './shipping-details.component';
import {ShippingDetailsRoutingModule} from '@appComponents/pendings/assorting-manager/shipping/shipping-details/shipping-details-routing.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';

@NgModule({
  declarations: [ShippingDetailsComponent],
  imports: [
    CommonModule,
    ShippingDetailsRoutingModule,
    DropDownListModule,
    GenericInputModule,
    GenericTextAreaModule,
    VirtualScrollerModule,
  ],
  exports: [ShippingDetailsComponent],
})
export class ShippingDetailsModule {}
