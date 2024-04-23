import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntramitableDialogComponent} from './intramitable-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [IntramitableDialogComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule],
})
export class IntramitableDialogModule {}
