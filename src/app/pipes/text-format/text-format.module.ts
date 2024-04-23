import {NgModule} from '@angular/core';
import {OnlyFileNamePdf, TextFormatPipe} from '@appPipes/text-format/text-format.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [TextFormatPipe, OnlyFileNamePdf],
  exports: [TextFormatPipe, OnlyFileNamePdf],
  imports: [CommonModule],
})
export class TextFormatModule {}
