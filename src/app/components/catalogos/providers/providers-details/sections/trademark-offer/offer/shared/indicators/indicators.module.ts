import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndicatorsComponent} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/indicators/indicators.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [IndicatorsComponent],
  exports: [IndicatorsComponent],
  imports: [CommonModule, TranslateModule],
})
export class IndicatorsModule {}
