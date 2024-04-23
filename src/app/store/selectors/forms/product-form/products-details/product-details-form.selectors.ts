import {createSelector} from '@ngrx/store';
import {
  backOrderString,
  IProductBackUp,
  IProductInfo,
  IProductLogisticFile,
  IVProductoDetalle,
  ProductsDetails,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {
  Archivo,
  ArchivoTratadosOtrosDetalle,
  CatDisponibilidad,
  Producto,
  ProductoCapacitacion,
  ProductoEstandar,
  ProductoPublicacion,
  ProductoReactivo,
} from 'api-catalogos';
import {filter, forEach, isEmpty, isEqual, map as _map} from 'lodash-es';
import {
  selectAvailabilityIsBackOrder,
  selectBroadCastMediaRadios,
  selectedTypeProductsFamily,
  selectProduct,
} from '@appSelectors/forms/product-form/products-details/technical-commercial-investigation/technical-commercial-investigation.selectors';
import {
  AVAILABILITY_TYPES,
  DEFAULT_UUID,
  ENUM_PRODUCT_FAMILY_B,
  ENUM_PRODUCT_FAMILY_KEY,
} from '@appUtil/common.protocols';
import {
  selectDetailsProductState,
  selectEditMode,
} from '@appSelectors/forms/product-form/product-form.selectors';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  isValidNumberWithMinValue,
  validateFieldIsNotContainOnlySpacesAndLength,
  validateFieldsRequiredNumber,
  validateFieldsRequiredString,
} from '@appUtil/util';
import {selectCatalogs} from '@appSelectors/catalogs/catalogs.selectors';
import {CatalogsState} from '@appModels/store/catalogs/catalogs.models';
import {ENUM_BILLING_RESTRICTIONS} from '@appModels/store/quotation/quotation-details/quotation-details.models';

export const selectedActualStep = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails): ITabOption => state.tabSelected,
);
export const selectProductDetails = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails): IVProductoDetalle => state?.productDetails,
);
export const selectBackUpProductDetails = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails): IProductInfo => state.productBackUp,
);

export const selectSteps = createSelector(
  [selectDetailsProductState, selectEditMode, selectProductDetails],
  (state: ProductsDetails, editMode: boolean, productDetails: IVProductoDetalle) => {
    let tabSteps = state.tabSteps;
    if (
      productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications ||
      productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.medicalDevice ||
      productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.trainings
    ) {
      tabSteps = filter(tabSteps, (o: ITabOption) => o.id !== '2');
      if (productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.trainings) {
        return _map(
          tabSteps,
          (o: ITabOption, i): ITabOption => {
            if (i === 0) {
              return o;
            }
            return {
              ...o,
              label: 'NO DISPONIBLE',
              disable: true,
            };
          },
        );
      }
    }

    return _map(tabSteps, (o: ITabOption) => {
      if (o.id === '1') {
        return {
          ...o,
          disable: false,
        };
      }
      return {
        ...o,
        disable: !editMode,
      };
    });
  },
);

export const selectFilesToDelete = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails): string[] => state.filesToDelete,
);

