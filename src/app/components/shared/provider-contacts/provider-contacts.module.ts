import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProviderContactsComponent} from '@appComponents/shared/provider-contacts/provider-contacts.component';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ProviderContactsComponent],
  exports: [ProviderContactsComponent],
  imports: [CommonModule, DropDownListModule, TranslateModule],
})
export class ProviderContactsModule {}
