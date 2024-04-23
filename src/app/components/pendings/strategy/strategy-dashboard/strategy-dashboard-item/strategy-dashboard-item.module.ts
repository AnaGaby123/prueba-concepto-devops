import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StrategyDashboardItemComponent} from './strategy-dashboard-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [StrategyDashboardItemComponent],
  imports: [CommonModule, TranslateModule],
  exports: [StrategyDashboardItemComponent],
})
export class StrategyDashboardItemModule {}
