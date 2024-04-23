/* Core Imports */
import {NgModule} from '@angular/core';

/* Common Imports */
import {CommonModule} from '@angular/common';

/* Components Imports */
import {StepsComponent} from './steps.component';

/* Modules Imports */
import {StepsRoutingModule} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-details/steps/steps-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {CardModule} from '@appComponents/shared/card/card.module';
import {PercentageBarModule} from '@appComponents/shared/percentage-bar/percentage-bar.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {BarActivitiesModule} from '@appComponents/shared/bar-activities/bar-activities.module';
import {ImportSettingsModule} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-details/steps/import-settings/import-settings.module';
import {ConsolidateModule} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-details/steps/consolidate/consolidate.module';
import {GenerateOrderModule} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-details/steps/generate-order/generate-order.module';
import {DocumentationModule} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-details/steps/documentation/documentation.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';

@NgModule({
  declarations: [StepsComponent],
  imports: [
    CommonModule,
    StepsRoutingModule,
    TranslateModule,
    VirtualScrollerModule,
    ProgressBarModule,
    CardModule,
    PercentageBarModule,
    DateFormatModule,
    BarActivitiesModule,
    ImportSettingsModule,
    ConsolidateModule,
    GenerateOrderModule,
    DocumentationModule,
    PopUpGenericModule,
  ],
  exports: [StepsComponent],
})
export class StepsModule {}
