import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestAuthCodeDialogComponent} from './request-auth-code-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {ClientDataModule} from '@appComponents/shared/request-auth-code-dialog/client-data/client-data.module';

@NgModule({
  declarations: [RequestAuthCodeDialogComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule, ClientDataModule],
})
export class RequestAuthCodeDialogModule {}
