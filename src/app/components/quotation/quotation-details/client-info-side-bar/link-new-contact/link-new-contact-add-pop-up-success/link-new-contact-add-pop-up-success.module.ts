import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkNewContactAddPopUpSuccessComponent} from './link-new-contact-add-pop-up-success.component';
import {PqfGenericPopUpModule} from '@appComponents/shared/pqf-generic-pop-up/pqf-generic-pop-up.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';

@NgModule({
  declarations: [LinkNewContactAddPopUpSuccessComponent],
  imports: [CommonModule, PqfGenericPopUpModule, PopUpGenericModule],
  exports: [LinkNewContactAddPopUpSuccessComponent],
})
export class LinkNewContactAddPopUpSuccessModule {}
