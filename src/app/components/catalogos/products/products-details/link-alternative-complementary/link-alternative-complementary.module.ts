import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkAlternativeComplementaryComponent} from '@appComponents/catalogos/products/products-details/link-alternative-complementary/link-alternative-complementary.component';
import {LinkAlternativeComplementaryRoutingModule} from '@appComponents/catalogos/products/products-details/link-alternative-complementary/link-alternative-complementary-routing.module';
import {LogisticModule} from '../logistic/logistic.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {DropDownSearchModule} from '@appComponents/shared/drop-down-search/drop-down-search.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {EffectsModule} from '@ngrx/effects';
import {LinkedAlternativeComplementaryEffects} from '@appEffects/forms/product-form/product-details-form/linked-alternative-complementary/linked-alternative-complementary.effects';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {ProductCardItemModule} from '@appComponents/shared/product-card-item/product-card-item.module';

@NgModule({
  declarations: [LinkAlternativeComplementaryComponent],
  imports: [
    CommonModule,
    LinkAlternativeComplementaryRoutingModule,
    LogisticModule,
    TranslateModule,
    TabsModule,
    DropDownSearchModule,
    SearchModule,
    WithoutResultsModule,
    EffectsModule.forFeature([LinkedAlternativeComplementaryEffects]),
    VirtualScrollerModule,
    CheckBoxModule,
    ProductCardItemModule,
  ],
  exports: [LinkAlternativeComplementaryComponent],
})
export class LinkAlternativeComplementaryModule {}
