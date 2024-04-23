import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsListComponent} from '@appComponents/catalogos/clients/clients-list/clients-list.component';
import {ClientsListRoutingModule} from '@appComponents/catalogos/clients/clients-list/clients-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ClientsListFiltersModule} from '@appComponents/catalogos/clients/clients-list/clients-list-filters/clients-list-filters.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericGridItemModule} from '@appComponents/shared/generic-grid-item/generic-grid-item.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  declarations: [ClientsListComponent],
  imports: [
    CommonModule,
    ClientsListRoutingModule,
    TranslateModule,
    ClientsListFiltersModule,
    SearchModule,
    VirtualScrollerModule,
    GenericGridItemModule,
    LoadingModule,
    WithoutResultsModule,
  ],
  exports: [ClientsListComponent],
})
export class ClientsListModule {}
