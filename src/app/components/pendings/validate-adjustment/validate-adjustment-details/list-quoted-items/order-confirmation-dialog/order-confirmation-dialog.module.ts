import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderConfirmationDialogComponent} from './order-confirmation-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [OrderConfirmationDialogComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule],
})
export class OrderConfirmationDialogModule {}
