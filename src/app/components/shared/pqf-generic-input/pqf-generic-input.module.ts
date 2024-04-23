import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfGenericInputComponent} from './pqf-generic-input.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [PqfGenericInputComponent],
  exports: [PqfGenericInputComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class PqfGenericInputModule {}
