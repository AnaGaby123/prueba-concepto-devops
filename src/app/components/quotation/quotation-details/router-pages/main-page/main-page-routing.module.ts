import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';
import {MainPageComponent} from '@appComponents/quotation/quotation-details/router-pages/main-page/main-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: MainPageComponent,
        children: [
          {
            path: appRoutes.quoter.sent,
            loadChildren: () =>
              import('../saved-quotation-items/saved-quotation-items.module').then(
                (m) => m.SavedQuotationItemsModule,
              ),
          },
          {
            path: appRoutes.quoter.notSent,
            loadChildren: () =>
              import('./products-manager/products-manager.module').then(
                (m) => m.ProductsManagerModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
