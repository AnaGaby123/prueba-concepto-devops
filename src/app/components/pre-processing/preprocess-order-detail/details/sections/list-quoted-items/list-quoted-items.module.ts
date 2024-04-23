import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ListQuotedItemsRoutingModule} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/list-quoted-items-routing.module';
import {ListQuotedItemsComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/list-quoted-items.component';
import {TranslateModule} from '@ngx-translate/core';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {StrategyPopUpModule} from '@appComponents/shared/strategy-pop-up/strategy-pop-up.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {DraggableModalModule} from '@appComponents/shared/draggable-modal/draggable-modal.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {ClientsContactModule} from '@appComponents/shared/clients-contact/clients-contact.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {QuotedItemsModule} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/quoted-item/quoted-item.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {SeeQuotedItemPopUpModule} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/see-quoted-item-pop-up/see-quoted-item-pop-up.module';
import {PqfCheckBoxModule} from '@appComponents/shared/pqf-check-box/pqf-check-box.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {ObservationsMessageTooltipModule} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/observations-message-tooltip/observations-message-tooltip.module';
import {DeliveryAddressesTooltipModule} from '@appComponents/shared/delivery-addresses-tooltip/delivery-addresses-tooltip.module';
import {IntramitableDialogModule} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/intramitable-dialog/intramitable-dialog.module';
import {ControlledDialogModule} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/controlled-dialog/controlled-dialog.module';
import {CustomPositionPopUpNotesModule} from '@appComponents/shared/custom-position-pop-up-notes/custom-position-pop-up-notes.module';
import {ReferenceFormEditModule} from '@appComponents/shared/reference-form-edit/reference-form-edit.module';
import {AvailabilityLettersDialogModule} from '@appComponents/shared/availability-letters-dialog/availability-letters-dialog.module';
import {SearchModule} from '@appComponents/shared/search/search.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ListQuotedItemsRoutingModule,
    TranslateModule,
    ToggleSwitchModule,
    VirtualScrollerModule,
    GenericInputModule,
    StrategyPopUpModule,
    PopUpGenericModule,
    CheckBoxModule,
    WithoutResultsModule,
    LoadingModule,
    CustomPositionPopUpModule,
    DraggableModalModule,
    UploadViewFileModule,
    ClientsContactModule,
    DateFormatModule,
    QuotedItemsModule,
    PqfCheckBoxModule,
    ProgressBarModule,
    DropDownListModule,
    DatePickerModule,
    GenericTextAreaModule,
    SeeQuotedItemPopUpModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
    ObservationsMessageTooltipModule,
    DeliveryAddressesTooltipModule,
    IntramitableDialogModule,
    ControlledDialogModule,
    AvailabilityLettersDialogModule,
    CustomPositionPopUpNotesModule,
    ReferenceFormEditModule,
    SearchModule,
  ],
  exports: [ListQuotedItemsComponent],
  declarations: [ListQuotedItemsComponent],
})
export class ListQuotedItemsModule {}
