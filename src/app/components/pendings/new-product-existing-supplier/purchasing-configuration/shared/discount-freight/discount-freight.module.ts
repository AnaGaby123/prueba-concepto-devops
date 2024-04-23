import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiscountFreightComponent} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/shared/discount-freight/discount-freight.component';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [DiscountFreightComponent],
  imports: [CommonModule, PqfGenericInputModule, TranslateModule],
  exports: [DiscountFreightComponent],
})
export class DiscountFreightModule {}
