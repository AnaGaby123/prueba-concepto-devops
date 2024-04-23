import {AttributeDashboard, Resumen} from 'api-logistica';
import {addRowIndex} from '@appUtil/util';
import {filter, find, forEach, map as _map} from 'lodash-es';
import {
  IConfProveedorCompra,
  IFamily,
  ITrademarkFamilyProviderConsolidation,
  IVMarcaFamilia,
} from '@appModels/store/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.model';
import {
  ConceptoAgenteAduanal,
  ConfProveedorCompra,
  MarcaFamiliaProveedorConsolidacion,
} from 'api-catalogos';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';

export const buildFamiliesLisPurchasingConfigurationFromDashboard = (
  listFamilies: Array<Resumen>,
): Array<IFamily> => {
  listFamilies = addRowIndex(0, 0, listFamilies);
  return _map(listFamilies, (o: IFamily, index) => {
    const newObject: IFamily = {
      ...o,
      IdCotPartidaCotizacionInvestigacion: o.DescripcionLlave,
      isSelected: index === 0,
      needsToReload: true,
      configuration: {},
      configurationBackUp: {},
    };
    forEach(o.Atributos, (i: AttributeDashboard) => {
      newObject[i.DescriptionField] = i.ValueField;
    });
    return newObject;
  });
};

//DOCS: AGREGAR EL NOMBRE DE LA IMAGEN A  LOS ITEMS

export const buildAddImageItemsConfigurationPurchasingConfiguration = (
  itemsConfigurationLogistic: Array<IFamily>,
) => {
  return _map(itemsConfigurationLogistic, (o) => {
    const newObject: IFamily = {
      ...o,
      imageHover: `assets/Images/logos/${o.NombreImagen?.toLowerCase()}_hover.svg`,
    };
    return newObject;
  });
};

// DOCS: Construye el objeto de una configuración de una MarcaFamilia a como se va a trabajar localmente
export const buildConfigurationFamily = ({
  familyConfiguration,
  trademarkFamilyId,
  trademarkFamiliesList,
  trademarkFamilyProvider,
  providerIsMexican,
  customsAgentsList,
  customsList,
  customsAgentsConceptsList,
}): IConfProveedorCompra => ({
  ...familyConfiguration,
  trademarkFamiliesList: buildTrademarkFamiliesList(
    trademarkFamiliesList,
    familyConfiguration?.MarcaFamiliaProveedorConsolidacion,
    trademarkFamilyId,
  ),
  trademarkFamilyProviderConsolidation: _map(
    familyConfiguration?.MarcaFamiliaProveedorConsolidacion,
    (o: MarcaFamiliaProveedorConsolidacion) => ({
      ...o,
      isOriginal: true,
      isChecked: true,
    }),
  ),
  trademarkFamilyProviderConsolidationToDelete: [],
  ConceptoAgenteAduanal: buildCustomsAgentConcept(familyConfiguration),
  ConfiguracionProveedorFamiliaGeneral: {
    ...familyConfiguration.ConfiguracionProveedorFamiliaGeneral,
    IdMarcaFamiliaProveedor: trademarkFamilyProvider,
    Activo: true,
  },
  ConfiguracionPrecioProveedorFamilia: {
    ...familyConfiguration.ConfiguracionPrecioProveedorFamilia,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    Activo: true,
  },
  ConfiguracionPrecioProveedor: {
    ...familyConfiguration.ConfiguracionPrecioProveedor,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    Activo: true,
  },
  selectedCustomsAgent: buildSelectedCustomsAgent(
    familyConfiguration?.ConceptoAgenteAduanal,
    customsAgentsList,
    providerIsMexican,
  ),
  selectedCustoms: buildSelectedCustoms(
    familyConfiguration?.ConceptoAgenteAduanal,
    customsList,
    providerIsMexican,
  ),
  selectedCustomsAgentConcept: buildSelectedCustomsAgentConcept(
    familyConfiguration?.ConceptoAgenteAduanal,
    customsAgentsConceptsList,
    providerIsMexican,
  ),
  ConfiguracionTiempoEntregaProveedorFamilia: {
    ...familyConfiguration.ConfiguracionTiempoEntregaProveedorFamilia,
    FechaRegistro: DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    IdConfiguracionTiempoEntregaProveedorFamilia:
      familyConfiguration.ConfiguracionTiempoEntregaProveedorFamilia
        ?.IdConfiguracionTiempoEntregaProveedorFamilia ?? DEFAULT_UUID,
    Activo: true,
  },
});

/*DOCS: Construye el objeto MarcaFamiliaProveedor*/
const buildTrademarkFamiliesList = (
  trademarkFamiliesList: Array<IVMarcaFamilia>,
  trademarkFamilyProviderConsolidation: Array<MarcaFamiliaProveedorConsolidacion>,
  trademarkFamilyId: string,
) => {
  /*DOCS: Quitamos la familia que esta seleccionada ya que no tiene sentido consolidarla consigo mismo*/
  const filteredFamilies = filter(
    trademarkFamiliesList,
    (i: IVMarcaFamilia) => i.IdMarcaFamiliaProveedor !== trademarkFamilyId,
  );
  return _map(filteredFamilies, (o: IVMarcaFamilia) => ({
    ...o,
    isSelected: !!find(
      trademarkFamilyProviderConsolidation,
      (i: MarcaFamiliaProveedorConsolidacion) => o.IdMarcaFamilia === i.IdMarcaFamilia,
    ),
  }));
};

// DOCS: Construye el objeto ConceptoAgenteAduanal (Tarifa)
const buildCustomsAgentConcept = (
  familyConfiguration: ConfProveedorCompra,
): ConceptoAgenteAduanal =>
  familyConfiguration?.ConceptoAgenteAduanal
    ? {...familyConfiguration?.ConceptoAgenteAduanal}
    : null;

