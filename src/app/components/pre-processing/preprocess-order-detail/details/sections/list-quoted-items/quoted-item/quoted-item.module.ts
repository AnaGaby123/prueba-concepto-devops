import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuotedItemComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/quoted-item/quoted-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {FormsModule} from '@angular/forms';
import {ConceptItemQuoteModule} from '@appComponents/shared/concept-item-quote/concept-item-quote.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CustomPositionPopUpModule,
    DateFormatModule,
    TranslateModule,
    DateFormatModule,
    CustomPositionPopUpModule,
    CheckBoxModule,
    GenericInputModule,
    FormsModule,
    ConceptItemQuoteModule,
    PopUpGenericModule,
    DropDownListModule,
    DatePickerModule,
    GenericTextAreaModule,
    ProgressBarModule,
    InternalSalesItemModule,
  ],
  exports: [QuotedItemComponent],
  declarations: [QuotedItemComponent],
})
export class QuotedItemsModule {}
