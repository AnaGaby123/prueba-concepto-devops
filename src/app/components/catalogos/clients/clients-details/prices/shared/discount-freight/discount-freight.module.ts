import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiscountFreightComponent} from './discount-freight.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';

@NgModule({
  declarations: [DiscountFreightComponent],
  exports: [DiscountFreightComponent],
  imports: [CommonModule, TranslateModule, GenericInputModule, AccountingModule],
})
export class DiscountFreightModule {}
