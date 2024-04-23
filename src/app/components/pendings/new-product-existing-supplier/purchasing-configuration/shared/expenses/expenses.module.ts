import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpensesComponent} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/shared/expenses/expenses.component';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ExpensesComponent],
  imports: [CommonModule, PqfGenericInputModule, TranslateModule],
  exports: [ExpensesComponent],
})
export class ExpensesModule {}
