import {NgModule} from '@angular/core';
import {ToggleSwitchComponent} from './toggle-switch.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [ToggleSwitchComponent],
  declarations: [ToggleSwitchComponent],
})
export class ToggleSwitchModule {}
