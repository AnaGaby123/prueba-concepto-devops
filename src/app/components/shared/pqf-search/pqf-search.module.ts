import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfSearchComponent} from '@appComponents/shared/pqf-search/pqf-search.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [PqfSearchComponent],
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [PqfSearchComponent],
})
export class PqfSearchModule {}
