import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OptionBar} from '@appModels/options-bar/options-bar';
import {
  FIXED_FACTORR,
  SubTabOptions,
  UTILITY,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {IConfContratoCliente} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';

@Component({
  selector: 'app-generals',
  templateUrl: './generals.component.html',
  styleUrls: ['./generals.component.scss'],
})
export class GeneralsComponent implements OnInit {
  @Input() activateCancelConfigButton = false;
  @Input() activateSaveConfigButton = false;
  @Input() selectedSubConfigOption = null;
  @Input() actualConfiguration: IConfContratoCliente;
  @Input() isMexican: boolean;
  @Input() subConfigurationTabs: Array<OptionBar>;
  @Input() viewType = null;
  @Output() emitSelectedSubConfigOption: EventEmitter<OptionBar> = new EventEmitter<OptionBar>();
  readonly FIELD_UTILITY = UTILITY;
  readonly FIELD_FIXED_FACTOR = FIXED_FACTORR;
  readonly subTabs = SubTabOptions;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  emitOption(option: OptionBar) {
    this.emitSelectedSubConfigOption.emit(option);
  }

  saveInputValue(field: string, value: any): void {
    this.store.dispatch(
      contractActions.SAVE_INPUT_VALUE_COMPONENT_EFFECT({
        field,
        value: value === '' ? null : Number(value),
      }),
    );
  }

  saveConfiguration(): void {
    this.store.dispatch(contractActions.SAVE_CONFIGURATION_LOAD());
  }

  discardChanges(): void {
    this.store.dispatch(contractActions.IS_CANCEL_POP_OPEN({value: true}));
  }
}
