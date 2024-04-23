import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DiscountFreightComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/discount-freight/discount-freight.component';
import {TranslateModule} from '@ngx-translate/core';
import {AccountingModule} from '@appPipes/accounting/accounting.module';

@NgModule({
  declarations: [DiscountFreightComponent],
  imports: [CommonModule, TranslateModule, AccountingModule],
  exports: [DiscountFreightComponent],
})
export class DiscountFreightModule {}
