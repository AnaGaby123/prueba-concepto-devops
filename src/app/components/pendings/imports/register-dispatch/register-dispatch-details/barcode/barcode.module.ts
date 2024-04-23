import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarcodeComponent} from './barcode.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [BarcodeComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [BarcodeComponent],
})
export class BarcodeModule {}
