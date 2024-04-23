import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageFileComponent} from './image-file.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ImageFileComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ImageFileComponent],
})
export class ImageFileModule {}
