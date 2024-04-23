/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Components Imports */
import {ClientsComponent} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-details/clients/clients.component';

/* Module Imports */
import {ClientsRoutingModule} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-details/clients/clients-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';

@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
    TranslateModule,
    SearchModule,
    VirtualScrollerModule,
  ],
  exports: [ClientsComponent],
  declarations: [ClientsComponent],
})
export class ClientsModule {}
