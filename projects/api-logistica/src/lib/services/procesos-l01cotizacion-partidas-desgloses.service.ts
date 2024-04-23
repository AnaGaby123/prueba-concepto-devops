/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CotProductoOferta } from '../models/cot-producto-oferta';
import { GMCotProductoOferta } from '../models/gmcot-producto-oferta';
import { QueryResultCotProductoOferta } from '../models/query-result-cot-producto-oferta';
import { QueryInfo } from '../models/query-info';
import { VOfertaProducto } from '../models/voferta-producto';
import { QueryResultVOfertaProducto } from '../models/query-result-voferta-producto';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionPartidasDesglosesService extends __BaseService {
  static readonly cotProductoOfertaObtenerPath = '/cotProductoOferta/ObtenerCotProductoOferta';
  static readonly cotProductoOfertaGetCotProductoOfertaTemporalPath = '/cotProductoOferta/ObtenerCotProductoOferta';
  static readonly cotProductoOfertaGetsCotProductoOfertaTemporalPath = '/cotProductoOferta/ObtenerCotProductoOfertas';
  static readonly cotProductoOfertaGuardarOActualizarPath = '/cotProductoOferta/GuardarOActualizarCotProductoOferta';
  static readonly cotProductoOfertaQueryResultPath = '/cotProductoOferta';
  static readonly cotProductoOfertaDesactivarPath = '/cotProductoOferta';
  static readonly vOfertaProductoObtenerPath = '/vOfertaProducto';
  static readonly vOfertaProductoQueryResultPath = '/vOfertaProducto';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un cotProductoOferta por su idCotProductoOferta
   * @param idCotProductoOferta identificador del cotProductoOferta
   * @return OK
   */
  cotProductoOfertaObtenerResponse(idCotProductoOferta: string): __Observable<__StrictHttpResponse<CotProductoOferta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotProductoOferta != null) __params = __params.set('idCotProductoOferta', idCotProductoOferta.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotProductoOferta/ObtenerCotProductoOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotProductoOferta>;
      })
    );
  }
  /**
   * Obtener un cotProductoOferta por su idCotProductoOferta
   * @param idCotProductoOferta identificador del cotProductoOferta
   * @return OK
   */
  cotProductoOfertaObtener(idCotProductoOferta: string): __Observable<CotProductoOferta> {
    return this.cotProductoOfertaObtenerResponse(idCotProductoOferta).pipe(
      __map(_r => _r.body as CotProductoOferta)
    );
  }

  /**
   * GetCotProductoOfertaTemporal cotProductoOferta
   * @param params The `ProcesosL01CotizacionPartidasDesglosesService.CotProductoOfertaGetCotProductoOfertaTemporalParams` containing the following parameters:
   *
   * - `NumeroDePiezas`:
   *
   * - `IdProducto`:
   *
   * - `IdClient`:
   *
   * - `IdCatMoneda`:
   *
   * @return OK
   */
  cotProductoOfertaGetCotProductoOfertaTemporalResponse(params: ProcesosL01CotizacionPartidasDesglosesService.CotProductoOfertaGetCotProductoOfertaTemporalParams): __Observable<__StrictHttpResponse<CotProductoOferta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.NumeroDePiezas != null) __params = __params.set('NumeroDePiezas', params.NumeroDePiezas.toString());
    if (params.IdProducto != null) __params = __params.set('IdProducto', params.IdProducto.toString());
    if (params.IdClient != null) __params = __params.set('IdClient', params.IdClient.toString());
    if (params.IdCatMoneda != null) __params = __params.set('IdCatMoneda', params.IdCatMoneda.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotProductoOferta/ObtenerCotProductoOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotProductoOferta>;
      })
    );
  }
  /**
   * GetCotProductoOfertaTemporal cotProductoOferta
   * @param params The `ProcesosL01CotizacionPartidasDesglosesService.CotProductoOfertaGetCotProductoOfertaTemporalParams` containing the following parameters:
   *
   * - `NumeroDePiezas`:
   *
   * - `IdProducto`:
   *
   * - `IdClient`:
   *
   * - `IdCatMoneda`:
   *
   * @return OK
   */
  cotProductoOfertaGetCotProductoOfertaTemporal(params: ProcesosL01CotizacionPartidasDesglosesService.CotProductoOfertaGetCotProductoOfertaTemporalParams): __Observable<CotProductoOferta> {
    return this.cotProductoOfertaGetCotProductoOfertaTemporalResponse(params).pipe(
      __map(_r => _r.body as CotProductoOferta)
    );
  }

  /**
   * GetsCotProductoOfertaTemporal cotProductoOferta
   * @param GMCotProductoOferta undefined
   * @return OK
   */
  cotProductoOfertaGetsCotProductoOfertaTemporalResponse(GMCotProductoOferta: GMCotProductoOferta): __Observable<__StrictHttpResponse<Array<CotProductoOferta>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMCotProductoOferta;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotProductoOferta/ObtenerCotProductoOfertas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CotProductoOferta>>;
      })
    );
  }
  /**
   * GetsCotProductoOfertaTemporal cotProductoOferta
   * @param GMCotProductoOferta undefined
   * @return OK
   */
  cotProductoOfertaGetsCotProductoOfertaTemporal(GMCotProductoOferta: GMCotProductoOferta): __Observable<Array<CotProductoOferta>> {
    return this.cotProductoOfertaGetsCotProductoOfertaTemporalResponse(GMCotProductoOferta).pipe(
      __map(_r => _r.body as Array<CotProductoOferta>)
    );
  }

  /**
   * Guardar o actualizar un cotProductoOferta
   * @param productoOferta cotProductoOferta a actualizar o guardar
   * @return OK
   */
  cotProductoOfertaGuardarOActualizarResponse(productoOferta: CotProductoOferta): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = productoOferta;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotProductoOferta/GuardarOActualizarCotProductoOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * Guardar o actualizar un cotProductoOferta
   * @param productoOferta cotProductoOferta a actualizar o guardar
   * @return OK
   */
  cotProductoOfertaGuardarOActualizar(productoOferta: CotProductoOferta): __Observable<string> {
    return this.cotProductoOfertaGuardarOActualizarResponse(productoOferta).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotProductoOferta.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotProductoOfertaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotProductoOferta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotProductoOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotProductoOferta>;
      })
    );
  }
  /**
   * Obtener lista de cotProductoOferta.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotProductoOfertaQueryResult(info: QueryInfo): __Observable<QueryResultCotProductoOferta> {
    return this.cotProductoOfertaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotProductoOferta)
    );
  }

  /**
   * Desactivar cotProductoOferta
   * @param idCotProductoOferta undefined
   * @return OK
   */
  cotProductoOfertaDesactivarResponse(idCotProductoOferta: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotProductoOferta != null) __params = __params.set('idCotProductoOferta', idCotProductoOferta.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotProductoOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * Desactivar cotProductoOferta
   * @param idCotProductoOferta undefined
   * @return OK
   */
  cotProductoOfertaDesactivar(idCotProductoOferta: string): __Observable<string> {
    return this.cotProductoOfertaDesactivarResponse(idCotProductoOferta).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener vOfertaProducto
   * @param idCliente undefined
   * @return OK
   */
  vOfertaProductoObtenerResponse(idCliente: string): __Observable<__StrictHttpResponse<VOfertaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCliente != null) __params = __params.set('idCliente', idCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vOfertaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VOfertaProducto>;
      })
    );
  }
  /**
   * Obtener vOfertaProducto
   * @param idCliente undefined
   * @return OK
   */
  vOfertaProductoObtener(idCliente: string): __Observable<VOfertaProducto> {
    return this.vOfertaProductoObtenerResponse(idCliente).pipe(
      __map(_r => _r.body as VOfertaProducto)
    );
  }

  /**
   * Consultar lista paginada de vOfertaProducto
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOfertaProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVOfertaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vOfertaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVOfertaProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de vOfertaProducto
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vOfertaProductoQueryResult(info: QueryInfo): __Observable<QueryResultVOfertaProducto> {
    return this.vOfertaProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVOfertaProducto)
    );
  }
}

module ProcesosL01CotizacionPartidasDesglosesService {

  /**
   * Parameters for cotProductoOfertaGetCotProductoOfertaTemporal
   */
  export interface CotProductoOfertaGetCotProductoOfertaTemporalParams {
    NumeroDePiezas: number;
    IdProducto: string;
    IdClient: string;
    IdCatMoneda: string;
  }
}

export { ProcesosL01CotizacionPartidasDesglosesService }
