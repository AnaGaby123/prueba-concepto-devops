import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StrategyDetailsComponent} from '@appComponents/pendings/strategy/strategy-details/strategy-details.component';
import {GeneralDataStrategyComponent} from './general-data-strategy/general-data-strategy.component';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {StrategyDetailsRoutingModule} from '@appComponents/pendings/strategy/strategy-details/strategy-details-routing.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {StrategyPopUpModule} from '@appComponents/shared/strategy-pop-up/strategy-pop-up.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {FormsModule} from '@angular/forms';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';

@NgModule({
  declarations: [StrategyDetailsComponent, GeneralDataStrategyComponent],
  imports: [
    CommonModule,
    TranslateModule,
    VirtualScrollerModule,
    StrategyDetailsRoutingModule,
    DropDownListModule,
    CheckBoxModule,
    RadioButtonModule,
    LoadingModule,
    StrategyPopUpModule,
    WithoutResultsModule,
    FormsModule,
    CustomPositionPopUpModule,
    GenericTextAreaModule,
  ],
  exports: [StrategyDetailsComponent, GeneralDataStrategyComponent],
})
export class StrategyDetailsModule {}