export const selectProductItemDataBackUp = createSelector(
  selectBackUpProductDetails,
  (state: IVProductoDetalle): IProductBackUp => {
    return {
      Catalogo: state?.Catalogo,
      Descripcion: state?.Descripcion,
      PrecioListaMonedaProveedor: state?.PrecioListaMonedaProveedor,
      Presentacion: state?.Presentacion,
      Controlado: state?.Controlado,
      Tipo: state?.Tipo,
      Subtipo: state?.Subtipo,
      Control: state?.Control,
      Disponibilidad: state?.Disponibilidad,
      Unidad: state?.Unidad,
      FechaCaducidadVigenciaCuraduria: state?.FechaCaducidadVigenciaCuraduria,
      Nota: state?.Nota,
      NombreProveedor: state?.NombreProveedor,
      NombreMarca: state?.NombreMarca,
      Aplicacion: state?.Aplicacion,
      Clasificacion: state?.Clasificacion,
      Uso: state?.Uso,
      Autor: state?.Autor,
      FormatoPublicacion: state?.FormatoPublicacion,
      EstadoFisico: state?.EstadoFisico,
      label: `${state?.Tipo ? `${state?.Tipo}` : ''}${
        state?.Subtipo !== 'N/A' ? ` · ${state?.Subtipo}` : ''
      }${state?.Control !== 'N/A' ? ` · ${state?.Control}` : ''}`,
      labelKey: `${
        state?.TipoProductoClave && state?.TipoProductoClave ? `${state?.TipoProductoClave}` : ''
      }${
        state?.SubtipoProductoClave && state?.SubtipoProductoClave !== 'n/a'
          ? `${state?.SubtipoProductoClave}`
          : ''
      }${state?.ControlClave && state?.ControlClave !== 'n/a' ? `${state?.ControlClave}` : ''}`,
    };
  },
);
export const selectValidationConfigurationStandardAndReactiveBiologicBackUp = createSelector(
  selectProductItemDataBackUp,
  (state: IProductBackUp): boolean => {
    return (
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicNational ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicOrigin ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicNational ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicOrigin
    );
  },
);
export const selectValidationConfigurationStandardAndReactiveChemistBackUp = createSelector(
  selectProductItemDataBackUp,
  (state: IProductBackUp): boolean => {
    return (
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistNotional ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistOrigin ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistNational ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistcMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistOrigin
    );
  },
);
export const selectValidationConfigurationPublicationsBackUp = createSelector(
  selectProductItemDataBackUp,
  (state: IProductBackUp): boolean => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.publications;
  },
);
export const selectValidationConfigurationLabwareBackUp = createSelector(
  selectProductItemDataBackUp,
  (state: IProductBackUp): boolean => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.labware;
  },
);
export const selectValidationConfigurationMedicalDevicesBackUp = createSelector(
  selectProductItemDataBackUp,
  (state: IProductBackUp): boolean => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.medicalDevices;
  },
);
export const selectValidationConfigurationTrainingBackup = createSelector(
  selectProductItemDataBackUp,
  (state: IProductBackUp): boolean => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.training;
  },
);
export const selectValidationConfigurationStandardsBackup = createSelector(
  selectProductItemDataBackUp,
  (state: IProductBackUp): boolean => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.standards;
  },
);
export const selectValidationConfigurationReagentsBackup = createSelector(
  selectProductItemDataBackUp,
  (state: IProductBackUp): boolean => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagents;
  },
);
export const selectValidationConfigurationStandardAndReactiveBiologic = createSelector(
  selectedTypeProductsFamily,
  (state: DropListOption): boolean => {
    return (
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicNational ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicOrigin ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicNational ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicOrigin
    );
  },
);
export const selectValidationConfigurationStandardAndReactiveChemist = createSelector(
  selectedTypeProductsFamily,
  (state: DropListOption): boolean => {
    return (
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistNotional ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistOrigin ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistNational ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistcMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistOrigin
    );
  },
);
export const selectValidationConfigurationPublications = createSelector(
  selectedTypeProductsFamily,
  (state: DropListOption): boolean => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.publications;
  },
);
export const selectePublicationsFormatSelected = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails): DropListOption => state.publicationsFormatSelected,
);
export const selectIsDigitalPublication = createSelector(
  selectValidationConfigurationPublications,
  selectePublicationsFormatSelected,
  (isPublication: boolean, publicationsFormatSelected: DropListOption): boolean => {
    return isPublication && publicationsFormatSelected?.label.toLowerCase() !== 'farmacopea';
  },
);
export const selectValidationConfigurationLabware = createSelector(
  selectedTypeProductsFamily,
  (state: DropListOption): boolean => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.labware;
  },
);
export const selectValidationConfigurationMedicalDevices = createSelector(
  selectedTypeProductsFamily,
  (state: DropListOption): boolean => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.medicalDevices;
  },
);
export const selectValidationConfigurationTraining = createSelector(
  selectedTypeProductsFamily,
  (state: DropListOption): boolean => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.training;
  },
);

