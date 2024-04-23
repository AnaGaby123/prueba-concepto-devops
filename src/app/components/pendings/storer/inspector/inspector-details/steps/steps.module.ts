import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepsComponent} from '@appComponents/pendings/storer/inspector/inspector-details/steps/steps.component';
import {StepsRoutingModule} from '@appComponents/pendings/storer/inspector/inspector-details/steps/steps-routing.module';

@NgModule({
  declarations: [StepsComponent],
  imports: [CommonModule, StepsRoutingModule],
  exports: [StepsComponent],
})
export class StepsModule {}
