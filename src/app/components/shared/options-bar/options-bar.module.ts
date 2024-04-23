import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OptionsBarComponent} from '@appComponents/shared/options-bar/options-bar.component';

@NgModule({
  declarations: [OptionsBarComponent],
  imports: [CommonModule],
  exports: [OptionsBarComponent],
})
export class OptionsBarModule {}
