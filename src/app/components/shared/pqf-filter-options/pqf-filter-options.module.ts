import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfFilterOptionsComponent} from '@appComponents/shared/pqf-filter-options/pqf-filter-options.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [PqfFilterOptionsComponent],
  imports: [CommonModule, TranslateModule],
  exports: [PqfFilterOptionsComponent],
})
export class PqfFilterOptionsModule {}
