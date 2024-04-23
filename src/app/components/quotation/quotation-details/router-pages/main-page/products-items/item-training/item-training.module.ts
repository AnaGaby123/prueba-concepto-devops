import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemTrainingComponent} from './item-training.component';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {ProductCardItemModule} from '@appComponents/shared/product-card-item/product-card-item.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';

@NgModule({
  declarations: [ItemTrainingComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DateFormatModule,
    ProductCardItemModule,
    GenericInputFileModule,
  ],
  exports: [ItemTrainingComponent],
})
export class ItemTrainingModule {}
