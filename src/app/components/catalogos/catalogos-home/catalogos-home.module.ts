import {NgModule} from '@angular/core';
import {CatalogosHomeComponent} from '@appComponents/catalogos/catalogos-home/catalogos-home.component';
import {CommonModule} from '@angular/common';
import {CatalogosRoutingModule} from '@appComponents/catalogos/catalogos-home/catalogos-routing.module';
import {StoreModule} from '@ngrx/store';
import {FORMS_FEATURE_KEY} from '@appUtil/common.protocols';

@NgModule({
  imports: [CatalogosRoutingModule, CommonModule, StoreModule.forFeature(FORMS_FEATURE_KEY, {})],
  exports: [CatalogosHomeComponent],
  declarations: [CatalogosHomeComponent],
  providers: [],
})
export class CatalogosHomeModule {}
