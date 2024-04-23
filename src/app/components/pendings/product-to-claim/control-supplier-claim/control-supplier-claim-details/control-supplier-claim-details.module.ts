import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlSupplierClaimDetailsComponent} from '@appComponents/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-details/control-supplier-claim-details.component';
import {ControlSupplierClaimDetailsRoutingModule} from '@appComponents/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-details/control-supplier-claim-details-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {PopUpSendEmailModule} from '@appComponents/shared/pop-up-send-email/pop-up-send-email.module';

@NgModule({
  declarations: [ControlSupplierClaimDetailsComponent],
  imports: [
    CommonModule,
    ControlSupplierClaimDetailsRoutingModule,
    TabsModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    DatePickerModule,
    GenericInputModule,
    UploadViewFileModule,
    GenericInputFileModule,
    RadioButtonModule,
    PopUpGenericModule,
    DropDownListModule,
    GenericTextAreaModule,
    PopUpSendEmailModule,
  ],
  exports: [ControlSupplierClaimDetailsComponent],
})
export class ControlSupplierClaimDetailsModule {}
