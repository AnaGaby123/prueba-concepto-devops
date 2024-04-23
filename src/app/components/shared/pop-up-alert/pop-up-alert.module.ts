import {NgModule} from '@angular/core';
import {PopUpAlertComponent} from '@appComponents/shared/pop-up-alert/pop-up-alert.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [PopUpAlertComponent],
  declarations: [PopUpAlertComponent],
})
export class PopUpAlertModule {}
