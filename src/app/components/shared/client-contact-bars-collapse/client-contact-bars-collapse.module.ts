import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientContactBarsCollapseComponent} from '@appComponents/shared/client-contact-bars-collapse/client-contact-bars-collapse.component';
import {ClientsContactModule} from '@appComponents/shared/clients-contact/clients-contact.module';
import {ProgressBarDetailsModule} from '@appComponents/shared/progress-bar-details/progress-bar-details.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ClientContactBarsCollapseComponent],
  exports: [ClientContactBarsCollapseComponent],
  imports: [CommonModule, ClientsContactModule, ProgressBarDetailsModule, TranslateModule],
})
export class ClientContactBarsCollapseModule {}
