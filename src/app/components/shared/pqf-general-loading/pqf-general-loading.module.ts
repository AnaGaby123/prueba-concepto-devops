import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfGeneralLoadingComponent} from '@appComponents/shared/pqf-general-loading/pqf-general-loading.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [PqfGeneralLoadingComponent],
  imports: [CommonModule, TranslateModule],
  exports: [PqfGeneralLoadingComponent],
})
export class PqfGeneralLoadingModule {}
