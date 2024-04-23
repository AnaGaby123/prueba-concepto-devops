import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomsAgentsListRoutingModule} from './customs-agents-list-routing.module';
import {CustomsAgentsListComponent} from '@appComponents/catalogos/customs-agents/customs-agents-list/customs-agents-list.component';
import {FiltersModule} from '@appComponents/catalogos/customs-agents/customs-agents-list/filters/filters.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericGridItemModule} from '@appComponents/shared/generic-grid-item/generic-grid-item.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  declarations: [CustomsAgentsListComponent],
  imports: [
    CommonModule,
    CustomsAgentsListRoutingModule,
    FiltersModule,
    VirtualScrollerModule,
    GenericGridItemModule,
    WithoutResultsModule,
  ],
  exports: [CustomsAgentsListComponent],
})
export class CustomsAgentsListModule {}
