import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiscountFreightComponent} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/discount-freight/discount-freight.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';

@NgModule({
  declarations: [DiscountFreightComponent],
  exports: [DiscountFreightComponent],
  imports: [CommonModule, TranslateModule, GenericInputModule],
})
export class DiscountFreightModule {}
