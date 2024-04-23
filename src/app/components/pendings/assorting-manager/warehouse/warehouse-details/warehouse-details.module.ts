/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Components Imports */
import {WarehouseDetailsComponent} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-details/warehouse-details.component';

/* Module Imports */
import {WarehouseDetailsRoutingModule} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-details/warehouse-details-routing.module';

@NgModule({
  imports: [CommonModule, WarehouseDetailsRoutingModule],
  exports: [WarehouseDetailsComponent],
  declarations: [WarehouseDetailsComponent],
})
export class WarehouseDetailsModule {}
