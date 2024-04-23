import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImgToWebpPipe} from '@appPipes/img-to-web/img-to-webp.pipe';

@NgModule({
  declarations: [ImgToWebpPipe],
  imports: [CommonModule],
  exports: [ImgToWebpPipe],
})
export class ImgToWebpModule {}
