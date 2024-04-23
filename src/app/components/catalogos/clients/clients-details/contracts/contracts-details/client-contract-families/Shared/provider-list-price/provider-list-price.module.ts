import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProviderListPriceComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/provider-list-price/provider-list-price.component';
import {PqfToggleSwitchModule} from '@appComponents/shared/pqf-toggle-switch/pqf-toggle-switch.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ProviderListPriceComponent],
  imports: [CommonModule, PqfToggleSwitchModule, CheckBoxModule, TranslateModule],
  exports: [ProviderListPriceComponent],
})
export class ProviderListPriceModule {}
