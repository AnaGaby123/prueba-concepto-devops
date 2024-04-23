import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FixedComponent} from './fixed.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';

@NgModule({
  declarations: [FixedComponent],
  exports: [FixedComponent],
  imports: [CommonModule, TranslateModule, GenericInputModule, AccountingModule],
})
export class FixedModule {}
