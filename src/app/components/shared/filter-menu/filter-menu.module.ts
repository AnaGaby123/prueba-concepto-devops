import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FilterMenuComponent} from './filter-menu.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [FilterMenuComponent],
  declarations: [FilterMenuComponent],
})
export class FilterMenuModule {}
