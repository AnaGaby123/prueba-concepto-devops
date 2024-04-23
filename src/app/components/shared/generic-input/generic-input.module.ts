import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenericInputComponent} from './generic-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CustomPositionPopUpModule],
  exports: [GenericInputComponent],
  declarations: [GenericInputComponent],
})
export class GenericInputModule {}
