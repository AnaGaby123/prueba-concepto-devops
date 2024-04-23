import {NgModule} from '@angular/core';
import {BarActivitiesComponent} from './bar-activities.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [BarActivitiesComponent],
  declarations: [BarActivitiesComponent],
})
export class BarActivitiesModule {}
