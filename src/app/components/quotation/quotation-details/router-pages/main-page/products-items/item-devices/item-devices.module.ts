import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemDevicesComponent} from './item-devices.component';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [ItemDevicesComponent],
  imports: [CommonModule, TranslateModule, DateFormatModule],
  exports: [ItemDevicesComponent],
})
export class ItemDevicesModule {}
