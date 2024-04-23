import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImportComponent} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/shared/import/import.component';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ImportComponent],
  imports: [CommonModule, PqfGenericInputModule, TranslateModule],
  exports: [ImportComponent],
})
export class ImportModule {}
