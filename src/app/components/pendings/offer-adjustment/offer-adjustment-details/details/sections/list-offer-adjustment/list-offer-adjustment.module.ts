import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListOfferAdjustmentComponent} from '@appComponents/pendings/offer-adjustment/offer-adjustment-details/details/sections/list-offer-adjustment/list-offer-adjustment.component';
import {ListOfferAdjustmentRoutingModule} from '@appComponents/pendings/offer-adjustment/offer-adjustment-details/details/sections/list-offer-adjustment/list-offer-adjustment-routing.module';
import {CardModule} from '@appComponents/shared/card/card.module';
import {PercentageBarModule} from '@appComponents/shared/percentage-bar/percentage-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {BarActivitiesModule} from '@appComponents/shared/bar-activities/bar-activities.module';
import {DeliveryTimeComponent} from './delivery-time/delivery-time.component';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {PaymentConditionsComponent} from './payment-conditions/payment-conditions.component';
import {PaymentComponent} from './payment/payment.component';
import {ChipModule} from '@appComponents/shared/chip/chip.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {SliderModule} from '@appComponents/shared/slider/slider.module';
import {AdjustmentsSummaryComponent} from './adjustments-summary/adjustments-summary.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {AlertSuccesModule} from '@appComponents/shared/alert-succes/alert-succes.module';
import {FormsModule} from '@angular/forms';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DropListModule} from '@appComponents/shared/drop-list/drop-list.module';
import {PqfSecureCodePopUpModule} from '@appComponents/shared/pqf-secure-code-pop-up/pqf-secure-code-pop-up.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';

@NgModule({
  declarations: [
    ListOfferAdjustmentComponent,
    DeliveryTimeComponent,
    PaymentConditionsComponent,
    PaymentComponent,
    AdjustmentsSummaryComponent,
  ],
  imports: [
    CommonModule,
    ListOfferAdjustmentRoutingModule,
    CardModule,
    PercentageBarModule,
    TranslateModule,
    CustomPositionPopUpModule,
    BarActivitiesModule,
    VirtualScrollerModule,
    GenericInputModule,
    CheckBoxModule,
    DropDownListModule,
    ChipModule,
    RadioButtonModule,
    SliderModule,
    PopUpGenericModule,
    WithoutResultsModule,
    AlertSuccesModule,
    FormsModule,
    GenericTextAreaModule,
    LoadingModule,
    DateFormatModule,
    DropListModule,
    PqfSecureCodePopUpModule,
    HeaderInternalSalesItemModule,
    InternalSalesItemModule,
    PqfCardModule,
  ],
  exports: [ListOfferAdjustmentComponent],
})
export class ListOfferAdjustmentModule {}
