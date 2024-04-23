/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FcppOrdenDePago } from '../models/fcpp-orden-de-pago';
import { QueryResultFcppOrdenDePago } from '../models/query-result-fcpp-orden-de-pago';
import { QueryInfo } from '../models/query-info';
import { FppEjecucionOrdenDePago } from '../models/fpp-ejecucion-orden-de-pago';
import { FcppSeguimientoFactura } from '../models/fcpp-seguimiento-factura';
import { QueryResultFcppSeguimientoFactura } from '../models/query-result-fcpp-seguimiento-factura';
import { FcppSeguimientoFacturaDirecto } from '../models/fcpp-seguimiento-factura-directo';
import { QueryResultFcppSeguimientoFacturaDirecto } from '../models/query-result-fcpp-seguimiento-factura-directo';
import { FcppSeguimientoFacturaIndirecto } from '../models/fcpp-seguimiento-factura-indirecto';
import { QueryResultFcppSeguimientoFacturaIndirecto } from '../models/query-result-fcpp-seguimiento-factura-indirecto';
import { FcppSeguimientoFacturaIndirectoArchivo } from '../models/fcpp-seguimiento-factura-indirecto-archivo';
import { QueryResultFcppSeguimientoFacturaIndirectoArchivo } from '../models/query-result-fcpp-seguimiento-factura-indirecto-archivo';
import { FcppSeguimientoFacturaOrdenDePago } from '../models/fcpp-seguimiento-factura-orden-de-pago';
import { QueryResultFcppSeguimientoFacturaOrdenDePago } from '../models/query-result-fcpp-seguimiento-factura-orden-de-pago';
import { FppArchivoSeguimientoPagoFactura } from '../models/fpp-archivo-seguimiento-pago-factura';
import { QueryResultFppArchivoSeguimientoPagoFactura } from '../models/query-result-fpp-archivo-seguimiento-pago-factura';
import { QueryResultFppEjecucionOrdenDePago } from '../models/query-result-fpp-ejecucion-orden-de-pago';
import { FppEjecucionOrdenDePagoDestino } from '../models/fpp-ejecucion-orden-de-pago-destino';
import { QueryResultFppEjecucionOrdenDePagoDestino } from '../models/query-result-fpp-ejecucion-orden-de-pago-destino';
import { FppSeguimientoPagoFactura } from '../models/fpp-seguimiento-pago-factura';
import { QueryResultFppSeguimientoPagoFactura } from '../models/query-result-fpp-seguimiento-pago-factura';
@Injectable({
  providedIn: 'root',
})
class PagosService extends __BaseService {
  static readonly fcppOrdenDePagoObtenerPath = '/fcppOrdenDePago';
  static readonly fcppOrdenDePagoGuardarOActualizarPath = '/fcppOrdenDePago';
  static readonly fcppOrdenDePagoQueryResultPath = '/fcppOrdenDePago';
  static readonly fcppOrdenDePagoDesactivarPath = '/fcppOrdenDePago';
  static readonly fcppOrdenDePagoExtensionsProcessPath = '/fcppProgramarOrdenDePago';
  static readonly fcppSeguimientoFacturaObtenerPath = '/fcppSeguimientoFactura';
  static readonly fcppSeguimientoFacturaGuardarOActualizarPath = '/fcppSeguimientoFactura';
  static readonly fcppSeguimientoFacturaQueryResultPath = '/fcppSeguimientoFactura';
  static readonly fcppSeguimientoFacturaDesactivarPath = '/fcppSeguimientoFactura';
  static readonly fcppSeguimientoFacturaDirectoObtenerPath = '/fcppSeguimientoFacturaDirecto';
  static readonly fcppSeguimientoFacturaDirectoGuardarOActualizarPath = '/fcppSeguimientoFacturaDirecto';
  static readonly fcppSeguimientoFacturaDirectoQueryResultPath = '/fcppSeguimientoFacturaDirecto';
  static readonly fcppSeguimientoFacturaDirectoDesactivarPath = '/fcppSeguimientoFacturaDirecto';
  static readonly fcppSeguimientoFacturaIndirectoObtenerPath = '/fcppSeguimientoFacturaIndirecto';
  static readonly fcppSeguimientoFacturaIndirectoGuardarOActualizarPath = '/fcppSeguimientoFacturaIndirecto';
  static readonly fcppSeguimientoFacturaIndirectoQueryResultPath = '/fcppSeguimientoFacturaIndirecto';
  static readonly fcppSeguimientoFacturaIndirectoDesactivarPath = '/fcppSeguimientoFacturaIndirecto';
  static readonly fcppSeguimientoFacturaIndirectoArchivoObtenerPath = '/fcppSeguimientoFacturaIndirectoArchivo';
  static readonly fcppSeguimientoFacturaIndirectoArchivoGuardarOActualizarPath = '/fcppSeguimientoFacturaIndirectoArchivo';
  static readonly fcppSeguimientoFacturaIndirectoArchivoQueryResultPath = '/fcppSeguimientoFacturaIndirectoArchivo';
  static readonly fcppSeguimientoFacturaIndirectoArchivoDesactivarPath = '/fcppSeguimientoFacturaIndirectoArchivo';
  static readonly fcppSeguimientoFacturaOrdenDePagoObtenerPath = '/fcppSeguimientoFacturaOrdenDePago';
  static readonly fcppSeguimientoFacturaOrdenDePagoGuardarOActualizarPath = '/fcppSeguimientoFacturaOrdenDePago';
  static readonly fcppSeguimientoFacturaOrdenDePagoQueryResultPath = '/fcppSeguimientoFacturaOrdenDePago';
  static readonly fcppSeguimientoFacturaOrdenDePagoDesactivarPath = '/fcppSeguimientoFacturaOrdenDePago';
  static readonly fppArchivoSeguimientoPagoFacturaObtenerPath = '/fppArchivoSeguimientoPagoFactura';
  static readonly fppArchivoSeguimientoPagoFacturaGuardarOActualizarPath = '/fppArchivoSeguimientoPagoFactura';
  static readonly fppArchivoSeguimientoPagoFacturaQueryResultPath = '/fppArchivoSeguimientoPagoFactura';
  static readonly fppArchivoSeguimientoPagoFacturaDesactivarPath = '/fppArchivoSeguimientoPagoFactura';
  static readonly fppEjecucionOrdenDePagoObtenerPath = '/fppEjecucionOrdenDePago';
  static readonly fppEjecucionOrdenDePagoGuardarOActualizarPath = '/fppEjecucionOrdenDePago';
  static readonly fppEjecucionOrdenDePagoQueryResultPath = '/fppEjecucionOrdenDePago';
  static readonly fppEjecucionOrdenDePagoDesactivarPath = '/fppEjecucionOrdenDePago';
  static readonly fppEjecucionOrdenDePagoDestinoObtenerPath = '/fppEjecucionOrdenDePagoDestino';
  static readonly fppEjecucionOrdenDePagoDestinoGuardarOActualizarPath = '/fppEjecucionOrdenDePagoDestino';
  static readonly fppEjecucionOrdenDePagoDestinoQueryResultPath = '/fppEjecucionOrdenDePagoDestino';
  static readonly fppEjecucionOrdenDePagoDestinoDesactivarPath = '/fppEjecucionOrdenDePagoDestino';
  static readonly fppSeguimientoPagoFacturaObtenerPath = '/fppSeguimientoPagoFactura';
  static readonly fppSeguimientoPagoFacturaGuardarOActualizarPath = '/fppSeguimientoPagoFactura';
  static readonly fppSeguimientoPagoFacturaQueryResultPath = '/fppSeguimientoPagoFactura';
  static readonly fppSeguimientoPagoFacturaDesactivarPath = '/fppSeguimientoPagoFactura';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener...
   * @param idfcppOrdenDePago Identificador..
   * @return OK
   */
  fcppOrdenDePagoObtenerResponse(idfcppOrdenDePago: string): __Observable<__StrictHttpResponse<FcppOrdenDePago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppOrdenDePago != null) __params = __params.set('idfcppOrdenDePago', idfcppOrdenDePago.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fcppOrdenDePago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FcppOrdenDePago>;
      })
    );
  }
  /**
   * Obtener...
   * @param idfcppOrdenDePago Identificador..
   * @return OK
   */
  fcppOrdenDePagoObtener(idfcppOrdenDePago: string): __Observable<FcppOrdenDePago> {
    return this.fcppOrdenDePagoObtenerResponse(idfcppOrdenDePago).pipe(
      __map(_r => _r.body as FcppOrdenDePago)
    );
  }

  /**
   * Guardar o actualizar un ....
   * @param fcppOrdenDePago Objeto de ....
   * @return OK
   */
  fcppOrdenDePagoGuardarOActualizarResponse(fcppOrdenDePago: FcppOrdenDePago): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fcppOrdenDePago;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fcppOrdenDePago`,
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
   * Guardar o actualizar un ....
   * @param fcppOrdenDePago Objeto de ....
   * @return OK
   */
  fcppOrdenDePagoGuardarOActualizar(fcppOrdenDePago: FcppOrdenDePago): __Observable<string> {
    return this.fcppOrdenDePagoGuardarOActualizarResponse(fcppOrdenDePago).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fcppOrdenDePagoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFcppOrdenDePago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fcppOrdenDePago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFcppOrdenDePago>;
      })
    );
  }
  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fcppOrdenDePagoQueryResult(info: QueryInfo): __Observable<QueryResultFcppOrdenDePago> {
    return this.fcppOrdenDePagoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFcppOrdenDePago)
    );
  }

  /**
   * Desactivar un ....
   * @param idfcppOrdenDePago Identificador de .... a desactivar
   * @return OK
   */
  fcppOrdenDePagoDesactivarResponse(idfcppOrdenDePago: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppOrdenDePago != null) __params = __params.set('idfcppOrdenDePago', idfcppOrdenDePago.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fcppOrdenDePago`,
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
   * Desactivar un ....
   * @param idfcppOrdenDePago Identificador de .... a desactivar
   * @return OK
   */
  fcppOrdenDePagoDesactivar(idfcppOrdenDePago: string): __Observable<string> {
    return this.fcppOrdenDePagoDesactivarResponse(idfcppOrdenDePago).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Process fcppOrdenDePagoExtensions
   * @param idfcppOrdenDePago undefined
   * @return OK
   */
  fcppOrdenDePagoExtensionsProcessResponse(idfcppOrdenDePago: string): __Observable<__StrictHttpResponse<FppEjecucionOrdenDePago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppOrdenDePago != null) __params = __params.set('idfcppOrdenDePago', idfcppOrdenDePago.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/fcppProgramarOrdenDePago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FppEjecucionOrdenDePago>;
      })
    );
  }
  /**
   * Process fcppOrdenDePagoExtensions
   * @param idfcppOrdenDePago undefined
   * @return OK
   */
  fcppOrdenDePagoExtensionsProcess(idfcppOrdenDePago: string): __Observable<FppEjecucionOrdenDePago> {
    return this.fcppOrdenDePagoExtensionsProcessResponse(idfcppOrdenDePago).pipe(
      __map(_r => _r.body as FppEjecucionOrdenDePago)
    );
  }

  /**
   * Obtener...
   * @param idfcppSeguimientoFactura Identificador..
   * @return OK
   */
  fcppSeguimientoFacturaObtenerResponse(idfcppSeguimientoFactura: string): __Observable<__StrictHttpResponse<FcppSeguimientoFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppSeguimientoFactura != null) __params = __params.set('idfcppSeguimientoFactura', idfcppSeguimientoFactura.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fcppSeguimientoFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FcppSeguimientoFactura>;
      })
    );
  }
  /**
   * Obtener...
   * @param idfcppSeguimientoFactura Identificador..
   * @return OK
   */
  fcppSeguimientoFacturaObtener(idfcppSeguimientoFactura: string): __Observable<FcppSeguimientoFactura> {
    return this.fcppSeguimientoFacturaObtenerResponse(idfcppSeguimientoFactura).pipe(
      __map(_r => _r.body as FcppSeguimientoFactura)
    );
  }

  /**
   * Guardar o actualizar un ....
   * @param fcppSeguimientoFactura Objeto de ....
   * @return OK
   */
  fcppSeguimientoFacturaGuardarOActualizarResponse(fcppSeguimientoFactura: FcppSeguimientoFactura): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fcppSeguimientoFactura;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fcppSeguimientoFactura`,
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
   * Guardar o actualizar un ....
   * @param fcppSeguimientoFactura Objeto de ....
   * @return OK
   */
  fcppSeguimientoFacturaGuardarOActualizar(fcppSeguimientoFactura: FcppSeguimientoFactura): __Observable<string> {
    return this.fcppSeguimientoFacturaGuardarOActualizarResponse(fcppSeguimientoFactura).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fcppSeguimientoFacturaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFcppSeguimientoFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fcppSeguimientoFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFcppSeguimientoFactura>;
      })
    );
  }
  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fcppSeguimientoFacturaQueryResult(info: QueryInfo): __Observable<QueryResultFcppSeguimientoFactura> {
    return this.fcppSeguimientoFacturaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFcppSeguimientoFactura)
    );
  }

  /**
   * Desactivar un ....
   * @param idfcppSeguimientoFactura Identificador de .... a desactivar
   * @return OK
   */
  fcppSeguimientoFacturaDesactivarResponse(idfcppSeguimientoFactura: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppSeguimientoFactura != null) __params = __params.set('idfcppSeguimientoFactura', idfcppSeguimientoFactura.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fcppSeguimientoFactura`,
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
   * Desactivar un ....
   * @param idfcppSeguimientoFactura Identificador de .... a desactivar
   * @return OK
   */
  fcppSeguimientoFacturaDesactivar(idfcppSeguimientoFactura: string): __Observable<string> {
    return this.fcppSeguimientoFacturaDesactivarResponse(idfcppSeguimientoFactura).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener...
   * @param idfcppSeguimientoFacturaDirecto Identificador..
   * @return OK
   */
  fcppSeguimientoFacturaDirectoObtenerResponse(idfcppSeguimientoFacturaDirecto: string): __Observable<__StrictHttpResponse<FcppSeguimientoFacturaDirecto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppSeguimientoFacturaDirecto != null) __params = __params.set('idfcppSeguimientoFacturaDirecto', idfcppSeguimientoFacturaDirecto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fcppSeguimientoFacturaDirecto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FcppSeguimientoFacturaDirecto>;
      })
    );
  }
  /**
   * Obtener...
   * @param idfcppSeguimientoFacturaDirecto Identificador..
   * @return OK
   */
  fcppSeguimientoFacturaDirectoObtener(idfcppSeguimientoFacturaDirecto: string): __Observable<FcppSeguimientoFacturaDirecto> {
    return this.fcppSeguimientoFacturaDirectoObtenerResponse(idfcppSeguimientoFacturaDirecto).pipe(
      __map(_r => _r.body as FcppSeguimientoFacturaDirecto)
    );
  }

  /**
   * Guardar o actualizar un ....
   * @param fcppSeguimientoFacturaDirecto Objeto de ....
   * @return OK
   */
  fcppSeguimientoFacturaDirectoGuardarOActualizarResponse(fcppSeguimientoFacturaDirecto: FcppSeguimientoFacturaDirecto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fcppSeguimientoFacturaDirecto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fcppSeguimientoFacturaDirecto`,
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
   * Guardar o actualizar un ....
   * @param fcppSeguimientoFacturaDirecto Objeto de ....
   * @return OK
   */
  fcppSeguimientoFacturaDirectoGuardarOActualizar(fcppSeguimientoFacturaDirecto: FcppSeguimientoFacturaDirecto): __Observable<string> {
    return this.fcppSeguimientoFacturaDirectoGuardarOActualizarResponse(fcppSeguimientoFacturaDirecto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fcppSeguimientoFacturaDirectoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFcppSeguimientoFacturaDirecto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fcppSeguimientoFacturaDirecto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFcppSeguimientoFacturaDirecto>;
      })
    );
  }
  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fcppSeguimientoFacturaDirectoQueryResult(info: QueryInfo): __Observable<QueryResultFcppSeguimientoFacturaDirecto> {
    return this.fcppSeguimientoFacturaDirectoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFcppSeguimientoFacturaDirecto)
    );
  }

  /**
   * Desactivar un ....
   * @param idfcppSeguimientoFacturaDirecto Identificador de .... a desactivar
   * @return OK
   */
  fcppSeguimientoFacturaDirectoDesactivarResponse(idfcppSeguimientoFacturaDirecto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppSeguimientoFacturaDirecto != null) __params = __params.set('idfcppSeguimientoFacturaDirecto', idfcppSeguimientoFacturaDirecto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fcppSeguimientoFacturaDirecto`,
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
   * Desactivar un ....
   * @param idfcppSeguimientoFacturaDirecto Identificador de .... a desactivar
   * @return OK
   */
  fcppSeguimientoFacturaDirectoDesactivar(idfcppSeguimientoFacturaDirecto: string): __Observable<string> {
    return this.fcppSeguimientoFacturaDirectoDesactivarResponse(idfcppSeguimientoFacturaDirecto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener...
   * @param idfcppSeguimientoFacturaIndirecto Identificador..
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoObtenerResponse(idfcppSeguimientoFacturaIndirecto: string): __Observable<__StrictHttpResponse<FcppSeguimientoFacturaIndirecto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppSeguimientoFacturaIndirecto != null) __params = __params.set('idfcppSeguimientoFacturaIndirecto', idfcppSeguimientoFacturaIndirecto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fcppSeguimientoFacturaIndirecto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FcppSeguimientoFacturaIndirecto>;
      })
    );
  }
  /**
   * Obtener...
   * @param idfcppSeguimientoFacturaIndirecto Identificador..
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoObtener(idfcppSeguimientoFacturaIndirecto: string): __Observable<FcppSeguimientoFacturaIndirecto> {
    return this.fcppSeguimientoFacturaIndirectoObtenerResponse(idfcppSeguimientoFacturaIndirecto).pipe(
      __map(_r => _r.body as FcppSeguimientoFacturaIndirecto)
    );
  }

  /**
   * Guardar o actualizar un ....
   * @param fcppSeguimientoFacturaIndirecto Objeto de ....
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoGuardarOActualizarResponse(fcppSeguimientoFacturaIndirecto: FcppSeguimientoFacturaIndirecto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fcppSeguimientoFacturaIndirecto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fcppSeguimientoFacturaIndirecto`,
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
   * Guardar o actualizar un ....
   * @param fcppSeguimientoFacturaIndirecto Objeto de ....
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoGuardarOActualizar(fcppSeguimientoFacturaIndirecto: FcppSeguimientoFacturaIndirecto): __Observable<string> {
    return this.fcppSeguimientoFacturaIndirectoGuardarOActualizarResponse(fcppSeguimientoFacturaIndirecto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFcppSeguimientoFacturaIndirecto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fcppSeguimientoFacturaIndirecto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFcppSeguimientoFacturaIndirecto>;
      })
    );
  }
  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoQueryResult(info: QueryInfo): __Observable<QueryResultFcppSeguimientoFacturaIndirecto> {
    return this.fcppSeguimientoFacturaIndirectoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFcppSeguimientoFacturaIndirecto)
    );
  }

  /**
   * Desactivar un ....
   * @param idfcppSeguimientoFacturaIndirecto Identificador de .... a desactivar
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoDesactivarResponse(idfcppSeguimientoFacturaIndirecto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppSeguimientoFacturaIndirecto != null) __params = __params.set('idfcppSeguimientoFacturaIndirecto', idfcppSeguimientoFacturaIndirecto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fcppSeguimientoFacturaIndirecto`,
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
   * Desactivar un ....
   * @param idfcppSeguimientoFacturaIndirecto Identificador de .... a desactivar
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoDesactivar(idfcppSeguimientoFacturaIndirecto: string): __Observable<string> {
    return this.fcppSeguimientoFacturaIndirectoDesactivarResponse(idfcppSeguimientoFacturaIndirecto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener...
   * @param idfcppSeguimientoFacturaIndirectoArchivo Identificador..
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoArchivoObtenerResponse(idfcppSeguimientoFacturaIndirectoArchivo: string): __Observable<__StrictHttpResponse<FcppSeguimientoFacturaIndirectoArchivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppSeguimientoFacturaIndirectoArchivo != null) __params = __params.set('idfcppSeguimientoFacturaIndirectoArchivo', idfcppSeguimientoFacturaIndirectoArchivo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fcppSeguimientoFacturaIndirectoArchivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FcppSeguimientoFacturaIndirectoArchivo>;
      })
    );
  }
  /**
   * Obtener...
   * @param idfcppSeguimientoFacturaIndirectoArchivo Identificador..
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoArchivoObtener(idfcppSeguimientoFacturaIndirectoArchivo: string): __Observable<FcppSeguimientoFacturaIndirectoArchivo> {
    return this.fcppSeguimientoFacturaIndirectoArchivoObtenerResponse(idfcppSeguimientoFacturaIndirectoArchivo).pipe(
      __map(_r => _r.body as FcppSeguimientoFacturaIndirectoArchivo)
    );
  }

  /**
   * Guardar o actualizar un ....
   * @param fcppSeguimientoFacturaIndirectoArchivo Objeto de ....
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoArchivoGuardarOActualizarResponse(fcppSeguimientoFacturaIndirectoArchivo: FcppSeguimientoFacturaIndirectoArchivo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fcppSeguimientoFacturaIndirectoArchivo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fcppSeguimientoFacturaIndirectoArchivo`,
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
   * Guardar o actualizar un ....
   * @param fcppSeguimientoFacturaIndirectoArchivo Objeto de ....
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoArchivoGuardarOActualizar(fcppSeguimientoFacturaIndirectoArchivo: FcppSeguimientoFacturaIndirectoArchivo): __Observable<string> {
    return this.fcppSeguimientoFacturaIndirectoArchivoGuardarOActualizarResponse(fcppSeguimientoFacturaIndirectoArchivo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoArchivoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFcppSeguimientoFacturaIndirectoArchivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fcppSeguimientoFacturaIndirectoArchivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFcppSeguimientoFacturaIndirectoArchivo>;
      })
    );
  }
  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoArchivoQueryResult(info: QueryInfo): __Observable<QueryResultFcppSeguimientoFacturaIndirectoArchivo> {
    return this.fcppSeguimientoFacturaIndirectoArchivoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFcppSeguimientoFacturaIndirectoArchivo)
    );
  }

  /**
   * Desactivar un ....
   * @param idfcppSeguimientoFacturaIndirectoArchivo Identificador de .... a desactivar
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoArchivoDesactivarResponse(idfcppSeguimientoFacturaIndirectoArchivo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppSeguimientoFacturaIndirectoArchivo != null) __params = __params.set('idfcppSeguimientoFacturaIndirectoArchivo', idfcppSeguimientoFacturaIndirectoArchivo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fcppSeguimientoFacturaIndirectoArchivo`,
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
   * Desactivar un ....
   * @param idfcppSeguimientoFacturaIndirectoArchivo Identificador de .... a desactivar
   * @return OK
   */
  fcppSeguimientoFacturaIndirectoArchivoDesactivar(idfcppSeguimientoFacturaIndirectoArchivo: string): __Observable<string> {
    return this.fcppSeguimientoFacturaIndirectoArchivoDesactivarResponse(idfcppSeguimientoFacturaIndirectoArchivo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener...
   * @param idfcppSeguimientoFacturaOrdenDePago Identificador..
   * @return OK
   */
  fcppSeguimientoFacturaOrdenDePagoObtenerResponse(idfcppSeguimientoFacturaOrdenDePago: string): __Observable<__StrictHttpResponse<FcppSeguimientoFacturaOrdenDePago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppSeguimientoFacturaOrdenDePago != null) __params = __params.set('idfcppSeguimientoFacturaOrdenDePago', idfcppSeguimientoFacturaOrdenDePago.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fcppSeguimientoFacturaOrdenDePago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FcppSeguimientoFacturaOrdenDePago>;
      })
    );
  }
  /**
   * Obtener...
   * @param idfcppSeguimientoFacturaOrdenDePago Identificador..
   * @return OK
   */
  fcppSeguimientoFacturaOrdenDePagoObtener(idfcppSeguimientoFacturaOrdenDePago: string): __Observable<FcppSeguimientoFacturaOrdenDePago> {
    return this.fcppSeguimientoFacturaOrdenDePagoObtenerResponse(idfcppSeguimientoFacturaOrdenDePago).pipe(
      __map(_r => _r.body as FcppSeguimientoFacturaOrdenDePago)
    );
  }

  /**
   * Guardar o actualizar un ....
   * @param fcppSeguimientoFacturaOrdenDePago Objeto de ....
   * @return OK
   */
  fcppSeguimientoFacturaOrdenDePagoGuardarOActualizarResponse(fcppSeguimientoFacturaOrdenDePago: FcppSeguimientoFacturaOrdenDePago): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fcppSeguimientoFacturaOrdenDePago;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fcppSeguimientoFacturaOrdenDePago`,
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
   * Guardar o actualizar un ....
   * @param fcppSeguimientoFacturaOrdenDePago Objeto de ....
   * @return OK
   */
  fcppSeguimientoFacturaOrdenDePagoGuardarOActualizar(fcppSeguimientoFacturaOrdenDePago: FcppSeguimientoFacturaOrdenDePago): __Observable<string> {
    return this.fcppSeguimientoFacturaOrdenDePagoGuardarOActualizarResponse(fcppSeguimientoFacturaOrdenDePago).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fcppSeguimientoFacturaOrdenDePagoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFcppSeguimientoFacturaOrdenDePago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fcppSeguimientoFacturaOrdenDePago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFcppSeguimientoFacturaOrdenDePago>;
      })
    );
  }
  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fcppSeguimientoFacturaOrdenDePagoQueryResult(info: QueryInfo): __Observable<QueryResultFcppSeguimientoFacturaOrdenDePago> {
    return this.fcppSeguimientoFacturaOrdenDePagoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFcppSeguimientoFacturaOrdenDePago)
    );
  }

  /**
   * Desactivar un ....
   * @param idfcppSeguimientoFacturaOrdenDePago Identificador de .... a desactivar
   * @return OK
   */
  fcppSeguimientoFacturaOrdenDePagoDesactivarResponse(idfcppSeguimientoFacturaOrdenDePago: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfcppSeguimientoFacturaOrdenDePago != null) __params = __params.set('idfcppSeguimientoFacturaOrdenDePago', idfcppSeguimientoFacturaOrdenDePago.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fcppSeguimientoFacturaOrdenDePago`,
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
   * Desactivar un ....
   * @param idfcppSeguimientoFacturaOrdenDePago Identificador de .... a desactivar
   * @return OK
   */
  fcppSeguimientoFacturaOrdenDePagoDesactivar(idfcppSeguimientoFacturaOrdenDePago: string): __Observable<string> {
    return this.fcppSeguimientoFacturaOrdenDePagoDesactivarResponse(idfcppSeguimientoFacturaOrdenDePago).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener...
   * @param idfppArchivoSeguimientoPagoFactura Identificador..
   * @return OK
   */
  fppArchivoSeguimientoPagoFacturaObtenerResponse(idfppArchivoSeguimientoPagoFactura: string): __Observable<__StrictHttpResponse<FppArchivoSeguimientoPagoFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfppArchivoSeguimientoPagoFactura != null) __params = __params.set('idfppArchivoSeguimientoPagoFactura', idfppArchivoSeguimientoPagoFactura.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fppArchivoSeguimientoPagoFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FppArchivoSeguimientoPagoFactura>;
      })
    );
  }
  /**
   * Obtener...
   * @param idfppArchivoSeguimientoPagoFactura Identificador..
   * @return OK
   */
  fppArchivoSeguimientoPagoFacturaObtener(idfppArchivoSeguimientoPagoFactura: string): __Observable<FppArchivoSeguimientoPagoFactura> {
    return this.fppArchivoSeguimientoPagoFacturaObtenerResponse(idfppArchivoSeguimientoPagoFactura).pipe(
      __map(_r => _r.body as FppArchivoSeguimientoPagoFactura)
    );
  }

  /**
   * Guardar o actualizar un ....
   * @param fppArchivoSeguimientoPagoFactura Objeto de ....
   * @return OK
   */
  fppArchivoSeguimientoPagoFacturaGuardarOActualizarResponse(fppArchivoSeguimientoPagoFactura: FppArchivoSeguimientoPagoFactura): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fppArchivoSeguimientoPagoFactura;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fppArchivoSeguimientoPagoFactura`,
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
   * Guardar o actualizar un ....
   * @param fppArchivoSeguimientoPagoFactura Objeto de ....
   * @return OK
   */
  fppArchivoSeguimientoPagoFacturaGuardarOActualizar(fppArchivoSeguimientoPagoFactura: FppArchivoSeguimientoPagoFactura): __Observable<string> {
    return this.fppArchivoSeguimientoPagoFacturaGuardarOActualizarResponse(fppArchivoSeguimientoPagoFactura).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fppArchivoSeguimientoPagoFacturaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFppArchivoSeguimientoPagoFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fppArchivoSeguimientoPagoFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFppArchivoSeguimientoPagoFactura>;
      })
    );
  }
  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fppArchivoSeguimientoPagoFacturaQueryResult(info: QueryInfo): __Observable<QueryResultFppArchivoSeguimientoPagoFactura> {
    return this.fppArchivoSeguimientoPagoFacturaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFppArchivoSeguimientoPagoFactura)
    );
  }

  /**
   * Desactivar un ....
   * @param idfppArchivoSeguimientoPagoFactura Identificador de .... a desactivar
   * @return OK
   */
  fppArchivoSeguimientoPagoFacturaDesactivarResponse(idfppArchivoSeguimientoPagoFactura: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfppArchivoSeguimientoPagoFactura != null) __params = __params.set('idfppArchivoSeguimientoPagoFactura', idfppArchivoSeguimientoPagoFactura.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fppArchivoSeguimientoPagoFactura`,
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
   * Desactivar un ....
   * @param idfppArchivoSeguimientoPagoFactura Identificador de .... a desactivar
   * @return OK
   */
  fppArchivoSeguimientoPagoFacturaDesactivar(idfppArchivoSeguimientoPagoFactura: string): __Observable<string> {
    return this.fppArchivoSeguimientoPagoFacturaDesactivarResponse(idfppArchivoSeguimientoPagoFactura).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener...
   * @param idfppEjecucionOrdenDePago Identificador..
   * @return OK
   */
  fppEjecucionOrdenDePagoObtenerResponse(idfppEjecucionOrdenDePago: string): __Observable<__StrictHttpResponse<FppEjecucionOrdenDePago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfppEjecucionOrdenDePago != null) __params = __params.set('idfppEjecucionOrdenDePago', idfppEjecucionOrdenDePago.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fppEjecucionOrdenDePago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FppEjecucionOrdenDePago>;
      })
    );
  }
  /**
   * Obtener...
   * @param idfppEjecucionOrdenDePago Identificador..
   * @return OK
   */
  fppEjecucionOrdenDePagoObtener(idfppEjecucionOrdenDePago: string): __Observable<FppEjecucionOrdenDePago> {
    return this.fppEjecucionOrdenDePagoObtenerResponse(idfppEjecucionOrdenDePago).pipe(
      __map(_r => _r.body as FppEjecucionOrdenDePago)
    );
  }

  /**
   * Guardar o actualizar un ....
   * @param fppEjecucionOrdenDePago Objeto de ....
   * @return OK
   */
  fppEjecucionOrdenDePagoGuardarOActualizarResponse(fppEjecucionOrdenDePago: FppEjecucionOrdenDePago): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fppEjecucionOrdenDePago;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fppEjecucionOrdenDePago`,
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
   * Guardar o actualizar un ....
   * @param fppEjecucionOrdenDePago Objeto de ....
   * @return OK
   */
  fppEjecucionOrdenDePagoGuardarOActualizar(fppEjecucionOrdenDePago: FppEjecucionOrdenDePago): __Observable<string> {
    return this.fppEjecucionOrdenDePagoGuardarOActualizarResponse(fppEjecucionOrdenDePago).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fppEjecucionOrdenDePagoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFppEjecucionOrdenDePago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fppEjecucionOrdenDePago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFppEjecucionOrdenDePago>;
      })
    );
  }
  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fppEjecucionOrdenDePagoQueryResult(info: QueryInfo): __Observable<QueryResultFppEjecucionOrdenDePago> {
    return this.fppEjecucionOrdenDePagoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFppEjecucionOrdenDePago)
    );
  }

  /**
   * Desactivar un ....
   * @param idfppEjecucionOrdenDePago Identificador de .... a desactivar
   * @return OK
   */
  fppEjecucionOrdenDePagoDesactivarResponse(idfppEjecucionOrdenDePago: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfppEjecucionOrdenDePago != null) __params = __params.set('idfppEjecucionOrdenDePago', idfppEjecucionOrdenDePago.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fppEjecucionOrdenDePago`,
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
   * Desactivar un ....
   * @param idfppEjecucionOrdenDePago Identificador de .... a desactivar
   * @return OK
   */
  fppEjecucionOrdenDePagoDesactivar(idfppEjecucionOrdenDePago: string): __Observable<string> {
    return this.fppEjecucionOrdenDePagoDesactivarResponse(idfppEjecucionOrdenDePago).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener...
   * @param idfppEjecucionOrdenDePagoDestino Identificador..
   * @return OK
   */
  fppEjecucionOrdenDePagoDestinoObtenerResponse(idfppEjecucionOrdenDePagoDestino: string): __Observable<__StrictHttpResponse<FppEjecucionOrdenDePagoDestino>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfppEjecucionOrdenDePagoDestino != null) __params = __params.set('idfppEjecucionOrdenDePagoDestino', idfppEjecucionOrdenDePagoDestino.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fppEjecucionOrdenDePagoDestino`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FppEjecucionOrdenDePagoDestino>;
      })
    );
  }
  /**
   * Obtener...
   * @param idfppEjecucionOrdenDePagoDestino Identificador..
   * @return OK
   */
  fppEjecucionOrdenDePagoDestinoObtener(idfppEjecucionOrdenDePagoDestino: string): __Observable<FppEjecucionOrdenDePagoDestino> {
    return this.fppEjecucionOrdenDePagoDestinoObtenerResponse(idfppEjecucionOrdenDePagoDestino).pipe(
      __map(_r => _r.body as FppEjecucionOrdenDePagoDestino)
    );
  }

  /**
   * Guardar o actualizar un ....
   * @param fppEjecucionOrdenDePagoDestino Objeto de ....
   * @return OK
   */
  fppEjecucionOrdenDePagoDestinoGuardarOActualizarResponse(fppEjecucionOrdenDePagoDestino: FppEjecucionOrdenDePagoDestino): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fppEjecucionOrdenDePagoDestino;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fppEjecucionOrdenDePagoDestino`,
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
   * Guardar o actualizar un ....
   * @param fppEjecucionOrdenDePagoDestino Objeto de ....
   * @return OK
   */
  fppEjecucionOrdenDePagoDestinoGuardarOActualizar(fppEjecucionOrdenDePagoDestino: FppEjecucionOrdenDePagoDestino): __Observable<string> {
    return this.fppEjecucionOrdenDePagoDestinoGuardarOActualizarResponse(fppEjecucionOrdenDePagoDestino).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fppEjecucionOrdenDePagoDestinoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFppEjecucionOrdenDePagoDestino>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fppEjecucionOrdenDePagoDestino`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFppEjecucionOrdenDePagoDestino>;
      })
    );
  }
  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fppEjecucionOrdenDePagoDestinoQueryResult(info: QueryInfo): __Observable<QueryResultFppEjecucionOrdenDePagoDestino> {
    return this.fppEjecucionOrdenDePagoDestinoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFppEjecucionOrdenDePagoDestino)
    );
  }

  /**
   * Desactivar un ....
   * @param idfppEjecucionOrdenDePagoDestino Identificador de .... a desactivar
   * @return OK
   */
  fppEjecucionOrdenDePagoDestinoDesactivarResponse(idfppEjecucionOrdenDePagoDestino: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfppEjecucionOrdenDePagoDestino != null) __params = __params.set('idfppEjecucionOrdenDePagoDestino', idfppEjecucionOrdenDePagoDestino.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fppEjecucionOrdenDePagoDestino`,
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
   * Desactivar un ....
   * @param idfppEjecucionOrdenDePagoDestino Identificador de .... a desactivar
   * @return OK
   */
  fppEjecucionOrdenDePagoDestinoDesactivar(idfppEjecucionOrdenDePagoDestino: string): __Observable<string> {
    return this.fppEjecucionOrdenDePagoDestinoDesactivarResponse(idfppEjecucionOrdenDePagoDestino).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener...
   * @param idfppSeguimientoPagoFactura Identificador..
   * @return OK
   */
  fppSeguimientoPagoFacturaObtenerResponse(idfppSeguimientoPagoFactura: string): __Observable<__StrictHttpResponse<FppSeguimientoPagoFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfppSeguimientoPagoFactura != null) __params = __params.set('idfppSeguimientoPagoFactura', idfppSeguimientoPagoFactura.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fppSeguimientoPagoFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FppSeguimientoPagoFactura>;
      })
    );
  }
  /**
   * Obtener...
   * @param idfppSeguimientoPagoFactura Identificador..
   * @return OK
   */
  fppSeguimientoPagoFacturaObtener(idfppSeguimientoPagoFactura: string): __Observable<FppSeguimientoPagoFactura> {
    return this.fppSeguimientoPagoFacturaObtenerResponse(idfppSeguimientoPagoFactura).pipe(
      __map(_r => _r.body as FppSeguimientoPagoFactura)
    );
  }

  /**
   * Guardar o actualizar un ....
   * @param fppSeguimientoPagoFactura Objeto de ....
   * @return OK
   */
  fppSeguimientoPagoFacturaGuardarOActualizarResponse(fppSeguimientoPagoFactura: FppSeguimientoPagoFactura): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fppSeguimientoPagoFactura;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fppSeguimientoPagoFactura`,
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
   * Guardar o actualizar un ....
   * @param fppSeguimientoPagoFactura Objeto de ....
   * @return OK
   */
  fppSeguimientoPagoFacturaGuardarOActualizar(fppSeguimientoPagoFactura: FppSeguimientoPagoFactura): __Observable<string> {
    return this.fppSeguimientoPagoFacturaGuardarOActualizarResponse(fppSeguimientoPagoFactura).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fppSeguimientoPagoFacturaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFppSeguimientoPagoFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fppSeguimientoPagoFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFppSeguimientoPagoFactura>;
      })
    );
  }
  /**
   * Obtener lista de ....
   * @param info Objeto de tipo QueryInfo para filtrar .....
   * @return OK
   */
  fppSeguimientoPagoFacturaQueryResult(info: QueryInfo): __Observable<QueryResultFppSeguimientoPagoFactura> {
    return this.fppSeguimientoPagoFacturaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFppSeguimientoPagoFactura)
    );
  }

  /**
   * Desactivar un ....
   * @param idfppSeguimientoPagoFactura Identificador de .... a desactivar
   * @return OK
   */
  fppSeguimientoPagoFacturaDesactivarResponse(idfppSeguimientoPagoFactura: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfppSeguimientoPagoFactura != null) __params = __params.set('idfppSeguimientoPagoFactura', idfppSeguimientoPagoFactura.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fppSeguimientoPagoFactura`,
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
   * Desactivar un ....
   * @param idfppSeguimientoPagoFactura Identificador de .... a desactivar
   * @return OK
   */
  fppSeguimientoPagoFacturaDesactivar(idfppSeguimientoPagoFactura: string): __Observable<string> {
    return this.fppSeguimientoPagoFacturaDesactivarResponse(idfppSeguimientoPagoFactura).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module PagosService {
}

export { PagosService }
