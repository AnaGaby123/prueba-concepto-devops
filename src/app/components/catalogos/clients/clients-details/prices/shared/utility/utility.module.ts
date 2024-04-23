import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UtilityComponent} from './utility.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';

@NgModule({
  declarations: [UtilityComponent],
  exports: [UtilityComponent],
  imports: [CommonModule, TranslateModule, GenericInputModule],
})
export class UtilityModule {}
