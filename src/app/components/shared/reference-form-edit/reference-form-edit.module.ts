import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReferenceFormEditComponent} from '@appComponents/shared/reference-form-edit/reference-form-edit.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';

@NgModule({
  declarations: [ReferenceFormEditComponent],
  imports: [CommonModule, TranslateModule, GenericInputModule],
  exports: [ReferenceFormEditComponent],
})
export class ReferenceFormEditModule {}
