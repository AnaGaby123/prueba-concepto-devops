import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SeeItemDetailsPopBottomComponent} from './see-item-details-pop-bottom.component';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule, DateFormatModule],
  exports: [SeeItemDetailsPopBottomComponent],
  declarations: [SeeItemDetailsPopBottomComponent],
})
export class SeeItemDetailsPopBottomModule {}
