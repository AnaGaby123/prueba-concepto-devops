import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FiltersComponent} from '@appComponents/catalogos/customs-agents/customs-agents-list/filters/filters.component';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownWithImageModule} from '@appComponents/shared/drop-down-with-image/drop-down-with-image.module';

@NgModule({
  declarations: [FiltersComponent],
  imports: [CommonModule, SearchModule, TranslateModule, DropDownWithImageModule],
  exports: [FiltersComponent],
})
export class FiltersModule {}
