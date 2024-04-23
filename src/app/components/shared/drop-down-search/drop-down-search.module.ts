import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DropDownSearchComponent} from '@appComponents/shared/drop-down-search/drop-down-search.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [DropDownSearchComponent],
  declarations: [DropDownSearchComponent],
})
export class DropDownSearchModule {}
