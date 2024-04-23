import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProviderAddressComponent} from './provider-address.component';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {SearchModule} from '@appComponents/shared/search/search.module';

@NgModule({
  declarations: [ProviderAddressComponent],
  imports: [CommonModule, GenericInputModule, TranslateModule, DropDownListModule, SearchModule],
  exports: [ProviderAddressComponent],
})
export class ProviderAddressModule {}
