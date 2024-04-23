import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfSecureCodePopUpComponent} from '@appComponents/shared/pqf-secure-code-pop-up/pqf-secure-code-pop-up.component';
import {PqfGenericPopUpModule} from '@appComponents/shared/pqf-generic-pop-up/pqf-generic-pop-up.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [PqfSecureCodePopUpComponent],
  imports: [CommonModule, PqfGenericPopUpModule, TranslateModule],
  exports: [PqfSecureCodePopUpComponent],
})
export class PqfSecureCodePopUpModule {}
