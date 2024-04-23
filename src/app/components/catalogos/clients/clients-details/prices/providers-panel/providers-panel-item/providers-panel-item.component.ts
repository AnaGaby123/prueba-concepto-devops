// CORE
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
// MODELS
import {IVProviderResume} from '@appModels/store/forms/clients-form/clients-details-form/prices/prices-clients-form.models';
// SELECTORS
import {clientPricesSelectors} from '@appSelectors/forms/clients-form';

@Component({
  selector: 'app-providers-panel-item',
  templateUrl: './providers-panel-item.component.html',
  styleUrls: ['./providers-panel-item.component.scss'],
})
export class ProvidersPanelItemComponent {
  @Input() provider: IVProviderResume;
  @Output() selectedProviderChange: EventEmitter<IVProviderResume> = new EventEmitter<
    IVProviderResume
  >();
  selectedProvider$: Observable<IVProviderResume> = this.store.select(
    clientPricesSelectors.selectedProvider,
  );

  constructor(private store: Store<AppState>) {}

  handleSelectedProviderChange(): void {
    this.selectedProviderChange.emit(this.provider);
  }
}