export const selectNameValidationConfiguration = createSelector(
  selectedTypeProductsFamily,
  (state: DropListOption): string => {
    return state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicNational ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarBiologicOrigin ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistNormal ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistNotional ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistMundial ||
      state?.labelKey === ENUM_PRODUCT_FAMILY_B.standarChemistOrigin
      ? 'ProductoEstandar'
      : state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistNormal ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistNational ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistcMundial ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentChemistOrigin ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicNormal ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicNational ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicMundial ||
        state?.labelKey === ENUM_PRODUCT_FAMILY_B.reagentBiologicOrigin
      ? 'ProductoReactivo'
      : state?.labelKey === ENUM_PRODUCT_FAMILY_B.publications
      ? 'ProductoPublicacion'
      : state?.labelKey === ENUM_PRODUCT_FAMILY_B.labware
      ? 'ProductoLabware'
      : state?.labelKey === ENUM_PRODUCT_FAMILY_B.medicalDevices
      ? 'ProductoDispositivoMedico'
      : state?.labelKey === ENUM_PRODUCT_FAMILY_B.training
      ? 'ProductoCapacitacion'
      : null;
    /*state?.labelKey === ENUM_PRODUCT_FAMILY_B.Medications*/
  },
);
export const selectPurity = createSelector(
  selectNameValidationConfiguration,
  selectProduct,
  (validationConfiguration: string, state: IVProductoDetalle): number => {
    return validationConfiguration === 'ProductoEstandar'
      ? state?.ProductoEstandar?.Pureza
      : validationConfiguration === 'ProductoReactivo'
      ? state?.ProductoReactivo?.Pureza
      : validationConfiguration === 'ProductoLabware'
      ? state?.ProductoLabware?.Pureza
      : null;
  },
);
export const selectSynonyms = createSelector(
  selectNameValidationConfiguration,
  selectProduct,
  (validationConfiguration: string, state: IVProductoDetalle): string => {
    return validationConfiguration === 'ProductoEstandar'
      ? state?.ProductoEstandar?.Sinonimos
      : validationConfiguration === 'ProductoReactivo'
      ? state?.ProductoReactivo?.Sinonimos
      : null;
  },
);
export const selectMolecularForm = createSelector(
  selectNameValidationConfiguration,
  selectProduct,
  (validationConfiguration: string, state: IVProductoDetalle): string => {
    return validationConfiguration === 'ProductoEstandar'
      ? state?.ProductoEstandar?.FormulaQuimica
      : validationConfiguration === 'ProductoReactivo'
      ? state?.ProductoReactivo?.FormulaQuimica
      : null;
  },
);
export const selectListAvailabilityForDropDown = createSelector(
  selectCatalogs,
  selectValidationConfigurationTraining,
  (state: CatalogsState, isTraining: boolean): Array<DropListOption> => {
    const availabilities = _map(
      state.catAvailability.listAvailability,
      (o: CatDisponibilidad): DropListOption => ({
        value: o.IdCatDisponibilidad,
        label: o.Disponibilidad,
        labelKey: o.Clave,
      }),
    );
    if (isTraining) {
      return filter(availabilities, (o: DropListOption) => o.labelKey !== backOrderString);
    }
    return availabilities;
  },
);
export const selectStructureMolecular = createSelector(
  selectProductDetails,
  (state: IVProductoDetalle): Archivo => state.ArchivoEstructuraMolecular,
);
export const selectLogisticFiles = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails): IProductLogisticFile => state.logisticFiles,
);
export const selectSecuritySheetFile = createSelector(
  selectLogisticFiles,
  (state: IProductLogisticFile): File =>
    state.ArchivoHojaSeguridad ? state.ArchivoHojaSeguridad : null,
);
export const selectCertificate = createSelector(
  selectLogisticFiles,
  (state: IProductLogisticFile): File => state.ArchivoCertificadoLote,
);
export const selectDatasheet = createSelector(
  selectLogisticFiles,
  (state: IProductLogisticFile): File => state.ArchivoFichaTecnica,
);
export const selectArchivoTratado = createSelector(
  selectLogisticFiles,
  (state: IProductLogisticFile): File => state.ArchivoTratado,
);
export const selectOtherFiles = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => {
    const tratados: Array<ArchivoTratadosOtrosDetalle> = state.productDetails.OtrosTratados;
    const tratadosAdded: Array<File> = state.logisticFiles.OtrosTratados;
    const newList: Array<ArchivoTratadosOtrosDetalle | File> = [];
    if (tratados.length > 0) {
      forEach(tratados, (o: ArchivoTratadosOtrosDetalle) => newList.push(o));
    }
    if (tratadosAdded.length > 0) {
      forEach(tratadosAdded, (o: File) => newList.push(o));
    }
    return newList;
  },
);
export const selectProductData = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails): Producto => state.productDetails.Producto,
);

