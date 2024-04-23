import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeeResumeRoutingModule} from './see-resume-routing.module';
import {SeeResumeComponent} from '@purchasing-manager/secure-shipment/secure-shipment-details/see-resume/see-resume.component';
import {TranslateModule} from '@ngx-translate/core';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';

@NgModule({
  declarations: [SeeResumeComponent],
  imports: [
    CommonModule,
    SeeResumeRoutingModule,
    TranslateModule,
    ProviderContactsModule,
    ProgressBarModule,
    GenericInputFileModule,
    GenericInputModule,
    DropDownListModule,
    VirtualScrollerModule,
    DateFormatModule,
    LoadingModule,
    WithoutResultsModule,
    CheckBoxModule,
    DatePickerModule,
  ],
  exports: [SeeResumeComponent],
})
export class SeeResumeModule {}
