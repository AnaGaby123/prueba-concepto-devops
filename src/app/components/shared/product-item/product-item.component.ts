import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ENUM_PRODUCT_FAMILY_KEY} from '@appUtil/common.protocols';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() backGroundColor = 'default'; // DOCS cambiara el color de fondo del componente y su hover
  @Input() borderColorWhite = false; // DOCS muestra un borde de color blanco al ser true
  @Input() product: IProductCardItem; // DOCS Objeto de tipo IProducto a pintar
  @Input() showAvailability = false; // DOCS al ser true mostrara los indicadores de disponibilidad
  @Input() showCheck = false; // DOCS al ser true mostrara el check
  @Input() showIndex = true;
  @Output() emitResponse: EventEmitter<IProductLinked> = new EventEmitter<IProductLinked>();
  readonly productsType = ENUM_PRODUCT_FAMILY_KEY;

  emitValue(value) {
    const productLinked: IProductLinked = {
      value,
      product: this.product,
    };
    this.emitResponse.emit(productLinked);
  }
}

export interface IProductLinked {
  product: IProductCardItem;
  value: boolean;
}

export interface IProductCardItem {
  Activo?: boolean;
  ActivoConfiguracion?: boolean;
  Catalogo: string;
  Controlado: boolean;
  Descripcion: string;
  Disponibilidad: string;
  IdProducto: string;
  IdProductoAlternativo?: string;
  IdProductoAlternativoRelacion?: string;
  IdProductoComplementarioRelacion?: string;
  ImagenMarca?: string;
  ImagenProducto?: string;
  Index?: number;
  PrecioLista: number;
  Presentacion: string;
  Subtipo: string;
  Tipo: string;
  TipoProductoClave: string;
  TotalAlternativo: number;
  TotalComplementario: number;
  Unidad: string;
  Uso: string;
}
