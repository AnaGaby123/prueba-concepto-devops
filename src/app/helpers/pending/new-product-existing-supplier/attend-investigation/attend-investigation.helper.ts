import {IProduct} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';
import {ContactoDetalleProvObj, VProducto} from 'api-catalogos';
import {
  AttributeDashboard,
  CotPartidaInvetigacionAtencionComentariosObj,
  GMCorreoCotPartidaInvestigacion,
  ProductoInvestigacionObj,
  Resumen,
} from 'api-logistica';
import {addRowIndex} from '@appUtil/util';
import {
  AttendInvestigationApiResponse,
  IProvider,
  mapAttendInvestigationFromApi,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.model';
import {find, forEach, map as _map} from 'lodash-es';

import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  ICotPartidaInvetigacionAtencionComentariosObj,
  initialCotInvestigacionCorreoEnviado,
  initialIGmItemAttention,
  initialIProviderResponse,
  IProductInvestigation,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.model';
import {IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {IDataMail} from '@appModels/correo/correo';

export const buildProductsListAddImage = (response: Array<VProducto>): Array<IProduct> =>
  _map(
    response,
    (o: IProduct): IProduct => ({
      ...o,
      image: `assets/Images/logos/${o?.NombreImagenMarca?.toLowerCase()}.svg`,
      imageHover: `assets/Images/logos/${o?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
      ImagePresentation: `assets/Images/products/${o?.TipoPresentacionClave?.toLowerCase()}.svg`,
      ImagePresentationHover: `assets/Images/products/${o?.TipoPresentacionClave?.toLowerCase()}_hover.svg`,
    }),
  );

export const buildProvidersAttendInvestigationFromDashboard = (
  providerList: Array<Resumen>,
): Array<IProvider> => {
  providerList = addRowIndex(0, 0, providerList);
  return _map(providerList, (o: IProvider) => {
    const newObject = {...o, IdProveedor: o.DescripcionLlave};
    forEach(o.Atributos, (i: AttributeDashboard) => {
      newObject[i.DescriptionField] = i.ValueField;
    });
    return newObject;
  });
};

//DOCS: SUMA LOS PRODUCTOS NUEVAS Y REATENDIDOS PARA LA TAB "POR INVESTIGAR"
export const buildProvidersAttendInvestigationFromTabs = (
  tabsResponse: Array<AttributeDashboard>,
): Array<AttributeDashboard> => {
  tabsResponse = addRowIndex(0, 0, tabsResponse);
  let total = 0;
  _map(tabsResponse, (i: AttributeDashboard) => {
    if (
      i.DescriptionField === AttendInvestigationApiResponse.EstadoInvestigacionNueva ||
      i.DescriptionField === AttendInvestigationApiResponse.EstadoInvestigacionPorreatender
    ) {
      total += i.ValueField as number;
    }
  });
  _map(tabsResponse, (i: AttributeDashboard) => {
    if (i.DescriptionField === AttendInvestigationApiResponse.EstadoInvestigacionNueva) {
      i.ValueField = total;
    }
  });
  return tabsResponse;
};
export const buildAttendInvestigationTabs = (
  stateTabs: Array<ITabOption>,
  tabResponse: Array<AttributeDashboard>,
) => {
  return _map(stateTabs, (o: ITabOption) => ({
    ...o,
    totalSubtitle: find(
      tabResponse,
      (i: AttributeDashboard) => i.DescriptionField === mapAttendInvestigationFromApi[o.label],
    )?.ValueField as string,
    labelSubtitle:
      find(
        tabResponse,
        (i: AttributeDashboard) => i.DescriptionField === mapAttendInvestigationFromApi[o.label],
      )?.ValueField !== 1
        ? o.labelSubtitle
        : o.labelSubtitle.includes('Requisiciones')
        ? 'Requisicion'
        : o.labelSubtitle.includes('Productos')
        ? 'Producto'
        : o.labelSubtitle,
  }));
};

export const buildIProductInvestigation = (
  items: Array<ProductoInvestigacionObj>,
  IdUsuarioAtiende: string,
): Array<IProductInvestigation> => {
  return _map(
    items,
    (o: ProductoInvestigacionObj, index): IProductInvestigation => {
      return {
        ...o,
        index,
        selected: false,
        detailsOpen: false,
        isChecked: false,
        needsToReloadAttention: true,
        isOnlineInvestigation: false,
        gmItemAttention: initialIGmItemAttention(),
        gmProviderResponse: {
          ...initialIProviderResponse(),
          IdUsuarioAtiende,
          cotPartidaInvestigacionProducto: {
            ...initialIProviderResponse().cotPartidaInvestigacionProducto,
            IdCotPartidaCotizacionInvestigacion: o.IdCotPartidaCotizacionInvestigacion,
          },
        },
        backup:
          o.EstadoInvestigacion === 'En Espera De Respuesta'
            ? {...initialIProviderResponse()}
            : {...initialIGmItemAttention()},
      };
    },
  );
};
export const buildICotPartidaInvetigacionAtencionComentariosObj = (
  response: CotPartidaInvetigacionAtencionComentariosObj,
  IdCotPartidaCotizacionInvestigacion: string,
  IdUsuarioAtiende: string,
): ICotPartidaInvetigacionAtencionComentariosObj => {
  return {
    ...response,
    Producto: response.Producto ? buildProductsListAddImage([response.Producto])[0] : null,
    cotPartidaCotizacionInvestigacion: {
      ...response.cotPartidaCotizacionInvestigacion,
      IdUsuarioAtiende,
    },
    cotPartidaCotizacionInvestigacionAtencion:
      response.cotPartidaCotizacionInvestigacionAtencion === null
        ? {
            ...initialIGmItemAttention().cotPartidaCotizacionInvestigacionAtencion,
            IdCotPartidaCotizacionInvestigacion,
          }
        : response.cotPartidaCotizacionInvestigacionAtencion,
    cotPartidaCotizacionInvestigacionComentario: [
      ...response.cotPartidaCotizacionInvestigacionComentario,
      ...initialIGmItemAttention().cotPartidaCotizacionInvestigacionComentario,
    ],
  };
};

export const buildProviderContacts = (
  response: Array<ContactoDetalleProvObj>,
): Array<IDropListMulti> => {
  return _map(
    response,
    (o: ContactoDetalleProvObj): IDropListMulti => {
      return {
        value: o.IdContacto,
        labels: [
          {
            label: o.Mail,
            color: '#008894',
            isShow: true,
          },
        ],
        isSelected: false,
      };
    },
  );
};
export const buildProviderMail = (
  data: IDataMail,
  IdUsuarioAtiende,
  IdProveedor,
  products,
  greetings: string,
  emailBody: string,
): GMCorreoCotPartidaInvestigacion => {
  return {
    Asunto: data.subject,
    IdUsuarioAtiende,
    ConCopiaCSV: data.carbonCopy.join(', '),
    CorreoProveedor: data.to.join(','),
    ListaIdCotPartidaCotizacionInvestigacion: products,
    cotInvestigacionCorreoEnviado: {
      ...initialCotInvestigacionCorreoEnviado(greetings, emailBody),
      IdProveedor,
      Notas: data.additionalComments,
    },
  };
};
