/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Routing Imports */
import {RegisterArrivalDetailsRoutingModule} from '@purchasing-manager/register-arrival/register-arrival-details/register-arrival-details-routing.module';

/* Components Imports */
import {RegisterArrivalDetailsComponent} from '@purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.component';

@NgModule({
  imports: [CommonModule, RegisterArrivalDetailsRoutingModule],
  exports: [RegisterArrivalDetailsComponent],
  declarations: [RegisterArrivalDetailsComponent],
})
export class RegisterArrivalDetailsModule {}
