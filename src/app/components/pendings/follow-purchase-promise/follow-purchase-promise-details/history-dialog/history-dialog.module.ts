import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryDialogComponent} from './history-dialog.component';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';

@NgModule({
  declarations: [HistoryDialogComponent],
  imports: [CommonModule, TranslateModule, DateFormatModule, PopUpGenericModule],
})
export class HistoryDialogModule {}
