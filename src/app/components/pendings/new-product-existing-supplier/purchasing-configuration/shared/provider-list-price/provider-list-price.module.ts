import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProviderListPriceComponent} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/shared/provider-list-price/provider-list-price.component';
import {PqfToggleModule} from '@appComponents/shared/pqf-toggle/pqf-toggle.module';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';
import {TranslateModule} from '@ngx-translate/core';
import {PqfCheckBoxModule} from '@appComponents/shared/pqf-check-box/pqf-check-box.module';
import {PqfDropDownListModule} from '@appComponents/shared/pqf-drop-down-list/pqf-drop-down-list.module';

@NgModule({
  declarations: [ProviderListPriceComponent],
  imports: [
    CommonModule,
    PqfToggleModule,
    PqfGenericInputModule,
    TranslateModule,
    PqfCheckBoxModule,
    PqfDropDownListModule,
  ],
  exports: [ProviderListPriceComponent],
})
export class ProviderListPriceModule {}
