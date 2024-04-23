import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkNewContactPopUpComponent} from './link-new-contact-pop-up.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [LinkNewContactPopUpComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule],
  exports: [LinkNewContactPopUpComponent],
})
export class LinkNewContactPopUpModule {}
