import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UploadViewFileComponent} from './upload-view-file.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [UploadViewFileComponent],
  declarations: [UploadViewFileComponent],
})
export class UploadViewFileModule {}
