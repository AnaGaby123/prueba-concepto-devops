import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {PlanCollectionContactComponent} from './plan-collection-contact.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, GenericInputModule, TranslateModule, DropDownListModule, CheckBoxModule],
  exports: [PlanCollectionContactComponent],
  declarations: [PlanCollectionContactComponent],
})
export class PlanCollectionContactModule {}
