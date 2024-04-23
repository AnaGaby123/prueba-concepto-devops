import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Step1Component} from '@appComponents/pendings/storer/inspector/inspector-details/steps/step1/step1.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: Step1Component,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class Step1RoutingModule {}
