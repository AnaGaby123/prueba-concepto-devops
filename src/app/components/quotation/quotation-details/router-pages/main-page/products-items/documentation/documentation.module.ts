import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentationComponent} from './documentation.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [DocumentationComponent],
  imports: [CommonModule, TranslateModule],
  exports: [DocumentationComponent],
})
export class DocumentationModule {}
