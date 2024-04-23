/*Core imports */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/*Selectors imports */
import {declareTransitArrivalSelectors} from '@appSelectors/pendings/imports-phs/declare-transit-arrival';

/*Utils imports*/
import {Location} from '@angular/common';

@Component({
  selector: 'app-declare-transit-arrival',
  templateUrl: './declare-transit-arrival.component.html',
  styleUrls: ['./declare-transit-arrival.component.scss'],
})
export class DeclareTransitArrivalComponent {
  isDetailsView$: Observable<boolean> = this.store.select(
    declareTransitArrivalSelectors.selectIsInDetailsView,
  );
  title$: Observable<string> = this.store.select(declareTransitArrivalSelectors.selectTitle);

  constructor(private store: Store, private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
