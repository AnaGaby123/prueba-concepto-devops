import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PurchasePromiseDetailsComponent} from './purchase-promise-details.component';
import {PurchasePromiseDetailsRoutingModule} from '@appComponents/pendings/purchase-promise/purchase-promise-details/purchase-promise-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {CardModule} from '@appComponents/shared/card/card.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropdownButtonModule} from '@appComponents/shared/dropdown-button/dropdown-button.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {TextFormatModule} from '@appPipes/text-format/text-format.module';
import {DraggableModalModule} from '@appComponents/shared/draggable-modal/draggable-modal.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {FormsModule} from '@angular/forms';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {EffectsModule} from '@ngrx/effects';
import {PurchasePromiseDetailsEffects} from '@appEffects/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.effects';
import {PaymentDatePopModule} from '@appComponents/pendings/purchase-promise/purchase-promise-details/payment-date-pop/payment-date-pop.module';
import {RegularPopModule} from '@appComponents/pendings/purchase-promise/purchase-promise-details/regular-pop/regular-pop.module';
import {TableSummaryComponent} from './table-summary/table-summary.component';
import {TableResumeComponent} from './table-resume/table-resume.component';
import {ClientsContactModule} from '@appComponents/shared/clients-contact/clients-contact.module';
import {PqfCheckBoxModule} from '@appComponents/shared/pqf-check-box/pqf-check-box.module';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {TableResumeItemModule} from '@appComponents/pendings/purchase-promise/purchase-promise-details/table-resume/table-resume-item/table-resume-item.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';
import {DialogPartidaModule} from '@appComponents/pendings/purchase-promise/purchase-promise-details/dialog-partida/dialog-partida.module';
import {ClientContactBarsCollapseModule} from '@appComponents/shared/client-contact-bars-collapse/client-contact-bars-collapse.module';
import {AddItemToResumeAlertModule} from '@appComponents/pendings/purchase-promise/purchase-promise-details/add-item-to-resume-alert/add-item-to-resume-alert.module';
import {CustomPositionPopUpNotesModule} from '@appComponents/shared/custom-position-pop-up-notes/custom-position-pop-up-notes.module';
import {ReferenceFormEditModule} from '@appComponents/shared/reference-form-edit/reference-form-edit.module';

@NgModule({
  declarations: [PurchasePromiseDetailsComponent, TableSummaryComponent, TableResumeComponent],
  imports: [
    CommonModule,
    FormsModule,
    PurchasePromiseDetailsRoutingModule,
    TranslateModule,
    ProgressBarModule,
    DateFormatModule,
    HamburgerMenuModule,
    SearchModule,
    CardModule,
    VirtualScrollerModule,
    CheckBoxModule,
    GenericInputModule,
    DropdownButtonModule,
    WithoutResultsModule,
    TextFormatModule,
    DraggableModalModule,
    UploadViewFileModule,
    AccountingModule,
    LoadingModule,
    CustomPositionPopUpModule,
    EffectsModule.forFeature([PurchasePromiseDetailsEffects]),
    PaymentDatePopModule,
    RegularPopModule,
    ClientsContactModule,
    PqfCheckBoxModule,
    PqfGenericInputModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
    TableResumeItemModule,
    PqfCardModule,
    DialogPartidaModule,
    ClientContactBarsCollapseModule,
    AddItemToResumeAlertModule,
    CustomPositionPopUpNotesModule,
    ReferenceFormEditModule,
  ],
  exports: [PurchasePromiseDetailsComponent, TableSummaryComponent],
})
export class PurchasePromiseDetailsModule {}
