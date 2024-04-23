import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogisticConfigurationListItemComponent} from './logistic-configuration-list-item.component';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [LogisticConfigurationListItemComponent],
  imports: [CommonModule, VirtualScrollerModule, TranslateModule, DateFormatModule],
  exports: [LogisticConfigurationListItemComponent],
})
export class LogisticConfigurationListItemModule {}
