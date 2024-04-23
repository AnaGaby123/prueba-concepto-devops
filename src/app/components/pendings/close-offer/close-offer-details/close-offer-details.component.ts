import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

// Models
import {ClientsListItemForCloseOffer} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {
  IBrandWithContract,
  IGeneralDataStrategyRead,
  IQuotationStrategySubTactic,
} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  CustomerDetails,
  IQuotation,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';

// Actions
import {closeOfferDetailsActions} from '@appActions/pendings/close-offer';

// Selectors
import {closeOfferDetailsSelector} from '@appSelectors/pendings/close-offer';

// Utils
import {isEmpty, map as _map, toLower} from 'lodash-es';
import {Observable} from 'rxjs';
import {
  QUOTATION_STRATEGY_BALANCED,
  QUOTATION_STRATEGY_DEFENSIVE,
  QUOTATION_STRATEGY_OFFENSIVE,
  RESPONSIVE_MENU_WIDTH_LIMIT,
} from '@appUtil/common.protocols';
import {getIncomeLevelImage} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-close-offer-details',
  templateUrl: './close-offer-details.component.html',
  styleUrls: ['./close-offer-details.component.scss'],
})
export class CloseOfferDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('imageElement') imageElement: ElementRef;
  lodashToLower = toLower;
  lodashIsEmpty = isEmpty;
  leftContainerIsOpen = false;
  viewType = 'iPad';
  paymentConditionsTarget: Array<HTMLElement> = [];
  priceTarget: HTMLElement = null;
  deliveryTarget: HTMLElement = null;
  salesTarget: HTMLElement = null;
  paymentConditionsPop: Array<boolean> = [false, false];
  paymentZIndex: Array<number> = [3, 3];
  pricePop = false;
  deliveryPop = false;
  salesPop = false;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  errorImageNativeElement = false;
  imageNativeElement;
  incomeLevelHelper = getIncomeLevelImage;

  quote$: Observable<IQuotation> = this.store.select(closeOfferDetailsSelector.selectedQuote);
  client$: Observable<ClientsListItemForCloseOffer> = this.store.select(
    closeOfferDetailsSelector.selectClient,
  );
  clientData$: Observable<CustomerDetails> = this.store.select(
    closeOfferDetailsSelector.selectDataClient,
  );
  generalData$: Observable<IGeneralDataStrategyRead> = this.store.select(
    closeOfferDetailsSelector.selectGeneralDataObject,
  );
  listBrands$: Observable<Array<IBrandWithContract>> = this.store.select(
    closeOfferDetailsSelector.selectListBrands,
  );
  isLoadingBrands$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectIsLoadingBrands,
  );
  clientPanelIsOpen$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectClientPanelIsOpen,
  );
  itemSelected$: Observable<DropListOption> = this.store.select(
    closeOfferDetailsSelector.itemSelected,
  );
  tacticPrice$: Observable<IQuotationStrategySubTactic> = this.store.select(
    closeOfferDetailsSelector.selectPriceTactic,
  );
  deliveryTimeTactic$: Observable<IQuotationStrategySubTactic> = this.store.select(
    closeOfferDetailsSelector.selectDeliveryTimeTactic,
  );
  paymenConditions$: Observable<Array<IQuotationStrategySubTactic>> = this.store.select(
    closeOfferDetailsSelector.selectPaymentConditions,
  );
  saleForValue$: Observable<IQuotationStrategySubTactic> = this.store.select(
    closeOfferDetailsSelector.selectSaleForValueTactic,
  );
  quoteInProgress$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectQuoteIsInProgress,
  );
  quoteInAdjustment$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectQuoteIsInAdjustment,
  );
  dateOfStrategy$: Observable<string> = this.store.select(
    closeOfferDetailsSelector.selectDateOfStrategy,
  );

  scrolledBrands: Array<IBrandWithContract>;
  quotationStrategyOffensive = QUOTATION_STRATEGY_OFFENSIVE;
  quotationStrategyBalanced = QUOTATION_STRATEGY_BALANCED;
  quotationStrategyDefensive = QUOTATION_STRATEGY_DEFENSIVE;

  @HostListener('window:resize')
  onResize(): void {
    this.viewType = window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? 'iPad' : 'macBookAir';
  }

  constructor(
    private router: Router,
    private store: Store,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.onResize();
    this.fetchGeneralData();
    this.leftContainerIsOpen = this.viewType !== 'iPad';
  }

  ngOnDestroy(): void {
    this.store.dispatch(closeOfferDetailsActions.CLEAN_ALL_CLOSE_OFFER_DETAIL());
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  handleLeftContainer(): void {
    this.leftContainerIsOpen = !this.leftContainerIsOpen;
    this.store.dispatch(
      closeOfferDetailsActions.SET_CLIENT_PANEL_IS_OPEN({
        sendValue: false,
      }),
    );
  }

  handlePopUp(pop: string, value: boolean, target: any, index = 0): void {
    const popsSwitch = {
      payment: () => {
        this.paymentConditionsPop[index] = value;
        this.paymentConditionsPop = _map(this.paymentConditionsPop, (o: boolean, i) => {
          if (i === index) {
            return value;
          }
          return o;
        });
        this.paymentConditionsTarget[index] = target as HTMLElement;
        this.paymentZIndex.forEach((item, i) => {
          if (index === i) {
            this.paymentZIndex[i] = 5;
          } else {
            this.paymentZIndex[i] = 3;
          }
        });
        this.pricePop = false;
        this.deliveryPop = false;
        this.salesPop = false;
      },
      price: () => {
        (this.pricePop = value), (this.priceTarget = target as HTMLElement);
        this.deliveryPop = false;
        this.salesPop = false;
        this.paymentConditionsPop = _map(this.paymentConditionsPop, () => false);
      },
      delivery: () => {
        (this.deliveryPop = value), (this.deliveryTarget = target as HTMLElement);
        this.pricePop = false;
        this.salesPop = false;
        this.paymentConditionsPop = _map(this.paymentConditionsPop, () => false);
      },
      salesValue: () => {
        (this.salesPop = value), (this.salesTarget = target as HTMLElement);
        this.pricePop = false;
        this.deliveryPop = false;
        this.paymentConditionsPop = _map(this.paymentConditionsPop, () => false);
      },
    };
    const result = popsSwitch[pop]();
  }

  fetchGeneralData(): void {
    this.store.dispatch(closeOfferDetailsActions.FETCH_GENERAL_DATA_CLIENT());
  }
  setImage(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    this.errorImageNativeElement = false;
    return this.defaultImageSource;
  }
  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }
}
