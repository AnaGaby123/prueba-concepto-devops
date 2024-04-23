import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from '@appComponents/catalogos/customs-agents/footer/footer.component';
import {TranslateModule} from '@ngx-translate/core';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, TranslateModule, PopUpGenericModule],
  exports: [FooterComponent],
})
export class FooterModule {}
