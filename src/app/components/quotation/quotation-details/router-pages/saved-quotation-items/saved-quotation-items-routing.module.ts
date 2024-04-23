import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SavedQuotationItemsComponent} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/saved-quotation-items.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: SavedQuotationItemsComponent}])],
  exports: [RouterModule],
})
export class SavedQuotationItemsRoutingModule {}
