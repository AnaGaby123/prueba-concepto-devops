import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegularPopComponent} from '@appComponents/pendings/purchase-promise/purchase-promise-details/regular-pop/regular-pop.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {PqfDropDownListModule} from '@appComponents/shared/pqf-drop-down-list/pqf-drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {SeeItemDetailsPopTopModule} from '@appComponents/shared/see-item-details-pop-top/see-item-details-pop-top.module';
import {SeeItemDetailsPopBottomModule} from '@appComponents/shared/see-item-details-pop-bottom/see-item-details-pop-bottom.module';
import {ProductsSupplementsModule} from '@appComponents/shared/products-supplements/products-supplements.module';

@NgModule({
  declarations: [RegularPopComponent],
  imports: [
    CommonModule,
    PopUpGenericModule,
    TranslateModule,
    GenericTextAreaModule,
    CheckBoxModule,
    DatePickerModule,
    DateFormatModule,
    PqfDropDownListModule,
    GenericInputModule,
    DropDownListModule,
    SeeItemDetailsPopTopModule,
    SeeItemDetailsPopBottomModule,
    ProductsSupplementsModule,
  ],
  exports: [RegularPopComponent],
})
export class RegularPopModule {}
