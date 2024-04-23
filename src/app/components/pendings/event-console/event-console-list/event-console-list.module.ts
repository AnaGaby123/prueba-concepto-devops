import {NgModule} from '@angular/core';
import {EventConsoleListComponent} from '@appComponents/pendings/event-console/event-console-list/event-console-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EventConsoleListRoutingModule} from '@appComponents/pendings/event-console/event-console-list/event-console-list-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {PopUpAddEventComponent} from './pop-up-add-event/pop-up-add-event.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EventConsoleListRoutingModule,
    TabsModule,
    DropDownListModule,
    TranslateModule,
    SearchModule,
    VirtualScrollerModule,
    PopUpGenericModule,
    RadioButtonModule,
    DatePickerModule,
    GenericTextAreaModule,
    WithoutResultsModule,
    CheckBoxModule,
  ],
  exports: [EventConsoleListComponent, PopUpAddEventComponent],
  declarations: [EventConsoleListComponent, PopUpAddEventComponent],
})
export class EventConsoleListModule {}
