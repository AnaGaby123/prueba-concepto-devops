import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DraggableModalModule} from '@appComponents/shared/draggable-modal/draggable-modal.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {ProductCardItemModule} from '@appComponents/shared/product-card-item/product-card-item.module';
import {ProductsManagerComponent} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-manager/products-manager.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {TranslateModule} from '@ngx-translate/core';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {ItemBiologicModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-biologic/item-biologic.module';
import {ItemChemicalModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-chemical/item-chemical.module';
import {ItemTrainingModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-training/item-training.module';
import {ItemPublicationsModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-publications/item-publications.module';
import {ItemLabwareModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-labware/item-labware.module';
import {ItemDevicesModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-devices/item-devices.module';
import {ProductItemModule} from '@appComponents/shared/product-item/product-item.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {PopItemsProductsModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/pop-items-products/pop-items-products.module';
import {ProductsManagerRoutingModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-manager/products-manager-routing.module';
import {AddRealizationDatesPopUpModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-training/add-realization-dates-pop-up/add-realization-dates-pop-up.module';
import {ProductInformationDetailsModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-manager/product-information-details/product-information-details.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';

@NgModule({
  declarations: [ProductsManagerComponent],
  imports: [
    CommonModule,
    SearchModule,
    DropDownListModule,
    ScrollingModule,
    GenericInputModule,
    TranslateModule,
    TabsModule,
    GenericTextAreaModule,
    WithoutResultsModule,
    DraggableModalModule,
    UploadViewFileModule,
    CustomPositionPopUpModule,
    DateFormatModule,
    VirtualScrollerModule,
    DatePickerModule,
    ProductCardItemModule,
    ItemBiologicModule,
    ItemChemicalModule,
    ItemTrainingModule,
    ItemPublicationsModule,
    ItemLabwareModule,
    ItemDevicesModule,
    ProductItemModule,
    PopUpGenericModule,
    PopItemsProductsModule,
    ProductsManagerRoutingModule,
    AddRealizationDatesPopUpModule,
    ProductInformationDetailsModule,
    InternalSalesItemModule,
  ],
  exports: [ProductsManagerComponent],
})
export class ProductsManagerModule {}