export const selectValidationProduct = createSelector(
  [
    selectProductData,
    selectValidationConfigurationPublications,
    selectValidationConfigurationStandardAndReactiveBiologic,
    selectValidationConfigurationStandardAndReactiveChemist,
    selectValidationConfigurationTraining,
    selectDetailsProductState,
    selectAvailabilityIsBackOrder,
  ],
  (
    product: Producto,
    publicationsSelected: boolean,
    standardAndReactiveBiologic: boolean,
    standardAndReactiveChemist: boolean,
    training: boolean,
    state: ProductsDetails,
    availabilityIsOrder: boolean,
  ): boolean => {
    const validationAvailabilityBackOrder = availabilityIsOrder
      ? validateFieldsRequiredString(product.FechaDisponibilidadBackOrder)
      : true;

    const isAvailabilityDiscontinued =
      state?.availabilitySelected?.labelKey === AVAILABILITY_TYPES.discontinued;

    // Validaciones de campos requeridos
    const isValidIdMarcaFamilia = validateFieldsRequiredString(product.IdMarcaFamilia);
    const isValidCatalog = validateFieldsRequiredString(product.Catalogo, 2);
    const isValidPrecioListaMonedaProveedor = isAvailabilityDiscontinued
      ? isValidNumberWithMinValue(product.PrecioListaMonedaProveedor)
      : validateFieldsRequiredNumber(product.PrecioListaMonedaProveedor);
    const isValidDescription = validateFieldsRequiredString(product.Descripcion);
    const isValidPresentacion = validateFieldsRequiredString(product.Presentacion, 1);
    const isValidIdCatUnidad = validateFieldsRequiredString(product.IdCatUnidad);
    const isValidIdCatDisponibilidad = validateFieldsRequiredString(product.IdCatDisponibilidad);
    const isValidFechaCaducidadVigenciaCuraduria = validateFieldsRequiredString(
      product.FechaCaducidadVigenciaCuraduria,
    );
    const isValidNota = validateFieldIsNotContainOnlySpacesAndLength(state?.productDetails?.Nota);
    const isValidPieceLimitRestriction =
      state.billingRestrictionSelected?.labelKey === ENUM_BILLING_RESTRICTIONS.LIMITPIECES
        ? product.NumeroDePiezas > 0
        : true;
    const validationsPublication = (): boolean => {
      return (
        isValidIdMarcaFamilia &&
        isValidCatalog &&
        isValidPrecioListaMonedaProveedor &&
        isValidDescription &&
        isValidPresentacion &&
        isValidIdCatUnidad &&
        isValidIdCatDisponibilidad &&
        isValidFechaCaducidadVigenciaCuraduria &&
        validationAvailabilityBackOrder &&
        isValidNota
      );
    };
    const validationsStandardAndReactive = (): boolean => {
      return (
        isValidIdMarcaFamilia &&
        isValidCatalog &&
        isValidPrecioListaMonedaProveedor &&
        isValidDescription &&
        isValidPresentacion &&
        isValidIdCatUnidad &&
        isValidIdCatDisponibilidad &&
        isValidFechaCaducidadVigenciaCuraduria &&
        validationAvailabilityBackOrder &&
        validateFieldIsNotContainOnlySpacesAndLength(state?.productDetails?.Peligrosidad) &&
        isValidNota &&
        isValidPieceLimitRestriction
      );
    };
    const validationsTraining = (): boolean => {
      return (
        validateFieldsRequiredString(state.productDetails.Descripcion) &&
        validateFieldsRequiredString(
          state.productDetails?.ProductoCapacitacion?.DescripcionDetallada,
        ) &&
        isValidPrecioListaMonedaProveedor &&
        isValidFechaCaducidadVigenciaCuraduria &&
        validationAvailabilityBackOrder &&
        isValidNota &&
        product.IdCatDisponibilidad !== DEFAULT_UUID
      );
    };
    const validationsDefault = (): boolean => {
      return (
        isValidIdMarcaFamilia &&
        isValidCatalog &&
        isValidPrecioListaMonedaProveedor &&
        isValidFechaCaducidadVigenciaCuraduria &&
        isValidDescription &&
        isValidPresentacion &&
        isValidIdCatUnidad &&
        isValidIdCatDisponibilidad &&
        validationAvailabilityBackOrder &&
        isValidNota &&
        isValidPieceLimitRestriction
      );
    };
    return publicationsSelected
      ? validationsPublication()
      : standardAndReactiveBiologic || standardAndReactiveChemist
      ? validationsStandardAndReactive()
      : training
      ? validationsTraining()
      : validationsDefault();
  },
);
export const selectStandarBiologic = createSelector(
  selectProductDetails,
  (state: IVProductoDetalle): ProductoEstandar => state.ProductoEstandar,
);
export const selectReactiveBiologic = createSelector(
  selectProductDetails,
  (state: IVProductoDetalle): ProductoReactivo => state.ProductoReactivo,
);
export const selectPublications = createSelector(
  selectProductDetails,
  (state: IVProductoDetalle): ProductoPublicacion => state.ProductoPublicacion,
);
export const selectTraining = createSelector(
  selectProductDetails,
  (state: IVProductoDetalle): ProductoCapacitacion => state.ProductoCapacitacion,
);

