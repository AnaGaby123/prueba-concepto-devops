import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfGenericInputFileComponent} from './pqf-generic-input-file.component';
import {TranslateModule} from '@ngx-translate/core';
import {PqfGenericPopUpModule} from '@appComponents/shared/pqf-generic-pop-up/pqf-generic-pop-up.module';
import {PqfGenericPopUpFilesModule} from '@appComponents/shared/pqf-generic-pop-up-files/pqf-generic-pop-up-files.module';

@NgModule({
  declarations: [PqfGenericInputFileComponent],
  imports: [CommonModule, TranslateModule, PqfGenericPopUpModule, PqfGenericPopUpFilesModule],
  exports: [PqfGenericInputFileComponent],
})
export class PqfGenericInputFileModule {}
