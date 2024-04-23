import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {UnderConstructionComponent} from '@appComponents/under-construction/under-construction.component';
import {UnderConstructionRoutingModule} from '@appComponents/under-construction/under-construction-routing.module';

@NgModule({
  declarations: [UnderConstructionComponent],
  imports: [CommonModule, UnderConstructionRoutingModule, WithoutResultsModule],
  exports: [UnderConstructionComponent],
})
export class UnderConstructionModule {}
