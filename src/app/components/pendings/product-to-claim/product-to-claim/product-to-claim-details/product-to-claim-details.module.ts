/* Core Imports */
import {NgModule} from '@angular/core';

/* Components Imports */
import {ProductToClaimDetailsComponent} from '@appComponents/pendings/product-to-claim/product-to-claim/product-to-claim-details/product-to-claim-details.component';

/* Module Imports */
import {ProductToClaimDetailsRoutingModule} from '@appComponents/pendings/product-to-claim/product-to-claim/product-to-claim-details/product-to-claim-details-routing.module';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';

@NgModule({
  imports: [
    CommonModule,
    ProductToClaimDetailsRoutingModule,
    TranslateModule,
    DropDownListModule,
    HamburgerMenuModule,
    SearchModule,
    GenericTextAreaModule,
    RadioButtonModule,
  ],
  exports: [ProductToClaimDetailsComponent],
  declarations: [ProductToClaimDetailsComponent],
})
export class ProductToClaimDetailsModule {}
