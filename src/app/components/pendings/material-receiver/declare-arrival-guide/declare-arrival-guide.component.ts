import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {declareArrivalGuideSelector} from '@appSelectors/pendings/material-receiver/declare-arrival-guide';

@Component({
  selector: 'app-declare-arrival-guide',
  templateUrl: './declare-arrival-guide.component.html',
  styleUrls: ['./declare-arrival-guide.component.scss'],
})
export class DeclareArrivalGuideComponent {
  title$: Observable<string> = this.store.select(declareArrivalGuideSelector.selectTitle);
  isDetails$: Observable<boolean> = this.store.select(declareArrivalGuideSelector.selectIsDetails);

  constructor(private store: Store, private router: Router) {}
}
