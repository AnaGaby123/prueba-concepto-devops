import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DetailsRoutingModule} from '@appComponents/pendings/offer-adjustment/offer-adjustment-details/details/details-routing.module';
import {DetailsComponent} from '@appComponents/pendings/offer-adjustment/offer-adjustment-details/details/details.component';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, DetailsRoutingModule, RouterModule],
  exports: [DetailsComponent],
})
export class DetailsModule {}
