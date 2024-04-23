/* tslint:disable */
import { VProveedorRegistrarDespachoDetalle } from './vproveedor-registrar-despacho-detalle';
export interface RegistrarDespachoGraficaTotales {
  Importadores?: number;
  ListaVProveedorRegistrarDespachoDetalle?: Array<VProveedorRegistrarDespachoDetalle>;
  OrdenesDespacho?: number;
  Piezas?: number;
  PiezasATiempo?: number;
  PiezasFueraDeTiempo?: number;
  PiezasUrgentes?: number;
  Proveedores?: number;
  ValorTotalAduana?: number;
}
