import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfTabOptionsComponent} from '@appComponents/shared/pqf-tab-options/pqf-tab-options.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [PqfTabOptionsComponent],
  imports: [CommonModule, TranslateModule],
  exports: [PqfTabOptionsComponent],
})
export class PqfTabOptionsModule {}
