/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { InspAlmacenaje } from '../models/insp-almacenaje';
import { QueryResultInspAlmacenaje } from '../models/query-result-insp-almacenaje';
import { QueryInfo } from '../models/query-info';
import { InspPartida } from '../models/insp-partida';
import { QueryResultInspPartida } from '../models/query-result-insp-partida';
import { InspPieza } from '../models/insp-pieza';
import { QueryResultInspPieza } from '../models/query-result-insp-pieza';
import { InspPiezaNoDespachable } from '../models/insp-pieza-no-despachable';
import { QueryResultInspPiezaNoDespachable } from '../models/query-result-insp-pieza-no-despachable';
import { DatosGraficaInspeccionPriodidadObj } from '../models/datos-grafica-inspeccion-priodidad-obj';
import { DatosGraficaInspeccionProveedorObj } from '../models/datos-grafica-inspeccion-proveedor-obj';
import { QueryResultVPartidaInspeccion } from '../models/query-result-vpartida-inspeccion';
@Injectable({
  providedIn: 'root',
})
class ProcesosL08InspeccionService extends __BaseService {
  static readonly inspAlmacenajeObtenerPath = '/inspAlmacenaje';
  static readonly inspAlmacenajeGuardarOActualizarPath = '/inspAlmacenaje';
  static readonly inspAlmacenajeQueryResultPath = '/inspAlmacenaje';
  static readonly inspAlmacenajeDesactivarPath = '/inspAlmacenaje';
  static readonly inspPartidaObtenerPath = '/inspPartida';
  static readonly inspPartidaGuardarOActualizarPath = '/inspPartida';
  static readonly inspPartidaQueryResultPath = '/inspPartida';
  static readonly inspPartidaDesactivarPath = '/inspPartida';
  static readonly inspPiezaObtenerPath = '/inspPieza';
  static readonly inspPiezaGuardarOActualizarPath = '/inspPieza';
  static readonly inspPiezaQueryResultPath = '/inspPieza';
  static readonly inspPiezaDesactivarPath = '/inspPieza';
  static readonly inspPiezaExtensionsObtenerCodigoQRBase64StrPath = '/ObtenerCodigoQRBase64Str';
  static readonly inspPiezaExtensionsObtenerEtiquetaPath = '/inspPiezaEtiquetaBase64Str';
  static readonly inspPiezaNoDespachableObtenerPath = '/inspPiezaNoDespachable';
  static readonly inspPiezaNoDespachableGuardarOActualizarPath = '/inspPiezaNoDespachable';
  static readonly inspPiezaNoDespachableQueryResultPath = '/inspPiezaNoDespachable';
  static readonly inspPiezaNoDespachableDesactivarPath = '/inspPiezaNoDespachable';
  static readonly vPartidaInspeccionDatosGraficaInspeccionPriodidadObjPath = '/DatosGraficaInspeccionPriodidadObj';
  static readonly vPartidaInspeccionDatosGraficaInspeccionProveedorObjPath = '/DatosGraficaInspeccionProveedorObj';
  static readonly vPartidaInspeccionQueryResultPath = '/vPartidaInspeccion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de inspAlmacenaje
   * @param idinspAlmacenaje Identificador de inspAlmacenaje
   * @return OK
   */
  inspAlmacenajeObtenerResponse(idinspAlmacenaje: string): __Observable<__StrictHttpResponse<InspAlmacenaje>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idinspAlmacenaje != null) __params = __params.set('idinspAlmacenaje', idinspAlmacenaje.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/inspAlmacenaje`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<InspAlmacenaje>;
      })
    );
  }
  /**
   * Consultar registro de inspAlmacenaje
   * @param idinspAlmacenaje Identificador de inspAlmacenaje
   * @return OK
   */
  inspAlmacenajeObtener(idinspAlmacenaje: string): __Observable<InspAlmacenaje> {
    return this.inspAlmacenajeObtenerResponse(idinspAlmacenaje).pipe(
      __map(_r => _r.body as InspAlmacenaje)
    );
  }

  /**
   * Guardar o actualizar inspAlmacenaje
   * @param inspAlmacenaje inspAlmacenaje
   * @return OK
   */
  inspAlmacenajeGuardarOActualizarResponse(inspAlmacenaje: InspAlmacenaje): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = inspAlmacenaje;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/inspAlmacenaje`,
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
   * Guardar o actualizar inspAlmacenaje
   * @param inspAlmacenaje inspAlmacenaje
   * @return OK
   */
  inspAlmacenajeGuardarOActualizar(inspAlmacenaje: InspAlmacenaje): __Observable<string> {
    return this.inspAlmacenajeGuardarOActualizarResponse(inspAlmacenaje).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de inspAlmacenaje
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  inspAlmacenajeQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultInspAlmacenaje>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/inspAlmacenaje`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultInspAlmacenaje>;
      })
    );
  }
  /**
   * Consultar lista paginada de inspAlmacenaje
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  inspAlmacenajeQueryResult(info: QueryInfo): __Observable<QueryResultInspAlmacenaje> {
    return this.inspAlmacenajeQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultInspAlmacenaje)
    );
  }

  /**
   * Desactivar registro de inspAlmacenaje
   * @param idinspAlmacenaje Identificador de registro de inspAlmacenaje
   * @return OK
   */
  inspAlmacenajeDesactivarResponse(idinspAlmacenaje: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idinspAlmacenaje != null) __params = __params.set('idinspAlmacenaje', idinspAlmacenaje.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/inspAlmacenaje`,
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
   * Desactivar registro de inspAlmacenaje
   * @param idinspAlmacenaje Identificador de registro de inspAlmacenaje
   * @return OK
   */
  inspAlmacenajeDesactivar(idinspAlmacenaje: string): __Observable<string> {
    return this.inspAlmacenajeDesactivarResponse(idinspAlmacenaje).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de inspPartida
   * @param idinspPartida Identificador de inspPartida
   * @return OK
   */
  inspPartidaObtenerResponse(idinspPartida: string): __Observable<__StrictHttpResponse<InspPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idinspPartida != null) __params = __params.set('idinspPartida', idinspPartida.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/inspPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<InspPartida>;
      })
    );
  }
  /**
   * Consultar registro de inspPartida
   * @param idinspPartida Identificador de inspPartida
   * @return OK
   */
  inspPartidaObtener(idinspPartida: string): __Observable<InspPartida> {
    return this.inspPartidaObtenerResponse(idinspPartida).pipe(
      __map(_r => _r.body as InspPartida)
    );
  }

  /**
   * Guardar o actualizar inspPartida
   * @param inspPartida inspPartida
   * @return OK
   */
  inspPartidaGuardarOActualizarResponse(inspPartida: InspPartida): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = inspPartida;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/inspPartida`,
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
   * Guardar o actualizar inspPartida
   * @param inspPartida inspPartida
   * @return OK
   */
  inspPartidaGuardarOActualizar(inspPartida: InspPartida): __Observable<string> {
    return this.inspPartidaGuardarOActualizarResponse(inspPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de inspPartida
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  inspPartidaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultInspPartida>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/inspPartida`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultInspPartida>;
      })
    );
  }
  /**
   * Consultar lista paginada de inspPartida
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  inspPartidaQueryResult(info: QueryInfo): __Observable<QueryResultInspPartida> {
    return this.inspPartidaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultInspPartida)
    );
  }

  /**
   * Desactivar registro de inspPartida
   * @param idinspPartida Identificador de registro de inspPartida
   * @return OK
   */
  inspPartidaDesactivarResponse(idinspPartida: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idinspPartida != null) __params = __params.set('idinspPartida', idinspPartida.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/inspPartida`,
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
   * Desactivar registro de inspPartida
   * @param idinspPartida Identificador de registro de inspPartida
   * @return OK
   */
  inspPartidaDesactivar(idinspPartida: string): __Observable<string> {
    return this.inspPartidaDesactivarResponse(idinspPartida).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de inspPieza
   * @param idinspPieza Identificador de inspPieza
   * @return OK
   */
  inspPiezaObtenerResponse(idinspPieza: string): __Observable<__StrictHttpResponse<InspPieza>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idinspPieza != null) __params = __params.set('idinspPieza', idinspPieza.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/inspPieza`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<InspPieza>;
      })
    );
  }
  /**
   * Consultar registro de inspPieza
   * @param idinspPieza Identificador de inspPieza
   * @return OK
   */
  inspPiezaObtener(idinspPieza: string): __Observable<InspPieza> {
    return this.inspPiezaObtenerResponse(idinspPieza).pipe(
      __map(_r => _r.body as InspPieza)
    );
  }

  /**
   * Guardar o actualizar inspPieza
   * @param inspPieza inspPieza
   * @return OK
   */
  inspPiezaGuardarOActualizarResponse(inspPieza: InspPieza): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = inspPieza;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/inspPieza`,
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
   * Guardar o actualizar inspPieza
   * @param inspPieza inspPieza
   * @return OK
   */
  inspPiezaGuardarOActualizar(inspPieza: InspPieza): __Observable<string> {
    return this.inspPiezaGuardarOActualizarResponse(inspPieza).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de inspPieza
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  inspPiezaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultInspPieza>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/inspPieza`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultInspPieza>;
      })
    );
  }
  /**
   * Consultar lista paginada de inspPieza
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  inspPiezaQueryResult(info: QueryInfo): __Observable<QueryResultInspPieza> {
    return this.inspPiezaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultInspPieza)
    );
  }

  /**
   * Desactivar registro de inspPieza
   * @param idinspPieza Identificador de registro de inspPieza
   * @return OK
   */
  inspPiezaDesactivarResponse(idinspPieza: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idinspPieza != null) __params = __params.set('idinspPieza', idinspPieza.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/inspPieza`,
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
   * Desactivar registro de inspPieza
   * @param idinspPieza Identificador de registro de inspPieza
   * @return OK
   */
  inspPiezaDesactivar(idinspPieza: string): __Observable<string> {
    return this.inspPiezaDesactivarResponse(idinspPieza).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * ObtenerCodigoQRBase64Str inspPiezaExtensions
   * @param params The `ProcesosL08InspeccionService.InspPiezaExtensionsObtenerCodigoQRBase64StrParams` containing the following parameters:
   *
   * - `cliente`:
   *
   * - `cadena`:
   *
   * @return OK
   */
  inspPiezaExtensionsObtenerCodigoQRBase64StrResponse(params: ProcesosL08InspeccionService.InspPiezaExtensionsObtenerCodigoQRBase64StrParams): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.cliente != null) __params = __params.set('cliente', params.cliente.toString());
    if (params.cadena != null) __params = __params.set('cadena', params.cadena.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ObtenerCodigoQRBase64Str`,
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
   * ObtenerCodigoQRBase64Str inspPiezaExtensions
   * @param params The `ProcesosL08InspeccionService.InspPiezaExtensionsObtenerCodigoQRBase64StrParams` containing the following parameters:
   *
   * - `cliente`:
   *
   * - `cadena`:
   *
   * @return OK
   */
  inspPiezaExtensionsObtenerCodigoQRBase64Str(params: ProcesosL08InspeccionService.InspPiezaExtensionsObtenerCodigoQRBase64StrParams): __Observable<string> {
    return this.inspPiezaExtensionsObtenerCodigoQRBase64StrResponse(params).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * ObtenerEtiqueta inspPiezaExtensions
   * @param idinspPieza undefined
   * @return OK
   */
  inspPiezaExtensionsObtenerEtiquetaResponse(idinspPieza: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idinspPieza != null) __params = __params.set('idinspPieza', idinspPieza.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/inspPiezaEtiquetaBase64Str`,
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
   * ObtenerEtiqueta inspPiezaExtensions
   * @param idinspPieza undefined
   * @return OK
   */
  inspPiezaExtensionsObtenerEtiqueta(idinspPieza: string): __Observable<string> {
    return this.inspPiezaExtensionsObtenerEtiquetaResponse(idinspPieza).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de inspPiezaNoDespachable
   * @param idinspPiezaNoDespachable Identificador de inspPiezaNoDespachable
   * @return OK
   */
  inspPiezaNoDespachableObtenerResponse(idinspPiezaNoDespachable: string): __Observable<__StrictHttpResponse<InspPiezaNoDespachable>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idinspPiezaNoDespachable != null) __params = __params.set('idinspPiezaNoDespachable', idinspPiezaNoDespachable.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/inspPiezaNoDespachable`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<InspPiezaNoDespachable>;
      })
    );
  }
  /**
   * Consultar registro de inspPiezaNoDespachable
   * @param idinspPiezaNoDespachable Identificador de inspPiezaNoDespachable
   * @return OK
   */
  inspPiezaNoDespachableObtener(idinspPiezaNoDespachable: string): __Observable<InspPiezaNoDespachable> {
    return this.inspPiezaNoDespachableObtenerResponse(idinspPiezaNoDespachable).pipe(
      __map(_r => _r.body as InspPiezaNoDespachable)
    );
  }

  /**
   * Guardar o actualizar inspPiezaNoDespachable
   * @param inspPiezaNoDespachable inspPiezaNoDespachable
   * @return OK
   */
  inspPiezaNoDespachableGuardarOActualizarResponse(inspPiezaNoDespachable: InspPiezaNoDespachable): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = inspPiezaNoDespachable;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/inspPiezaNoDespachable`,
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
   * Guardar o actualizar inspPiezaNoDespachable
   * @param inspPiezaNoDespachable inspPiezaNoDespachable
   * @return OK
   */
  inspPiezaNoDespachableGuardarOActualizar(inspPiezaNoDespachable: InspPiezaNoDespachable): __Observable<string> {
    return this.inspPiezaNoDespachableGuardarOActualizarResponse(inspPiezaNoDespachable).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de inspPiezaNoDespachable
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  inspPiezaNoDespachableQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultInspPiezaNoDespachable>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/inspPiezaNoDespachable`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultInspPiezaNoDespachable>;
      })
    );
  }
  /**
   * Consultar lista paginada de inspPiezaNoDespachable
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  inspPiezaNoDespachableQueryResult(info: QueryInfo): __Observable<QueryResultInspPiezaNoDespachable> {
    return this.inspPiezaNoDespachableQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultInspPiezaNoDespachable)
    );
  }

  /**
   * Desactivar registro de inspPiezaNoDespachable
   * @param idinspPiezaNoDespachable Identificador de registro de inspPiezaNoDespachable
   * @return OK
   */
  inspPiezaNoDespachableDesactivarResponse(idinspPiezaNoDespachable: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idinspPiezaNoDespachable != null) __params = __params.set('idinspPiezaNoDespachable', idinspPiezaNoDespachable.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/inspPiezaNoDespachable`,
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
   * Desactivar registro de inspPiezaNoDespachable
   * @param idinspPiezaNoDespachable Identificador de registro de inspPiezaNoDespachable
   * @return OK
   */
  inspPiezaNoDespachableDesactivar(idinspPiezaNoDespachable: string): __Observable<string> {
    return this.inspPiezaNoDespachableDesactivarResponse(idinspPiezaNoDespachable).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * DatosGraficaInspeccionPriodidadObj vPartidaInspeccion
   * @param info undefined
   * @return OK
   */
  vPartidaInspeccionDatosGraficaInspeccionPriodidadObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<DatosGraficaInspeccionPriodidadObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/DatosGraficaInspeccionPriodidadObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<DatosGraficaInspeccionPriodidadObj>>;
      })
    );
  }
  /**
   * DatosGraficaInspeccionPriodidadObj vPartidaInspeccion
   * @param info undefined
   * @return OK
   */
  vPartidaInspeccionDatosGraficaInspeccionPriodidadObj(info: QueryInfo): __Observable<Array<DatosGraficaInspeccionPriodidadObj>> {
    return this.vPartidaInspeccionDatosGraficaInspeccionPriodidadObjResponse(info).pipe(
      __map(_r => _r.body as Array<DatosGraficaInspeccionPriodidadObj>)
    );
  }

  /**
   * DatosGraficaInspeccionProveedorObj vPartidaInspeccion
   * @param info undefined
   * @return OK
   */
  vPartidaInspeccionDatosGraficaInspeccionProveedorObjResponse(info: QueryInfo): __Observable<__StrictHttpResponse<Array<DatosGraficaInspeccionProveedorObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/DatosGraficaInspeccionProveedorObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<DatosGraficaInspeccionProveedorObj>>;
      })
    );
  }
  /**
   * DatosGraficaInspeccionProveedorObj vPartidaInspeccion
   * @param info undefined
   * @return OK
   */
  vPartidaInspeccionDatosGraficaInspeccionProveedorObj(info: QueryInfo): __Observable<Array<DatosGraficaInspeccionProveedorObj>> {
    return this.vPartidaInspeccionDatosGraficaInspeccionProveedorObjResponse(info).pipe(
      __map(_r => _r.body as Array<DatosGraficaInspeccionProveedorObj>)
    );
  }

  /**
   * Consultar lista paginada de vPartidaInspeccion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPartidaInspeccionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPartidaInspeccion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPartidaInspeccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPartidaInspeccion>;
      })
    );
  }
  /**
   * Consultar lista paginada de vPartidaInspeccion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vPartidaInspeccionQueryResult(info: QueryInfo): __Observable<QueryResultVPartidaInspeccion> {
    return this.vPartidaInspeccionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPartidaInspeccion)
    );
  }
}

module ProcesosL08InspeccionService {

  /**
   * Parameters for inspPiezaExtensionsObtenerCodigoQRBase64Str
   */
  export interface InspPiezaExtensionsObtenerCodigoQRBase64StrParams {
    cliente: string;
    cadena: string;
  }
}

export { ProcesosL08InspeccionService }
