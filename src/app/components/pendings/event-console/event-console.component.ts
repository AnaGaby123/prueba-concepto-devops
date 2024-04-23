import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {eventConsoleSelectors} from '@appSelectors/pendings/event-console';

@Component({
  selector: 'app-event-console',
  templateUrl: './event-console.component.html',
  styleUrls: ['./event-console.component.scss'],
})
export class EventConsoleComponent {
  title$: Observable<string> = this.store.select(eventConsoleSelectors.selectTitle);

  constructor(private store: Store<AppState>) {}
}
