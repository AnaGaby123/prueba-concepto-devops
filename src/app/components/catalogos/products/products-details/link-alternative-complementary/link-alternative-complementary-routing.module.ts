import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LinkAlternativeComplementaryComponent} from '@appComponents/catalogos/products/products-details/link-alternative-complementary/link-alternative-complementary.component';

const routes: Routes = [
  {
    path: '',
    component: LinkAlternativeComplementaryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkAlternativeComplementaryRoutingModule {}
