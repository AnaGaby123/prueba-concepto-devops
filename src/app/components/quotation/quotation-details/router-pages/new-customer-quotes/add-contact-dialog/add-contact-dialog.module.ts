import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddContactDialogComponent} from './add-contact-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {CustomerContactQuotesModule} from '@appComponents/quotation/quotation-details/router-pages/customer-contact-quotes/customer-contact-quotes.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [AddContactDialogComponent],
  imports: [CommonModule, PopUpGenericModule, CustomerContactQuotesModule, TranslateModule],
})
export class AddContactDialogModule {}