export const selecttedDiffusionModel = createSelector(
  selectProductDetails,
  selectBroadCastMediaRadios,
  (state: IVProductoDetalle, options: DropListOption[]): DropListOption => {
    const option: string = state.ProductoCapacitacion?.IdCatMedioDifusion;
    return options.find((it: DropListOption): boolean => it?.value === option) as DropListOption;
  },
);
export const selectMedicalDevices = createSelector(
  selectProductDetails,
  (state: IVProductoDetalle) => state.ProductoDispositivoMedico,
);
export const selectValidationStandardAndReactiveBiologic = createSelector(
  [selectStandarBiologic, selectReactiveBiologic],
  (productStandar: ProductoEstandar, productReactive: ProductoReactivo): boolean => {
    return (
      (!isEmpty(productStandar?.IdCatUso) &&
        !isEmpty(productStandar) &&
        !isEmpty(productStandar?.IdCatTipoPresentacion)) ||
      (!isEmpty(productReactive?.IdCatUso) &&
        !isEmpty(productReactive) &&
        !isEmpty(productReactive?.IdCatTipoPresentacion))
    );
  },
);
export const selectValidationPublications = createSelector(
  selectPublications,
  selectIsDigitalPublication,
  selectProductData,
  (
    productPublications: ProductoPublicacion,
    selectIsDigitalPublication: boolean,
    product: Producto,
  ): boolean => {
    const validateTariffFraction = selectIsDigitalPublication
      ? validateFieldIsNotContainOnlySpacesAndLength(product?.FraccionArancelaria, 10) &&
        validateFieldIsNotContainOnlySpacesAndLength(product?.FraccionImportacion, 10)
      : validateFieldsRequiredString(product.FraccionArancelaria, 10) &&
        validateFieldsRequiredString(product.FraccionImportacion, 10);
    return (
      !isEmpty(productPublications) &&
      validateFieldsRequiredString(productPublications?.IdCatFormatoPublicacion) &&
      validateFieldsRequiredString(productPublications?.Autor) &&
      validateFieldIsNotContainOnlySpacesAndLength(productPublications?.Editorial) &&
      validateFieldIsNotContainOnlySpacesAndLength(productPublications?.Edicion) &&
      validateTariffFraction
    );
  },
);
export const selectValidationStandardAndReactiveChemist = createSelector(
  [selectStandarBiologic, selectReactiveBiologic, selectDetailsProductState],
  (
    productStandar: ProductoEstandar,
    productReactive: ProductoReactivo,
    productDetails: ProductsDetails,
  ): boolean => {
    if (isEmpty(productStandar) && isEmpty(productReactive)) {
      return false;
    }
    const validationsStandardAndReactive = (obj: ProductoEstandar | ProductoReactivo): boolean => {
      return (
        validateFieldsRequiredString(obj?.IdCatUso) &&
        validateFieldsRequiredString(obj?.IdCatTipoPresentacion) &&
        validateFieldsRequiredString(obj?.CAS, 1) &&
        validateFieldIsNotContainOnlySpacesAndLength(obj?.Sinonimos) &&
        validateFieldIsNotContainOnlySpacesAndLength(obj?.FormulaQuimica) &&
        productDetails.validateCas
      );
    };
    if (!isEmpty(productStandar) && productStandar.Activo) {
      return validationsStandardAndReactive(productStandar);
    } else {
      return validationsStandardAndReactive(productReactive);
    }
  },
);
export const selectValidationTrainings = createSelector(
  selectProductData,
  selectTraining,
  (product: Producto, training: ProductoCapacitacion): boolean => {
    let listPrice = false;
    if (training) {
      if (training.PrecioPorPersona) {
        listPrice = validateFieldsRequiredNumber(product.PrecioListaMonedaProveedor);
      } else {
        listPrice =
          validateFieldsRequiredNumber(product.PrecioListaMonedaProveedor) &&
          validateFieldsRequiredNumber(training.NumeroDePersonasPorGrupo, 1);
      }
    }
    return (
      validateFieldsRequiredString(product?.Descripcion) &&
      validateFieldsRequiredString(training?.DescripcionDetallada) &&
      validateFieldIsNotContainOnlySpacesAndLength(product?.Nota) &&
      listPrice &&
      product.IdCatDisponibilidad !== DEFAULT_UUID &&
      product.IdCatDisponibilidad !== null &&
      !isEmpty(product.FechaCaducidadVigenciaCuraduria) &&
      training?.IdCatMedioDifusion !== DEFAULT_UUID &&
      training?.IdCatMedioDifusion !== null &&
      validateFieldsRequiredNumber(training?.DuracionEvento, 0)
    );
  },
);

