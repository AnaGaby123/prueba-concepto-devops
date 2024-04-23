/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TipoAjustePrecioObj } from '../models/tipo-ajuste-precio-obj';
import { TipoAjusteTEntregaFleteExpressObj } from '../models/tipo-ajuste-tentrega-flete-express-obj';
import { TipoAjusteTEntregaMenosDosDiasObj } from '../models/tipo-ajuste-tentrega-menos-dos-dias-obj';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionCerrarOfertaPopsAjustesService extends __BaseService {
  static readonly CerrarOfertaTipoAjusteObtenerPrecioPath = '/CerrarOferta/AjusteOferta/Precio';
  static readonly CerrarOfertaTipoAjusteObtenerTiempoDeEntregaFleteExpressPath = '/CerrarOferta/AjusteOferta/TiempoDeEntregaFleteExpress';
  static readonly CerrarOfertaTipoAjusteObtenerTiempoDeEntregaMenosDosDiasPath = '/CerrarOferta/AjusteOferta/TiempoDeEntregaMenosDosDias';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Servicio para obtener Partidas con su ajuste de oferta de tipo Precio
   * de una Cotizacion
   * @param IdCotCotizacion Identificador de CotCotizacion
   * @return OK
   */
  CerrarOfertaTipoAjusteObtenerPrecioResponse(IdCotCotizacion: string): __Observable<__StrictHttpResponse<Array<TipoAjustePrecioObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdCotCotizacion != null) __params = __params.set('IdCotCotizacion', IdCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CerrarOferta/AjusteOferta/Precio`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TipoAjustePrecioObj>>;
      })
    );
  }
  /**
   * Servicio para obtener Partidas con su ajuste de oferta de tipo Precio
   * de una Cotizacion
   * @param IdCotCotizacion Identificador de CotCotizacion
   * @return OK
   */
  CerrarOfertaTipoAjusteObtenerPrecio(IdCotCotizacion: string): __Observable<Array<TipoAjustePrecioObj>> {
    return this.CerrarOfertaTipoAjusteObtenerPrecioResponse(IdCotCotizacion).pipe(
      __map(_r => _r.body as Array<TipoAjustePrecioObj>)
    );
  }

  /**
   * Servicio para obtener marcas con su ajuste de oferta de una
   * cotizacion
   * @param IdCotCotizacion Identificador de CotCotizacion
   * @return OK
   */
  CerrarOfertaTipoAjusteObtenerTiempoDeEntregaFleteExpressResponse(IdCotCotizacion: string): __Observable<__StrictHttpResponse<Array<TipoAjusteTEntregaFleteExpressObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdCotCotizacion != null) __params = __params.set('IdCotCotizacion', IdCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CerrarOferta/AjusteOferta/TiempoDeEntregaFleteExpress`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TipoAjusteTEntregaFleteExpressObj>>;
      })
    );
  }
  /**
   * Servicio para obtener marcas con su ajuste de oferta de una
   * cotizacion
   * @param IdCotCotizacion Identificador de CotCotizacion
   * @return OK
   */
  CerrarOfertaTipoAjusteObtenerTiempoDeEntregaFleteExpress(IdCotCotizacion: string): __Observable<Array<TipoAjusteTEntregaFleteExpressObj>> {
    return this.CerrarOfertaTipoAjusteObtenerTiempoDeEntregaFleteExpressResponse(IdCotCotizacion).pipe(
      __map(_r => _r.body as Array<TipoAjusteTEntregaFleteExpressObj>)
    );
  }

  /**
   * Servicio para obtener marcas con su ajuste de oferta de una
   * cotizacion
   * @param IdCotCotizacion Identificador de CotCotizacion
   * @return OK
   */
  CerrarOfertaTipoAjusteObtenerTiempoDeEntregaMenosDosDiasResponse(IdCotCotizacion: string): __Observable<__StrictHttpResponse<Array<TipoAjusteTEntregaMenosDosDiasObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdCotCotizacion != null) __params = __params.set('IdCotCotizacion', IdCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CerrarOferta/AjusteOferta/TiempoDeEntregaMenosDosDias`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TipoAjusteTEntregaMenosDosDiasObj>>;
      })
    );
  }
  /**
   * Servicio para obtener marcas con su ajuste de oferta de una
   * cotizacion
   * @param IdCotCotizacion Identificador de CotCotizacion
   * @return OK
   */
  CerrarOfertaTipoAjusteObtenerTiempoDeEntregaMenosDosDias(IdCotCotizacion: string): __Observable<Array<TipoAjusteTEntregaMenosDosDiasObj>> {
    return this.CerrarOfertaTipoAjusteObtenerTiempoDeEntregaMenosDosDiasResponse(IdCotCotizacion).pipe(
      __map(_r => _r.body as Array<TipoAjusteTEntregaMenosDosDiasObj>)
    );
  }
}

module ProcesosL01CotizacionCerrarOfertaPopsAjustesService {
}

export { ProcesosL01CotizacionCerrarOfertaPopsAjustesService }
