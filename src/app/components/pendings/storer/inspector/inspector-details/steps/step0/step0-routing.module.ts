import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Step0Component} from '@appComponents/pendings/storer/inspector/inspector-details/steps/step0/step0.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: Step0Component,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class Step0RoutingModule {}