export const handleValidationsConfigurationTypes = createSelector(
  [
    selectValidationConfigurationStandardAndReactiveBiologic,
    selectValidationConfigurationStandardAndReactiveChemist,
    selectValidationConfigurationPublications,
    selectValidationConfigurationLabware,
    selectValidationConfigurationTraining,
    selectValidationConfigurationMedicalDevices,
  ],
  (
    standardAndReactiveBiologic,
    standardAndReactiveChemist,
    publications,
    labware,
    training,
    medicalDevices,
  ) => {
    return {
      standardAndReactiveBiologic,
      standardAndReactiveChemist,
      publications,
      labware,
      training,
      medicalDevices,
    };
  },
);

export const handleChangesValidationTechnicalCommercialInvestigation = createSelector(
  handleValidationsConfigurationTypes,
  selectValidationProduct,
  selectValidationStandardAndReactiveBiologic,
  selectValidationStandardAndReactiveChemist,
  selectValidationPublications,
  selectValidationTrainings,
  (
    validationsTypes,
    validationProduct: boolean,
    validationStandardAndReactiveBiologic: boolean,
    validationStandardAndReactiveChemist: boolean,
    validationPublications: boolean,
    validationTraining: boolean,
  ): boolean => {
    return validationsTypes.standardAndReactiveBiologic
      ? validationProduct && validationStandardAndReactiveBiologic
      : validationsTypes.standardAndReactiveChemist
      ? validationProduct && validationStandardAndReactiveChemist
      : validationsTypes.labware
      ? validationProduct
      : validationsTypes.publications
      ? validationProduct && validationPublications
      : validationsTypes.medicalDevices
      ? validationProduct
      : validationsTypes.training
      ? validationTraining
      : false;
  },
);

