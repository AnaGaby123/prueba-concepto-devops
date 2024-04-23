import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewContactDialogComponent} from './new-contact-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';

@NgModule({
  declarations: [NewContactDialogComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule, GenericInputModule],
})
export class NewContactDialogModule {}
