import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductsComponent} from '@appComponents/catalogos/products/products.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.catalogs.products.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.catalogs.products.list,
            loadChildren: () =>
              import('./products-list/products-list.module').then((m) => m.ProductsListModule),
          },
          {
            path: appRoutes.catalogs.products.details,
            loadChildren: () =>
              import('./products-details/products-details.module').then(
                (m) => m.ProductsDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
