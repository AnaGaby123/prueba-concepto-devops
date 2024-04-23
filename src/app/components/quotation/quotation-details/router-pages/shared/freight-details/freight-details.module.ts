import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FreightDetailsComponent} from '@appComponents/quotation/quotation-details/router-pages/shared/freight-details/freight-details.component';
import {TranslateModule} from '@ngx-translate/core';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';

@NgModule({
  declarations: [FreightDetailsComponent],
  imports: [CommonModule, TranslateModule, CheckBoxModule, PopUpGenericModule],
  exports: [FreightDetailsComponent, FreightDetailsComponent],
})
export class FreightDetailsModule {}
