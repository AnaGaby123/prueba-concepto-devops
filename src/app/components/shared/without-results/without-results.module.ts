import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WithoutResultsComponent} from '@appComponents/shared/without-results/without-results.component';

@NgModule({
  declarations: [WithoutResultsComponent],
  imports: [CommonModule],
  exports: [WithoutResultsComponent],
})
export class WithoutResultsModule {}
