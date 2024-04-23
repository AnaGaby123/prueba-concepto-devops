import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemporalConfigurationDialogComponent} from './temporal-configuration-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {PqfToggleSwitchModule} from '@appComponents/shared/pqf-toggle-switch/pqf-toggle-switch.module';

@NgModule({
  declarations: [TemporalConfigurationDialogComponent],
  imports: [CommonModule, PopUpGenericModule, PqfToggleSwitchModule],
})
export class TemporalConfigurationDialogModule {}
