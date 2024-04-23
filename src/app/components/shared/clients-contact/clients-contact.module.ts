import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsContactComponent} from '@appComponents/shared/clients-contact/clients-contact.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ClientsContactComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ClientsContactComponent],
})
export class ClientsContactModule {}
