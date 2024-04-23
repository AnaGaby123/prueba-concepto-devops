import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CatalogosHomeComponent} from '@appComponents/catalogos/catalogos-home/catalogos-home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CatalogosHomeComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CatalogosRoutingModule {}
