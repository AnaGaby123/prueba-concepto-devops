import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CloseOfferDetailsComponent} from './close-offer-details.component';
import {CloseOfferDetailsRoutingModule} from '@appComponents/pendings/close-offer/close-offer-details/close-offer-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';

import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';

import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {EffectsModule} from '@ngrx/effects';
import {CloseOfferDetailsEffects} from '@appEffects/pendings/close-offer/close-offer-details/close-offer-details.effects';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  declarations: [CloseOfferDetailsComponent],
  imports: [
    CommonModule,
    CloseOfferDetailsRoutingModule,
    TranslateModule,
    VirtualScrollerModule,
    CustomPositionPopUpModule,
    LoadingModule,
    DateFormatModule,
    EffectsModule.forFeature([CloseOfferDetailsEffects]),
    WithoutResultsModule,
  ],
  exports: [CloseOfferDetailsComponent],
})
export class CloseOfferDetailsModule {}
