import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProviderListFiltersComponent} from '@appComponents/catalogos/providers/list-providers/provider-list-filters/provider-list-filters.component';
import {DropDownWithImageModule} from '@appComponents/shared/drop-down-with-image/drop-down-with-image.module';
import {SearchModule} from '@appComponents/shared/search/search.module';

@NgModule({
  declarations: [ProviderListFiltersComponent],
  exports: [ProviderListFiltersComponent],
  imports: [CommonModule, DropDownWithImageModule, SearchModule],
})
export class ProviderListFiltersModule {}
