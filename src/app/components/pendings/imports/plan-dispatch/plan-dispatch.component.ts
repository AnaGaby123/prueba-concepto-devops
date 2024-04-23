/* Core Imports */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Selectors Imports */
import {planDispatchSelectors} from '@appSelectors/pendings/imports/plan-dispatch';
import {Location} from '@angular/common';

@Component({
  selector: 'app-plan-dispatch',
  templateUrl: './plan-dispatch.component.html',
  styleUrls: ['./plan-dispatch.component.scss'],
})
export class PlanDispatchComponent {
  isDetails$: Observable<boolean> = this.store.select(planDispatchSelectors.selectIsDetails);
  title$: Observable<string> = this.store.select(planDispatchSelectors.selectTitlePD);

  constructor(private store: Store, private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
