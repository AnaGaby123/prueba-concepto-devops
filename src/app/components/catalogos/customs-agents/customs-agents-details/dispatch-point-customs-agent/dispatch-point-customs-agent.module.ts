import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DispatchPointCustomsAgentComponent} from '@appComponents/catalogos/customs-agents/customs-agents-details/dispatch-point-customs-agent/dispatch-point-customs-agent.component';
import {TranslateModule} from '@ngx-translate/core';
import {BarActivitiesModule} from '@appComponents/shared/bar-activities/bar-activities.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {OptionsBarModule} from '@appComponents/shared/options-bar/options-bar.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DropDownSearchModule} from '@appComponents/shared/drop-down-search/drop-down-search.module';
import {SearchModule} from '@appComponents/shared/search/search.module';

@NgModule({
  declarations: [DispatchPointCustomsAgentComponent],
  imports: [
    CommonModule,
    TranslateModule,
    BarActivitiesModule,
    CheckBoxModule,
    GenericInputModule,
    RadioButtonModule,
    WithoutResultsModule,
    OptionsBarModule,
    LoadingModule,
    DropDownListModule,
    AccountingModule,
    PopUpGenericModule,
    DropDownSearchModule,
    SearchModule,
  ],
  exports: [DispatchPointCustomsAgentComponent],
})
export class DispatchPointCustomsAgentModule {}
