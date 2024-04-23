import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssociatedTrademarkItemComponent} from './associated-trademark-item.component';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {FamilyItemModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/trademark/associated-trademark-item/family-item/family-item.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [AssociatedTrademarkItemComponent],
  exports: [AssociatedTrademarkItemComponent],
  imports: [CommonModule, CheckBoxModule, FamilyItemModule, TranslateModule],
})
export class AssociatedTrademarkItemModule {}
