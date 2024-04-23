import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttendNotArrivedDetailsComponent} from '@purchasing-manager/attend-not-arrived/attend-not-arrived-details/attend-not-arrived-details.component';
import {AttendNotArrivedDetailsRoutingModule} from '@purchasing-manager/attend-not-arrived/attend-not-arrived-details/attend-not-arrived-details-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';

@NgModule({
  declarations: [AttendNotArrivedDetailsComponent],
  imports: [
    CommonModule,
    AttendNotArrivedDetailsRoutingModule,
    TabsModule,
    SearchModule,
    VirtualScrollerModule,
    TranslateModule,
    DateFormatModule,
    LoadingModule,
    WithoutResultsModule,
    ProviderContactsModule,
    CheckBoxModule,
    ProgressBarModule,
    PopUpGenericModule,
    GenericTextAreaModule,
    GenericInputFileModule,
    RadioButtonModule,
    DatePickerModule,
  ],
  exports: [AttendNotArrivedDetailsComponent],
})
export class AttendNotArrivedDetailsModule {}
