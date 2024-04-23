import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrandsListRoutingModule} from './brands-list-routing.module';
import {BrandsListComponent} from '@appComponents/catalogos/brands/brands-list/brands-list.component';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericGridItemModule} from '@appComponents/shared/generic-grid-item/generic-grid-item.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {FiltersModule} from '@appComponents/catalogos/brands/brands-list/filters/filters.module';
import {TranslateModule} from '@ngx-translate/core';
import {PqfGenericGridItemModule} from '@appComponents/shared/pqf-generic-grid-item/pqf-generic-grid-item.module';

@NgModule({
  declarations: [BrandsListComponent],
  imports: [
    CommonModule,
    BrandsListRoutingModule,
    VirtualScrollerModule,
    GenericGridItemModule,
    LoadingModule,
    WithoutResultsModule,
    FiltersModule,
    TranslateModule,
    PqfGenericGridItemModule,
  ],
  exports: [BrandsListComponent],
})
export class BrandsListModule {}
