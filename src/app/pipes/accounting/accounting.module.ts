import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AccountingFormatNumber,
  AccountingPipe,
  CurrencyFormat,
  PercentageTransform,
  PqfPercentageTransform,
} from '@appPipes/accounting/accounting.pipe';

@NgModule({
  declarations: [
    AccountingPipe,
    CurrencyFormat,
    PercentageTransform,
    AccountingFormatNumber,
    PqfPercentageTransform,
  ],
  exports: [
    AccountingPipe,
    CurrencyFormat,
    PercentageTransform,
    AccountingFormatNumber,
    PqfPercentageTransform,
  ],
  imports: [CommonModule],
})
export class AccountingModule {}
