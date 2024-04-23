import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenericInputFileComponent} from './generic-input-file.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [GenericInputFileComponent],
  imports: [CommonModule, TranslateModule],
  exports: [GenericInputFileComponent],
})
export class GenericInputFileModule {}
