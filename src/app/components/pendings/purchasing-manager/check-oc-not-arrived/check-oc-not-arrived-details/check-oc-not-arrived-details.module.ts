/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Components Imports */
import {CheckOcNotArrivedDetailsComponent} from '@purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.component';

/* Module Imports */
import {CheckOcNotArrivedDetailsRoutingModule} from '@purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details-routing.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropdownButtonModule} from '@appComponents/shared/dropdown-button/dropdown-button.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DropdownButtonCustomModule} from '@appComponents/shared/dropdown-button-custom/dropdown-button-custom.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {CancelFormModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/cancel-form/cancel-form.module';
import {ImpactFormModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/impact-form/impact-form.module';
import {BackOrderFormModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/back-order-form/back-order-form.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';

@NgModule({
  imports: [
    CommonModule,
    CheckOcNotArrivedDetailsRoutingModule,
    SearchModule,
    TranslateModule,
    DropdownButtonModule,
    VirtualScrollerModule,
    PopUpGenericModule,
    WithoutResultsModule,
    DropdownButtonCustomModule,
    LoadingModule,
    DateFormatModule,
    AccountingModule,
    CheckBoxModule,
    CancelFormModule,
    ImpactFormModule,
    BackOrderFormModule,
    GenericInputModule,
    ProviderContactsModule,
    PqfCardModule,
  ],
  exports: [CheckOcNotArrivedDetailsComponent],
  declarations: [CheckOcNotArrivedDetailsComponent],
})
export class CheckOcNotArrivedDetails {}
