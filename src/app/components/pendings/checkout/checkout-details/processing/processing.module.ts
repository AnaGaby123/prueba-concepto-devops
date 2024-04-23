import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessingComponent} from './processing.component';
import {ProcessingRoutingModule} from '@appComponents/pendings/checkout/checkout-details/processing/processing-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {PercentageBarModule} from '@appComponents/shared/percentage-bar/percentage-bar.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {DraggableModalModule} from '@appComponents/shared/draggable-modal/draggable-modal.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {TextFormatModule} from '@appPipes/text-format/text-format.module';
import {PopUpAlertModule} from '@appComponents/shared/pop-up-alert/pop-up-alert.module';
import {AddendaPopUpModule} from '@appComponents/pendings/follow-purchase-promise/follow-purchase-promise-details/addenda-pop-up/addenda-pop-up.module';
import {PqfDropDownListModule} from '@appComponents/shared/pqf-drop-down-list/pqf-drop-down-list.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {TeeDialogModule} from '@appComponents/pendings/checkout/checkout-details/processing/tee-dialog/tee-dialog.module';
import {SeeItemDetailsPopTopModule} from '@appComponents/shared/see-item-details-pop-top/see-item-details-pop-top.module';
import {SeeItemDetailsPopBottomModule} from '@appComponents/shared/see-item-details-pop-bottom/see-item-details-pop-bottom.module';
import {ProductsSupplementsModule} from '@appComponents/shared/products-supplements/products-supplements.module';
import {AvailabilityLettersDialogModule} from '@appComponents/shared/availability-letters-dialog/availability-letters-dialog.module';
import {RequestAuthCodeDialogModule} from '@appComponents/shared/request-auth-code-dialog/request-auth-code-dialog.module';
import {ValidateAuthCodeDialogModule} from '@appComponents/shared/validate-auth-code-dialog/validate-auth-code-dialog.module';
import {CustomPositionPopUpNotesModule} from '@appComponents/shared/custom-position-pop-up-notes/custom-position-pop-up-notes.module';
import {ReferenceFormEditModule} from '@appComponents/shared/reference-form-edit/reference-form-edit.module';

@NgModule({
  declarations: [ProcessingComponent],
  imports: [
    CommonModule,
    ProcessingRoutingModule,
    TranslateModule,
    CheckBoxModule,
    RadioButtonModule,
    GenericTextAreaModule,
    VirtualScrollerModule,
    CustomPositionPopUpModule,
    LoadingModule,
    GenericInputModule,
    PercentageBarModule,
    ProgressBarModule,
    DatePickerModule,
    DateFormatModule,
    DropDownListModule,
    DraggableModalModule,
    UploadViewFileModule,
    TextFormatModule,
    PopUpAlertModule,
    AddendaPopUpModule,
    PqfDropDownListModule,
    PqfCardModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
    PqfCardModule,
    WithoutResultsModule,
    TeeDialogModule,
    SeeItemDetailsPopTopModule,
    SeeItemDetailsPopBottomModule,
    ProductsSupplementsModule,
    AvailabilityLettersDialogModule,
    RequestAuthCodeDialogModule,
    ValidateAuthCodeDialogModule,
    AvailabilityLettersDialogModule,
    CustomPositionPopUpNotesModule,
    ReferenceFormEditModule,
  ],
  exports: [ProcessingComponent],
})
export class ProcessingModule {}
