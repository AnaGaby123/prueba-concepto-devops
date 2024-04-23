import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {QuotationComponent} from '@appComponents/quotation/quotation.component';
import {QuotationRoutingModule} from '@appComponents/quotation/quotation-routing.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {EffectsModule} from '@ngrx/effects';
import {QuotationDashboardEffects} from '@appEffects/quotation/quotation-dashboard/quotation-dashboard.effects';
import {QuotationDetailsEffects} from '@appEffects/quotation/quotation-details/quotation-details.effects';
import {OfflineProductEffects} from '@appEffects/quotation/quotation-details/details/sections/offline-product.effects';
import {ListQuotesEffects} from '@appEffects/quotation/quotation-details/details/sections/list-quotes.effects';
import {SavedQuotationItemsEffects} from '@appEffects/quotation/quotation-details/saved-quotation-items.effects';
import {NewCustomerQuotesEffects} from '@appEffects/quotation/quotation-details/details/sections/new-customer-quotes.effects';
import {TotalQuotePdfEffects} from '@appEffects/quotation/quotation-details/details/sections/total-quote-pdf.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [QuotationComponent],
  imports: [
    CommonModule,
    HeaderBarModule,
    QuotationRoutingModule,
    DateRangeModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.quotation),
    ),
    EffectsModule.forFeature([
      QuotationDashboardEffects,
      QuotationDetailsEffects,
      OfflineProductEffects,
      ListQuotesEffects,
      SavedQuotationItemsEffects,
      NewCustomerQuotesEffects,
      TotalQuotePdfEffects,
    ]),
    TranslateModule,
  ],
  exports: [QuotationComponent],
})
export class QuotationModule {}
