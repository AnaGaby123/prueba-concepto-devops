import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuotationDetailsComponent} from '@appComponents/quotation/quotation-details/quotation-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';
import {QuotationMainGuard} from '@appGuards/quotation/quotation-main.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: QuotationDetailsComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.quoter.main,
            pathMatch: 'full',
          },
          {
            path: appRoutes.quoter.main,
            loadChildren: () =>
              import('./router-pages/main-page/main-page.module').then((m) => m.MainPageModule),
            canActivateChild: [QuotationMainGuard],
          },
          {
            path: appRoutes.quoter.offlineProducts,
            loadChildren: () =>
              import('./router-pages/offline-product/offline-product.module').then(
                (m) => m.OfflineProductModule,
              ),
          },
          {
            path: appRoutes.quoter.saved,
            loadChildren: () =>
              import('./router-pages/saved-quotation-items/saved-quotation-items.module').then(
                (m) => m.SavedQuotationItemsModule,
              ),
          },
          {
            path: appRoutes.quoter.quotationPreview,
            loadChildren: () =>
              import('./router-pages/linked-quote/linked-quote.module').then(
                (m) => m.LinkedQuoteModule,
              ),
          },
          {
            path: appRoutes.quoter.newClient,
            loadChildren: () =>
              import('./router-pages/new-customer-quotes/new-customer-quotes.module').then(
                (m) => m.NewCustomerQuotesModule,
              ),
          },
          {
            path: appRoutes.quoter.totalQuotePdf,
            loadChildren: () =>
              import('./router-pages/total-quote-pdf/total-quote-pdf.module').then(
                (M) => M.TotalQuotePdfModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class QuotationDetailsRoutingModule {}
