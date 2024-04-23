import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PerformanceComponent} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/performance/performance.component';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {UtilityModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/utility/utility.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  declarations: [PerformanceComponent],
  imports: [
    CommonModule,
    GenericInputModule,
    TranslateModule,
    VirtualScrollerModule,
    UtilityModule,
    CustomPositionPopUpModule,
    SearchModule,
    AccountingModule,
    PopUpGenericModule,
    LoadingModule,
    WithoutResultsModule,
  ],
  exports: [PerformanceComponent],
})
export class PerformanceModule {}
