import {NgModule} from '@angular/core';
import {ReviewResultsComponent} from '@appComponents/pendings/charges/review-results/review-results.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReviewResultsRoutingModule} from '@appComponents/pendings/charges/review-results/review-results-routing.module';
import {FiltersComponent} from './filters/filters.component';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';
import {ClientListComponent} from './client-list/client-list.component';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {ChipModule} from '@appComponents/shared/chip/chip.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {PhysicalReviewComponent} from '@appComponents/pendings/charges/review-results/pop-ups/physical-review/physical-review.component';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DeliveryAndReviewComponent} from './pop-ups/delivery-and-review/delivery-and-review.component';
import {DigitalReviewComponent} from './pop-ups/digital-review/digital-review.component';
import {HybridReviewComponent} from './pop-ups/hybrid-review/hybrid-review.component';
import {DateFormatModule} from '@appPipes/date-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {ChipFileModule} from '@appComponents/shared/chip-file/chip-file.module';
import {TextFormatModule} from '@appPipes/text-format/text-format.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {EffectsModule} from '@ngrx/effects';
import {ReviewResultsEffects} from '@appEffects/pendings/charges/review-results/review-results.effects';
import {ReviewResultsListEffects} from '@appEffects/pendings/charges/review-results/review-results-list/review-results-list.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReviewResultsRoutingModule,
    DropDownListModule,
    TranslateModule,
    TabsModule,
    VirtualScrollerModule,
    ChipModule,
    PopUpGenericModule,
    DatePickerModule,
    DateFormatModule,
    LoadingModule,
    WithoutResultsModule,
    ChipFileModule,
    TextFormatModule,
    GenericInputFileModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.charges),
    ),
    EffectsModule.forFeature([ReviewResultsEffects, ReviewResultsListEffects]),
  ],
  exports: [ReviewResultsComponent],
  declarations: [
    ReviewResultsComponent,
    FiltersComponent,
    ClientListComponent,
    PhysicalReviewComponent,
    DeliveryAndReviewComponent,
    DigitalReviewComponent,
    HybridReviewComponent,
  ],
})
export class ReviewResultsModule {}
