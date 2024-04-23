import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlledDialogComponent} from './controlled-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ControlledDialogComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule],
})
export class ControlledDialogModule {}
