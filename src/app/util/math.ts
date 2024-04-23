// DOCS Funcion que devuelve el porcentaje calculado entre un precio de venta con un precio de lista
import {OptionsGetTotals} from '@appUtil/common.protocols';

export const getPercentagePriceList = (salePrice: number, listPrice: number) =>
  Math.abs((salePrice - listPrice) / listPrice) * 100;

// DOCS Funcion que devuelve un objeto que devuleve el porcentaje calculado entre un precio de venta con un precio de lista y si este es negativo
export const getObjectPercentagePriceList = (
  salePrice: number,
  listPrice: number,
): {isNegative: boolean; percentage: number} => ({
  isNegative: salePrice < listPrice,
  percentage: getPercentagePriceList(salePrice, listPrice),
});

//DOCS: Función que obtiene el subtotal, iva y total de una partida
export const getTotalsItem = (
  option: OptionsGetTotals,
  numberPieces: number,
  unitPrice: number,
  hasIVA: boolean,
  percentageIVA: number,
  priceFreight: number,
  withIva = true,
) => {
  const subtotal: number = getAmountSubtotal(numberPieces, unitPrice, priceFreight);
  const iva: number = getAmountIva(subtotal, hasIVA, percentageIVA);
  const total: number = getAmountTotal(subtotal, iva, withIva);
  switch (option) {
    case OptionsGetTotals.subtotal:
      return subtotal;
      break;
    case OptionsGetTotals.iva:
      return iva;
      break;
    case OptionsGetTotals.total:
      return total;
      break;
  }
};

//DOCS: Función que obtiene el subtotal de una partida
const getAmountSubtotal = (
  numberPieces: number,
  unitPrice: number,
  priceFreight: number,
): number => {
  return numberPieces * unitPrice + priceFreight;
};

//DOCS: Función que obtiene el iva de una partida evaluando si gravaIva
const getAmountIva = (subtotal: number, hasIva: boolean, percentageIVA: number): number => {
  //DOCS: Descomentar cuando ye se tenga definida la lógica de los productos
  if (!hasIva) {
    return 0;
  }
  return subtotal * (percentageIVA > 0 ? percentageIVA : 0.16);
};

//DOCS: Función que obtiene el total de una partida
const getAmountTotal = (subtotal: number, IVA: number, withIva: boolean): number => {
  if (!withIva) {
    return Number(subtotal.toFixed(6));
  }
  return Number((subtotal + IVA).toFixed(6));
};

//DOCS: Función que obtiene el subtotal, iva y total de una partida
export const getTotalsItemPretramitar = (
  option: OptionsGetTotals,
  numberPieces: number,
  unitPrice: number,
  hasIVA: boolean,
  percentageIVA: number,
  withIva = true,
) => {
  const subtotal: number = getAmountSubtotalPretramitar(numberPieces, unitPrice);
  const iva: number = getAmountIvaPretramitar(subtotal, hasIVA, percentageIVA);
  const total: number = getAmountTotalPretramitar(subtotal, iva, withIva);
  switch (option) {
    case OptionsGetTotals.subtotal:
      return subtotal;
      break;
    case OptionsGetTotals.iva:
      return iva;
      break;
    case OptionsGetTotals.total:
      return total;
      break;
  }
};

//DOCS: Función que obtiene el subtotal de una partida
const getAmountSubtotalPretramitar = (numberPieces: number, unitPrice: number): number => {
  return numberPieces * unitPrice;
};

//DOCS: Función que obtiene el iva de una partida evaluando si gravaIva
const getAmountIvaPretramitar = (
  subtotal: number,
  hasIva: boolean,
  percentageIVA: number,
): number => {
  //DOCS: Descomentar cuando ye se tenga definida la lógica de los productos
  if (!hasIva) {
    return 0;
  }
  return subtotal * (percentageIVA > 0 ? percentageIVA : 0.16);
};

//DOCS: Función que obtiene el total de una partida
const getAmountTotalPretramitar = (subtotal: number, IVA: number, withIva: boolean): number => {
  if (!withIva) {
    return subtotal;
  }
  return subtotal + IVA;
};
