import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {debounce, isEmpty} from 'lodash-es';
import {Observable} from 'rxjs';
import {
  IFamilyCharacteristicGroupers,
  IVClasificacionProductoMarcaCliente,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import {
  FIXED_FACTORR,
  LevelConfigurationOption,
  SubTabOptions,
  UTILITY,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-characteristic-grouper',
  templateUrl: './characteristic-grouper.component.html',
  styleUrls: ['./characteristic-grouper.component.scss'],
})
export class CharacteristicGrouperComponent {
  @Input() activateCancelConfigButton = false;
  @Input() activateSaveConfigButton = false;
  @Input() actualConfiguration = null;
  @Input() clientIncomeLevel = null;
  @Input() isMexican: boolean;
  @Input() selectedSubConfigOption = null;
  @Input() selectedTabConfiguration: LevelConfigurationOption = null;
  @Input() subConfigurationTabs: Array<OptionBar>;
  @Input() viewType = null;
  @Output() emitSelectedSubConfigOption: EventEmitter<OptionBar> = new EventEmitter<OptionBar>();
  characteristicGroupers$: Observable<IFamilyCharacteristicGroupers> = this.store.select(
    clientContractsSelectors.selectCharacteristicGrouperSectionConfiguration,
  );
  classificationsResults$: Observable<
    Array<IVClasificacionProductoMarcaCliente>
  > = this.store.select(clientContractsSelectors.selectCharacteristicGrouperResults);

  classificationsSearchTerm$: Observable<string> = this.store.select(
    clientContractsSelectors.selectClassificationsSearchTerm,
  );
  showSubConfigSection$: Observable<boolean> = this.store.select(
    clientContractsSelectors.showSubConfigClassification,
  );
  hasCharacteristicGrouper$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectedFamilyHasCharacteristicGrouper,
  );
  classificationsResults: Array<IVClasificacionProductoMarcaCliente>;
  handleSetSearchTerm = debounce(this.setListOfTabConfigSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  lodashIsEmpty = isEmpty;
  readonly subTabs = SubTabOptions;
  readonly FIELD_UTILITY = UTILITY;
  readonly FIELD_FIXED_FACTOR = FIXED_FACTORR;

  constructor(private store: Store<AppState>) {}

  fetchMoreCharacteristicGroupers(event: IPageInfo): void {
    this.store.dispatch(contractActions.FETCH_MORE_CLASSIFICATIONS_COMPONENT_EFFECT({event}));
  }

  setListOfTabConfigSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      contractActions.SET_CHARACTERISTIC_GROUPER_LIST_SEARCH_TERM({
        searchTerm,
      }),
    );
  }

  discardChanges(): void {
    this.store.dispatch(contractActions.IS_CANCEL_POP_OPEN({value: true}));
  }

  saveConfiguration(): void {
    this.store.dispatch(contractActions.SAVE_CONFIGURATION_LOAD());
  }

  emitOption(option: OptionBar) {
    this.emitSelectedSubConfigOption.emit(option);
  }

  openConfiguration(classification: IVClasificacionProductoMarcaCliente): void {
    if (!classification.isSelected) {
      this.store.dispatch(
        contractActions.SET_CONTRACT_CLASSIFICATION({
          classification: classification,
        }),
      );
    }
  }

  saveInputValue(field: string, value: any): void {
    this.store.dispatch(
      contractActions.SAVE_INPUT_VALUE_COMPONENT_EFFECT({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }

  handleTrackByCharacteristicGrouper(
    index: number,
    item: IVClasificacionProductoMarcaCliente,
  ): string {
    return item.IdAgrupadorCaracteristica;
  }
}
