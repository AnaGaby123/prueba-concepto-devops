import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuarantineManagerDetailsComponent} from '@appComponents/pendings/resource-manager/quarantine-manager/quarantine-manager-details/quarantine-manager-details.component';
import {QuarantineManagerDetailsRoutingModule} from '@appComponents/pendings/resource-manager/quarantine-manager/quarantine-manager-details/quarantine-manager-details-routing.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';

@NgModule({
  declarations: [QuarantineManagerDetailsComponent],
  imports: [
    CommonModule,
    QuarantineManagerDetailsRoutingModule,
    DropDownListModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    RadioButtonModule,
    GenericTextAreaModule,
  ],
  exports: [QuarantineManagerDetailsComponent],
})
export class QuarantineManagerDetailsModule {}
