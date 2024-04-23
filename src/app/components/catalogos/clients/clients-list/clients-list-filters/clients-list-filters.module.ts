import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsListFiltersComponent} from '@appComponents/catalogos/clients/clients-list/clients-list-filters/clients-list-filters.component';
import {DropDownWithImageModule} from '@appComponents/shared/drop-down-with-image/drop-down-with-image.module';
import {SearchModule} from '@appComponents/shared/search/search.module';

@NgModule({
  declarations: [ClientsListFiltersComponent],
  imports: [CommonModule, DropDownWithImageModule, SearchModule],
  exports: [ClientsListFiltersComponent],
})
export class ClientsListFiltersModule {}
