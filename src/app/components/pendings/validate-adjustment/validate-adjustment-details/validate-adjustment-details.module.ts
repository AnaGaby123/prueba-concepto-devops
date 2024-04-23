import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidateAdjustmentDetailsComponent} from './validate-adjustment-details.component';
import {ValidateAdjustmentDetailsRoutingModule} from '@appComponents/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details-routing.module';
import {OrderPurchaseComponent} from './order-purchase/order-purchase.component';
import {RequestValidateAdjustmentComponent} from './request-validate-adjustment/request-validate-adjustment.component';
import {ListQuotedItemsComponent} from './list-quoted-items/list-quoted-items.component';
import {TranslateModule} from '@ngx-translate/core';
import {DropdownButtonModule} from '@appComponents/shared/dropdown-button/dropdown-button.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DraggableModalModule} from '@appComponents/shared/draggable-modal/draggable-modal.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {TextFormatModule} from '@appPipes/text-format/text-format.module';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {FormsModule} from '@angular/forms';
import {ClientsContactModule} from '@appComponents/shared/clients-contact/clients-contact.module';
import {QuoteItemValidateAdjustmentComponent} from '@appComponents/pendings/validate-adjustment/validate-adjustment-details/list-quoted-items/quote-item-validate-adjustment/quote-item-validate-adjustment.component';
import {ConceptItemQuoteModule} from '@appComponents/shared/concept-item-quote/concept-item-quote.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {DeliveryAddressesTooltipModule} from '@appComponents/shared/delivery-addresses-tooltip/delivery-addresses-tooltip.module';
import {ObservationsMessageTooltipModule} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/observations-message-tooltip/observations-message-tooltip.module';
import {IntramitableAlertModule} from '@appComponents/pendings/validate-adjustment/validate-adjustment-details/list-quoted-items/intramitable-alert/intramitable-alert.module';
import {OrderConfirmationDialogModule} from '@appComponents/pendings/validate-adjustment/validate-adjustment-details/list-quoted-items/order-confirmation-dialog/order-confirmation-dialog.module';
import {ControlledProductsConfirmationDialogModule} from '@appComponents/pendings/validate-adjustment/validate-adjustment-details/list-quoted-items/controlled-products-confirmation-dialog/controlled-products-confirmation-dialog.module';
import {CustomPositionPopUpNotesModule} from '@appComponents/shared/custom-position-pop-up-notes/custom-position-pop-up-notes.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {ReferenceFormEditModule} from '@appComponents/shared/reference-form-edit/reference-form-edit.module';

@NgModule({
  declarations: [
    ValidateAdjustmentDetailsComponent,
    OrderPurchaseComponent,
    RequestValidateAdjustmentComponent,
    ListQuotedItemsComponent,
    QuoteItemValidateAdjustmentComponent,
  ],
  imports: [
    CommonModule,
    ValidateAdjustmentDetailsRoutingModule,
    TranslateModule,
    DropdownButtonModule,
    HamburgerMenuModule,
    SearchModule,
    DateFormatModule,
    DraggableModalModule,
    UploadViewFileModule,
    TextFormatModule,
    ToggleSwitchModule,
    VirtualScrollerModule,
    CheckBoxModule,
    GenericInputModule,
    PopUpGenericModule,
    FormsModule,
    ClientsContactModule,
    ConceptItemQuoteModule,
    WithoutResultsModule,
    LoadingModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
    DeliveryAddressesTooltipModule,
    ObservationsMessageTooltipModule,
    IntramitableAlertModule,
    OrderConfirmationDialogModule,
    ControlledProductsConfirmationDialogModule,
    CustomPositionPopUpNotesModule,
    CustomPositionPopUpModule,
    ReferenceFormEditModule,
  ],
  exports: [ValidateAdjustmentDetailsComponent],
})
export class ValidateAdjustmentDetailsModule {}
