import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlledProductsConfirmationDialogComponent} from './controlled-products-confirmation-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ControlledProductsConfirmationDialogComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule],
})
export class ControlledProductsConfirmationDialogModule {}
