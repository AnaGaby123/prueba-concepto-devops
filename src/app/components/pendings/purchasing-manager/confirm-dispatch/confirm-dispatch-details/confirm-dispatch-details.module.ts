/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Components Imports */
import {ConfirmDispatchDetailsComponent} from '@purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.component';

/* Module Imports */
import {ConfirmDispatchDetailsRoutingModule} from '@purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {CancelFormModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/cancel-form/cancel-form.module';
import {BackOrderFormModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/back-order-form/back-order-form.module';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';

@NgModule({
  imports: [
    CommonModule,
    ConfirmDispatchDetailsRoutingModule,
    TranslateModule,
    SearchModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
    DateFormatModule,
    TabsModule,
    GenericInputFileModule,
    GenericInputModule,
    DropDownListModule,
    CheckBoxModule,
    CancelFormModule,
    BackOrderFormModule,
    ProviderContactsModule,
  ],
  exports: [ConfirmDispatchDetailsComponent],
  declarations: [ConfirmDispatchDetailsComponent],
})
export class ConfirmDispatchDetailsModule {}
