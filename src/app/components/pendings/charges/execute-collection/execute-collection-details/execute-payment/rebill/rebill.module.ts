import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RebillComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/execute-payment/rebill/rebill.component';
import {RebillRoutingModule} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/execute-payment/rebill/rebill-routing.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {PopUpSendEmailModule} from '@appComponents/shared/pop-up-send-email/pop-up-send-email.module';

@NgModule({
  declarations: [RebillComponent],
  imports: [
    CommonModule,
    RebillRoutingModule,
    ProgressBarModule,
    TranslateModule,
    UploadViewFileModule,
    RadioButtonModule,
    CheckBoxModule,
    DropDownListModule,
    GenericInputModule,
    PopUpGenericModule,
    PopUpSendEmailModule,
  ],
  exports: [RebillComponent],
})
export class RebillModule {}
