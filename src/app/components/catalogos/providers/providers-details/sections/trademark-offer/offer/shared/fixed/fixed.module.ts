import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FixedComponent} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/fixed/fixed.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';

@NgModule({
  declarations: [FixedComponent],
  exports: [FixedComponent],
  imports: [CommonModule, TranslateModule, GenericInputModule],
})
export class FixedModule {}
