import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProductDetailsComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details/product-details.component';
import {ProductDetailsRoutingModule} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details/product-details-routing.module';
import {TechCommercialInvestModule} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details/tech-commercial-invest/tech-commercial-invest.module';
import {ConfirmDialogModule} from '@appComponents/shared/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    PopUpGenericModule,
    TranslateModule,
    TechCommercialInvestModule,
    ConfirmDialogModule,
  ],
  exports: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
