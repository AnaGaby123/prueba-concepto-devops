import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RebillRoutingModule} from '@appComponents/pendings/charges/attend-review/attend-review-details/rebill/rebill-routing.module';
import {RebillComponent} from '@appComponents/pendings/charges/attend-review/attend-review-details/rebill/rebill.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {PopUpSendEmailModule} from '@appComponents/shared/pop-up-send-email/pop-up-send-email.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';

@NgModule({
  imports: [
    CommonModule,
    RebillRoutingModule,
    HeaderBarModule,
    TranslateModule,
    UploadViewFileModule,
    RadioButtonModule,
    CheckBoxModule,
    DropDownListModule,
    GenericInputModule,
    PopUpGenericModule,
    PopUpSendEmailModule,
    CustomPositionPopUpModule,
    ProgressBarModule,
    DoughnutChartModule,
    HamburgerMenuModule,
    VirtualScrollerModule,
  ],
  declarations: [RebillComponent],
  exports: [RebillComponent],
})
export class RebillModule {}
