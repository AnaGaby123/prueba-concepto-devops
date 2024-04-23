import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AlertComponent} from './alert.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [AlertComponent],
  declarations: [AlertComponent],
})
export class AlertModule {}
