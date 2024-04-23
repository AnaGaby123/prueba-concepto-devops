import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {ProductCardItemModule} from '@appComponents/shared/product-card-item/product-card-item.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {ProductListItemModule} from '@appComponents/shared/product-list-item/product-list-item.module';
import {ProductListComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details-investigation/product-list/product-list.component';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ListRightSidebarModule} from '@appComponents/pendings/new-product-existing-supplier/shared/list-right-sidebar/list-right-sidebar.module';
import {RegisterProductModule} from '@appComponents/pendings/new-product-existing-supplier/shared/list-right-sidebar/register-product/register-product.module';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    DropDownListModule,
    SearchModule,
    TranslateModule,
    WithoutResultsModule,
    VirtualScrollerModule,
    ProductCardItemModule,
    LoadingModule,
    ProductListItemModule,
    RadioButtonModule,
    DragDropModule,
    ListRightSidebarModule,
    RegisterProductModule,
  ],
  exports: [ProductListComponent],
})
export class ProductListModule {}
