/* Core Imports */
import {select, Store} from '@ngrx/store';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {QUOTATION_SENT} from '@appUtil/common.protocols';

/* Imports Models */
import {AppState} from '@appCore/core.state';
import {
  IContactQuotation,
  IGeneralDataQuotation,
  IQuotation,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

import {ClientsListItemForQuotation} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
/* Actions Imports */
import {quotationActions, quotationDetailsActions} from '@appActions/quotation';
/* Selectors Imports */
import {quotationDetailsSelectors} from '@appSelectors/quotation';

/* Tools Imports */
import {toLower} from 'lodash-es';
import {selectNewClientName} from '@appSelectors/settings/settings.selectors';
import {getIncomeLevelImage} from '@appHelpers/shared/shared.helpers';
import {dropListMoneda, selectCatTipoCotizacion} from '@appSelectors/catalogs/catalogs.selectors';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-client-info-side-bar',
  templateUrl: './client-info-side-bar.component.html',
  styleUrls: ['./client-info-side-bar.component.scss'],
})
export class ClientInfoSideBarComponent {
  @ViewChild('imageElement') imageElement: ElementRef;
  @Input() isOpen: boolean;
  @Output() handleIsOpen: EventEmitter<void> = new EventEmitter<void>();
  selectedClient$: Observable<ClientsListItemForQuotation> = this.store.select(
    quotationDetailsSelectors.selectedClient,
  );
  selectNewClientName$: Observable<string> = this.store.select(selectNewClientName);
  quotationsListTotalResults$: Observable<number> = this.store.select(
    quotationDetailsSelectors.selectQuotationsListTotalResults,
  );
  contactSelected$: Observable<IContactQuotation> = this.store.select(
    quotationDetailsSelectors.selectContactSelected,
  );
  clientInfo$: Observable<IGeneralDataQuotation> = this.store.select(
    quotationDetailsSelectors.selectedQuotationClientInfoMapped,
  );
  optionsContact$: Observable<Array<DropListOption>> = this.store.select(
    quotationDetailsSelectors.selectOptionsContact,
  );
  optionContactSelected$: Observable<DropListOption> = this.store.select(
    quotationDetailsSelectors.selectOptionContactSelected,
  );
  quotationSent = QUOTATION_SENT;
  selectedQuotation$: Observable<IQuotation> = this.store.select(
    quotationDetailsSelectors.selectedQuotation,
  );
  stateQuotationSelected$: Observable<string> = this.store.select(
    quotationDetailsSelectors.selectStateQuotation,
  );
  investigationQuotation$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectInvestigationQuotation,
  );
  sendWithvestigationQuotation$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectISendWithnvestigationQuotation,
  );
  quotationCurrency$: Observable<DropListOption> = this.store.select(
    quotationDetailsSelectors.selectQuotationCurrencyDropListOption,
  );
  addressDelivery$: Observable<Array<DropListOption>> = this.store.select(
    quotationDetailsSelectors.selectAddressDelivery,
  );
  addressDeliverySelected$: Observable<DropListOption> = this.store.select(
    quotationDetailsSelectors.selectedAddressDeliveryDropList,
  );
  currencies$: Observable<Array<DropListOption>> = this.store.select(dropListMoneda);

  activeErrorAddress$: Observable<boolean> = this.store.select(
    quotationDetailsSelectors.selectActiveErrorAddress,
  );
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  imageNativeElement;
  errorImageNativeElement = false;
  lodashToLower = toLower;
  incomeLevelHelper = getIncomeLevelImage;

  constructor(private store: Store<AppState>, private renderer: Renderer2) {}

  onClick(): void {
    this.handleIsOpen.emit();
    if (!this.isOpen) {
      this.store.dispatch(quotationActions.SHOW_NAV_BAR({isCustomerNew: true}));
    } else {
      this.store.dispatch(quotationActions.SHOW_NAV_BAR({isCustomerNew: false}));
    }
  }

  handleOptionSelected(option: DropListOption): void {
    this.store.dispatch(quotationDetailsActions.SET_ID_CONTACT({idContact: option.value}));
  }
  async handleOptionDeliveryDirectionSelected(option: DropListOption): Promise<void> {
    const typesQuotations = await lastValueFrom(
      this.store.pipe(select(selectCatTipoCotizacion), take(1)),
    );
    this.store.dispatch(
      quotationDetailsActions.SET_DELIVERY_ADDRESS({deliveryAddress: option, typesQuotations}),
    );
  }
  handleCurrencySelected(option: DropListOption): void {
    this.store.dispatch(quotationDetailsActions.CHANGE_CURRENCY_QUOTATION({currency: option}));
  }

  setImage(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
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
