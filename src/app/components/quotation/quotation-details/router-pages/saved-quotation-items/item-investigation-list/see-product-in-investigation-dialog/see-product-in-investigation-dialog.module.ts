import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeeProductInInvestigationDialogComponent} from './see-product-in-investigation-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';

@NgModule({
  declarations: [SeeProductInInvestigationDialogComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule, GenericInputFileModule],
})
export class SeeProductInInvestigationDialogModule {}
