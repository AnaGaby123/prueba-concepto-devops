import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DetailsComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DetailsComponent,
        children: [
          {path: '', redirectTo: 'quoted-items', pathMatch: 'full'},
          {
            path: 'quoted-items',
            loadChildren: () =>
              import('./sections/list-quoted-items/list-quoted-items.module').then(
                (m) => m.ListQuotedItemsModule,
              ),
          },
          {
            path: 'add-oc-items',
            loadChildren: () =>
              import('./sections/add-purchase-order-items/add-purchase-order-items.module').then(
                (m) => m.AddPurchaseOrderItemsModule,
              ),
          },
          {
            path: 'replace-oc-item',
            loadChildren: () =>
              import(
                './sections/replace-purchase-order-item/replace-purchase-order-item.module'
              ).then((m) => m.ReplacePurchaseOrderItemModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
