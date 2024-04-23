import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfPopUpComponent} from '@appComponents/shared/pqf-pop-up/pqf-pop-up.component';

@NgModule({
  declarations: [PqfPopUpComponent],
  imports: [CommonModule],
  exports: [PqfPopUpComponent],
})
export class PqfPopUpModule {}
