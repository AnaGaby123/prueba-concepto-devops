/* tslint:disable */
import { AjOfEstrategiaCotizacion } from './aj-of-estrategia-cotizacion';
import { AjOfEstrategiaCotizacionTactica } from './aj-of-estrategia-cotizacion-tactica';
export interface GMEstrategia {
  ListaIdcotCotizacion?: Array<string>;
  ajOfEstrategiaCotizacion?: AjOfEstrategiaCotizacion;
  ajOfEstrategiaCotizacionTactica?: Array<AjOfEstrategiaCotizacionTactica>;
}
