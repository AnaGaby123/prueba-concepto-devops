import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfToggleComponent} from '@appComponents/shared/pqf-toggle/pqf-toggle.component';

@NgModule({
  declarations: [PqfToggleComponent],
  imports: [CommonModule],
  exports: [PqfToggleComponent],
})
export class PqfToggleModule {}
