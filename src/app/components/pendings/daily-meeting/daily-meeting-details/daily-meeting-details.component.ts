import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {isEmpty} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  QUOTATION_DAILY_MEETING_BALANCED,
  QUOTATION_DAILY_MEETING_DEFENSIVE,
  QUOTATION_DAILY_MEETING_OFFENSIVE,
  QUOTATION_STRATEGY_TACTIC_1,
  RESPONSIVE_MENU_WIDTH_LIMIT,
  VIEW_IPAD,
  VIEW_MACBOOKAIR,
} from '@appUtil/common.protocols';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  dailyMeetingActions,
  dailyMeetingDetailsActions,
  dailyMeetingDetailsOfferDelinquentActions,
  dailyMeetingDetailsOfferDeliveryActions,
} from '@appActions/pendings/daily-meeting';
import {Observable} from 'rxjs';
import {
  IGeneralData,
  IQuotationStrategySubTactic,
  IQuotationStrategyTactic,
  ISubTactic,
  ITactic,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.model';
import {dailyMeetingDetailsSelectors} from '@appSelectors/pendings/daily-meeting';

@Component({
  selector: 'app-daily-meeting-details',
  templateUrl: './daily-meeting-details.component.html',
  styleUrls: ['./daily-meeting-details.component.scss'],
})
export class DailyMeetingDetailsComponent implements OnInit, OnDestroy {
  isLoadingQuotationStrategy$: Observable<number> = this.store.select(
    dailyMeetingDetailsSelectors.selectIsLoadingQuotationStrategy,
  );
  isValidStrategy$: Observable<boolean> = this.store.select(
    dailyMeetingDetailsSelectors.validateStrategy,
  );
  itemSelected$: Observable<DropListOption> = this.store.select(
    dailyMeetingDetailsSelectors.itemSelected,
  );
  listQuotationStrategyBackupSaleForValue$: Observable<string> = this.store.select(
    dailyMeetingDetailsSelectors.selectListQuotationTacticStrategyBackup,
  );
  listQuotationStrategyTactic$: Observable<Array<IQuotationStrategyTactic>> = this.store.select(
    dailyMeetingDetailsSelectors.selectListQuotationTacticStrategy,
  );
  optionsListQuotationStrategy$: Observable<Array<DropListOption>> = this.store.select(
    dailyMeetingDetailsSelectors.selectListQuotationStrategy,
  );
  totalPercentage$: Observable<number> = this.store.select(
    dailyMeetingDetailsSelectors.selectPercentageByClient,
  );
  userData$: Observable<IGeneralData> = this.store.select(
    dailyMeetingDetailsSelectors.selectUserData,
  );
  currency$: Observable<string> = this.store.select(dailyMeetingDetailsSelectors.selectCurrency);
  quotationDailyMeetingOffensive = QUOTATION_DAILY_MEETING_OFFENSIVE;
  quotationDailyMeetingBalanced = QUOTATION_DAILY_MEETING_BALANCED;
  quotationDailyMeetingDefensive = QUOTATION_DAILY_MEETING_DEFENSIVE;
  quotationStrategyTactic1 = QUOTATION_STRATEGY_TACTIC_1;
  viewIpad = VIEW_IPAD;
  viewMacBookAir = VIEW_MACBOOKAIR;
  modalIsOpenJustification = false;
  elementTarget: any = null;
  viewType: string;
  isSelectedText = false;
  textJustification = '';
  textObservation = '';
  popUpPercentageBarsTarget: HTMLElement;
  currentSelectedTactic: ITactic = {} as ITactic;
  currentSelectedSubTactic: ISubTactic = {} as ISubTactic;
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.onResize();
  }

  ngOnDestroy(): void {
    this.store.dispatch(dailyMeetingActions.SET_DETAILS_MODE({detailsMode: false}));
    this.store.dispatch(dailyMeetingDetailsOfferDelinquentActions.CLEAN_ALL_DELINQUENT());
    this.store.dispatch(dailyMeetingDetailsOfferDeliveryActions.CLEAN_ALL_DELIVERY());
    this.store.dispatch(dailyMeetingDetailsActions.CLEAN_ALL_DAILY_MEETING_DETAIL());
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewType =
      window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? this.viewIpad : this.viewMacBookAir;
  }

  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}): void {
    event.preventDefault();
    event.stopPropagation();
  }

  handleTrackByTactic(index: number, tactic: IQuotationStrategyTactic): string {
    return tactic.IdCatEstrategiaCotizacionTactica;
  }

  handleTrackBySubTactic(index: number, subTactic: IQuotationStrategySubTactic): string {
    return subTactic.IdCatEstrategiaCotizacionSubtactica;
  }

  changeQuotationStrategy(selectedOption: DropListOption): void {
    this.store.dispatch(dailyMeetingDetailsActions.SET_OPTION_STRATEGY({data: selectedOption}));
  }

  //DOCS: FUNCIÓN CUANDO SE ACTIVA O DESACTIVA UNA TACTICA
  changeQuotationStrategyTactic(value: boolean, tactic: IQuotationStrategyTactic, target): void {
    this.popUpPercentageBarsTarget = target;
    this.currentSelectedSubTactic = {} as ISubTactic;
    this.currentSelectedTactic = {value, tactic};

    //DOCS: EVALUA SI LA TACTICA ES "VENTA POR VALOR"
    if (
      value &&
      tactic.Tactica === this.quotationStrategyTactic1 &&
      tactic.listSubTactic.length > 0
    ) {
      this.textJustification = tactic.listSubTactic[0].ajOfQuotationStrategyTactic.Justificacion;
      this.textObservation = tactic.listSubTactic[0].ajOfQuotationStrategyTactic.Observaciones;
      this.activeJustification(target, this.textObservation !== '');
    } else {
      this.handleCloseModal();
      this.store.dispatch(
        dailyMeetingDetailsActions.SET_OPTION_STRATEGY_TACTIC({
          id: tactic.IdCatEstrategiaCotizacionTactica,
          value,
          textObservation: '',
        }),
      );
    }
  }

  //DOCS: FUNCIÓN CUANDO SE ACTIVA O DESACTIVA UNA SUBTACTICA
  changeQuotationStrategySubTactic(
    value: boolean,
    subTactic: IQuotationStrategySubTactic,
    isMultiSubTactic: boolean,
    target: HTMLElement,
  ): void {
    this.popUpPercentageBarsTarget = target;
    this.currentSelectedTactic = {} as ITactic;
    this.currentSelectedSubTactic = {value, subTactic, isMultiSubTactic};
    if (value) {
      this.textJustification = subTactic.ajOfQuotationStrategyTactic.Justificacion;
      this.textObservation = subTactic.ajOfQuotationStrategyTactic.Observaciones;
      this.activeJustification(target, this.textObservation !== '');
    } else {
      this.handleCloseModal();
      this.store.dispatch(
        dailyMeetingDetailsActions.SET_OPTION_STRATEGY_SUB_TACTIC({
          idTactic: subTactic.IdCatEstrategiaCotizacionTactica,
          idSubTactic: subTactic.IdCatEstrategiaCotizacionSubtactica,
          value,
          isMultiSubTactic,
          textObservation: '',
        }),
      );
    }
  }

  handleCloseModal(): void {
    this.currentSelectedTactic = {} as ITactic;
    this.currentSelectedSubTactic = {} as ISubTactic;
    this.modalIsOpenJustification = false;
    this.elementTarget = null;
  }

  //DOCS: AGREGAR OBSERVACIONES LAS SUBTACTICAS
  setObservationQuotationStrategy(): void {
    if (!isEmpty(this.currentSelectedTactic)) {
      this.store.dispatch(
        dailyMeetingDetailsActions.SET_OPTION_STRATEGY_TACTIC({
          id: this.currentSelectedTactic.tactic.IdCatEstrategiaCotizacionTactica,
          value: this.currentSelectedTactic.value,
          textObservation: this.textObservation,
        }),
      );
    } else if (!isEmpty(this.currentSelectedSubTactic)) {
      this.store.dispatch(
        dailyMeetingDetailsActions.SET_OPTION_STRATEGY_SUB_TACTIC({
          idTactic: this.currentSelectedSubTactic.subTactic.IdCatEstrategiaCotizacionTactica,
          idSubTactic: this.currentSelectedSubTactic.subTactic.IdCatEstrategiaCotizacionSubtactica,
          value: this.currentSelectedSubTactic.value,
          isMultiSubTactic: this.currentSelectedSubTactic.isMultiSubTactic,
          textObservation: this.textObservation,
        }),
      );
    }
    this.handleCloseModal();
  }

  //DOCS: ELIMINAR UNA OBSERVACIÓN EN UNA TACTICA (VENTA POR VALOR)
  handleRemoveObservationOnTactic(tactic: IQuotationStrategyTactic): void {
    this.store.dispatch(
      dailyMeetingDetailsActions.SET_OPTION_STRATEGY_TACTIC({
        id: tactic.IdCatEstrategiaCotizacionTactica,
        value: true,
        textObservation: '',
      }),
    );
  }

  //DOCS: ELIMINAR UNA OBSERVACIÓN EN UNA SUBTACTICA
  handleRemoveObservationOnSubTactic(
    subTactic: IQuotationStrategySubTactic,
    isMultiSubTactic: boolean,
  ): void {
    this.store.dispatch(
      dailyMeetingDetailsActions.SET_OPTION_STRATEGY_SUB_TACTIC({
        idTactic: subTactic.IdCatEstrategiaCotizacionTactica,
        idSubTactic: subTactic.IdCatEstrategiaCotizacionSubtactica,
        value: true,
        isMultiSubTactic,
        textObservation: '',
      }),
    );
  }

  activeJustification(target: any, selectedText: boolean): void {
    this.isSelectedText = selectedText;
    this.modalIsOpenJustification = true;
  }

  saveStrategy(): void {
    this.store.dispatch(dailyMeetingDetailsActions.SAVE_STRATEGY());
  }

  handleObservation(value: string): void {
    this.textObservation = value;
  }
}
