import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfGenericPopUpComponent} from '@appComponents/shared/pqf-generic-pop-up/pqf-generic-pop-up.component';

@NgModule({
  declarations: [PqfGenericPopUpComponent],
  imports: [CommonModule],
  exports: [PqfGenericPopUpComponent],
})
export class PqfGenericPopUpModule {}
