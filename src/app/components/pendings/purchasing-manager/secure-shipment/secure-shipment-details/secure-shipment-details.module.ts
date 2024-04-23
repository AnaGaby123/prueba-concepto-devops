import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SecureShipmentDetailsRoutingModule} from './secure-shipment-details-routing.module';
import {SecureShipmentDetailsComponent} from '@purchasing-manager/secure-shipment/secure-shipment-details/secure-shipment-details.component';
import {WithoutImpactFormModule} from '@purchasing-manager/register-confirmation/register-confirmation-details/without-impact-form/without-impact-form.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [SecureShipmentDetailsComponent],
  imports: [
    CommonModule,
    SecureShipmentDetailsRoutingModule,
    WithoutImpactFormModule,
    TranslateModule,
  ],
  exports: [SecureShipmentDetailsComponent],
})
export class SecureShipmentDetailsModule {}
