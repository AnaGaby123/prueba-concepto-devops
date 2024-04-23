import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DispatchMonitoringDetailsComponent} from '@purchasing-manager/dispatch-monitoring/dispatch-monitoring-details/dispatch-monitoring-details.component';
import {DispatchMonitoringDetailsRoutingModule} from '@purchasing-manager/dispatch-monitoring/dispatch-monitoring-details/dispatch-monitoring-details-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {TranslateModule} from '@ngx-translate/core';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {ProviderContactsModule} from '@appComponents/shared/provider-contacts/provider-contacts.module';

@NgModule({
  imports: [
    CommonModule,
    DispatchMonitoringDetailsRoutingModule,
    TabsModule,
    SearchModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
    TranslateModule,
    CheckBoxModule,
    DateFormatModule,
    PopUpGenericModule,
    GenericInputModule,
    DatePickerModule,
    GenericTextAreaModule,
    GenericInputFileModule,
    UploadViewFileModule,
    ProviderContactsModule,
  ],
  exports: [DispatchMonitoringDetailsComponent],
  declarations: [DispatchMonitoringDetailsComponent],
})
export class DispatchMonitoringDetailsModule {}
