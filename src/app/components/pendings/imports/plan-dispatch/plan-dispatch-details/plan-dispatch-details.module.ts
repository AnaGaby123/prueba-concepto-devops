import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanDispatchDetailsComponent} from './plan-dispatch-details.component';
import {PlanDispatchDetailsRoutingModule} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-details/plan-dispatch-details-routing.module';

@NgModule({
  declarations: [PlanDispatchDetailsComponent],
  imports: [CommonModule, PlanDispatchDetailsRoutingModule],
  exports: [PlanDispatchDetailsComponent],
})
export class PlanDispatchDetailsModule {}
