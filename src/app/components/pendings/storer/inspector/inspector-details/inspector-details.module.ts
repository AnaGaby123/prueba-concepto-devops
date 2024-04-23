import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InspectorDetailsComponent} from './inspector-details.component';
import {InspectorDetailsRoutingModule} from '@appComponents/pendings/storer/inspector/inspector-details/inspector-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ItemsCountBarModule} from '@appComponents/shared/items-count-bar/items-count-bar.module';
import {BarActivitiesModule} from '@appComponents/shared/bar-activities/bar-activities.module';
import {StepsModule} from '@appComponents/pendings/storer/inspector/inspector-details/steps/steps.module';
import {OptionsBarModule} from '@appComponents/shared/options-bar/options-bar.module';

@NgModule({
  declarations: [InspectorDetailsComponent],
  imports: [
    CommonModule,
    InspectorDetailsRoutingModule,
    TranslateModule,
    ItemsCountBarModule,
    BarActivitiesModule,
    StepsModule,
    OptionsBarModule,
  ],
})
export class InspectorDetailsModule {}
