import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PopUpConfiguracionComponent} from './pop-up-configuracion.component';

import {PqfToggleSwitchModule} from '@appComponents/shared/pqf-toggle-switch/pqf-toggle-switch.module';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';

@NgModule({
  imports: [CommonModule, FormsModule, ToggleSwitchModule, PqfToggleSwitchModule],
  exports: [PopUpConfiguracionComponent],
  declarations: [PopUpConfiguracionComponent],
})
export class PopUpConfiguracionModule {}
