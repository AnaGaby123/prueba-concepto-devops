/* Core Imports */
import {Component, DoCheck, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {isEmpty, isEqual} from 'lodash-es';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IQuotationStrategySubTactic,
  IQuotationStrategyTactic,
  ISubTactic,
  ITactic,
} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';

/* Actions Imports */
import {strategyActions, strategyDetailsActions} from '@appActions/pendings/strategy';

/* Selectors Imports */
import {strategyDetailsSelectors} from '@appSelectors/pendings';

/* Tools Imports */
import {
  QUOTATION_STRATEGY_BALANCED,
  QUOTATION_STRATEGY_DEFENSIVE,
  QUOTATION_STRATEGY_OFFENSIVE,
  QUOTATION_STRATEGY_TACTIC_1,
  RESPONSIVE_MENU_WIDTH_LIMIT,
} from '@appUtil/common.protocols';
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {offerActions} from '@appActions/pendings/strategy/strategy-details/details';

@Component({
  selector: 'app-strategy-details',
  templateUrl: './strategy-details.component.html',
  styleUrls: ['./strategy-details.component.scss'],
})
export class StrategyDetailsComponent implements OnInit, DoCheck, OnDestroy {
  isLoadingQuotationStrategy$: Observable<boolean> = this.store.select(
    strategyDetailsSelectors.selectIsLoadingQuotationStrategy,
  );
  isValidStrategy$: Observable<boolean> = this.store.select(
    strategyDetailsSelectors.validateStrategy,
  );
  itemSelected$: Observable<DropListOption> = this.store.select(
    strategyDetailsSelectors.itemSelected,
  );
  listQuotationStrategyTactic$: Observable<Array<IQuotationStrategyTactic>> = this.store.select(
    strategyDetailsSelectors.selectListQuotationTacticStrategy,
  );
  optionsListQuotationStrategy$: Observable<Array<DropListOption>> = this.store.select(
    strategyDetailsSelectors.selectListQuotationStrategy,
  );
  totalAmountQuotes$: Observable<number> = this.store.select(
    strategyDetailsSelectors.selectTotalAmountQuotes,
  );
  currency$: Observable<string> = this.store.select(strategyDetailsSelectors.selectCurrency);
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  count = 0;
  currentSelectedSubTactic: ISubTactic = {} as ISubTactic;
  currentSelectedTactic: ITactic = {} as ITactic;
  dataPopUpConversion: {top: string; left: string} = {top: '0px', left: '0px'};
  elementTarget: any = null;
  elementTargetData: any;
  generalDataIsOpen = true;
  isOpen = true;
  isSelectedText = false;
  modalIsOpenJustification = false;
  popUpPercentageBarsTarget: HTMLElement;
  quotationStrategyBalanced = QUOTATION_STRATEGY_BALANCED;
  quotationStrategyDefensive = QUOTATION_STRATEGY_DEFENSIVE;
  quotationStrategyOffensive = QUOTATION_STRATEGY_OFFENSIVE;
  quotationStrategyTactic1 = QUOTATION_STRATEGY_TACTIC_1;
  textJustification = '';
  viewType: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.onResize();
  }

  ngOnDestroy(): void {
    this.store.dispatch(strategyActions.SET_DETAILS_MODE({detailsMode: false}));
    this.store.dispatch(offerActions.CLEAN_ALL_INFORMATION_DEFAULTER());
    this.store.dispatch(offerActions.CLEAN_ALL_DELIVERY());
    this.store.dispatch(strategyDetailsActions.CLEAN_ALL_STRATEGY_DETAIL());
  }

  ngDoCheck(): void {
    if (this.elementTarget) {
      this.sendInitialDataPopUpConversion(this.elementTarget);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewType = window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? 'iPad' : 'macBookAir';
  }

  handleGeneralData(): void {
    this.generalDataIsOpen = !this.generalDataIsOpen;
  }

  changeQuotationStrategy(selectedOption: DropListOption): void {
    this.store.dispatch(strategyDetailsActions.SET_OPTION_STRATEGY({data: selectedOption}));
  }

  changeQuotationStrategyTactic(value: boolean, tactic: IQuotationStrategyTactic, target): void {
    this.popUpPercentageBarsTarget = target;
    this.currentSelectedSubTactic = {} as ISubTactic;
    this.currentSelectedTactic = {value, tactic};
    if (
      value &&
      tactic.Tactica === this.quotationStrategyTactic1 &&
      tactic.listSubTactic.length > 0
    ) {
      this.textJustification = tactic.listSubTactic[0].ajOfQuotationStrategyTactic.Justificacion;
      this.activeJustification(
        target,
        tactic.listSubTactic[0].ajOfQuotationStrategyTactic.Justificacion !== '',
      );
    } else {
      this.handleCloseModal();
      this.store.dispatch(
        strategyDetailsActions.SET_OPTION_STRATEGY_TACTIC({
          id: tactic.IdCatEstrategiaCotizacionTactica,
          value,
          textJustification: '',
        }),
      );
    }
  }

  changeQuotationStrategySubTactic(
    value: boolean,
    subTactic: IQuotationStrategySubTactic,
    isMultiSubTactic: boolean,
    target,
  ): void {
    this.popUpPercentageBarsTarget = target;
    this.currentSelectedTactic = {} as ITactic;
    this.currentSelectedSubTactic = {value, subTactic, isMultiSubTactic};
    if (value) {
      this.textJustification = subTactic.ajOfQuotationStrategyTactic.Justificacion;
      this.activeJustification(target, subTactic.ajOfQuotationStrategyTactic.Justificacion !== '');
    } else {
      this.handleCloseModal();
      this.store.dispatch(
        strategyDetailsActions.SET_OPTION_STRATEGY_SUB_TACTIC({
          idTactic: subTactic.IdCatEstrategiaCotizacionTactica,
          idSubTactic: subTactic.IdCatEstrategiaCotizacionSubtactica,
          value,
          isMultiSubTactic,
          textJustification: '',
        }),
      );
    }
  }

  setJustificationQuotationStrategy(): void {
    if (!isEmpty(this.currentSelectedTactic)) {
      this.store.dispatch(
        strategyDetailsActions.SET_OPTION_STRATEGY_TACTIC({
          id: this.currentSelectedTactic.tactic.IdCatEstrategiaCotizacionTactica,
          value: this.currentSelectedTactic.value,
          textJustification: this.textJustification,
        }),
      );
    } else if (!isEmpty(this.currentSelectedSubTactic)) {
      this.store.dispatch(
        strategyDetailsActions.SET_OPTION_STRATEGY_SUB_TACTIC({
          idTactic: this.currentSelectedSubTactic.subTactic.IdCatEstrategiaCotizacionTactica,
          idSubTactic: this.currentSelectedSubTactic.subTactic.IdCatEstrategiaCotizacionSubtactica,
          value: this.currentSelectedSubTactic.value,
          isMultiSubTactic: this.currentSelectedSubTactic.isMultiSubTactic,
          textJustification: this.textJustification,
        }),
      );
    }
    this.handleCloseModal();
  }

  saveStrategy(): void {
    this.store.dispatch(strategyDetailsActions.SAVE_STRATEGY());
  }

  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}): void {
    event.preventDefault();
    event.stopPropagation();
  }

  activeJustification(target: any, selectedText: boolean): void {
    this.isSelectedText = selectedText;
    this.sendInitialDataPopUpConversion(target);
  }

  handleCloseModal(): void {
    this.currentSelectedTactic = {} as ITactic;
    this.currentSelectedSubTactic = {} as ISubTactic;
    this.modalIsOpenJustification = false;
    this.elementTarget = null;
  }

  sendInitialDataPopUpConversion(target): void {
    this.elementTarget = target;
    if (this.elementTarget) {
      const {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
      } = this.elementTarget.getBoundingClientRect();
      const dataTargetCurrent = {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
      };
      if (!isEqual(dataTargetCurrent, this.elementTargetData)) {
        this.elementTargetData = {...dataTargetCurrent};
        this.count = 0;
      } else {
        this.count++;
        if (this.count >= 2) {
          this.count = 0;
          const dataPopUp: DOMRect = this.elementTargetData;
          this.elementTargetData.width !== 0
            ? (this.modalIsOpenJustification = true)
            : (this.modalIsOpenJustification = false);
          let popUpTop;
          let popUpLeft;

          if (this.viewType === 'iPad') {
            popUpTop = dataPopUp.top - 180;
            popUpLeft = dataPopUp.left - (470 + (!this.isSelectedText ? 35 : 10));
          } else {
            popUpTop = dataPopUp.top - 219;
            popUpLeft = dataPopUp.left - (1130 + (!this.isSelectedText ? 35 : 10));
          }

          this.dataPopUpConversion = {
            top: `${popUpTop}px`,
            left: `${popUpLeft}px`,
          };
        }
      }
    }
  }

  handleTrackByTactic(index: number, tactic: IQuotationStrategyTactic): string {
    return tactic.IdCatEstrategiaCotizacionTactica;
  }

  handleTrackBySubTactic(index: number, subTactic: IQuotationStrategySubTactic): string {
    return subTactic.IdCatEstrategiaCotizacionSubtactica;
  }

  handleObservation(value: string): void {
    this.textJustification = value;
  }
}
