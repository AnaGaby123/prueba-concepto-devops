import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryRoutesComponent} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/delivery-routes/delivery-routes.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [DeliveryRoutesComponent],
  exports: [DeliveryRoutesComponent],
  imports: [CommonModule, TranslateModule],
})
export class DeliveryRoutesModule {}
