import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomsAgentsDetailsRoutingModule} from './customs-agents-details-routing.module';
import {CustomsAgentsDetailsComponent} from '@appComponents/catalogos/customs-agents/customs-agents-details/customs-agents-details.component';
import {BarActivitiesModule} from '@appComponents/shared/bar-activities/bar-activities.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {TranslateModule} from '@ngx-translate/core';
import {GeneralDataCustomsAgentsModule} from '@appComponents/catalogos/customs-agents/customs-agents-details/general-data-customs-agents/general-data-customs-agents.module';
import {DispatchPointCustomsAgentModule} from '@appComponents/catalogos/customs-agents/customs-agents-details/dispatch-point-customs-agent/dispatch-point-customs-agent.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {ConfirmDialogModule} from '@appComponents/shared/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [CustomsAgentsDetailsComponent],
  imports: [
    CommonModule,
    CustomsAgentsDetailsRoutingModule,
    DispatchPointCustomsAgentModule,
    BarActivitiesModule,
    GeneralDataCustomsAgentsModule,
    TabsModule,
    TranslateModule,
    PopUpGenericModule,
    ConfirmDialogModule,
  ],
  exports: [CustomsAgentsDetailsComponent],
})
export class CustomsAgentsDetailsModule {}
