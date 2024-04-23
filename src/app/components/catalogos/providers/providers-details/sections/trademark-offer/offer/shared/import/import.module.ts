import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImportComponent} from './import.component';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ImportComponent],
  imports: [CommonModule, GenericInputModule, TranslateModule],
  exports: [ImportComponent],
})
export class ImportModule {}
