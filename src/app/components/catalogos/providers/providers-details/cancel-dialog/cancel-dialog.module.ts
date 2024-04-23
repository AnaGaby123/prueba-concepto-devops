import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CancelDialogComponent} from './cancel-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [CancelDialogComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule],
})
export class CancelDialogModule {}
