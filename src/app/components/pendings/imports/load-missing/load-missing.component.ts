/* Core Imports */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Selectors Imports */
import {loadMissingSelectors} from '@appSelectors/pendings/imports/load-missing';

@Component({
  selector: 'app-load-missing',
  templateUrl: './load-missing.component.html',
  styleUrls: ['./load-missing.component.scss'],
})
export class LoadMissingComponent {
  isDetails$: Observable<boolean> = this.store.select(loadMissingSelectors.selectIsDetails);
  title$: Observable<string> = this.store.select(loadMissingSelectors.selectTitleLM);

  constructor(private store: Store) {}
}
