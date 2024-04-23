/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { VPrecioProductoProveedorFamiliaInvestigacion } from '../models/vprecio-producto-proveedor-familia-investigacion';
import { DashboardData } from '../models/dashboard-data';
import { ResumeGroupQueryInfo } from '../models/resume-group-query-info';
import { CotInvestigacionCorreoEnviado } from '../models/cot-investigacion-correo-enviado';
import { QueryResultCotInvestigacionCorreoEnviado } from '../models/query-result-cot-investigacion-correo-enviado';
import { QueryInfo } from '../models/query-info';
import { GMPartidaInvestigacionCotizadorAtencion } from '../models/gmpartida-investigacion-cotizador-atencion';
import { CotPartidaCotizacionInvestigacionAtencion } from '../models/cot-partida-cotizacion-investigacion-atencion';
import { QueryResultCotPartidaCotizacionInvestigacionAtencion } from '../models/query-result-cot-partida-cotizacion-investigacion-atencion';
import { CotPartidaCotizacionInvestigacionComentario } from '../models/cot-partida-cotizacion-investigacion-comentario';
import { QueryResultCotPartidaCotizacionInvestigacionComentario } from '../models/query-result-cot-partida-cotizacion-investigacion-comentario';
import { GMCorreoCotPartidaInvestigacion } from '../models/gmcorreo-cot-partida-investigacion';
import { CotPartidaCotizacionInvestigacionCorreo } from '../models/cot-partida-cotizacion-investigacion-correo';
import { QueryResultCotPartidaCotizacionInvestigacionCorreo } from '../models/query-result-cot-partida-cotizacion-investigacion-correo';
import { CotPartidaCotizacionInvestigacionSeguimiento } from '../models/cot-partida-cotizacion-investigacion-seguimiento';
import { QueryResultCotPartidaCotizacionInvestigacionSeguimiento } from '../models/query-result-cot-partida-cotizacion-investigacion-seguimiento';
import { GMPartidaInvestigacionRespuestaProveedor } from '../models/gmpartida-investigacion-respuesta-proveedor';
import { CotPartidaInvestigacionProducto } from '../models/cot-partida-investigacion-producto';
import { QueryResultCotPartidaInvestigacionProducto } from '../models/query-result-cot-partida-investigacion-producto';
import { AttributeDashboard } from '../models/attribute-dashboard';
import { QueryResultProductoInvestigacionObj } from '../models/query-result-producto-investigacion-obj';
import { QueryResultProductoRatificacionObj } from '../models/query-result-producto-ratificacion-obj';
import { QueryResultVCotPartidaCotizacionInvestigacionAtencion } from '../models/query-result-vcot-partida-cotizacion-investigacion-atencion';
@Injectable({
  providedIn: 'root',
})
class ProcesosL01CotizacionInvestigacionService extends __BaseService {
  static readonly ConfiguracionProductoInvestigacionConfiguracionVentaProductoInvestigacionRevisionUtilidadPath = '/ConfiguracionVentaProductoInvestigacionRevisionUtilidad';
  static readonly ConfiguracionProductoInvestigacionObtenerDashboardPath = '/ConfiguracionCompraProductoInvestigacion/dashboard';
  static readonly ConfiguracionProductoInvestigacionObtenerDashboardLogisticaPath = '/ConfiguracionLogisticaProductoInvestigacion/dashboard';
  static readonly ConfiguracionProductoInvestigacionObtenerDashboardVentaPath = '/ConfiguracionVentaProductoInvestigacion/dashboard';
  static readonly cotInvestigacionCorreoEnviadoObtenerPath = '/cotInvestigacionCorreoEnviado';
  static readonly cotInvestigacionCorreoEnviadoGuardarOActualizarPath = '/cotInvestigacionCorreoEnviado';
  static readonly cotInvestigacionCorreoEnviadoQueryResultPath = '/cotInvestigacionCorreoEnviado';
  static readonly cotInvestigacionCorreoEnviadoDesactivarPath = '/cotInvestigacionCorreoEnviado';
  static readonly cotPartidaCotizacionInvestigacionAtencionGuardarOActualizarPartidaCotizacionInvestigacionAtencionPath = '/cotPartidaCotizacionInvestigacion/GuardarOActualizarPartidaCotizacionInvestigacionAtencion';
  static readonly cotPartidaCotizacionInvestigacionAtencionObtenerPath = '/cotPartidaCotizacionInvestigacionAtencion';
  static readonly cotPartidaCotizacionInvestigacionAtencionGuardarOActualizarPath = '/cotPartidaCotizacionInvestigacionAtencion';
  static readonly cotPartidaCotizacionInvestigacionAtencionQueryResultPath = '/cotPartidaCotizacionInvestigacionAtencion';
  static readonly cotPartidaCotizacionInvestigacionAtencionDesactivarPath = '/cotPartidaCotizacionInvestigacionAtencion';
  static readonly cotPartidaCotizacionInvestigacionComentarioObtenerPath = '/cotPartidaCotizacionInvestigacionComentario';
  static readonly cotPartidaCotizacionInvestigacionComentarioGuardarOActualizarPath = '/cotPartidaCotizacionInvestigacionComentario';
  static readonly cotPartidaCotizacionInvestigacionComentarioQueryResultPath = '/cotPartidaCotizacionInvestigacionComentario';
  static readonly cotPartidaCotizacionInvestigacionComentarioDesactivarPath = '/cotPartidaCotizacionInvestigacionComentario';
  static readonly cotPartidaCotizacionInvestigacionCorreoGuardarCorreoCotPartidaInvestigacionPath = '/cotPartidaCotizacionInvestigacionCorreo/CorreoCotPartidaInvestigacion';
  static readonly cotPartidaCotizacionInvestigacionCorreoObtenerPath = '/cotPartidaCotizacionInvestigacionCorreo';
  static readonly cotPartidaCotizacionInvestigacionCorreoGuardarOActualizarPath = '/cotPartidaCotizacionInvestigacionCorreo';
  static readonly cotPartidaCotizacionInvestigacionCorreoQueryResultPath = '/cotPartidaCotizacionInvestigacionCorreo';
  static readonly cotPartidaCotizacionInvestigacionCorreoDesactivarPath = '/cotPartidaCotizacionInvestigacionCorreo';
  static readonly cotPartidaCotizacionInvestigacionSeguimientoObtenerPath = '/cotPartidaCotizacionInvestigacionSeguimiento';
  static readonly cotPartidaCotizacionInvestigacionSeguimientoGuardarOActualizarPath = '/cotPartidaCotizacionInvestigacionSeguimiento';
  static readonly cotPartidaCotizacionInvestigacionSeguimientoQueryResultPath = '/cotPartidaCotizacionInvestigacionSeguimiento';
  static readonly cotPartidaCotizacionInvestigacionSeguimientoDesactivarPath = '/cotPartidaCotizacionInvestigacionSeguimiento';
  static readonly cotPartidaInvestigacionProductoGuardarCorreoCotPartidaInvestigacionPath = '/cotPartidaInvestigacionProducto/GuardarcotRespuestaCorreoProveedor';
  static readonly cotPartidaInvestigacionProductoObtenerPath = '/cotPartidaInvestigacionProducto';
  static readonly cotPartidaInvestigacionProductoGuardarOActualizarPath = '/cotPartidaInvestigacionProducto';
  static readonly cotPartidaInvestigacionProductoQueryResultPath = '/cotPartidaInvestigacionProducto';
  static readonly cotPartidaInvestigacionProductoDesactivarPath = '/cotPartidaInvestigacionProducto';
  static readonly DashboardRatificacionInvestigacionObtenerDashboardPath = '/DashboardRatificarInvestigacion/dashboard';
  static readonly ProductoInvestigacionObtenerProductoInvestigacionDashboardPath = '/ProductoInvestigacion/Dashboard';
  static readonly ProductoInvestigacionObtenerProductoInvestigacionTabsPath = '/ProductoInvestigacion/Tabs';
  static readonly ProductoInvestigacionQueryResultPath = '/ListaProductoInvestigacion';
  static readonly RatificacionInvestigacionQueryResultPath = '/ListaProductosRatificacion';
  static readonly vCotPartidaCotizacionInvestigacionAtencionQueryResultPath = '/vCotPartidaCotizacionInvestigacionAtencion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtiene las utilidades menores a 30%
   * @param IdCotPartidaCotizacionInvestigacion identificador del IdCotPartidaCotizacionInvestigacion
   * @return OK
   */
  ConfiguracionProductoInvestigacionConfiguracionVentaProductoInvestigacionRevisionUtilidadResponse(IdCotPartidaCotizacionInvestigacion: string): __Observable<__StrictHttpResponse<Array<VPrecioProductoProveedorFamiliaInvestigacion>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdCotPartidaCotizacionInvestigacion != null) __params = __params.set('IdCotPartidaCotizacionInvestigacion', IdCotPartidaCotizacionInvestigacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionVentaProductoInvestigacionRevisionUtilidad`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VPrecioProductoProveedorFamiliaInvestigacion>>;
      })
    );
  }
  /**
   * Obtiene las utilidades menores a 30%
   * @param IdCotPartidaCotizacionInvestigacion identificador del IdCotPartidaCotizacionInvestigacion
   * @return OK
   */
  ConfiguracionProductoInvestigacionConfiguracionVentaProductoInvestigacionRevisionUtilidad(IdCotPartidaCotizacionInvestigacion: string): __Observable<Array<VPrecioProductoProveedorFamiliaInvestigacion>> {
    return this.ConfiguracionProductoInvestigacionConfiguracionVentaProductoInvestigacionRevisionUtilidadResponse(IdCotPartidaCotizacionInvestigacion).pipe(
      __map(_r => _r.body as Array<VPrecioProductoProveedorFamiliaInvestigacion>)
    );
  }

  /**
   * Consultar Dashboard de Configuracion de Compra de Producto en Investigación
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ConfiguracionProductoInvestigacionObtenerDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionCompraProductoInvestigacion/dashboard`,
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
   * Consultar Dashboard de Configuracion de Compra de Producto en Investigación
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ConfiguracionProductoInvestigacionObtenerDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.ConfiguracionProductoInvestigacionObtenerDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * Consultar Dashboard de Configuracion de Logistica de Producto en Investigación
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ConfiguracionProductoInvestigacionObtenerDashboardLogisticaResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionLogisticaProductoInvestigacion/dashboard`,
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
   * Consultar Dashboard de Configuracion de Logistica de Producto en Investigación
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ConfiguracionProductoInvestigacionObtenerDashboardLogistica(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.ConfiguracionProductoInvestigacionObtenerDashboardLogisticaResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * Consultar Dashboard de Configuracion de Logistica de Producto en Investigación
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ConfiguracionProductoInvestigacionObtenerDashboardVentaResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionVentaProductoInvestigacion/dashboard`,
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
   * Consultar Dashboard de Configuracion de Logistica de Producto en Investigación
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ConfiguracionProductoInvestigacionObtenerDashboardVenta(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.ConfiguracionProductoInvestigacionObtenerDashboardVentaResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * Obtener un cotInvestigacionCorreoEnviado por su idcotInvestigacionCorreoEnviado
   * @param idcotInvestigacionCorreoEnviado identificador del cotInvestigacionCorreoEnviado
   * @return OK
   */
  cotInvestigacionCorreoEnviadoObtenerResponse(idcotInvestigacionCorreoEnviado: string): __Observable<__StrictHttpResponse<CotInvestigacionCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotInvestigacionCorreoEnviado != null) __params = __params.set('idcotInvestigacionCorreoEnviado', idcotInvestigacionCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotInvestigacionCorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotInvestigacionCorreoEnviado>;
      })
    );
  }
  /**
   * Obtener un cotInvestigacionCorreoEnviado por su idcotInvestigacionCorreoEnviado
   * @param idcotInvestigacionCorreoEnviado identificador del cotInvestigacionCorreoEnviado
   * @return OK
   */
  cotInvestigacionCorreoEnviadoObtener(idcotInvestigacionCorreoEnviado: string): __Observable<CotInvestigacionCorreoEnviado> {
    return this.cotInvestigacionCorreoEnviadoObtenerResponse(idcotInvestigacionCorreoEnviado).pipe(
      __map(_r => _r.body as CotInvestigacionCorreoEnviado)
    );
  }

  /**
   * Guardar o actualizar un cotInvestigacionCorreoEnviado
   * @param cotizacion cotInvestigacionCorreoEnviado a actualizar o guardar
   * @return OK
   */
  cotInvestigacionCorreoEnviadoGuardarOActualizarResponse(cotizacion: CotInvestigacionCorreoEnviado): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotInvestigacionCorreoEnviado`,
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
   * Guardar o actualizar un cotInvestigacionCorreoEnviado
   * @param cotizacion cotInvestigacionCorreoEnviado a actualizar o guardar
   * @return OK
   */
  cotInvestigacionCorreoEnviadoGuardarOActualizar(cotizacion: CotInvestigacionCorreoEnviado): __Observable<string> {
    return this.cotInvestigacionCorreoEnviadoGuardarOActualizarResponse(cotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotInvestigacionCorreoEnviado.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotInvestigacionCorreoEnviadoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotInvestigacionCorreoEnviado>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotInvestigacionCorreoEnviado`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotInvestigacionCorreoEnviado>;
      })
    );
  }
  /**
   * Obtener lista de cotInvestigacionCorreoEnviado.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotInvestigacionCorreoEnviadoQueryResult(info: QueryInfo): __Observable<QueryResultCotInvestigacionCorreoEnviado> {
    return this.cotInvestigacionCorreoEnviadoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotInvestigacionCorreoEnviado)
    );
  }

  /**
   * Desactivar cotInvestigacionCorreoEnviado
   * @param idcotInvestigacionCorreoEnviado undefined
   * @return OK
   */
  cotInvestigacionCorreoEnviadoDesactivarResponse(idcotInvestigacionCorreoEnviado: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotInvestigacionCorreoEnviado != null) __params = __params.set('idcotInvestigacionCorreoEnviado', idcotInvestigacionCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotInvestigacionCorreoEnviado`,
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
   * Desactivar cotInvestigacionCorreoEnviado
   * @param idcotInvestigacionCorreoEnviado undefined
   * @return OK
   */
  cotInvestigacionCorreoEnviadoDesactivar(idcotInvestigacionCorreoEnviado: string): __Observable<string> {
    return this.cotInvestigacionCorreoEnviadoDesactivarResponse(idcotInvestigacionCorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Registro de producto fuera del sistema .
   * @param GMPartidaInvestigacionCotizadorAtencion Objeto de tipo GMPartidaInvestigacionCotizadorAtencion para
   *             registrar la partida por investigar con sus comentarios.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionAtencionGuardarOActualizarPartidaCotizacionInvestigacionAtencionResponse(GMPartidaInvestigacionCotizadorAtencion: GMPartidaInvestigacionCotizadorAtencion): __Observable<__StrictHttpResponse<GMPartidaInvestigacionCotizadorAtencion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMPartidaInvestigacionCotizadorAtencion;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaCotizacionInvestigacion/GuardarOActualizarPartidaCotizacionInvestigacionAtencion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMPartidaInvestigacionCotizadorAtencion>;
      })
    );
  }
  /**
   * Registro de producto fuera del sistema .
   * @param GMPartidaInvestigacionCotizadorAtencion Objeto de tipo GMPartidaInvestigacionCotizadorAtencion para
   *             registrar la partida por investigar con sus comentarios.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionAtencionGuardarOActualizarPartidaCotizacionInvestigacionAtencion(GMPartidaInvestigacionCotizadorAtencion: GMPartidaInvestigacionCotizadorAtencion): __Observable<GMPartidaInvestigacionCotizadorAtencion> {
    return this.cotPartidaCotizacionInvestigacionAtencionGuardarOActualizarPartidaCotizacionInvestigacionAtencionResponse(GMPartidaInvestigacionCotizadorAtencion).pipe(
      __map(_r => _r.body as GMPartidaInvestigacionCotizadorAtencion)
    );
  }

  /**
   * Obtener un cotPartidaCotizacionInvestigacionAtencion por su idcotPartidaCotizacionInvestigacionAtencion
   * @param idcotPartidaCotizacionInvestigacionAtencion identificador del cotPartidaCotizacionInvestigacionAtencion
   * @return OK
   */
  cotPartidaCotizacionInvestigacionAtencionObtenerResponse(idcotPartidaCotizacionInvestigacionAtencion: string): __Observable<__StrictHttpResponse<CotPartidaCotizacionInvestigacionAtencion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotPartidaCotizacionInvestigacionAtencion != null) __params = __params.set('idcotPartidaCotizacionInvestigacionAtencion', idcotPartidaCotizacionInvestigacionAtencion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionAtencion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotPartidaCotizacionInvestigacionAtencion>;
      })
    );
  }
  /**
   * Obtener un cotPartidaCotizacionInvestigacionAtencion por su idcotPartidaCotizacionInvestigacionAtencion
   * @param idcotPartidaCotizacionInvestigacionAtencion identificador del cotPartidaCotizacionInvestigacionAtencion
   * @return OK
   */
  cotPartidaCotizacionInvestigacionAtencionObtener(idcotPartidaCotizacionInvestigacionAtencion: string): __Observable<CotPartidaCotizacionInvestigacionAtencion> {
    return this.cotPartidaCotizacionInvestigacionAtencionObtenerResponse(idcotPartidaCotizacionInvestigacionAtencion).pipe(
      __map(_r => _r.body as CotPartidaCotizacionInvestigacionAtencion)
    );
  }

  /**
   * Guardar o actualizar un cotPartidaCotizacionInvestigacionAtencion
   * @param cotizacion cotPartidaCotizacionInvestigacionAtencion a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionInvestigacionAtencionGuardarOActualizarResponse(cotizacion: CotPartidaCotizacionInvestigacionAtencion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionAtencion`,
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
   * Guardar o actualizar un cotPartidaCotizacionInvestigacionAtencion
   * @param cotizacion cotPartidaCotizacionInvestigacionAtencion a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionInvestigacionAtencionGuardarOActualizar(cotizacion: CotPartidaCotizacionInvestigacionAtencion): __Observable<string> {
    return this.cotPartidaCotizacionInvestigacionAtencionGuardarOActualizarResponse(cotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotPartidaCotizacionInvestigacionAtencion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionAtencionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotPartidaCotizacionInvestigacionAtencion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionAtencion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotPartidaCotizacionInvestigacionAtencion>;
      })
    );
  }
  /**
   * Obtener lista de cotPartidaCotizacionInvestigacionAtencion.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionAtencionQueryResult(info: QueryInfo): __Observable<QueryResultCotPartidaCotizacionInvestigacionAtencion> {
    return this.cotPartidaCotizacionInvestigacionAtencionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotPartidaCotizacionInvestigacionAtencion)
    );
  }

  /**
   * Desactivar cotPartidaCotizacionInvestigacionAtencion
   * @param idcotPartidaCotizacionInvestigacionAtencion undefined
   * @return OK
   */
  cotPartidaCotizacionInvestigacionAtencionDesactivarResponse(idcotPartidaCotizacionInvestigacionAtencion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotPartidaCotizacionInvestigacionAtencion != null) __params = __params.set('idcotPartidaCotizacionInvestigacionAtencion', idcotPartidaCotizacionInvestigacionAtencion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionAtencion`,
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
   * Desactivar cotPartidaCotizacionInvestigacionAtencion
   * @param idcotPartidaCotizacionInvestigacionAtencion undefined
   * @return OK
   */
  cotPartidaCotizacionInvestigacionAtencionDesactivar(idcotPartidaCotizacionInvestigacionAtencion: string): __Observable<string> {
    return this.cotPartidaCotizacionInvestigacionAtencionDesactivarResponse(idcotPartidaCotizacionInvestigacionAtencion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un cotPartidaCotizacionInvestigacionComentario por su idcotPartidaCotizacionInvestigacionComentario
   * @param idcotPartidaCotizacionInvestigacionComentario identificador del cotPartidaCotizacionInvestigacionComentario
   * @return OK
   */
  cotPartidaCotizacionInvestigacionComentarioObtenerResponse(idcotPartidaCotizacionInvestigacionComentario: string): __Observable<__StrictHttpResponse<CotPartidaCotizacionInvestigacionComentario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotPartidaCotizacionInvestigacionComentario != null) __params = __params.set('idcotPartidaCotizacionInvestigacionComentario', idcotPartidaCotizacionInvestigacionComentario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionComentario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotPartidaCotizacionInvestigacionComentario>;
      })
    );
  }
  /**
   * Obtener un cotPartidaCotizacionInvestigacionComentario por su idcotPartidaCotizacionInvestigacionComentario
   * @param idcotPartidaCotizacionInvestigacionComentario identificador del cotPartidaCotizacionInvestigacionComentario
   * @return OK
   */
  cotPartidaCotizacionInvestigacionComentarioObtener(idcotPartidaCotizacionInvestigacionComentario: string): __Observable<CotPartidaCotizacionInvestigacionComentario> {
    return this.cotPartidaCotizacionInvestigacionComentarioObtenerResponse(idcotPartidaCotizacionInvestigacionComentario).pipe(
      __map(_r => _r.body as CotPartidaCotizacionInvestigacionComentario)
    );
  }

  /**
   * Guardar o actualizar un cotPartidaCotizacionInvestigacionComentario
   * @param cotizacion cotPartidaCotizacionInvestigacionComentario a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionInvestigacionComentarioGuardarOActualizarResponse(cotizacion: CotPartidaCotizacionInvestigacionComentario): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionComentario`,
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
   * Guardar o actualizar un cotPartidaCotizacionInvestigacionComentario
   * @param cotizacion cotPartidaCotizacionInvestigacionComentario a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionInvestigacionComentarioGuardarOActualizar(cotizacion: CotPartidaCotizacionInvestigacionComentario): __Observable<string> {
    return this.cotPartidaCotizacionInvestigacionComentarioGuardarOActualizarResponse(cotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotPartidaCotizacionInvestigacionComentario.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionComentarioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotPartidaCotizacionInvestigacionComentario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionComentario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotPartidaCotizacionInvestigacionComentario>;
      })
    );
  }
  /**
   * Obtener lista de cotPartidaCotizacionInvestigacionComentario.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionComentarioQueryResult(info: QueryInfo): __Observable<QueryResultCotPartidaCotizacionInvestigacionComentario> {
    return this.cotPartidaCotizacionInvestigacionComentarioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotPartidaCotizacionInvestigacionComentario)
    );
  }

  /**
   * Desactivar cotPartidaCotizacionInvestigacionComentario
   * @param idcotPartidaCotizacionInvestigacionComentario undefined
   * @return OK
   */
  cotPartidaCotizacionInvestigacionComentarioDesactivarResponse(idcotPartidaCotizacionInvestigacionComentario: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotPartidaCotizacionInvestigacionComentario != null) __params = __params.set('idcotPartidaCotizacionInvestigacionComentario', idcotPartidaCotizacionInvestigacionComentario.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionComentario`,
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
   * Desactivar cotPartidaCotizacionInvestigacionComentario
   * @param idcotPartidaCotizacionInvestigacionComentario undefined
   * @return OK
   */
  cotPartidaCotizacionInvestigacionComentarioDesactivar(idcotPartidaCotizacionInvestigacionComentario: string): __Observable<string> {
    return this.cotPartidaCotizacionInvestigacionComentarioDesactivarResponse(idcotPartidaCotizacionInvestigacionComentario).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Correo para proveedor.
   * @param CorreoCotPartidaInvestigacion Objeto de tipo GMCorreoCotPartidaInvestigacion para
   *             mandar correo al proveerdor y actualizar estado de partidas.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionCorreoGuardarCorreoCotPartidaInvestigacionResponse(CorreoCotPartidaInvestigacion: GMCorreoCotPartidaInvestigacion): __Observable<__StrictHttpResponse<GMCorreoCotPartidaInvestigacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CorreoCotPartidaInvestigacion;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionCorreo/CorreoCotPartidaInvestigacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMCorreoCotPartidaInvestigacion>;
      })
    );
  }
  /**
   * Correo para proveedor.
   * @param CorreoCotPartidaInvestigacion Objeto de tipo GMCorreoCotPartidaInvestigacion para
   *             mandar correo al proveerdor y actualizar estado de partidas.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionCorreoGuardarCorreoCotPartidaInvestigacion(CorreoCotPartidaInvestigacion: GMCorreoCotPartidaInvestigacion): __Observable<GMCorreoCotPartidaInvestigacion> {
    return this.cotPartidaCotizacionInvestigacionCorreoGuardarCorreoCotPartidaInvestigacionResponse(CorreoCotPartidaInvestigacion).pipe(
      __map(_r => _r.body as GMCorreoCotPartidaInvestigacion)
    );
  }

  /**
   * Obtener un cotPartidaCotizacionInvestigacionCorreo por su IdcotPartidaCotizacionInvestigacionCorreo
   * @param IdcotPartidaCotizacionInvestigacionCorreo identificador del cotPartidaCotizacionInvestigacionCorreo
   * @return OK
   */
  cotPartidaCotizacionInvestigacionCorreoObtenerResponse(IdcotPartidaCotizacionInvestigacionCorreo: string): __Observable<__StrictHttpResponse<CotPartidaCotizacionInvestigacionCorreo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdcotPartidaCotizacionInvestigacionCorreo != null) __params = __params.set('IdcotPartidaCotizacionInvestigacionCorreo', IdcotPartidaCotizacionInvestigacionCorreo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionCorreo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotPartidaCotizacionInvestigacionCorreo>;
      })
    );
  }
  /**
   * Obtener un cotPartidaCotizacionInvestigacionCorreo por su IdcotPartidaCotizacionInvestigacionCorreo
   * @param IdcotPartidaCotizacionInvestigacionCorreo identificador del cotPartidaCotizacionInvestigacionCorreo
   * @return OK
   */
  cotPartidaCotizacionInvestigacionCorreoObtener(IdcotPartidaCotizacionInvestigacionCorreo: string): __Observable<CotPartidaCotizacionInvestigacionCorreo> {
    return this.cotPartidaCotizacionInvestigacionCorreoObtenerResponse(IdcotPartidaCotizacionInvestigacionCorreo).pipe(
      __map(_r => _r.body as CotPartidaCotizacionInvestigacionCorreo)
    );
  }

  /**
   * Guardar o actualizar un cotPartidaCotizacionInvestigacionCorreo
   * @param CotPartidaCotizacionInvestigacionCorreo cotPartidaCotizacionInvestigacionCorreo a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionInvestigacionCorreoGuardarOActualizarResponse(CotPartidaCotizacionInvestigacionCorreo: CotPartidaCotizacionInvestigacionCorreo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CotPartidaCotizacionInvestigacionCorreo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionCorreo`,
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
   * Guardar o actualizar un cotPartidaCotizacionInvestigacionCorreo
   * @param CotPartidaCotizacionInvestigacionCorreo cotPartidaCotizacionInvestigacionCorreo a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionInvestigacionCorreoGuardarOActualizar(CotPartidaCotizacionInvestigacionCorreo: CotPartidaCotizacionInvestigacionCorreo): __Observable<string> {
    return this.cotPartidaCotizacionInvestigacionCorreoGuardarOActualizarResponse(CotPartidaCotizacionInvestigacionCorreo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotPartidaCotizacionInvestigacionCorreo.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionCorreoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotPartidaCotizacionInvestigacionCorreo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionCorreo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotPartidaCotizacionInvestigacionCorreo>;
      })
    );
  }
  /**
   * Obtener lista de cotPartidaCotizacionInvestigacionCorreo.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionCorreoQueryResult(info: QueryInfo): __Observable<QueryResultCotPartidaCotizacionInvestigacionCorreo> {
    return this.cotPartidaCotizacionInvestigacionCorreoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotPartidaCotizacionInvestigacionCorreo)
    );
  }

  /**
   * Desactivar cotPartidaCotizacionInvestigacionCorreo
   * @param IdcotPartidaCotizacionInvestigacionCorreo undefined
   * @return OK
   */
  cotPartidaCotizacionInvestigacionCorreoDesactivarResponse(IdcotPartidaCotizacionInvestigacionCorreo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdcotPartidaCotizacionInvestigacionCorreo != null) __params = __params.set('IdcotPartidaCotizacionInvestigacionCorreo', IdcotPartidaCotizacionInvestigacionCorreo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionCorreo`,
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
   * Desactivar cotPartidaCotizacionInvestigacionCorreo
   * @param IdcotPartidaCotizacionInvestigacionCorreo undefined
   * @return OK
   */
  cotPartidaCotizacionInvestigacionCorreoDesactivar(IdcotPartidaCotizacionInvestigacionCorreo: string): __Observable<string> {
    return this.cotPartidaCotizacionInvestigacionCorreoDesactivarResponse(IdcotPartidaCotizacionInvestigacionCorreo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un cotPartidaCotizacionInvestigacionSeguimiento por su idcotPartidaCotizacionInvestigacionSeguimiento
   * @param idcotPartidaCotizacionInvestigacionSeguimiento identificador del cotPartidaCotizacionInvestigacionSeguimiento
   * @return OK
   */
  cotPartidaCotizacionInvestigacionSeguimientoObtenerResponse(idcotPartidaCotizacionInvestigacionSeguimiento: string): __Observable<__StrictHttpResponse<CotPartidaCotizacionInvestigacionSeguimiento>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotPartidaCotizacionInvestigacionSeguimiento != null) __params = __params.set('idcotPartidaCotizacionInvestigacionSeguimiento', idcotPartidaCotizacionInvestigacionSeguimiento.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionSeguimiento`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotPartidaCotizacionInvestigacionSeguimiento>;
      })
    );
  }
  /**
   * Obtener un cotPartidaCotizacionInvestigacionSeguimiento por su idcotPartidaCotizacionInvestigacionSeguimiento
   * @param idcotPartidaCotizacionInvestigacionSeguimiento identificador del cotPartidaCotizacionInvestigacionSeguimiento
   * @return OK
   */
  cotPartidaCotizacionInvestigacionSeguimientoObtener(idcotPartidaCotizacionInvestigacionSeguimiento: string): __Observable<CotPartidaCotizacionInvestigacionSeguimiento> {
    return this.cotPartidaCotizacionInvestigacionSeguimientoObtenerResponse(idcotPartidaCotizacionInvestigacionSeguimiento).pipe(
      __map(_r => _r.body as CotPartidaCotizacionInvestigacionSeguimiento)
    );
  }

  /**
   * Guardar o actualizar un cotPartidaCotizacionInvestigacionSeguimiento
   * @param cotizacion cotPartidaCotizacionInvestigacionSeguimiento a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionInvestigacionSeguimientoGuardarOActualizarResponse(cotizacion: CotPartidaCotizacionInvestigacionSeguimiento): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionSeguimiento`,
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
   * Guardar o actualizar un cotPartidaCotizacionInvestigacionSeguimiento
   * @param cotizacion cotPartidaCotizacionInvestigacionSeguimiento a actualizar o guardar
   * @return OK
   */
  cotPartidaCotizacionInvestigacionSeguimientoGuardarOActualizar(cotizacion: CotPartidaCotizacionInvestigacionSeguimiento): __Observable<string> {
    return this.cotPartidaCotizacionInvestigacionSeguimientoGuardarOActualizarResponse(cotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotPartidaCotizacionInvestigacionSeguimiento.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionSeguimientoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotPartidaCotizacionInvestigacionSeguimiento>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionSeguimiento`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotPartidaCotizacionInvestigacionSeguimiento>;
      })
    );
  }
  /**
   * Obtener lista de cotPartidaCotizacionInvestigacionSeguimiento.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaCotizacionInvestigacionSeguimientoQueryResult(info: QueryInfo): __Observable<QueryResultCotPartidaCotizacionInvestigacionSeguimiento> {
    return this.cotPartidaCotizacionInvestigacionSeguimientoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotPartidaCotizacionInvestigacionSeguimiento)
    );
  }

  /**
   * Desactivar cotPartidaCotizacionInvestigacionSeguimiento
   * @param idcotPartidaCotizacionInvestigacionSeguimiento undefined
   * @return OK
   */
  cotPartidaCotizacionInvestigacionSeguimientoDesactivarResponse(idcotPartidaCotizacionInvestigacionSeguimiento: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotPartidaCotizacionInvestigacionSeguimiento != null) __params = __params.set('idcotPartidaCotizacionInvestigacionSeguimiento', idcotPartidaCotizacionInvestigacionSeguimiento.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotPartidaCotizacionInvestigacionSeguimiento`,
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
   * Desactivar cotPartidaCotizacionInvestigacionSeguimiento
   * @param idcotPartidaCotizacionInvestigacionSeguimiento undefined
   * @return OK
   */
  cotPartidaCotizacionInvestigacionSeguimientoDesactivar(idcotPartidaCotizacionInvestigacionSeguimiento: string): __Observable<string> {
    return this.cotPartidaCotizacionInvestigacionSeguimientoDesactivarResponse(idcotPartidaCotizacionInvestigacionSeguimiento).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Correo para proveedor.
   * @param GMPartidaInvestigacionRespuestaProveedor Objeto de tipo GMPartidaInvestigacionRespuestaProveedor para
   *             registrar la respuesta de correo del proveerdor y actualizar estado de partidas.
   * @return OK
   */
  cotPartidaInvestigacionProductoGuardarCorreoCotPartidaInvestigacionResponse(GMPartidaInvestigacionRespuestaProveedor: GMPartidaInvestigacionRespuestaProveedor): __Observable<__StrictHttpResponse<GMPartidaInvestigacionRespuestaProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMPartidaInvestigacionRespuestaProveedor;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaInvestigacionProducto/GuardarcotRespuestaCorreoProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMPartidaInvestigacionRespuestaProveedor>;
      })
    );
  }
  /**
   * Correo para proveedor.
   * @param GMPartidaInvestigacionRespuestaProveedor Objeto de tipo GMPartidaInvestigacionRespuestaProveedor para
   *             registrar la respuesta de correo del proveerdor y actualizar estado de partidas.
   * @return OK
   */
  cotPartidaInvestigacionProductoGuardarCorreoCotPartidaInvestigacion(GMPartidaInvestigacionRespuestaProveedor: GMPartidaInvestigacionRespuestaProveedor): __Observable<GMPartidaInvestigacionRespuestaProveedor> {
    return this.cotPartidaInvestigacionProductoGuardarCorreoCotPartidaInvestigacionResponse(GMPartidaInvestigacionRespuestaProveedor).pipe(
      __map(_r => _r.body as GMPartidaInvestigacionRespuestaProveedor)
    );
  }

  /**
   * Obtener un cotPartidaInvestigacionProducto por su idcotPartidaInvestigacionProducto
   * @param idcotPartidaInvestigacionProducto identificador del cotPartidaInvestigacionProducto
   * @return OK
   */
  cotPartidaInvestigacionProductoObtenerResponse(idcotPartidaInvestigacionProducto: string): __Observable<__StrictHttpResponse<CotPartidaInvestigacionProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotPartidaInvestigacionProducto != null) __params = __params.set('idcotPartidaInvestigacionProducto', idcotPartidaInvestigacionProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/cotPartidaInvestigacionProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CotPartidaInvestigacionProducto>;
      })
    );
  }
  /**
   * Obtener un cotPartidaInvestigacionProducto por su idcotPartidaInvestigacionProducto
   * @param idcotPartidaInvestigacionProducto identificador del cotPartidaInvestigacionProducto
   * @return OK
   */
  cotPartidaInvestigacionProductoObtener(idcotPartidaInvestigacionProducto: string): __Observable<CotPartidaInvestigacionProducto> {
    return this.cotPartidaInvestigacionProductoObtenerResponse(idcotPartidaInvestigacionProducto).pipe(
      __map(_r => _r.body as CotPartidaInvestigacionProducto)
    );
  }

  /**
   * Guardar o actualizar un cotPartidaInvestigacionProducto
   * @param cotPartidaInvestigacionProducto cotPartidaInvestigacionProducto a actualizar o guardar
   * @return OK
   */
  cotPartidaInvestigacionProductoGuardarOActualizarResponse(cotPartidaInvestigacionProducto: CotPartidaInvestigacionProducto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = cotPartidaInvestigacionProducto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/cotPartidaInvestigacionProducto`,
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
   * Guardar o actualizar un cotPartidaInvestigacionProducto
   * @param cotPartidaInvestigacionProducto cotPartidaInvestigacionProducto a actualizar o guardar
   * @return OK
   */
  cotPartidaInvestigacionProductoGuardarOActualizar(cotPartidaInvestigacionProducto: CotPartidaInvestigacionProducto): __Observable<string> {
    return this.cotPartidaInvestigacionProductoGuardarOActualizarResponse(cotPartidaInvestigacionProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de cotPartidaInvestigacionProducto.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaInvestigacionProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCotPartidaInvestigacionProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/cotPartidaInvestigacionProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCotPartidaInvestigacionProducto>;
      })
    );
  }
  /**
   * Obtener lista de cotPartidaInvestigacionProducto.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  cotPartidaInvestigacionProductoQueryResult(info: QueryInfo): __Observable<QueryResultCotPartidaInvestigacionProducto> {
    return this.cotPartidaInvestigacionProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCotPartidaInvestigacionProducto)
    );
  }

  /**
   * Desactivar un cotPartidaInvestigacionProducto. Desactiva las partidas hijas que son los complementos y suplementos.
   * @param idcotPartidaInvestigacionProducto Identificador de cotPartidaInvestigacionProducto a ser desactivado.
   * @return OK
   */
  cotPartidaInvestigacionProductoDesactivarResponse(idcotPartidaInvestigacionProducto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcotPartidaInvestigacionProducto != null) __params = __params.set('idcotPartidaInvestigacionProducto', idcotPartidaInvestigacionProducto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/cotPartidaInvestigacionProducto`,
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
   * Desactivar un cotPartidaInvestigacionProducto. Desactiva las partidas hijas que son los complementos y suplementos.
   * @param idcotPartidaInvestigacionProducto Identificador de cotPartidaInvestigacionProducto a ser desactivado.
   * @return OK
   */
  cotPartidaInvestigacionProductoDesactivar(idcotPartidaInvestigacionProducto: string): __Observable<string> {
    return this.cotPartidaInvestigacionProductoDesactivarResponse(idcotPartidaInvestigacionProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar Dashboard de Ratificar Investigacion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  DashboardRatificacionInvestigacionObtenerDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DashboardRatificarInvestigacion/dashboard`,
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
   * Consultar Dashboard de Ratificar Investigacion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  DashboardRatificacionInvestigacionObtenerDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.DashboardRatificacionInvestigacionObtenerDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * Consultar DashboardData  de ProductoInvestigacion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ProductoInvestigacionObtenerProductoInvestigacionDashboardResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<DashboardData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProductoInvestigacion/Dashboard`,
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
   * Consultar DashboardData  de ProductoInvestigacion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ProductoInvestigacionObtenerProductoInvestigacionDashboard(info: ResumeGroupQueryInfo): __Observable<DashboardData> {
    return this.ProductoInvestigacionObtenerProductoInvestigacionDashboardResponse(info).pipe(
      __map(_r => _r.body as DashboardData)
    );
  }

  /**
   * Consultar lista de Tabs para ProductoInvestigacion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ProductoInvestigacionObtenerProductoInvestigacionTabsResponse(info: ResumeGroupQueryInfo): __Observable<__StrictHttpResponse<Array<AttributeDashboard>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ProductoInvestigacion/Tabs`,
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
   * Consultar lista de Tabs para ProductoInvestigacion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ProductoInvestigacionObtenerProductoInvestigacionTabs(info: ResumeGroupQueryInfo): __Observable<Array<AttributeDashboard>> {
    return this.ProductoInvestigacionObtenerProductoInvestigacionTabsResponse(info).pipe(
      __map(_r => _r.body as Array<AttributeDashboard>)
    );
  }

  /**
   * Consultar lista de ProductoInvestigacion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ProductoInvestigacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProductoInvestigacionObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ListaProductoInvestigacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProductoInvestigacionObj>;
      })
    );
  }
  /**
   * Consultar lista de ProductoInvestigacion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  ProductoInvestigacionQueryResult(info: QueryInfo): __Observable<QueryResultProductoInvestigacionObj> {
    return this.ProductoInvestigacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProductoInvestigacionObj)
    );
  }

  /**
   * Consultar lista de productos en ratificacion por proveedor
   * @param info Filtros y ordenamientos
   * @return OK
   */
  RatificacionInvestigacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultProductoRatificacionObj>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ListaProductosRatificacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultProductoRatificacionObj>;
      })
    );
  }
  /**
   * Consultar lista de productos en ratificacion por proveedor
   * @param info Filtros y ordenamientos
   * @return OK
   */
  RatificacionInvestigacionQueryResult(info: QueryInfo): __Observable<QueryResultProductoRatificacionObj> {
    return this.RatificacionInvestigacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultProductoRatificacionObj)
    );
  }

  /**
   * Consultar lista paginada de vCotPartidaCotizacionInvestigacionAtencion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCotPartidaCotizacionInvestigacionAtencionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVCotPartidaCotizacionInvestigacionAtencion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vCotPartidaCotizacionInvestigacionAtencion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVCotPartidaCotizacionInvestigacionAtencion>;
      })
    );
  }
  /**
   * Consultar lista paginada de vCotPartidaCotizacionInvestigacionAtencion
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vCotPartidaCotizacionInvestigacionAtencionQueryResult(info: QueryInfo): __Observable<QueryResultVCotPartidaCotizacionInvestigacionAtencion> {
    return this.vCotPartidaCotizacionInvestigacionAtencionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVCotPartidaCotizacionInvestigacionAtencion)
    );
  }
}

module ProcesosL01CotizacionInvestigacionService {
}

export { ProcesosL01CotizacionInvestigacionService }
