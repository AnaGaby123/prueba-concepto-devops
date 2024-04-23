import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddProductDialogComponent} from './add-product-dialog.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [AddProductDialogComponent],
  imports: [CommonModule, PopUpGenericModule, TranslateModule],
})
export class AddProductDialogModule {}
