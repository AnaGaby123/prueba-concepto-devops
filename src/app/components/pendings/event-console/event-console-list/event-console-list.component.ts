import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {eventConsoleListSelectors} from '@appSelectors/pendings/event-console';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

@Component({
  selector: 'app-event-console-list',
  templateUrl: './event-console-list.component.html',
  styleUrls: ['./event-console-list.component.scss'],
})
export class EventConsoleListComponent {
  tabs$: Observable<Array<ITabOption>> = this.store.select(
    eventConsoleListSelectors.selectOptionsTabs,
  );
  optionsFRR$: Observable<Array<DropListOption>> = this.store.select(
    eventConsoleListSelectors.selectOptionsOrderFEE,
  );
  optionsPriority$: Observable<Array<DropListOption>> = this.store.select(
    eventConsoleListSelectors.selectOptionsPriority,
  );
  selectedTab$: Observable<ITabOption> = this.store.select(eventConsoleListSelectors.selectTab);

  activeAdd = false;

  constructor(private store: Store<AppState>) {}

  popUpAdd(value: boolean): void {
    this.activeAdd = value;
  }
}
