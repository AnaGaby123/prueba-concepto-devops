import {
  AgrupadorCaracteristica,
  CatClasificacionInformativaProducto,
  VMarcaFamilia,
  VProductoDetalle,
} from 'api-catalogos';
import {ProductsDetails} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {find, isEmpty, map} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {getArrayForDropDownList} from '@appUtil/util';
import {dateWithHoursFormatDate} from '@appUtil/dates';
import {ENUM_PRODUCT_FAMILY_KEY} from '@appUtil/common.protocols';

export const ProductDetailsData = (
  data: IProductDetails,
  CatTrademark,
  CatAvailability,
  CatUnit,
  CatBillingRestrictions,
  CatFreightRestrictions,
  CatPhysicalState,
  CatUse,
  CatPublicationFormat,
  CatInternationalDepositary,
  CatPresentationType,
  CatApplication,
  CatTransportationWay,
  CatTransportationManagement,
) =>
  ({
    productDetails: {
      ...data.productDetails,
      // DOCS: SE ELIMINÓ EL CHECKBOX DE CAS Y SE ESTABLECE SIEMPRE EN TRUE
      Producto: {
        ...data.productDetails.Producto,
        TieneCAS: true,
      },
    },
    selectedTradeMark: optionDropDownListSelected(data.productDetails?.IdMarca, CatTrademark),
    productTypeFamilySelected: optionDropDownListSelected(
      data.productDetails?.IdMarcaFamilia,
      map(
        data.typeProduct,
        (o: VMarcaFamilia) =>
          ({
            value: o.IdMarcaFamilia,
            label: `${o.Tipo ? `${o.Tipo}` : ''}${o.Subtipo !== 'N/A' ? ` · ${o.Subtipo}` : ''}${
              o.Control !== 'N/A' ? ` · ${o.Control}` : ''
            }`,
            labelKey: `${o.ClaveTipo ? `${o.ClaveTipo}` : ''}${
              o.ClaveSubtipo !== 'n/a' ? `${o.ClaveSubtipo}` : ''
            }${o.ClaveControl !== 'n/a' ? `${o.ClaveControl}` : ''}`,
          } as DropListOption),
      ),
    ),
    unitSelected: optionDropDownListSelected(data.productDetails.Producto?.IdCatUnidad, CatUnit),
    characteristicGrouperSelected: optionDropDownListSelected(
      data.productDetails.Producto?.IdAgrupadorCaracteristica,
      getArrayForDropDownList(
        data.characteristicGrouper,
        'IdAgrupadorCaracteristica',
        'Descripcion',
      ),
    ),
    availabilitySelected: optionDropDownListSelected(
      data.productDetails.Producto?.IdCatDisponibilidad,
      CatAvailability,
    ),
    internationalDepositarySelected: optionDropDownListSelected(
      data.productDetails.Producto?.IdCatDepositarioInternacional,
      CatInternationalDepositary,
    ),
    classificationProductSelected: optionDropDownListSelected(
      data.productDetails.Producto?.IdCatClasificacionInformativaProducto,
      getArrayForDropDownList(
        data.classificationProduct,
        'IdCatClasificacionInformativaProducto',
        'Clasificacion',
      ),
    ),
    billingRestrictionSelected:
      data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards
        ? optionDropDownListSelected(
            data.productDetails.ProductoEstandar?.IdCatRestriccionDeCompra,
            CatBillingRestrictions,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives
        ? optionDropDownListSelected(
            data.productDetails.ProductoReactivo?.IdCatRestriccionDeCompra,
            CatBillingRestrictions,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware
        ? optionDropDownListSelected(
            data.productDetails.ProductoLabware?.IdCatRestriccionDeCompra,
            CatBillingRestrictions,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.medicalDevice
        ? optionDropDownListSelected(
            data.productDetails.ProductoDispositivoMedico?.IdCatRestriccionDeCompra,
            CatBillingRestrictions,
          )
        : null,
    restrictionFreightSelected:
      data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards
        ? optionDropDownListSelected(
            data.productDetails.ProductoEstandar?.IdCatRestriccionFlete,
            CatFreightRestrictions,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives
        ? optionDropDownListSelected(
            data.productDetails.ProductoReactivo?.IdCatRestriccionFlete,
            CatFreightRestrictions,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware
        ? optionDropDownListSelected(
            data.productDetails.ProductoLabware?.IdCatRestriccionFlete,
            CatFreightRestrictions,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications
        ? optionDropDownListSelected(
            data.productDetails.ProductoPublicacion?.IdCatRestriccionFlete,
            CatFreightRestrictions,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.medicalDevice
        ? optionDropDownListSelected(
            data.productDetails.ProductoDispositivoMedico?.IdCatRestriccionFlete,
            CatFreightRestrictions,
          )
        : null,
    selectedPhysicalState:
      data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards
        ? optionDropDownListSelected(
            data.productDetails.ProductoEstandar?.IdCatEstadoFisico,
            CatPhysicalState,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives
        ? optionDropDownListSelected(
            data.productDetails.ProductoReactivo?.IdCatEstadoFisico,
            CatPhysicalState,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware
        ? optionDropDownListSelected(
            data.productDetails.ProductoLabware?.IdCatEstadoFisico,
            CatPhysicalState,
          )
        : null,
    useSelected:
      data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards
        ? optionDropDownListSelected(data.productDetails.ProductoEstandar?.IdCatUso, CatUse)
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives
        ? optionDropDownListSelected(data.productDetails.ProductoReactivo?.IdCatUso, CatUse)
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware
        ? optionDropDownListSelected(data.productDetails.ProductoLabware?.IdCatUso, CatUse)
        : null,
    publicationsFormatSelected:
      data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications
        ? optionDropDownListSelected(
            data.productDetails.ProductoPublicacion?.IdCatFormatoPublicacion,
            CatPublicationFormat,
          )
        : null,
    typePresentationSelected:
      data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards
        ? optionDropDownListSelected(
            data.productDetails.ProductoEstandar?.IdCatTipoPresentacion,
            CatPresentationType,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives
        ? optionDropDownListSelected(
            data.productDetails.ProductoReactivo?.IdCatTipoPresentacion,
            CatPresentationType,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware
        ? optionDropDownListSelected(
            data.productDetails.ProductoLabware?.IdCatTipoPresentacion,
            CatPresentationType,
          )
        : null,
    typeApplicationSelected:
      data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards
        ? optionDropDownListSelected(
            data.productDetails.ProductoEstandar?.IdCatAplicacion,
            CatApplication,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives
        ? optionDropDownListSelected(
            data.productDetails.ProductoReactivo?.IdCatAplicacion,
            CatApplication,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware
        ? optionDropDownListSelected(
            data.productDetails.ProductoLabware?.IdCatAplicacion,
            CatApplication,
          )
        : null,
    transportationWaySelected:
      data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards
        ? optionDropDownListSelected(
            data.productDetails.ProductoEstandar?.IdCatMedioTransporte,
            CatTransportationWay,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives
        ? optionDropDownListSelected(
            data.productDetails.ProductoReactivo?.IdCatMedioTransporte,
            CatTransportationWay,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware
        ? optionDropDownListSelected(
            data.productDetails.ProductoLabware?.IdCatMedioTransporte,
            CatTransportationWay,
          )
        : null,
    transportationManagementSelected:
      data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards
        ? optionDropDownListSelected(
            data.productDetails.ProductoEstandar?.IdCatManejoTransporte,
            CatTransportationManagement,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives
        ? optionDropDownListSelected(
            data.productDetails.ProductoReactivo?.IdCatManejoTransporte,
            CatTransportationManagement,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware
        ? optionDropDownListSelected(
            data.productDetails.ProductoLabware?.IdCatManejoTransporte,
            CatTransportationManagement,
          )
        : null,
    storageSelected:
      data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards
        ? optionDropDownListSelected(
            data.productDetails.ProductoEstandar?.IdCatManejoAlmacenaje,
            CatTransportationManagement,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives
        ? optionDropDownListSelected(
            data.productDetails.ProductoReactivo?.IdCatManejoAlmacenaje,
            CatTransportationManagement,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware
        ? optionDropDownListSelected(
            data.productDetails.ProductoLabware?.IdCatManejoAlmacenaje,
            CatTransportationManagement,
          )
        : data.productDetails.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.medicalDevice
        ? optionDropDownListSelected(
            data.productDetails.ProductoDispositivoMedico?.IdCatManejoAlmacenaje,
            CatTransportationManagement,
          )
        : null,
    dateValidityCuratorship: data.productDetails.Producto.FechaCaducidadVigenciaCuraduria
      ? dateWithHoursFormatDate(data.productDetails.Producto.FechaCaducidadVigenciaCuraduria)
      : null,
    dateExpirationHealthRegister: data.productDetails.Producto.FechaCaducidadRegistroSanitario
      ? dateWithHoursFormatDate(data.productDetails.Producto.FechaCaducidadRegistroSanitario)
      : null,
    fechaDisponibilidadBackOrderSelected:
      data.productDetails.Disponibilidad === 'BackOrder' &&
      data.productDetails.FechaDisponibilidadBackOrder
        ? dateWithHoursFormatDate(data.productDetails.FechaDisponibilidadBackOrder)
        : null,
    productBackUp: {
      Catalogo: data.productDetails.Catalogo,
      Presentacion: data.productDetails.Presentacion,
      Control: data.productDetails.Control,
      Uso: data.productDetails.Uso,
      Unidad: data.productDetails.Unidad,
      Disponibilidad: data.productDetails.Disponibilidad,
      DisponibilidadClave: data?.productDetails?.DisponibilidadClave,
      Tipo: data.productDetails.Tipo,
      Subtipo: data.productDetails.Subtipo,
      Controlado: data.productDetails.Controlado,
      NombreProveedor: data.productDetails.NombreProveedor,
      NombreMarca: data.productDetails.NombreMarca,
      Clasificacion: data.productDetails.Clasificacion,
      Aplicacion: data.productDetails.Aplicacion,
      EstadoFisico: data.productDetails.EstadoFisico,
      Nota: data.productDetails.Nota,
      PrecioLista: data.productDetails.PrecioLista,
      Descripcion: data.productDetails.Descripcion,
      FechaCaducidadVigenciaCuraduria: data.productDetails.FechaCaducidadVigenciaCuraduria,
      PrecioPorGrupo: data.productDetails.ProductoCapacitacion?.PrecioPorGrupo,
      PrecioPorPersona: data.productDetails.ProductoCapacitacion?.PrecioPorPersona,
      NumeroDePersonasPorGrupo: data.productDetails.ProductoCapacitacion?.NumeroDePersonasPorGrupo,
      Autor: data.productDetails.Autor,
      FormatoPublicacion: data.productDetails.FormatoPublicacion,
      TipoProductoClave: data.productDetails.TipoProductoClave,
      image: `assets/Images/logos/${data.productDetails?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
      imagePresentation: `assets/Images/products/${data.productDetails?.TipoPresentacionClave?.toLowerCase()}_hover.svg`,
    },
  } as ProductsDetails);

export interface IProductDetails {
  productDetails: VProductoDetalle;
  typeProduct: Array<VMarcaFamilia>;
  characteristicGrouper: Array<AgrupadorCaracteristica>;
  classificationProduct: Array<CatClasificacionInformativaProducto>;
}

export const optionDropDownListSelected = (id, options) => {
  return !isEmpty(id) ? find(options, (o) => id === o.value) ?? null : null;
};
