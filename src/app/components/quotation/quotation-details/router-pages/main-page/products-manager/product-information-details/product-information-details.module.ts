import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductInformationDetailsComponent} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-manager/product-information-details/product-information-details.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {ItemChemicalModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-chemical/item-chemical.module';
import {ItemBiologicModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-biologic/item-biologic.module';
import {ItemTrainingModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-training/item-training.module';
import {ItemPublicationsModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-publications/item-publications.module';
import {ItemLabwareModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-labware/item-labware.module';
import {ItemDevicesModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-devices/item-devices.module';
import {ProductCardItemModule} from '@appComponents/shared/product-card-item/product-card-item.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {AddRealizationDatesPopUpModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-training/add-realization-dates-pop-up/add-realization-dates-pop-up.module';
import {ConfirmDialogModule} from '@appComponents/shared/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [ProductInformationDetailsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    GenericInputModule,
    TabsModule,
    ItemChemicalModule,
    ItemBiologicModule,
    ItemTrainingModule,
    ItemPublicationsModule,
    ItemLabwareModule,
    ItemDevicesModule,
    ProductCardItemModule,
    WithoutResultsModule,
    DateFormatModule,
    AddRealizationDatesPopUpModule,
    ConfirmDialogModule,
  ],
  exports: [ProductInformationDetailsComponent],
})
export class ProductInformationDetailsModule {}
