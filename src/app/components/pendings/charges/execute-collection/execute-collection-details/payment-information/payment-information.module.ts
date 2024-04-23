/* Core Imports */
import {NgModule} from '@angular/core';

/* Common Imports */
import {CommonModule} from '@angular/common';

/* Components Imports */
import {PaymentInformationComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/payment-information/payment-information.component';

/* Module Imports */
import {PaymentInformationRoutingModule} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/payment-information/payment-information-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {PercentageBarModule} from '@appComponents/shared/percentage-bar/percentage-bar.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';

@NgModule({
  declarations: [PaymentInformationComponent],
  imports: [
    CommonModule,
    PaymentInformationRoutingModule,
    TranslateModule,
    ProgressBarModule,
    PercentageBarModule,
    TabsModule,
    DropDownListModule,
    SearchModule,
    DateRangeModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
    DateFormatModule,
    PopUpGenericModule,
    CheckBoxModule,
    CustomPositionPopUpModule,
    DoughnutChartModule,
    HamburgerMenuModule,
  ],
  exports: [PaymentInformationComponent],
})
export class PaymentInformationModule {}
