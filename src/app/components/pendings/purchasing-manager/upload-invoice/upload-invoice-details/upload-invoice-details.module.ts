import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadInvoiceDetailsComponent} from './upload-invoice-details.component';
import {UploadInvoiceDetailsRoutingModule} from '@appComponents/pendings/purchasing-manager/upload-invoice/upload-invoice-details/upload-invoice-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AlertModule} from '@appComponents/shared/alert/alert.module';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';

@NgModule({
  declarations: [UploadInvoiceDetailsComponent],
  imports: [
    CommonModule,
    UploadInvoiceDetailsRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    GenericInputModule,
    DatePickerModule,
    GenericInputFileModule,
    GenericTextAreaModule,
    PopUpGenericModule,
    ToggleSwitchModule,
    DragDropModule,
    AlertModule,
    ProviderContactsModule,
  ],
  exports: [UploadInvoiceDetailsComponent],
})
export class UploadInvoiceDetailsModule {}
