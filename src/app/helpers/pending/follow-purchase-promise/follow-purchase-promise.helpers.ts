import {AttributeDashboard, GMCotFletes, Resumen, VCotCotizacion} from 'api-logistica';
import {addRowIndex, getTotalFreights} from '@appUtil/util';
import {ICustomerFPP} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise.models';
import {concat, forEach, map as _map} from 'lodash-es';
import {IFollowPPromiseItem} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise-details/follow-purchase-promise-details.models';
import {
  IFreightItem,
  InternalSalesItem,
  StylesColumnTotalValue,
  TypeOptionsColumn,
} from '@appModels/table/internal-sales-item';
import {FREIGHT_EXPRESS, FREIGHTS_LAST_MILE} from '@appUtil/common.protocols';

enum FollowPurchasePromiseStatus {
  Todos = 'Todos',
  Atiempo = 'A TIEMPO',
  FueraDeTiempo = 'FUERA DE TIEMPO',
}

enum FollowPurchasePromiseApiResponse {
  Total = 'Total',
  ATiempotrue = 'ATiempotrue',
  ATiempofalse = 'ATiempofalse',
}

const mapFollowPurchasePromiseApiResponse = {
  [FollowPurchasePromiseStatus.Todos]: FollowPurchasePromiseApiResponse.Total,
  [FollowPurchasePromiseStatus.Atiempo]: FollowPurchasePromiseApiResponse.ATiempotrue,
  [FollowPurchasePromiseStatus.FueraDeTiempo]: FollowPurchasePromiseApiResponse.ATiempofalse,
};

const mapFollowPurchasePromiseState = {
  [FollowPurchasePromiseStatus.Todos]: FollowPurchasePromiseStatus.Todos,
  [FollowPurchasePromiseStatus.Atiempo]: true,
  [FollowPurchasePromiseStatus.FueraDeTiempo]: false,
};

const buildFollowPurchasePromiseFromDashboard = (
  customerList: Array<Resumen>,
): Array<ICustomerFPP> => {
  customerList = addRowIndex(0, 0, customerList);
  return _map(customerList, (o: ICustomerFPP) => {
    const newObject = {...o, IdCliente: o.IdCliente};
    forEach(o.Atributos, (i: AttributeDashboard) => {
      newObject[i.DescriptionField] = i.ValueField;
    });
    return newObject;
  });
};

