import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SeeItemDetailsPopTopComponent} from './see-item-details-pop-top.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [SeeItemDetailsPopTopComponent],
  declarations: [SeeItemDetailsPopTopComponent],
})
export class SeeItemDetailsPopTopModule {}
