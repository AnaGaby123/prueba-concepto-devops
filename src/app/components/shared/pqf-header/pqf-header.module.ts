import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfHeaderComponent} from '@appComponents/shared/pqf-header/pqf-header.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [PqfHeaderComponent],
  imports: [CommonModule, TranslateModule],
  exports: [PqfHeaderComponent],
})
export class PqfHeaderModule {}
