import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Step3Component} from '@appComponents/pendings/storer/inspector/inspector-details/steps/step3/step3.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: Step3Component,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class Step3RoutingModule {}
