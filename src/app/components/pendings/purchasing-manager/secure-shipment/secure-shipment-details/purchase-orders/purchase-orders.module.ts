import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PurchaseOrdersRoutingModule} from './purchase-orders-routing.module';
import {PurchaseOrdersComponent} from '@purchasing-manager/secure-shipment/secure-shipment-details/purchase-orders/purchase-orders.component';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {TranslateModule} from '@ngx-translate/core';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {CancelFormModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/cancel-form/cancel-form.module';
import {BackOrderFormModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/back-order-form/back-order-form.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';

@NgModule({
  declarations: [PurchaseOrdersComponent],
  imports: [
    CommonModule,
    PurchaseOrdersRoutingModule,
    TabsModule,
    SearchModule,
    VirtualScrollerModule,
    TranslateModule,
    LoadingModule,
    WithoutResultsModule,
    ProviderContactsModule,
    GenericInputFileModule,
    CheckBoxModule,
    CancelFormModule,
    BackOrderFormModule,
    GenericInputModule,
    DropDownListModule,
    DateFormatModule,
    PopUpGenericModule,
  ],
  exports: [PurchaseOrdersComponent],
})
export class PurchaseOrdersModule {}
