import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ListQuotedItemsComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/list-quoted-items/list-quoted-items.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ListQuotedItemsComponent}])],
  exports: [RouterModule],
})
export class ListQuotedItemsRoutingModule {}
