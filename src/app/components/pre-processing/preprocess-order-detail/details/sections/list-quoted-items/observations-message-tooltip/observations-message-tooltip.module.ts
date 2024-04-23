import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObservationsMessageTooltipComponent} from './observations-message-tooltip.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ObservationsMessageTooltipComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ObservationsMessageTooltipComponent],
})
export class ObservationsMessageTooltipModule {}
