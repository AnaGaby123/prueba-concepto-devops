/*Core imports*/
import {AppState} from '@appCore/core.state';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';

/*Store import */
import {Store} from '@ngrx/store';

/*Selectors Imports*/
import {changeNoticesSelectors} from '@appSelectors/pendings/change-notices';

@Component({
  selector: 'app-change-notices',
  templateUrl: './change-notices.component.html',
  styleUrls: ['./change-notices.component.scss'],
})
export class ChangeNoticesComponent {
  title$: Observable<string> = this.store.select(changeNoticesSelectors.selectChangeNoticesTitle);
  isDetails$: Observable<boolean> = this.store.select(changeNoticesSelectors.selectIsDetails);

  constructor(private store: Store<AppState>) {}
}
