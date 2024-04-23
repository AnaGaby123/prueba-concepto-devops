import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageHistoryComponent} from './message-history.component';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [MessageHistoryComponent],
  imports: [CommonModule, DateFormatModule],
  exports: [MessageHistoryComponent],
})
export class MessageHistoryModule {}
