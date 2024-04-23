import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ProductDetailsInvestigationComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details-investigation/product-details-investigation.component';
import {ProductListModule} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details-investigation/product-list/product-list.module';
import {InvestigationListModule} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details-investigation/investigation-list/investigation-list.module';
import {AttendInvestigationDetailsRoutingModule} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details-investigation/product-details-investigation-routing.module';
import {EmailContentModule} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details-investigation/email-content/email-content.module';

@NgModule({
  declarations: [ProductDetailsInvestigationComponent],
  imports: [
    CommonModule,
    AttendInvestigationDetailsRoutingModule,
    InvestigationListModule,
    ProductListModule,
    TranslateModule,
    EmailContentModule,
  ],
  exports: [ProductDetailsInvestigationComponent],
})
export class ProductDetailsInvestigationModule {}
