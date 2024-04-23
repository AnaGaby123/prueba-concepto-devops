import {NgModule} from '@angular/core';
import {ProductsListComponent} from '@appComponents/catalogos/products/products-list/products-list.component';
import {ProductsListRoutingModule} from '@appComponents/catalogos/products/products-list/products-list-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DropDownSearchModule} from '@appComponents/shared/drop-down-search/drop-down-search.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {ProductCardItemModule} from '@appComponents/shared/product-card-item/product-card-item.module';
import {ProductListItemModule} from '@appComponents/shared/product-list-item/product-list-item.module';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [
    ProductsListRoutingModule,
    CommonModule,
    FormsModule,
    SearchModule,
    TranslateModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    DropDownSearchModule,
    DropDownListModule,
    LoadingModule,
    ProductCardItemModule,
    ProductListItemModule,
  ],
  exports: [ProductsListComponent],
})
export class ProductsListModule {}
