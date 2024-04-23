import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableResumeItemComponent} from './table-resume-item.component';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [TableResumeItemComponent],
  imports: [
    CommonModule,
    InternalSalesItemModule,
    CheckBoxModule,
    GenericInputModule,
    TranslateModule,
  ],
  exports: [TableResumeItemComponent],
})
export class TableResumeItemModule {}
