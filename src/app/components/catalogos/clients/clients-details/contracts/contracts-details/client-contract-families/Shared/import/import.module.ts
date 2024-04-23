import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImportComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/import/import.component';
import {TranslateModule} from '@ngx-translate/core';
import {AccountingModule} from '@appPipes/accounting/accounting.module';

@NgModule({
  declarations: [ImportComponent],
  imports: [CommonModule, TranslateModule, AccountingModule],
  exports: [ImportComponent],
})
export class ImportModule {}
