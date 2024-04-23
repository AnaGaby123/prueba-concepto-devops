import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {InvestigationListComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details-investigation/investigation-list/investigation-list.component';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {SendEmailDialogModule} from '@appComponents/shared/send-email-dialog/send-email-dialog.module';

@NgModule({
  declarations: [InvestigationListComponent],
  imports: [
    CommonModule,
    TabsModule,
    CheckBoxModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    RadioButtonModule,
    GenericTextAreaModule,
    DropDownListModule,
    GenericInputModule,
    DatePickerModule,
    GenericInputFileModule,
    TranslateModule,
    DateFormatModule,
    LoadingModule,
    SendEmailDialogModule,
  ],
  exports: [InvestigationListComponent],
})
export class InvestigationListModule {}
