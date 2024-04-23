import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CancelFormComponent} from './cancel-form.component';
import {TranslateModule} from '@ngx-translate/core';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';

@NgModule({
  declarations: [CancelFormComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RadioButtonModule,
    GenericInputModule,
    GenericTextAreaModule,
  ],
  exports: [CancelFormComponent],
})
export class CancelFormModule {}
