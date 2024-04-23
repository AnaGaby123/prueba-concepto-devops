import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Step3Component} from '@appComponents/pendings/storer/inspector/inspector-details/steps/step3/step3.component';
import {Step3RoutingModule} from '@appComponents/pendings/storer/inspector/inspector-details/steps/step3/step3-routing.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [Step3Component],
  imports: [CommonModule, Step3RoutingModule, RadioButtonModule, TranslateModule],
  exports: [Step3Component],
})
export class Step3Module {}
