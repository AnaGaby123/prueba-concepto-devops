import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogisticComponent} from '@appComponents/catalogos/products/products-details/logistic/logistic.component';

const routes: Routes = [
  {
    path: '',
    component: LogisticComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticRoutingModule {}
