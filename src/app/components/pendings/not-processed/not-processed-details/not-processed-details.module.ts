import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotProcessedDetailsComponent} from './not-processed-details.component';
import {NotProcessedDetailsRoutingModule} from '@appComponents/pendings/not-processed/not-processed-details/not-processed-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {OrderListComponent} from './order-list/order-list.component';
import {DropdownButtonModule} from '@appComponents/shared/dropdown-button/dropdown-button.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {RequestNotProcessedComponent} from './request-not-processed/request-not-processed.component';
import {DateFormatModule} from '@appPipes/date-format.module';
import {TextFormatModule} from '@appPipes/text-format/text-format.module';
import {PurchaseOrderItemsComponent} from './purchase-order-items/purchase-order-items.component';
import {FormsModule} from '@angular/forms';
import {AlertModule} from '@appComponents/shared/alert/alert.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';

import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {DropDownMultilabelListModule} from '@appComponents/shared/drop-down-multilabel-list/drop-down-multilabel-list.module';

import {PopUpSendEmailModule} from '@appComponents/shared/pop-up-send-email/pop-up-send-email.module';
import {DraggableModalModule} from '@appComponents/shared/draggable-modal/draggable-modal.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {ClientsContactModule} from '@appComponents/shared/clients-contact/clients-contact.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {ReconfigureFreightPopUpModule} from '@appComponents/pendings/not-processed/not-processed-details/purchase-order-items/reconfigure-freight-pop-up/reconfigure-freight-pop-up.module';
import {QuotedItemsModule} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/quoted-item/quoted-item.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {DeliveryAddressesTooltipModule} from '@appComponents/shared/delivery-addresses-tooltip/delivery-addresses-tooltip.module';
import {RequestFeaDialogModule} from '@appComponents/pendings/not-processed/not-processed-details/purchase-order-items/request-fea-dialog/request-fea-dialog.module';
import {SendEmailDialogModule} from '@appComponents/shared/send-email-dialog/send-email-dialog.module';
import {RequestAuthCodeDialogModule} from '@appComponents/shared/request-auth-code-dialog/request-auth-code-dialog.module';
import {ValidateAuthCodeDialogModule} from '@appComponents/shared/validate-auth-code-dialog/validate-auth-code-dialog.module';
import {CustomPositionPopUpNotesModule} from '@appComponents/shared/custom-position-pop-up-notes/custom-position-pop-up-notes.module';
import {ReferenceFormEditModule} from '@appComponents/shared/reference-form-edit/reference-form-edit.module';

@NgModule({
  declarations: [
    NotProcessedDetailsComponent,
    OrderListComponent,
    RequestNotProcessedComponent,
    PurchaseOrderItemsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NotProcessedDetailsRoutingModule,
    TranslateModule,
    DropdownButtonModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    DateFormatModule,
    TextFormatModule,
    AlertModule,
    PopUpGenericModule,
    CheckBoxModule,
    GenericInputModule,
    DatePickerModule,
    GenericTextAreaModule,
    DropDownMultilabelListModule,
    PopUpSendEmailModule,
    DraggableModalModule,
    UploadViewFileModule,
    CustomPositionPopUpModule,
    ClientsContactModule,
    WithoutResultsModule,
    LoadingModule,
    ReconfigureFreightPopUpModule,
    QuotedItemsModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
    DeliveryAddressesTooltipModule,
    RequestFeaDialogModule,
    RequestAuthCodeDialogModule,
    ValidateAuthCodeDialogModule,
    SendEmailDialogModule,
    CustomPositionPopUpNotesModule,
    ReferenceFormEditModule,
  ],
  exports: [NotProcessedDetailsComponent],
})
export class NotProcessedDetailsModule {}
