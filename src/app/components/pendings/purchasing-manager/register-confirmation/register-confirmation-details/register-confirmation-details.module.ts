import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterConfirmationDetailsComponent} from './register-confirmation-details.component';
import {RegisterConfirmationDetailsRoutingModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {CancelFormModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/cancel-form/cancel-form.module';
import {BackOrderFormModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/back-order-form/back-order-form.module';
import {ImpactFormModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/impact-form/impact-form.module';
import {WithoutImpactFormModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/without-impact-form/without-impact-form.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {AlertModule} from '@appComponents/shared/alert/alert.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';

@NgModule({
  declarations: [RegisterConfirmationDetailsComponent],
  imports: [
    CommonModule,
    RegisterConfirmationDetailsRoutingModule,
    TranslateModule,
    TabsModule,
    SearchModule,
    DropDownListModule,
    GenericInputModule,
    VirtualScrollerModule,
    CheckBoxModule,
    CancelFormModule,
    BackOrderFormModule,
    ImpactFormModule,
    WithoutImpactFormModule,
    DateFormatModule,
    LoadingModule,
    WithoutResultsModule,
    PopUpGenericModule,
    AlertModule,
    DatePickerModule,
    ProviderContactsModule,
    PqfCardModule,
  ],
})
export class RegisterConfirmationDetailsModule {}
