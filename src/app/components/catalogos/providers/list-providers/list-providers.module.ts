import {NgModule} from '@angular/core';
import {ListProvidersComponent} from '@appComponents/catalogos/providers/list-providers/list-providers.component';
import {ListProvidersRoutingModule} from '@appComponents/catalogos/providers/list-providers/list-providers-routing.module';
import {CommonModule} from '@angular/common';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {TranslateModule} from '@ngx-translate/core';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {GenericGridItemModule} from '@appComponents/shared/generic-grid-item/generic-grid-item.module';
import {ProviderListFiltersModule} from '@appComponents/catalogos/providers/list-providers/provider-list-filters/provider-list-filters.module';
import {EffectsModule} from '@ngrx/effects';
import {ProviderListMethodsEffects} from '@appEffects/forms/providers/providers-list/provider-list-methods.effects';
import {ProvidersListEffects} from '@appEffects/forms/providers/providers-list/providers-list.effects';

@NgModule({
  imports: [
    ListProvidersRoutingModule,
    CommonModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    TranslateModule,
    LoadingModule,
    GenericGridItemModule,
    ProviderListFiltersModule,
    EffectsModule.forFeature([ProviderListMethodsEffects, ProvidersListEffects]),
  ],
  exports: [ListProvidersComponent],
  declarations: [ListProvidersComponent],
  providers: [],
})
export class ListProvidersModule {}
