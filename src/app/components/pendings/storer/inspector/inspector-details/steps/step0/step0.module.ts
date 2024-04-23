import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Step0Component} from '@appComponents/pendings/storer/inspector/inspector-details/steps/step0/step0.component';
import {Step0RoutingModule} from '@appComponents/pendings/storer/inspector/inspector-details/steps/step0/step0-routing.module';

@NgModule({
  declarations: [Step0Component],
  imports: [CommonModule, Step0RoutingModule],
  exports: [Step0Component],
})
export class Step0Module {}
