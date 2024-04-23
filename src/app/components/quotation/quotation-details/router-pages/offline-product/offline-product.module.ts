import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {OfflineProductComponent} from '@appComponents/quotation/quotation-details/router-pages/offline-product/offline-product.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {TranslateModule} from '@ngx-translate/core';
import {OfflineProductRoutingModule} from '@appComponents/quotation/quotation-details/router-pages/offline-product/offline-product-routing.module';
import {AlertSuccesModule} from '@appComponents/shared/alert-succes/alert-succes.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {AddProductDialogModule} from '@appComponents/quotation/quotation-details/router-pages/offline-product/add-product-dialog/add-product-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderBarModule,
    GenericInputModule,
    GenericTextAreaModule,
    TranslateModule,
    OfflineProductRoutingModule,
    AlertSuccesModule,
    DropDownListModule,
    AddProductDialogModule,
  ],
  declarations: [OfflineProductComponent],
  exports: [OfflineProductComponent],
})
export class OfflineProductModule {}
