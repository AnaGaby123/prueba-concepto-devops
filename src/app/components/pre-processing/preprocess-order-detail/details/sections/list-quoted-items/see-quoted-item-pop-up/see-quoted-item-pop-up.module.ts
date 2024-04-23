import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeeQuotedItemPopUpComponent} from './see-quoted-item-pop-up.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {PqfDropDownListModule} from '@appComponents/shared/pqf-drop-down-list/pqf-drop-down-list.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {SeeItemDetailsPopTopModule} from '@appComponents/shared/see-item-details-pop-top/see-item-details-pop-top.module';
import {SeeItemDetailsPopBottomModule} from '@appComponents/shared/see-item-details-pop-bottom/see-item-details-pop-bottom.module';
import {ProductsSupplementsModule} from '@appComponents/shared/products-supplements/products-supplements.module';

@NgModule({
  declarations: [SeeQuotedItemPopUpComponent],
  imports: [
    CommonModule,
    PopUpGenericModule,
    TranslateModule,
    PqfGenericInputModule,
    GenericInputModule,
    CheckBoxModule,
    DateFormatModule,
    GenericTextAreaModule,
    PqfDropDownListModule,
    DropDownListModule,
    DatePickerModule,
    SeeItemDetailsPopTopModule,
    SeeItemDetailsPopBottomModule,
    ProductsSupplementsModule,
  ],
  exports: [SeeQuotedItemPopUpComponent],
})
export class SeeQuotedItemPopUpModule {}
