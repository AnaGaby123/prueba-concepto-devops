import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttendReviewDetailsComponent} from './attend-review-details.component';
import {AttendReviewDetailsRoutingModule} from '@appComponents/pendings/charges/attend-review/attend-review-details/attend-review-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {ChipFileModule} from '@appComponents/shared/chip-file/chip-file.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';

@NgModule({
  declarations: [AttendReviewDetailsComponent],
  imports: [
    AttendReviewDetailsRoutingModule,
    CommonModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    LoadingModule,
    UploadViewFileModule,
    DropDownListModule,
    CustomPositionPopUpModule,
    GenericTextAreaModule,
    DatePickerModule,
    DateFormatModule,
    ChipFileModule,
    GenericInputFileModule,
    GenericInputModule,
    DoughnutChartModule,
  ],
  exports: [AttendReviewDetailsComponent],
})
export class AttendReviewDetailsModule {}
