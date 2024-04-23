import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReviewComponent} from '@appComponents/pendings/charges/attend-review/attend-review-details/review/review.component';
import {ReviewRoutingModule} from '@appComponents/pendings/charges/attend-review/attend-review-details/review/review-routing.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {ChipFileModule} from '@appComponents/shared/chip-file/chip-file.module';
import {TranslateModule} from '@ngx-translate/core';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    UploadViewFileModule,
    LoadingModule,
    WithoutResultsModule,
    DropDownListModule,
    GenericInputModule,
    CustomPositionPopUpModule,
    DatePickerModule,
    GenericInputFileModule,
    ChipFileModule,
    TranslateModule,
    GenericTextAreaModule,
    DateFormatModule,
  ],
  exports: [ReviewComponent],
})
export class ReviewModule {}
