import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrandsComponent} from '@appComponents/catalogos/brands/brands.component';
import {BrandFormDetailsGuard} from '@appGuards/catalogs/brand-form/brand-form-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BrandsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.catalogs.brands.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.catalogs.brands.list,
            loadChildren: () =>
              import('./brands-list/brands-list.module').then((m) => m.BrandsListModule),
          },
          {
            path: appRoutes.catalogs.brands.details,
            loadChildren: () =>
              import('./brands-details/brands-details.module').then((m) => m.BrandsDetailsModule),
            canLoad: [BrandFormDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class BrandsRoutingModule {}
