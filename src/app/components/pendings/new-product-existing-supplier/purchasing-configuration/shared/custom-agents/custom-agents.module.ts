import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomAgentsComponent} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/shared/custom-agents/custom-agents.component';
import {TranslateModule} from '@ngx-translate/core';
import {PqfDropDownListModule} from '@appComponents/shared/pqf-drop-down-list/pqf-drop-down-list.module';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';

@NgModule({
  declarations: [CustomAgentsComponent],
  imports: [CommonModule, TranslateModule, PqfDropDownListModule, PqfGenericInputModule],
  exports: [CustomAgentsComponent],
})
export class CustomAgentsModule {}
