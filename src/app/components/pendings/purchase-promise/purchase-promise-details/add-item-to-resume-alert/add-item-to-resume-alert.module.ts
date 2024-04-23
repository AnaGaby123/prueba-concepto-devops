import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddItemToResumeAlertComponent} from './add-item-to-resume-alert.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [AddItemToResumeAlertComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule],
})
export class AddItemToResumeAlertModule {}
