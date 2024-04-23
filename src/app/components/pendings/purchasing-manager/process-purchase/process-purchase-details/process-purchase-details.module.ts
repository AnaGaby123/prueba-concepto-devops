import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProcessPurchaseDetailsRoutingModule} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-details/process-purchase-details-routing.module';
import {ProcessPurchaseDetailsComponent} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-details/process-purchase-details.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ProcessPurchaseDetailsComponent],
  imports: [CommonModule, ProcessPurchaseDetailsRoutingModule, TranslateModule],
  exports: [ProcessPurchaseDetailsComponent],
})
export class ProcessPurchaseDetailsModule {}
