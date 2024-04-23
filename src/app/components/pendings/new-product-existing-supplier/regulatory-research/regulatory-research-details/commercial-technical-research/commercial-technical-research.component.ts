import {Component} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {
  regulatoryResearchDetailsSelectors,
  regulatoryResearchSelectors,
} from '@appSelectors/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-index';
import {AppState} from '@appCore/core.state';
import {select, Store} from '@ngrx/store';
import {Producto, VProductoDetalle, VProductoSuplementario} from 'api-catalogos';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {
  CHANGE_NODE_DETAILS,
  SET_CHANGE_INPUT_PROPERTY_PRODUCT_DETAILS,
  SET_CHANGE_SELECT_PROPERTY_PRODUCT,
} from '@appActions/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.actions';
import {take} from 'rxjs/operators';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {
  currentDateWithHoursInZeroUTCFormatDate,
  currentDateWithoutHoursUTCFormatDate,
  dateWithHoursFormatDate,
} from '@appUtil/dates';
import {regulatoryResearchDetailsActions} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {getOnlyFileName} from '@appUtil/files';
import {ISupplements} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';
import {isEmpty} from 'lodash-es';

@Component({
  selector: 'app-commercial-technical-research',
  templateUrl: 'commercial-technical-research.component.html',
  styleUrls: ['commercial-technical-research.component.scss'],
})
export class CommercialTechnicalResearchComponent {
  readonly inputValidators = InputValidators;
  rangeStart = currentDateWithoutHoursUTCFormatDate();
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  enableEdit$: Observable<boolean> = this.store.select(
    regulatoryResearchSelectors.selectEnableEdit,
  );
  selectValidCas$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.selectValidCas,
  );
  selectUnidadList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectUnidadList,
  );
  selectUnidad$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectUnidad,
  );
  providerBuyCurrency$: Observable<string> = this.store.select(
    regulatoryResearchDetailsSelectors.selectProviderBuyCurrency,
  );

  selectProductDetails$: Observable<VProductoDetalle> = this.store.select(
    regulatoryResearchSelectors.selectProductDetails,
  );
  nameFileStructureMolecular$: Observable<string> = this.store.select(
    regulatoryResearchSelectors.nameFileStructureMolecular,
  );

  selectPurchaseRestrictionList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectPurchaseRestrictionList,
  );

  selectPurchaseRestriction$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectPurchaseRestriction,
  );

  selectAvaibleList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectAvaibleList,
  );

  selectedAvaible$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectedAvaible,
  );
  selectGroupCharacteristicList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectGroupCharacteristicList,
  );
  selectedAvailabilityIsBackOrder$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.selectAvailabilityIsBackOrder,
  );

  selectGroupCharacteristic$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectGroupCharacteristic,
  );
  selectFechaCaducidadVigenciaCuraduria$: Observable<Date | null> = this.store.select(
    regulatoryResearchSelectors.selectFechaCaducidadVigenciaCuraduria,
  );
  backOrderAvailabilityDate$: Observable<Date> = this.store.select(
    regulatoryResearchSelectors.selectBackOrderAvailabilityDate,
  );
  selectFechaCaducidadRegistroSanitario$: Observable<Date | null> = this.store.select(
    regulatoryResearchSelectors.selectFechaCaducidadRegistroSanitario,
  );
  nodeTypeProductDetails$: Observable<any> = this.store.select(
    regulatoryResearchDetailsSelectors.nodeTypeProductDetails,
  );

  selectProductOnDetails$: Observable<Producto> = this.store.select(
    regulatoryResearchSelectors.selectProductOnDetails,
  );

  selectCatCatClasificationList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectCatCatClasificationList,
  );
  selectCatCatClasification$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectCatCatClasification,
  );

  selectBrandFamily$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectedBrandFamily,
  );

  selecTypeProduct$: Observable<string> = this.store.select(
    regulatoryResearchDetailsSelectors.selectTypeProduct,
  );

  selectPhysicalStateList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectPhysicalStateList,
  );

  selectPhysicalState$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectPhysicalState,
  );

  selectUseStateList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectUseStateList,
  );

  selectUseState$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectUseState,
  );
  selectDepositaryStateList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectDepositaryStateList,
  );

  selectDepositaryState$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectDepositaryState,
  );
  selectPresentationStateList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectPresentationStateList,
  );

  selectPresentationState$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectPresentationState,
  );
  selectAplicationStateList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectAplicationStateList,
  );

  selectAplicationState$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectAplicationState,
  );

  selectcTransportationWayStateList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectcTransportationWayStateList,
  );

  selectcTransportationWayState$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectcTransportationWayState,
  );
  selectcTransportationManagementStateList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectcTransportationManagementStateList,
  );

  selectcPublicationFormatList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectcPublicationFormatList,
  );
  selectcPublicationFormat$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectcPublicationFormat,
  );

  selectcTransportationManagementState$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectcTransportationManagementState,
  );
  selectcTransportationStorageState$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectcTransportationStorageState,
  );
  isProductStandarOrReactive$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.isStandarOrReactive,
  );
  selectValidationStandarAndReactiveChemist$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.isStandardAndReactiveChemist,
  );
  selectValidationStandarAndReactiveBiologic$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.isStandardAndReactiveBiologic,
  );
  selectIsDigitalPublication$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.selectIsDigitalPublication,
  );
  isPublication$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.isPublication,
  );
  isMedicalDispositive$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.isMedicalDispositive,
  );
  isTraining$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.isTraining,
  );
  selectSupplementNode$: Observable<ISupplements> = this.store.select(
    regulatoryResearchDetailsSelectors.selectSupplementNode,
  );
  selectValidationSuplemmentaryProduct$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.selectValidationSuplemmentaryProduct,
  );
  selectSupplementList$: Observable<Array<VProductoSuplementario>> = this.store.select(
    regulatoryResearchDetailsSelectors.selectSupplementList,
  );
  selectcBroadcastMediumList$: Observable<DropListOptionPqf[]> = this.store.select(
    regulatoryResearchDetailsSelectors.selectcBroadcastMediumList,
  );
  selectcBroadcastMedium$: Observable<DropListOptionPqf> = this.store.select(
    regulatoryResearchDetailsSelectors.selectcBroadcastMedium,
  );
  validations$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.selectValidations,
  );

  productDetailsListPrice$: Observable<number> = this.store.select(
    regulatoryResearchDetailsSelectors.selectProductDetailsListPrice,
  );

  constructor(private store: Store<AppState>) {}

  async getNodeValue(nodeProduct: boolean) {
    let nodeValue;
    if (nodeProduct) {
      nodeValue = 'Producto';
    } else {
      nodeValue = await lastValueFrom(
        this.store.pipe(select(regulatoryResearchDetailsSelectors.selectTypeProduct), take(1)),
      );
    }
    return nodeValue;
  }

  async changeValueNode(key, event, nodeProduct = false) {
    event = event === '' ? null : event;
    const node = await this.getNodeValue(nodeProduct);
    if (key === 'CAS' && !isEmpty(event)) {
      this.store.dispatch(regulatoryResearchDetailsActions.SET_VALIDATE_CAS_LOAD({value: event}));
    }
    if (key === 'IdCatRestriccionDeCompra') {
      this.setNumPiecesNull(event);
    }
    const params: {node: string; key: string; value: any} = {
      key,
      node,
      value: event?.id ? event.id : event,
    };
    this.store.dispatch(CHANGE_NODE_DETAILS(params));
  }

  // DOCS: METHOD TO CHANGE VALUE FOR PRICES
  async changePriceValueNode(key, event, nodeProduct = false, priceType?: string): Promise<void> {
    const node = await this.getNodeValue(nodeProduct);
    // DOCS: SET DATA FOR PRICES
    const params: {key: string; node: string; value: any} = {
      key,
      node,
      value: event,
    };
    this.store.dispatch(SET_CHANGE_INPUT_PROPERTY_PRODUCT_DETAILS(params));

    if (priceType !== 'PrecioPorGrupo') {
      this.store.dispatch(CHANGE_NODE_DETAILS(params));
    }
  }

  setNumPiecesNull(option): void {
    if (option?.label !== 'Límite de Piezas') {
      const params: {node: string; key: string; value: any} = {
        key: 'NumeroDePiezas',
        node: 'Producto',
        value: null,
      };
      this.store.dispatch(CHANGE_NODE_DETAILS(params));
    }
  }

  // DOCS: ENABLE AND DISABLE RADIOS FOR PRICES
  async changePriceNode(key: string, event: IRadioButton): Promise<void> {
    const keyPrecioPorPersona = 'PrecioPorPersona';
    const keyPrecioPorGrupo = 'PrecioPorGrupo';
    if (key === keyPrecioPorPersona) {
      await this.changeValueNode(keyPrecioPorPersona, true);
      await this.changeValueNode(keyPrecioPorGrupo, false);
    }

    if (key === keyPrecioPorGrupo) {
      await this.changeValueNode(keyPrecioPorGrupo, true);
      await this.changeValueNode(keyPrecioPorPersona, false);
    }
    // FIXME: Eliminar sino hay problemas
    // this.setTrainingPriceNull();
    // this.setPeopleByGroupNull();
    // const priceKey = key === 'PrecioPorPersona' ? 'PrecioPorGrupo' : 'PrecioPorPersona';
    // await this.changeValueNode(key, event);
  }

  // DOCS: SET TRAINING PRICE NULL WHEN PRICE RADIOS CHANGE
  setTrainingPriceNull(): void {
    const params: {node: string; key: string; value: any} = {
      key: 'PrecioLista',
      node: 'ProductoCapacitacion',
      value: null,
    };
    this.store.dispatch(SET_CHANGE_INPUT_PROPERTY_PRODUCT_DETAILS(params));
    this.store.dispatch(CHANGE_NODE_DETAILS(params));
  }

  // DOCS: SET VALUE IN NULL FOR NUMBER OF PEOPLE BY GROUP ATTRIBUTE INTO ProductoCapacitacion
  setPeopleByGroupNull(): void {
    const params: {node: string; key: string; value: any} = {
      key: 'NumeroDePersonasPorGrupo',
      node: 'ProductoCapacitacion',
      value: null,
    };
    this.store.dispatch(CHANGE_NODE_DETAILS(params));
  }

  setDataValidityCuratorships(event, key: string): void {
    const date = currentDateWithHoursInZeroUTCFormatDate(event);
    this.store.dispatch(
      regulatoryResearchDetailsActions.SET_DATE_VALIDITY_CURATORSHIP({
        stringDate: date.stringDate,
        key,
      }),
    );
  }

  setBackOrderAvailabilityDate(event, key: string): void {
    const date = currentDateWithHoursInZeroUTCFormatDate(event);
    this.store.dispatch(
      regulatoryResearchDetailsActions.SET_DATE_BACK_ORDER({
        stringDate: date.stringDate,
        key,
      }),
    );
  }

  getDate(date: string): Date {
    return new Date(date);
  }

  dateWithHoursFormatDate(date) {
    return dateWithHoursFormatDate(date);
  }

  getFileName(file) {
    return getOnlyFileName(file);
  }

  getExternalFile(node: string): void {
    this.store.dispatch(regulatoryResearchDetailsActions.FETCH_EXTERNAL_FILE_LOAD({node}));
  }

  setNewFile(newFile: Array<File>, node: string): void {
    this.store.dispatch(
      regulatoryResearchDetailsActions.SET_NEW_PRODUCT_FILE({
        newFile: newFile[0],
        node,
      }),
    );
  }

  setSuplementary(key: string, value) {
    this.store.dispatch(
      regulatoryResearchDetailsActions.SET_NODE_SUPPLEMENTARY({
        key,
        value,
      }),
    );
  }

  async saveSuplementary(): Promise<void> {
    const supplementary: ISupplements = await lastValueFrom(
      this.store.pipe(select(regulatoryResearchDetailsSelectors.selectSupplementNode), take(1)),
    );
    this.store.dispatch(
      regulatoryResearchDetailsActions.SET_SUPLEMENTARY_TO_LIST_PRODUCT({supplementary}),
    );
  }

  selectionChange(property, event): void {
    const params = {property: property, dropListOptionPqf: event};
    this.store.dispatch(
      regulatoryResearchDetailsActions.SET_DATE_BACK_ORDER({
        stringDate: null,
        key: 'FechaDisponibilidadBackOrder',
      }),
    );
    this.store.dispatch(SET_CHANGE_SELECT_PROPERTY_PRODUCT(params));
  }

  changeValueProducDetails(key: string, event) {
    const params = {
      key: key,
      value: event,
    };
    this.store.dispatch(SET_CHANGE_INPUT_PROPERTY_PRODUCT_DETAILS(params));
  }

  removeSupplementary(index: number): void {
    this.store.dispatch(regulatoryResearchDetailsActions.REMOVE_SUPLEMENTARY({index}));
  }

  buildSupplementData(supplement: VProductoSuplementario): string {
    return `${supplement.ISBN ? ` · ISBN ${supplement.ISBN}` : ''}${
      supplement.Editorial ? ` · ${supplement.Editorial}` : ''
    }${supplement.Edicion ? ` · ${supplement.Edicion}` : ''}`;
  }
}
