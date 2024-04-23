import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DeclareArrivalComponent} from '@appComponents/pendings/purchasing-manager/declare-arrival/declare-arrival.component';
import {DeclareArrivalRoutingModule} from '@appComponents/pendings/purchasing-manager/declare-arrival/declare-arrival-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {AlphabetFilterModule} from '@appComponents/shared/alphabet-filter/alphabet-filter.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {EffectsModule} from '@ngrx/effects';
import {DeclareArrivalListEffects} from '@appEffects/pendings/purchasing-manager/declare-arrival/declare-arrival-list/declare-arrival-list.effects';
import {DeclareArrivalDetailsEffects} from '@appEffects/pendings/purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DeclareArrivalRoutingModule,
    HeaderBarModule,
    AlphabetFilterModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.purchasingManager),
    ),
    EffectsModule.forFeature([DeclareArrivalListEffects, DeclareArrivalDetailsEffects]),
  ],
  exports: [DeclareArrivalComponent],
  declarations: [DeclareArrivalComponent],
})
export class DeclareArrivalModule {}
