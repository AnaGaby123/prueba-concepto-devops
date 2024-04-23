import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropListFiltersComponent} from '@appComponents/shared/drop-list-filters/drop-list-filters.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [DropListFiltersComponent],
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [DropListFiltersComponent],
})
export class DropListFiltersModule {}
