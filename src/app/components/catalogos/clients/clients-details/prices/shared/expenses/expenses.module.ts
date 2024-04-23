import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpensesComponent} from './expenses.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';

@NgModule({
  declarations: [ExpensesComponent],
  exports: [ExpensesComponent],
  imports: [CommonModule, TranslateModule, GenericInputModule],
})
export class ExpensesModule {}
