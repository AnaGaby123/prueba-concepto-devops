/*Core imports*/
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

/*Selectors Imports*/
import {declareArrivalSelectors} from '@appSelectors/pendings/purchasing-manager/declare-arrival';

import {Location} from '@angular/common';

@Component({
  selector: 'app-declare-arrival',
  templateUrl: './declare-arrival.component.html',
  styleUrls: ['./declare-arrival.component.scss'],
})
export class DeclareArrivalComponent {
  isDetails$: Observable<boolean> = this.store.select(declareArrivalSelectors.selectIsDetails);
  title$: Observable<string> = this.store.select(declareArrivalSelectors.selectTitle);

  constructor(private store: Store<AppState>, private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
