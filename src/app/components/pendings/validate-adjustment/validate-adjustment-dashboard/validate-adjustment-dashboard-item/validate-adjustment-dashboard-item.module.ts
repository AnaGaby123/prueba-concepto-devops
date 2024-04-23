import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidateAdjustmentDashboardItemComponent} from './validate-adjustment-dashboard-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ValidateAdjustmentDashboardItemComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ValidateAdjustmentDashboardItemComponent],
})
export class ValidateAdjustmentDashboardItemModule {}
