import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreProcessingRoutingModule} from '@appComponents/pre-processing/pre-processing-routing.module';
import {PreProcessingComponent} from '@appComponents/pre-processing/pre-processing.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {PreprocessOrderDashboardEffects} from '@appEffects/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.effects';
import {PreprocessOrderDetailsEffects} from '@appEffects/pre-processing/pre-processings-details/preprocess-order-details.effects';
import {AddPurchaseOrderItemsEffects} from '@appEffects/pre-processing/pre-processings-details/details/sections/add-purchase-order-items/add-purchase-order-items.effects';
import {ListQuotedItemsEffects} from '@appEffects/pre-processing/pre-processings-details/details/sections/list-quoted-items/list-quoted-items.effects';
import {ReplacePurchaseItemEffects} from '@appEffects/pre-processing/pre-processings-details/details/sections/replace-purchase-item/replace-purchase-item.effects';
import {TranslateModule} from '@ngx-translate/core';
import {PreProcessingMethodsEffects} from '@appEffects/pre-processing/pre-processing-methods.effects';
import {AvailabilityLetterEffects} from '@appEffects/dialogs/availability-letter/availability-letter.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    PreProcessingRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.preProcessing),
    ),
    EffectsModule.forFeature([
      PreprocessOrderDashboardEffects,
      PreprocessOrderDetailsEffects,
      PreProcessingMethodsEffects,
      AddPurchaseOrderItemsEffects,
      ListQuotedItemsEffects,
      ReplacePurchaseItemEffects,
      AvailabilityLetterEffects,
    ]),
    TranslateModule,
  ],
  exports: [PreProcessingComponent],
  declarations: [PreProcessingComponent],
})
export class PreProcessingModule {}
