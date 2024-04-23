import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpensesComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/expenses/expenses.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ExpensesComponent],
})
export class ExpensesModule {}
