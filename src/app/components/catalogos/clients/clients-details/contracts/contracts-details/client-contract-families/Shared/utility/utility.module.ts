import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UtilityComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/utility/utility.component';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [UtilityComponent],
  imports: [CommonModule, GenericInputModule, TranslateModule],
  exports: [UtilityComponent],
})
export class UtilityModule {}
