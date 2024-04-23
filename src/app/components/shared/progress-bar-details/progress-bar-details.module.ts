import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressBarDetailsComponent} from './progress-bar-details.component';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [ProgressBarDetailsComponent],
  imports: [CommonModule, ProgressBarModule, TranslateModule, DateFormatModule],
  exports: [ProgressBarDetailsComponent],
})
export class ProgressBarDetailsModule {}
