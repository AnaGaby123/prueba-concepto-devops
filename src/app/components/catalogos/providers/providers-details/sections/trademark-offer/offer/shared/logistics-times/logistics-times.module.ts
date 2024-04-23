import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogisticsTimesComponent} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/logistics-times/logistics-times.component';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';
import {PqfToggleSwitchModule} from '@appComponents/shared/pqf-toggle-switch/pqf-toggle-switch.module';

@NgModule({
  declarations: [LogisticsTimesComponent],
  exports: [LogisticsTimesComponent],
  imports: [
    CommonModule,
    WithoutResultsModule,
    ToggleSwitchModule,
    GenericInputModule,
    DropDownListModule,
    TranslateModule,
    PqfToggleSwitchModule,
  ],
})
export class LogisticsTimesModule {}
