import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {priorityConsoleSelectors} from '@appSelectors/pendings/operations-manager';

@Component({
  selector: 'app-priority-console',
  templateUrl: './priority-console.component.html',
  styleUrls: ['./priority-console.component.scss'],
})
export class PriorityConsoleComponent {
  title$: Observable<string> = this.store.select(priorityConsoleSelectors.selectTitle);

  constructor(private store: Store<AppState>) {}
}