const buildItemsFollowPurchase = (
  showNotes: boolean,
  currency: string,
  item: IFollowPPromiseItem = {} as IFollowPPromiseItem,
  index,
  quoteSelected: VCotCotizacion,
  freight: GMCotFletes,
  isHeader?: boolean,
  itemsAllChecked?: boolean,
): InternalSalesItem => {
  let itemInternal: InternalSalesItem;
  if (!item.freightItem) {
    itemInternal = {
      data: item,
      index,
      backgroundColorByTypeItem: item?.TipoPartidaCotizacion,
      columnOptions: {
        typeOption: TypeOptionsColumn.CheckBoxNormal,
        isCheckHeader: isHeader,
        value: isHeader ? itemsAllChecked : item?.isSelected,
      },
      columnNumberItem: {
        number: item?.Index || 0,
        showArrow:
          (item.TipoPartidaCotizacion === 'Original' && item.IdCotPartidaCotizacionMadre) ||
          item.TipoPartidaCotizacion !== 'Original'
            ? true
            : false,
      },
      columnImgTypeItem: {
        value: item?.TipoPartidaCotizacion,
      },
      columnConcept: {
        availabilityKey: item?.DisponibilidadClave,
        cat: item?.Catalogo,
        typePresentation: item?.TipoPresentacion,
        presentation: item?.Presentacion,
        unity: item?.Unidad,
        description: item?.Descripcion,
        type: item?.Tipo,
        subType: item?.Subtipo,
        control: item?.Control,
        controlled: item?.Controlado,
        dateValidation: item?.FechaCaducado,
        proratedExpress:
          freight?.FleteExpress?.IdProveedor === item?.IdProveedorPrincipal &&
          !quoteSelected?.FleteDesglosado,
        author: item?.Autor ?? 'N/D',
        formatPublication: item?.FormatoPublicacion ?? 'N/D',
        typeMode: item?.MedioDifusion ?? 'N/D',
        datesSuggested: item?.datesTraining,
        dateAvailability: item?.FechaDisponibilidadBackOrder,
        alternate: item?.TotalAlternativo,
        complementary: item?.TotalComplementario,
        seeHistory: true,
      },
      // TODO: AGREGAR NOTAS DEL SISTEMA CUANDO SE DEFINAN
      columnNotes: showNotes
        ? item.Comentarios
          ? {
              systemNotes: null,
              itemNotes: item?.Comentarios,
            }
          : {
              systemNotes: null,
              itemNotes: null,
            }
        : null,
      columnBrand: {
        src: item?.imageHover,
        nameBrand: item?.NombreMarca,
      },
      columnDeliveryTime: {
        days: item?.TiempoEstimadoEntrega,
        isEdit: false,
        isFreight: freight?.FleteExpress?.IdProveedor === item?.IdProveedorPrincipal,
      },
      columnNumberPieces: {
        value: item?.NumeroDePiezas,
      },
      columnProFreight: {
        showColumn:
          freight?.FleteExpress !== null || freight?.FletesUltimaMilla?.length > 0
            ? !quoteSelected?.FleteDesglosado
            : false,
        value: item?.PrecioFleteNoDesglosado,
        currency: item?.ClaveMoneda,
      },
      columnSubtotal: {
        value: item?.PrecioCotizadoSubtotal,
        currency: item?.ClaveMoneda,
      },
      columnIva: {
        value: item?.PrecioIVA,
        currency: item?.ClaveMoneda,
      },
      columnTotalValue: {
        value: item?.PrecioCotizadoTotal,
        style: StylesColumnTotalValue.General,
        listPrice: item?.PrecioListaConvertido,
        currency: item?.ClaveMoneda,
      },
    };
  } else {
    itemInternal = {
      data: item,
      index,
      columnOptions: {},
      columnNumberItem: {
        number: item?.Index || 0,
      },
      columnImgTypeItem: {},
      columnConcept: {
        nameFreight: item?.freightItem?.descriptionFreight,
      },
      columnBrand: {},
      columnDeliveryTime: {},
      columnNumberPieces: {},
      columnProFreight: {
        showColumn:
          freight?.FleteExpress !== null || freight?.FletesUltimaMilla?.length > 0
            ? !quoteSelected?.FleteDesglosado
            : false,
      },
      columnSubtotal: {
        value: item?.freightItem?.subtotal,
        currency,
      },
      columnIva: {
        value: item?.freightItem?.iva || 0,
        currency,
      },
      columnTotalValue: {
        value: item?.freightItem?.total,
        style: StylesColumnTotalValue.General,
        currency,
      },
    };
  }
  return itemInternal;
};

const buildItemFreight = (
  quoteSelected: VCotCotizacion,
  items: IFollowPPromiseItem[],
  freight: GMCotFletes,
): IFollowPPromiseItem[] => {
  let itemsQuotation: IFollowPPromiseItem[] = items;
  if (freight?.FleteExpress !== null || freight?.FletesUltimaMilla?.length > 0) {
    if (quoteSelected?.FleteDesglosado) {
      //DOCS: Crear la partida de flete
      const freightItem: IFreightItem = {
        descriptionFreight: freight?.FleteExpress?.IdCotCotizacionFleteExpress
          ? FREIGHT_EXPRESS
          : FREIGHTS_LAST_MILE,
        subtotal: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress, {
          subtotal: true,
        }),
        iva: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress, {iva: true}),
        total: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress),
      };
      itemsQuotation = concat(items, [{freightItem} as IFollowPPromiseItem]);
    }
  }
  return itemsQuotation;
};

export {
  FollowPurchasePromiseStatus,
  buildFollowPurchasePromiseFromDashboard,
  buildItemsFollowPurchase,
  buildItemFreight,
  mapFollowPurchasePromiseApiResponse,
  mapFollowPurchasePromiseState,
};
