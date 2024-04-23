import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardWithToggleComponent} from '@appComponents/catalogos/brands/brands-details/card-with-toggle/card-with-toggle.component';
import {PqfToggleModule} from '@appComponents/shared/pqf-toggle/pqf-toggle.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [CardWithToggleComponent],
  imports: [CommonModule, PqfToggleModule, TranslateModule],
  exports: [CardWithToggleComponent],
})
export class CardWithToggleModule {}
