import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeeDialogComponent} from './tee-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {ProductsSupplementsModule} from '@appComponents/shared/products-supplements/products-supplements.module';
import {SeeItemDetailsPopBottomModule} from '@appComponents/shared/see-item-details-pop-bottom/see-item-details-pop-bottom.module';
import {SeeItemDetailsPopTopModule} from '@appComponents/shared/see-item-details-pop-top/see-item-details-pop-top.module';

@NgModule({
  declarations: [TeeDialogComponent],
  imports: [
    CommonModule,
    PopUpGenericModule,
    DropDownListModule,
    GenericInputModule,
    GenericTextAreaModule,
    DatePickerModule,
    CheckBoxModule,
    TranslateModule,
    DateFormatModule,
    ProductsSupplementsModule,
    SeeItemDetailsPopBottomModule,
    SeeItemDetailsPopTopModule,
  ],
})
export class TeeDialogModule {}
