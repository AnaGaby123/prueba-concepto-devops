import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FiltersComponent} from '@appComponents/catalogos/brands/brands-list/filters/filters.component';
import {DropDownWithImageModule} from '@appComponents/shared/drop-down-with-image/drop-down-with-image.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {PqfFilterOptionsModule} from '@appComponents/shared/pqf-filter-options/pqf-filter-options.module';
import {PqfSearchModule} from '@appComponents/shared/pqf-search/pqf-search.module';

@NgModule({
  declarations: [FiltersComponent],
  imports: [
    CommonModule,
    DropDownWithImageModule,
    SearchModule,
    TranslateModule,
    PqfFilterOptionsModule,
    PqfSearchModule,
  ],
  exports: [FiltersComponent],
})
export class FiltersModule {}