/*DOCS: Construye el agente aduanal seleccionado*/
const buildSelectedCustomsAgent = (
  customsAgentConcept: ConceptoAgenteAduanal,
  customsAgentsList: Array<DropListOptionPqf>,
  providerIsMexican: boolean,
) => {
  const customsAgent: DropListOptionPqf = providerIsMexican
    ? null
    : find(
        customsAgentsList,
        (o: DropListOptionPqf) => o.id.toString() === customsAgentConcept?.IdAgenteAduanal,
      );
  return customsAgent ?? null;
};

/*DOCS: Construye la aduana seleccionada*/
const buildSelectedCustoms = (
  customsAgentConcept: ConceptoAgenteAduanal,
  customsList: Array<DropListOptionPqf>,
  providerIsMexican: boolean,
) => {
  const customs: DropListOptionPqf = providerIsMexican
    ? null
    : find(
        customsList,
        (o: DropListOptionPqf) => o.id.toString() === customsAgentConcept?.IdAduana,
      );
  return customs ?? null;
};

/*DOCS: Construye el concepto agente aduanal seleccionada*/
const buildSelectedCustomsAgentConcept = (
  customsAgentConcept: ConceptoAgenteAduanal,
  customsAgentConceptsList: Array<DropListOptionPqf>,
  providerIsMexican: boolean,
) => {
  const customsAgentConceptObject: DropListOptionPqf = providerIsMexican
    ? null
    : find(
        customsAgentConceptsList,
        (o: DropListOptionPqf) => o.id.toString() === customsAgentConcept?.IdConceptoAgenteAduanal,
      );
  return customsAgentConceptObject ?? null;
};

// DOCS Arma el objeto de MarcaFamiliaProveedor con el id que se obtiene del servicio
export const buildFamilyFromTrademarkFamilyProviderResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IFamily;
  id: string;
}): IFamily => ({
  ...selectedFamily,
  configuration: {
    ...selectedFamily.configuration,
    MarcaFamiliaProveedor: {
      ...selectedFamily.configuration.MarcaFamiliaProveedor,
      IdMarcaFamiliaProveedor: id,
    },
  },
});

// DOCS Arma el objeto de ConfiguracionPrecioProveedor con el id que se obtiene del servicio
export const buildFamilyFromProviderPriceResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IFamily;
  id: string;
}): IFamily => ({
  ...selectedFamily,
  configuration: {
    ...selectedFamily.configuration,
    ConfiguracionPrecioProveedor: {
      ...selectedFamily.configuration.ConfiguracionPrecioProveedor,
      IdConfiguracionPrecioProveedor: id,
    },
    ConfiguracionPrecioProveedorFamilia: {
      ...selectedFamily.configuration.ConfiguracionPrecioProveedorFamilia,
      IdConfiguracionPrecioProveedor: id,
    },
  },
});

// DOCS Arma el objeto de ConfiguracionPrecioProveedorFamilia con el id que se obtiene del servicio
export const buildFamilyFromFamilyProviderPriceResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IFamily;
  id: string;
}): IFamily => ({
  ...selectedFamily,
  configuration: {
    ...selectedFamily.configuration,
    ConfiguracionPrecioProveedorFamilia: {
      ...selectedFamily.configuration.ConfiguracionPrecioProveedorFamilia,
      IdConfiguracionPrecioProveedorFamilia: id,
    },
    ConfiguracionProveedorFamiliaGeneral: {
      ...selectedFamily.configuration.ConfiguracionProveedorFamiliaGeneral,
      IdConfiguracionPrecioProveedorFamilia: id,
    },
  },
});

export const buildFamilyFromDeliveryTimeResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IFamily;
  id: string;
}): IFamily => ({
  ...selectedFamily,
  configuration: {
    ...selectedFamily.configuration,
    ConfiguracionProveedorFamiliaGeneral: {
      ...selectedFamily.configuration.ConfiguracionProveedorFamiliaGeneral,
      IdConfiguracionTiempoEntregaProveedorFamilia: id,
    },
  },
});

// DOCS Arma el objeto de ConfiguracionProveedorFamiliaGeneral con el id que se obtiene del servicio
export const buildFamilyFromGeneralConfigResp = ({
  selectedFamily,
  id,
}: {
  selectedFamily: IFamily;
  id: string;
}): IFamily => ({
  ...selectedFamily,
  configuration: {
    ...selectedFamily.configuration,
    ConfiguracionProveedorFamiliaGeneral: {
      ...selectedFamily.configuration.ConfiguracionProveedorFamiliaGeneral,
      IdConfiguracionProveedorFamiliaGeneral: id,
    },
  },
});

// DOCS Arma el objeto de la consolidacion con la familia con los id que se obtiene del servicio
export const buildFamilyFromTrademarkFamilyProviderConsolidationResp = ({
  selectedFamily,
  ids,
}: {
  selectedFamily: IFamily;
  ids: Array<string>;
}): IFamily => {
  let counter = -1;
  return {
    ...selectedFamily,
    configuration: {
      ...selectedFamily.configuration,
      trademarkFamilyProviderConsolidation: _map(
        selectedFamily.configuration.trademarkFamilyProviderConsolidation,
        (o: ITrademarkFamilyProviderConsolidation) => {
          if (o.isChecked && !o.isOriginal) {
            counter++;
            return {
              ...o,
              IdMarcaFamiliaProveedorConsolidacion: ids[counter],
              isOriginal: true,
            };
          }
          return {...o};
        },
      ),
      trademarkFamilyProviderConsolidationToDelete: [],
    },
  };
};
