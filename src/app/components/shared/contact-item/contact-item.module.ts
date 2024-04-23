import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactItemComponent} from '@appComponents/shared/contact-item/contact-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ContactItemComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ContactItemComponent],
})
export class ContactItemModule {}
