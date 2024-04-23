/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMCotCotizacionDetalle } from '../models/gmcot-cotizacion-detalle';
import { GMCotCotizacionCambioMoneda } from '../models/gmcot-cotizacion-cambio-moneda';
import { GMFile } from '../models/gmfile';
import { GMEstrategia } from '../models/gmestrategia';
import { GMCotCotizacion } from '../models/gmcot-cotizacion';
import { CotCotizacion } from '../models/cot-cotizacion';
import { QueryResultCotCotizacion } from '../models/query-result-cot-cotizacion';
import { QueryInfo } from '../models/query-info';
import { QueryResultVClienteCotizaciones } from '../models/query-result-vcliente-cotizaciones';
import { DashboardData } from '../models/dashboard-data';
import { ResumeGroupQueryInfo } from '../models/resume-group-query-info';
import { AttributeDashboard } from '../models/attribute-dashboard';
import { VCotCotizacion } from '../models/vcot-cotizacion';
import { QueryResultVCotCotizacion } from '../models/query-result-vcot-cotizacion';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionService extends __BaseService {
  static readonly cotCotizacionCambioMonedaCotCotizacionPath = '/cotCotizacion/cambioMoneda';
  static readonly cotCotizacionCotizacionLegacyActualizarPath = '/CotizacionLegacyActualizar';
  static readonly cotCotizacionGetPdfCotizacionBase64Path = '/pdf/cotCotizacion';
  static readonly cotCotizacionGuardarEstrategiaPath = '/cotCotizacion/Estrategia';
  static readonly cotCotizacionGuardarOActualizarTransaccionPath = '/cotCotizacion/transaccion';
  static readonly cotCotizacionObtenerGMCotCotizacionPath = '/cotCotizacion/data/{IdCotizacion}';
  static readonly cotCotizacionPublicarEstrategiaPath = '/cotCotizacion/PublicarEstrategia';
  static readonly cotCotizacionObtenerPath = '/cotCotizacion';
  static readonly cotCotizacionGuardarOActualizarPath = '/cotCotizacion';
  static readonly cotCotizacionQueryResultPath = '/cotCotizacion';
  static readonly cotCotizacionDesactivarPath = '/cotCotizacion';
  static readonly cotCotizacionExtensionsMarcarCodigoSolicitudAjustarOfertaAutorizadoPath = '/MarcarCodigoSolicitudAjustarOfertaAutorizado';
  static readonly vClienteCotizacionesQueryResultPath = '/vClienteCotizaciones';
  static readonly vCotCotizacionObtenerDashboardPath = '/vCotCotizacion/dashboard';
  static readonly vCotCotizacionObtenerEstablecerEstrategiaDashboardPath = '/vCotCotizacion/EstablecerEstrategia/dashboard';
  static readonly vCotCotizacionObtenerJuntaDiariaClientesDashboardPath = '/vCotCotizacion/JuntaDariaClientes/dashboard';
  static readonly vCotCotizacionObtenerJuntaDiariaDashboardPath = '/vCotCotizacion/JuntaDaria/dashboard';
  static readonly vCotCotizacionObtenerTabsDashboardPath = '/vCotCotizacion/tabs';
  static readonly vCotCotizacionObtenerTabsEstablcerEstrategiaDashboardPath = '/vCotCotizacion/EstablecerEstrategia/tabs';
  static readonly vCotCotizacionObtenerPath = '/vCotCotizacion';
  static readonly vCotCotizacionQueryResultPath = '/vCotCotizacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * cambioMonedaCotCotizacion cotCotizacion
   * @param GMCotCotizacionCambioMoneda undefined
   * @return OK
   */
  cotCotizacionCambioMonedaCotCotizacionResponse(GMCotCotizacionCambioMoneda: GMCotCotizacionCambioMoneda): __Observable<__StrictHttpResponse<GMCotCotizacionDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMCotCotizacionCambioMoneda;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotCotizacion/cambioMoneda`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMCotCotizacionDetalle>;
      })
    );
  }
  /**
   * cambioMonedaCotCotizacion cotCotizacion
   * @param GMCotCotizacionCambioMoneda undefined
   * @return OK
   */
  cotCotizacionCambioMonedaCotCotizacion(GMCotCotizacionCambioMoneda: GMCotCotizacionCambioMoneda): __Observable<GMCotCotizacionDetalle> {
    return this.cotCotizacionCambioMonedaCotCotizacionResponse(GMCotCotizacionCambioMoneda).pipe(
      __map(_r => _r.body as GMCotCotizacionDetalle)
    );
  }

  /**
   * CotizacionLegacyActualizar cotCotizacion
   * @param idCotCotizacion undefined
   * @return OK
   */
  cotCotizacionCotizacionLegacyActualizarResponse(idCotCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotCotizacion != null) __params = __params.set('idCotCotizacion', idCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CotizacionLegacyActualizar`,
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
   * CotizacionLegacyActualizar cotCotizacion
   * @param idCotCotizacion undefined
   * @return OK
   */
  cotCotizacionCotizacionLegacyActualizar(idCotCotizacion: string): __Observable<string> {
    return this.cotCotizacionCotizacionLegacyActualizarResponse(idCotCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GetPdfCotizacionBase64 cotCotizacion
   * @param idCotCotizacion undefined
   * @return OK
   */
  cotCotizacionGetPdfCotizacionBase64Response(idCotCotizacion: string): __Observable<__StrictHttpResponse<GMFile>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotCotizacion != null) __params = __params.set('idCotCotizacion', idCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pdf/cotCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMFile>;
      })
    );
  }
  /**
   * GetPdfCotizacionBase64 cotCotizacion
   * @param idCotCotizacion undefined
   * @return OK
   */
  cotCotizacionGetPdfCotizacionBase64(idCotCotizacion: string): __Observable<GMFile> {
    return this.cotCotizacionGetPdfCotizacionBase64Response(idCotCotizacion).pipe(
      __map(_r => _r.body as GMFile)
    );
  }

  /**
   * Establecer Estrategia a cotizaciones.
   * @param estrategia Objeto de tipo GMEstrategia para
   *             establecer estrategia a cotizaciones.
   * @return OK
   */
  cotCotizacionGuardarEstrategiaResponse(estrategia: GMEstrategia): __Observable<__StrictHttpResponse<GMEstrategia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = estrategia;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotCotizacion/Estrategia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMEstrategia>;
      })
    );
  }
  /**
   * Establecer Estrategia a cotizaciones.
   * @param estrategia Objeto de tipo GMEstrategia para
   *             establecer estrategia a cotizaciones.
   * @return OK
   */
  cotCotizacionGuardarEstrategia(estrategia: GMEstrategia): __Observable<GMEstrategia> {
    return this.cotCotizacionGuardarEstrategiaResponse(estrategia).pipe(
      __map(_r => _r.body as GMEstrategia)
    );
  }

  /**
   * GuardarOActualizarTransaccion cotCotizacion
   * @param cotizacion undefined
   * @return OK
   */
  cotCotizacionGuardarOActualizarTransaccionResponse(cotizacion: GMCotCotizacion): __Observable<__StrictHttpResponse<GMCotCotizacionDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotizacion;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotCotizacion/transaccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMCotCotizacionDetalle>;
      })
    );
  }
  /**
   * GuardarOActualizarTransaccion cotCotizacion
   * @param cotizacion undefined
   * @return OK
   */
  cotCotizacionGuardarOActualizarTransaccion(cotizacion: GMCotCotizacion): __Observable<GMCotCotizacionDetalle> {
    return this.cotCotizacionGuardarOActualizarTransaccionResponse(cotizacion).pipe(
      __map(_r => _r.body as GMCotCotizacionDetalle)
    );
  }

  /**
   * ObtenerGMCotCotizacion cotCotizacion
   * @param IdCotizacion undefined
   * @return OK
   */
  cotCotizacionObtenerGMCotCotizacionResponse(IdCotizacion: string): __Observable<__StrictHttpResponse<GMCotCotizacionDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotCotizacion/data/${encodeURIComponent(String(IdCotizacion))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMCotCotizacionDetalle>;
      })
    );
  }
  /**
   * ObtenerGMCotCotizacion cotCotizacion
   * @param IdCotizacion undefined
   * @return OK
   */
  cotCotizacionObtenerGMCotCotizacion(IdCotizacion: string): __Observable<GMCotCotizacionDetalle> {
    return this.cotCotizacionObtenerGMCotCotizacionResponse(IdCotizacion).pipe(
      __map(_r => _r.body as GMCotCotizacionDetalle)
    );
  }

  /**
   * Publicar Estrategia de cotizaciones.
   * @param estrategia Objeto de tipo GMEstrategia para
   *             proceso de publicar estrategia.
   * @return OK
   */
  cotCotizacionPublicarEstrategiaResponse(estrategia: GMEstrategia): __Observable<__StrictHttpResponse<GMEstrategia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = estrategia;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotCotizacion/PublicarEstrategia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMEstrategia>;
      })
    );
  }
  /**
   * Publicar Estrategia de cotizaciones.
   * @param estrategia Objeto de tipo GMEstrategia para
   *             proceso de publicar estrategia.
   * @return OK
   */
  cotCotizacionPublicarEstrategia(estrategia: GMEstrategia): __Observable<GMEstrategia> {
    return this.cotCotizacionPublicarEstrategiaResponse(estrategia).pipe(
      __map(_r => _r.body as GMEstrategia)
    );
  }

  /**
   * Obtener un cotCotizacion por su idCotCotizacion
   * @param idCotCotizacion identificador del cotCotizacion
   * @return OK
   */
  cotCotizacionObtenerResponse(idCotCotizacion: string): __Observable<__StrictHttpResponse<CotCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotCotizacion != null) __params = __params.set('idCotCotizacion', idCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotCotizacion>;
      })
    );
  }
  /**
   * Obtener un cotCotizacion por su idCotCotizacion
   * @param idCotCotizacion identificador del cotCotizacion
   * @return OK
   */
  cotCotizacionObtener(idCotCotizacion: string): __Observable<CotCotizacion> {
    return this.cotCotizacionObtenerResponse(idCotCotizacion).pipe(
      __map(_r => _r.body as CotCotizacion)
    );
  }

  /**
   * Guardar o actualizar un cotCotizacion
   * @param cotizacion cotCotizacion a actualizar o guardar
   * @return OK
   */
  cotCotizacionGuardarOActualizarResponse(cotizacion: CotCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotCotizacion`,
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
   * Guardar o actualizar un cotCotizacion
   * @param cotizacion cotCotizacion a actualizar o guardar
   * @return OK
   */
  cotCotizacionGuardarOActualizar(cotizacion: CotCotizacion): __Observable<string> {
    return this.cotCotizacionGuardarOActualizarResponse(cotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotCotizacion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotCotizacion>;
      })
    );
  }
  /**
   * Obtener lista de cotCotizacion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultCotCotizacion> {
    return this.cotCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotCotizacion)
    );
  }

  /**
   * Desactivar cotCotizacion
   * @param idCotCotizacion undefined
   * @return OK
   */
  cotCotizacionDesactivarResponse(idCotCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotCotizacion != null) __params = __params.set('idCotCotizacion', idCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotCotizacion`,
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
   * Desactivar cotCotizacion
   * @param idCotCotizacion undefined
   * @return OK
   */
  cotCotizacionDesactivar(idCotCotizacion: string): __Observable<string> {
    return this.cotCotizacionDesactivarResponse(idCotCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * MarcarCodigoSolicitudAjustarOfertaAutorizado cotCotizacionExtensions
   * @param params The `ProcesosL01CotizacionService.CotCotizacionExtensionsMarcarCodigoSolicitudAjustarOfertaAutorizadoParams` containing the following parameters:
   *
   * - `idSolicitudAutorizacionCambio`:
   *
   * - `idCotCotizacion`:
   *
   * @return OK
   */
  cotCotizacionExtensionsMarcarCodigoSolicitudAjustarOfertaAutorizadoResponse(params: ProcesosL01CotizacionService.CotCotizacionExtensionsMarcarCodigoSolicitudAjustarOfertaAutorizadoParams): __Observable<__StrictHttpResponse<CotCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idSolicitudAutorizacionCambio != null) __params = __params.set('idSolicitudAutorizacionCambio', params.idSolicitudAutorizacionCambio.toString());
    if (params.idCotCotizacion != null) __params = __params.set('idCotCotizacion', params.idCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/MarcarCodigoSolicitudAjustarOfertaAutorizado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotCotizacion>;
      })
    );
  }
  /**
   * MarcarCodigoSolicitudAjustarOfertaAutorizado cotCotizacionExtensions
   * @param params The `ProcesosL01CotizacionService.CotCotizacionExtensionsMarcarCodigoSolicitudAjustarOfertaAutorizadoParams` containing the following parameters:
   *
   * - `idSolicitudAutorizacionCambio`:
   *
   * - `idCotCotizacion`:
   *
   * @return OK
   */
  cotCotizacionExtensionsMarcarCodigoSolicitudAjustarOfertaAutorizado(params: ProcesosL01CotizacionService.CotCotizacionExtensionsMarcarCodigoSolicitudAjustarOfertaAutorizadoParams): __Observable<CotCotizacion> {
    return this.cotCotizacionExtensionsMarcarCodigoSolicitudAjustarOfertaAutorizadoResponse(params).pipe(
      __map(_r => _r.body as CotCotizacion)
    );
  }

  /**
   * Consultar lista paginada de vClienteCotizaciones
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteCotizacionesQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteCotizaciones>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteCotizaciones`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteCotizaciones>;
      })
    );
  }
  /**
   * Consultar lista paginada de vClienteCotizaciones
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vClienteCotizacionesQueryResult(info: QueryInfo): __Observable<QueryResultVClienteCotizaciones> {
    return this.vClienteCotizacionesQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteCotizaciones)
    );
  }

  /**
   * ObtenerDashboard vCotCotizacion
   * @param info undefined
   * @return OK
   */
  vCotCotizacionObtenerDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCotCotizacion/dashboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DashboardData>;
      })
    );
  }
  /**
   * ObtenerDashboard vCotCotizacion
   * @param info undefined
   * @return OK
   */
  vCotCotizacionObtenerDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.vCotCotizacionObtenerDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * ObtenerEstablecerEstrategiaDashboard vCotCotizacion
   * @param info undefined
   * @return OK
   */
  vCotCotizacionObtenerEstablecerEstrategiaDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCotCotizacion/EstablecerEstrategia/dashboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DashboardData>;
      })
    );
  }
  /**
   * ObtenerEstablecerEstrategiaDashboard vCotCotizacion
   * @param info undefined
   * @return OK
   */
  vCotCotizacionObtenerEstablecerEstrategiaDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.vCotCotizacionObtenerEstablecerEstrategiaDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * ObtenerJuntaDiariaClientesDashboard vCotCotizacion
   * @param info undefined
   * @return OK
   */
  vCotCotizacionObtenerJuntaDiariaClientesDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCotCotizacion/JuntaDariaClientes/dashboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DashboardData>;
      })
    );
  }
  /**
   * ObtenerJuntaDiariaClientesDashboard vCotCotizacion
   * @param info undefined
   * @return OK
   */
  vCotCotizacionObtenerJuntaDiariaClientesDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.vCotCotizacionObtenerJuntaDiariaClientesDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * ObtenerJuntaDiariaDashboard vCotCotizacion
   * @param info undefined
   * @return OK
   */
  vCotCotizacionObtenerJuntaDiariaDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCotCotizacion/JuntaDaria/dashboard`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DashboardData>;
      })
    );
  }
  /**
   * ObtenerJuntaDiariaDashboard vCotCotizacion
   * @param info undefined
   * @return OK
   */
  vCotCotizacionObtenerJuntaDiariaDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.vCotCotizacionObtenerJuntaDiariaDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * ObtenerTabsDashboard vCotCotizacion
   * @param info undefined
   * @return OK
   */
  vCotCotizacionObtenerTabsDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<Array<AttributeDashboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCotCotizacion/tabs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AttributeDashboard>>;
      })
    );
  }
  /**
   * ObtenerTabsDashboard vCotCotizacion
   * @param info undefined
   * @return OK
   */
  vCotCotizacionObtenerTabsDashboard(info: ResumeGroupQueryInfo): __Observable<Array<AttributeDashboard>> {
    return this.vCotCotizacionObtenerTabsDashboardResponse(info).pipe(
      __map(_r => _r.body as Array<AttributeDashboard>)
    );
  }

  /**
   * ObtenerTabsEstablcerEstrategiaDashboard vCotCotizacion
   * @param info undefined
   * @return OK
   */
  vCotCotizacionObtenerTabsEstablcerEstrategiaDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<Array<AttributeDashboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCotCotizacion/EstablecerEstrategia/tabs`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<AttributeDashboard>>;
      })
    );
  }
  /**
   * ObtenerTabsEstablcerEstrategiaDashboard vCotCotizacion
   * @param info undefined
   * @return OK
   */
  vCotCotizacionObtenerTabsEstablcerEstrategiaDashboard(info: ResumeGroupQueryInfo): __Observable<Array<AttributeDashboard>> {
    return this.vCotCotizacionObtenerTabsEstablcerEstrategiaDashboardResponse(info).pipe(
      __map(_r => _r.body as Array<AttributeDashboard>)
    );
  }

  /**
   * Obtener vCotCotizacion
   * @param idCotCotizacion undefined
   * @return OK
   */
  vCotCotizacionObtenerResponse(idCotCotizacion: string): __Observable<__StrictHttpResponse<VCotCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCotCotizacion != null) __params = __params.set('idCotCotizacion', idCotCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vCotCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VCotCotizacion>;
      })
    );
  }
  /**
   * Obtener vCotCotizacion
   * @param idCotCotizacion undefined
   * @return OK
   */
  vCotCotizacionObtener(idCotCotizacion: string): __Observable<VCotCotizacion> {
    return this.vCotCotizacionObtenerResponse(idCotCotizacion).pipe(
      __map(_r => _r.body as VCotCotizacion)
    );
  }

  /**
   * Consultar lista paginada de vCotCotizacion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCotCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVCotCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCotCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVCotCotizacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de vCotCotizacion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCotCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultVCotCotizacion> {
    return this.vCotCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVCotCotizacion)
    );
  }
}

module ProcesosL01CotizacionService {

  /**
   * Parameters for cotCotizacionExtensionsMarcarCodigoSolicitudAjustarOfertaAutorizado
   */
  export interface CotCotizacionExtensionsMarcarCodigoSolicitudAjustarOfertaAutorizadoParams {
    idSolicitudAutorizacionCambio: string;
    idCotCotizacion: string;
  }
}

export { ProcesosL01CotizacionService }