export const selectBackUp = createSelector(
  selectDetailsProductState,
  (productDetails: ProductsDetails): IVProductoDetalle => {
    return productDetails?.backUp;
  },
);

export const handleChangesValidatorAdd = createSelector(
  selectDetailsProductState,
  selectBackUp,
  (state: ProductsDetails, backUp: IVProductoDetalle): boolean => {
    return (
      !isEqual(JSON.stringify(backUp), JSON.stringify(state?.productDetails)) &&
      !isEqual(state?.productDetails?.IdMarca, backUp?.IdMarca)
    );
  },
);

export const handleChangesValidator = createSelector(
  selectDetailsProductState,
  handleChangesValidationTechnicalCommercialInvestigation,
  (state: ProductsDetails, technicalCommercialInvestigation: boolean): boolean => {
    const backUp = state.backUp;
    const vProduct = state.productDetails;
    const tab = state.tabSelected;
    const logisticFiles = state.logisticFiles;
    const regulationFiles = state.regulationFiles;
    switch (tab.id) {
      case '1':
        if (state.productDetails.Producto.IdProducto === DEFAULT_UUID) {
          return technicalCommercialInvestigation;
        } else {
          return (
            !isEqual(JSON.stringify(state.backUp), JSON.stringify(state.productDetails)) ||
            state.technicalCommercialInvestigationFiles.ArchivoEstructuraMolecular !== null
          );
        }
      case '2':
        return (
          !isEqual(backUp, vProduct) ||
          regulationFiles.ArchivoZoosanitarios !== null ||
          regulationFiles.ArchivoAvisoDeQuimicosEsenciales !== null ||
          regulationFiles.ArchivoCartaDeDisponibilidad !== null ||
          regulationFiles.ArchivoCartaDeUso !== null ||
          regulationFiles.ArchivoCicoplafest !== null ||
          regulationFiles.ArchivoPermisoDeAdquisicionEnPlaza !== null ||
          regulationFiles.ArchivoPermisoDeImprotacion !== null ||
          regulationFiles.ArchivoOtroPermiso !== null
        );
      case '3':
        return (
          !isEqual(backUp, vProduct) ||
          logisticFiles.ArchivoHojaSeguridad !== null ||
          logisticFiles.ArchivoCertificadoLote !== null ||
          logisticFiles.ArchivoFichaTecnica !== null ||
          logisticFiles.ArchivoTratado !== null ||
          !isEmpty(logisticFiles.OtrosTratados)
        );
    }
  },
);
export const saveButtonValidator = createSelector(
  selectDetailsProductState,
  handleChangesValidationTechnicalCommercialInvestigation,
  handleChangesValidator,
  (productDetails: ProductsDetails, minimRequired: boolean, hasChanges: boolean): boolean => {
    switch (productDetails.tabSelected.id) {
      case '1':
        if (productDetails.productDetails.IdProducto === DEFAULT_UUID) {
          return minimRequired;
        } else {
          return minimRequired && hasChanges;
        }
      default:
        return hasChanges;
    }
  },
);

export const selectPopAlert = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails): boolean => state.alertPop,
);
export const selectCAS = createSelector(
  selectNameValidationConfiguration,
  selectProduct,
  (validationConfiguration: string, state: IVProductoDetalle): string => {
    return validationConfiguration === 'ProductoEstandar'
      ? state?.ProductoEstandar?.CAS
      : validationConfiguration === 'ProductoReactivo'
      ? state?.ProductoReactivo?.CAS
      : null;
  },
);
export const selectIsPhysicalProduct = createSelector(
  selectValidationConfigurationTraining,
  selectIsDigitalPublication,
  (isTraining: boolean, isDigitalPublication: boolean): boolean => {
    return !isTraining && !isDigitalPublication;
  },
);
