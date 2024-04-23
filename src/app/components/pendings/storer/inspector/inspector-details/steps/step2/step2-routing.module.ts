import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Step2Component} from '@appComponents/pendings/storer/inspector/inspector-details/steps/step2/step2.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: Step2Component,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class Step2RoutingModule {}
