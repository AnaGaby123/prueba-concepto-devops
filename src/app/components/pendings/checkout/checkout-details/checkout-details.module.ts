import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckoutDetailsComponent} from './checkout-details.component';
import {TranslateModule} from '@ngx-translate/core';
import {CheckoutDetailsRoutingModule} from '@appComponents/pendings/checkout/checkout-details/checkout-details-routing.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {DropListContactModule} from '@appComponents/shared/drop-list-contact/drop-list-contact.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {EffectsModule} from '@ngrx/effects';
import {CheckoutDetailsEffects} from '@appEffects/pendings/checkout/checkout-details/checkout-details.effects';
import {PopUpAlertModule} from '@appComponents/shared/pop-up-alert/pop-up-alert.module';
import {SendEmailDialogModule} from '@appComponents/shared/send-email-dialog/send-email-dialog.module';
import {AvailabilityLetterEffects} from '@appEffects/dialogs/availability-letter/availability-letter.effects';
import {AuthCodeDialogEffects} from '@appEffects/dialogs/auth-code/auth-code-dialog.effects';

@NgModule({
  declarations: [CheckoutDetailsComponent],
  imports: [
    CommonModule,
    CheckoutDetailsRoutingModule,
    TranslateModule,
    DropDownListModule,
    WithoutResultsModule,
    GenericTextAreaModule,
    CustomPositionPopUpModule,
    DropListContactModule,
    LoadingModule,
    PopUpGenericModule,
    DoughnutChartModule,
    HamburgerMenuModule,
    VirtualScrollerModule,
    DateFormatModule,
    EffectsModule.forFeature([
      CheckoutDetailsEffects,
      AuthCodeDialogEffects,
      AvailabilityLetterEffects,
    ]),
    PopUpAlertModule,
    SendEmailDialogModule,
  ],
})
export class CheckoutDetailsModule {}
