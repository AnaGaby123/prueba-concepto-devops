import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FixedComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/fixed/fixed.component';
import {TranslateModule} from '@ngx-translate/core';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';

@NgModule({
  declarations: [FixedComponent],
  imports: [CommonModule, TranslateModule, AccountingModule, GenericInputModule],
  exports: [FixedComponent],
})
export class FixedModule {}
