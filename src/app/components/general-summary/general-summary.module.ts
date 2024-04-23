import {NgModule} from '@angular/core';
import {GeneralSummaryComponent} from '@appComponents/general-summary/general-summary.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GeneralSummaryRoutingModule} from '@appComponents/general-summary/general-summary-routing.module';
import {SummaryFiltersComponent} from './summary-filters/summary-filters.component';
import {SummaryDataComponent} from './summary-data/summary-data.component';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {PopUpStrategyComponent} from './summary-data/pop-up-strategy/pop-up-strategy.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {EffectsModule} from '@ngrx/effects';
import {GeneralSummaryEffects} from '@appEffects/general-summary/general-summary.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GeneralSummaryRoutingModule,
    TranslateModule,
    TabsModule,
    DropDownListModule,
    VirtualScrollerModule,
    DateFormatModule,
    PopUpGenericModule,
    WithoutResultsModule,
    LoadingModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.generalSummary),
    ),
    EffectsModule.forFeature([GeneralSummaryEffects]),
  ],
  exports: [GeneralSummaryComponent, SummaryFiltersComponent, SummaryDataComponent],
  declarations: [
    GeneralSummaryComponent,
    SummaryFiltersComponent,
    SummaryDataComponent,
    PopUpStrategyComponent,
  ],
})
export class GeneralSummaryModule {}
