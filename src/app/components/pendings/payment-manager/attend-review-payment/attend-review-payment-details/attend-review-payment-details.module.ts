import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttendReviewPaymentDetailsComponent} from './attend-review-payment-details.component';
import {AttendReviewPaymentDetailsRoutingModule} from '@appComponents/pendings/payment-manager/attend-review-payment/attend-review-payment-details/attend-review-payment-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';
import {AlertModule} from '@appComponents/shared/alert/alert.module';

@NgModule({
  declarations: [AttendReviewPaymentDetailsComponent],
  imports: [
    CommonModule,
    AttendReviewPaymentDetailsRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    UploadViewFileModule,
    DropDownListModule,
    GenericInputModule,
    GenericInputFileModule,
    DatePickerModule,
    GenericTextAreaModule,
    CustomPositionPopUpModule,
    PopUpGenericModule,
    ToggleSwitchModule,
    AlertModule,
  ],
  exports: [AttendReviewPaymentDetailsComponent],
})
export class AttendReviewPaymentDetailsModule {}
