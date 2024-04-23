import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailsRoutingModule} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-details/details/details-routing.module';
import {DetailsComponent} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-details/details/details.component';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, DetailsRoutingModule],
  exports: [DetailsComponent],
})
export class DetailsModule {}
