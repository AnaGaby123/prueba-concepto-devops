import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FamilyItemComponent} from './family-item.component';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';

@NgModule({
  declarations: [FamilyItemComponent],
  imports: [CommonModule, CheckBoxModule],
  exports: [FamilyItemComponent],
})
export class FamilyItemModule {}
