import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
})
export class Step3Component {
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);

  constructor(private store: Store) {}
}
