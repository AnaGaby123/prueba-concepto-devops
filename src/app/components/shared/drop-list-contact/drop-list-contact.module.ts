import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropListContactComponent} from '@appComponents/shared/drop-list-contact/drop-list-contact.component';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';

@NgModule({
  imports: [CommonModule, CheckBoxModule],
  exports: [DropListContactComponent],
  declarations: [DropListContactComponent],
})
export class DropListContactModule {}
