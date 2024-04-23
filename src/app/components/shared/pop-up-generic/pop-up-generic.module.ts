import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PopUpGenericComponent} from '@appComponents/shared/pop-up-generic/pop-up-generic.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [PopUpGenericComponent],
  declarations: [PopUpGenericComponent],
})
export class PopUpGenericModule {}
