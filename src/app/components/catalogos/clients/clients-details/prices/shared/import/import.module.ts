import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImportComponent} from './import.component';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {TranslateModule} from '@ngx-translate/core';
import {AccountingModule} from '@appPipes/accounting/accounting.module';

@NgModule({
  declarations: [ImportComponent],
  imports: [CommonModule, GenericInputModule, TranslateModule, AccountingModule],
  exports: [ImportComponent],
})
export class ImportModule {}
