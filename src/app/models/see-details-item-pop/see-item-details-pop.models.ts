import {VProducto} from 'api-catalogos';

export interface SeeItemDetailsPopTop {
  srcImageTypePresentation: string; //DOCS: Src de la imagen de presentación del producto
  srcImageBrand: string; // DOCS: Src de la imagen de la marca del producto
  srcImageAvailability: string; // DOCS: src de la imagen de disponibilidad del producto
  srcImageTypeItem: string; // DOCS: src de la imagen de tipo de producto
  cat: string; // Docs: Numero de catalogo
  typePresentation: string; // Docs: Tipo de presentación del producto
  amountPresentation: string; // DOCS: Cantidad de presentación del producto
  unitProduct: string; // DOCS: Unidad de Medida del producto
  typeUse: string; // Docs: Tipo de uso del producto ( Farmacopéico, no Farmacopéico)
  description: string; // DOCS: descripción del producto
  type: string; //DOCS: Tipo (pertenece a la familia del producto)
  subtype: string; //DOCS: Subtipo (pertenece a la familia del producto)
  control: string; //DOCS: Control (pertenece a la familia del producto)
  isControlled: boolean; // DOCS: controlled
  nameProvider: string; //DOCS: Nombre del proveedor
  nameBrand: string; // DOCS: Nombre de la marca
  tee: number; //DOCS: Dias de Tiempo Estimado de Entrega
  unitPrice: number; // DOCS: Precio Unitario Cotizado
  currency: string; // DOCS: ClaveMoneda
  publication: InfoPublication; // DOCS: Información  del producto tipo publicación
  training: InfoTraining; // Docs: Información del producto cuando es de capacitación
}

//DOCS: Información adicional del producto  tipo publicación
interface InfoPublication {
  formatPublication: string; //DOCS: Formato de la publicacion
  nameAuthor: string; // DOCS: Nombre del autor de la publicación
}

//DOCS: Información adicional del producto  tipo capacitación
interface InfoTraining {
  typeMode: string; // DOCS: Medio de difusión de la capacitación (presencial en linea, en linea etc)
  timeEvent: number; // DOCS: Duración del evento
  numberPerson: number; // DOCS: Número de personas de la capacitación
}

//DOCS: Detalles de partida en la parte inferior
export interface SeeItemDetailsPopBottom {
  isControlled: boolean; // DOCS: Es controlado
  numberItem: number; //DOCS: Numero de la partida
  amount: number; // DOCS: Cantida de piezas
  dateValidation: string; //DOCS: Fecha vigencia curaduria
  dateExpiration: string; //DOCS: Fecha de Caducidad
  nameBatch: string; //DOCS: Nombre del lote
  edition: string;
}
