import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlphabetFilterComponent} from './alphabet-filter.component';

@NgModule({
  declarations: [AlphabetFilterComponent],
  imports: [CommonModule],
  exports: [AlphabetFilterComponent],
})
export class AlphabetFilterModule {}
