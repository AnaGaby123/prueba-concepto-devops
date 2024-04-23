/* Core Imports */
import {NgModule} from '@angular/core';

/* Common Imports */
import {CommonModule} from '@angular/common';

/* Components Imports */
import {ChipFileComponent} from '@appComponents/shared/chip-file/chip-file.component';

@NgModule({
  declarations: [ChipFileComponent],
  imports: [CommonModule],
  exports: [ChipFileComponent],
})
export class ChipFileModule {}
