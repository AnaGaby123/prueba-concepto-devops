import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntramitableAlertComponent} from './intramitable-alert.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [IntramitableAlertComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule],
})
export class IntramitableAlertModule {}
