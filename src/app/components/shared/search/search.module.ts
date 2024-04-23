import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SearchComponent} from './search.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [SearchComponent],
  declarations: [SearchComponent],
})
export class SearchModule {}
