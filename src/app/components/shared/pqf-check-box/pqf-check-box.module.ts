import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfCheckBoxComponent} from '@appComponents/shared/pqf-check-box/pqf-check-box.component';

@NgModule({
  declarations: [PqfCheckBoxComponent],
  imports: [CommonModule],
  exports: [PqfCheckBoxComponent],
})
export class PqfCheckBoxModule {}
