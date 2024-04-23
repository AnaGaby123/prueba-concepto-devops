import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfGenericPopUpFilesComponent} from '@appComponents/shared/pqf-generic-pop-up-files/pqf-generic-pop-up-files.component';
import {PqfGenericPopUpModule} from '@appComponents/shared/pqf-generic-pop-up/pqf-generic-pop-up.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [PqfGenericPopUpFilesComponent],
  imports: [CommonModule, PqfGenericPopUpModule, TranslateModule],
  exports: [PqfGenericPopUpFilesComponent],
})
export class PqfGenericPopUpFilesModule {}
