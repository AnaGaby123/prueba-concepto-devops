import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsDetailsComponent} from '@appComponents/catalogos/products/products-details/products-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

const routes: Routes = [
  {
    path: '',
    component: ProductsDetailsComponent,
    children: [
      {
        path: '',
        redirectTo: appRoutes.catalogs.products.technicalCommercialInvestigation,
        pathMatch: 'full',
      },
      {
        path: appRoutes.catalogs.products.technicalCommercialInvestigation,
        loadChildren: () =>
          import(
            './technical-commercial-investigation/technical-commercial-investigation.module'
          ).then((m) => m.TechnicalCommercialInvestigationModule),
      },
      {
        path: appRoutes.catalogs.products.regulationRestrictionsNonTariff,
        loadChildren: () =>
          import(
            './regulation-restriction-non-tariff/regulation-restriction-non-tariff.module'
          ).then((m) => m.RegulationRestrictionNonTariffModule),
      },
      {
        path: appRoutes.catalogs.products.logistic,
        loadChildren: () => import('./logistic/logistic.module').then((m) => m.LogisticModule),
      },
      {
        path: appRoutes.catalogs.products.linkAlternativeComplementary,
        loadChildren: () =>
          import('./link-alternative-complementary/link-alternative-complementary.module').then(
            (m) => m.LinkAlternativeComplementaryModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsDetailsRoutingModule {}
