/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ClienteDatosSTP } from '../models/cliente-datos-stp';
import { QueryResultClienteDatosSTP } from '../models/query-result-cliente-datos-stp';
import { QueryInfo } from '../models/query-info';
import { ClienteTCDOFVigencia } from '../models/cliente-tcdofvigencia';
import { CorreoValidacionFacturacionCliente } from '../models/correo-validacion-facturacion-cliente';
import { QueryResultCorreoValidacionFacturacionCliente } from '../models/query-result-correo-validacion-facturacion-cliente';
import { DatosFacturacionCliente } from '../models/datos-facturacion-cliente';
import { QueryResultDatosFacturacionCliente } from '../models/query-result-datos-facturacion-cliente';
import { GroupQueryResultDatosFacturacionClienteDetalle } from '../models/group-query-result-datos-facturacion-cliente-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { DatosFacturacionClienteDetalle } from '../models/datos-facturacion-cliente-detalle';
import { QueryResultDatosFacturacionClienteDetalle } from '../models/query-result-datos-facturacion-cliente-detalle';
import { VDatosFacturacionCliente } from '../models/vdatos-facturacion-cliente';
import { QueryResultVDatosFacturacionCliente } from '../models/query-result-vdatos-facturacion-cliente';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionClientesConfiguracionService extends __BaseService {
  static readonly ClienteDatosSTPObtenerPath = '/ClienteDatosSTP';
  static readonly ClienteDatosSTPGuardarOActualizarPath = '/ClienteDatosSTP';
  static readonly ClienteDatosSTPQueryResultPath = '/ClienteDatosSTP';
  static readonly ClienteDatosSTPDesactivarPath = '/ClienteDatosSTP';
  static readonly ClienteTCDOFVigenciaGuardarOActualizarPath = '/ClienteTCDOFVigencia';
  static readonly CorreoValidacionFacturacionClienteObtenerPath = '/CorreoValidacionFacturacionCliente';
  static readonly CorreoValidacionFacturacionClienteGuardarOActualizarPath = '/CorreoValidacionFacturacionCliente';
  static readonly CorreoValidacionFacturacionClienteQueryResultPath = '/CorreoValidacionFacturacionCliente';
  static readonly CorreoValidacionFacturacionClienteDesactivarPath = '/CorreoValidacionFacturacionCliente';
  static readonly DatosFacturacionClienteObtenerPath = '/DatosFacturacionCliente';
  static readonly DatosFacturacionClienteGuardarOActualizarPath = '/DatosFacturacionCliente';
  static readonly DatosFacturacionClienteQueryResultPath = '/DatosFacturacionCliente';
  static readonly DatosFacturacionClienteDesactivarPath = '/DatosFacturacionCliente';
  static readonly DatosFacturacionClienteDetalleGroupQueryResultPath = '/GrupoListaDatosFacturacionClienteDetalle';
  static readonly DatosFacturacionClienteDetalleObtenerPath = '/DatosFacturacionClienteDetalle';
  static readonly DatosFacturacionClienteDetalleQueryResultPath = '/DatosFacturacionClienteDetalle';
  static readonly vDatosFacturacionClienteObtenerPath = '/vDatosFacturacionCliente';
  static readonly vDatosFacturacionClienteQueryResultPath = '/vDatosFacturacionCliente';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener ClienteDatosSTP
   * @param idClienteDatosSTP undefined
   * @return OK
   */
  ClienteDatosSTPObtenerResponse(idClienteDatosSTP: string): __Observable<__StrictHttpResponse<ClienteDatosSTP>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idClienteDatosSTP != null) __params = __params.set('idClienteDatosSTP', idClienteDatosSTP.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ClienteDatosSTP`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ClienteDatosSTP>;
      })
    );
  }
  /**
   * Obtener ClienteDatosSTP
   * @param idClienteDatosSTP undefined
   * @return OK
   */
  ClienteDatosSTPObtener(idClienteDatosSTP: string): __Observable<ClienteDatosSTP> {
    return this.ClienteDatosSTPObtenerResponse(idClienteDatosSTP).pipe(
      __map(_r => _r.body as ClienteDatosSTP)
    );
  }

  /**
   * GuardarOActualizar ClienteDatosSTP
   * @param ClienteDatosSTP undefined
   * @return OK
   */
  ClienteDatosSTPGuardarOActualizarResponse(ClienteDatosSTP: ClienteDatosSTP): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ClienteDatosSTP;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ClienteDatosSTP`,
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
   * GuardarOActualizar ClienteDatosSTP
   * @param ClienteDatosSTP undefined
   * @return OK
   */
  ClienteDatosSTPGuardarOActualizar(ClienteDatosSTP: ClienteDatosSTP): __Observable<string> {
    return this.ClienteDatosSTPGuardarOActualizarResponse(ClienteDatosSTP).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ClienteDatosSTP
   * @param info undefined
   * @return OK
   */
  ClienteDatosSTPQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultClienteDatosSTP>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ClienteDatosSTP`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultClienteDatosSTP>;
      })
    );
  }
  /**
   * QueryResult ClienteDatosSTP
   * @param info undefined
   * @return OK
   */
  ClienteDatosSTPQueryResult(info: QueryInfo): __Observable<QueryResultClienteDatosSTP> {
    return this.ClienteDatosSTPQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultClienteDatosSTP)
    );
  }

  /**
   * Desactivar ClienteDatosSTP
   * @param idClienteDatosSTP undefined
   * @return OK
   */
  ClienteDatosSTPDesactivarResponse(idClienteDatosSTP: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idClienteDatosSTP != null) __params = __params.set('idClienteDatosSTP', idClienteDatosSTP.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ClienteDatosSTP`,
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
   * Desactivar ClienteDatosSTP
   * @param idClienteDatosSTP undefined
   * @return OK
   */
  ClienteDatosSTPDesactivar(idClienteDatosSTP: string): __Observable<string> {
    return this.ClienteDatosSTPDesactivarResponse(idClienteDatosSTP).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GuardarOActualizar ClienteTCDOFVigencia
   * @param ClienteTCDOFVigencia undefined
   * @return OK
   */
  ClienteTCDOFVigenciaGuardarOActualizarResponse(ClienteTCDOFVigencia: ClienteTCDOFVigencia): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ClienteTCDOFVigencia;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ClienteTCDOFVigencia`,
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
   * GuardarOActualizar ClienteTCDOFVigencia
   * @param ClienteTCDOFVigencia undefined
   * @return OK
   */
  ClienteTCDOFVigenciaGuardarOActualizar(ClienteTCDOFVigencia: ClienteTCDOFVigencia): __Observable<string> {
    return this.ClienteTCDOFVigenciaGuardarOActualizarResponse(ClienteTCDOFVigencia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener CorreoValidacionFacturacionCliente
   * @param idCorreoValidacionFacturacionCliente undefined
   * @return OK
   */
  CorreoValidacionFacturacionClienteObtenerResponse(idCorreoValidacionFacturacionCliente: string): __Observable<__StrictHttpResponse<CorreoValidacionFacturacionCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoValidacionFacturacionCliente != null) __params = __params.set('idCorreoValidacionFacturacionCliente', idCorreoValidacionFacturacionCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CorreoValidacionFacturacionCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CorreoValidacionFacturacionCliente>;
      })
    );
  }
  /**
   * Obtener CorreoValidacionFacturacionCliente
   * @param idCorreoValidacionFacturacionCliente undefined
   * @return OK
   */
  CorreoValidacionFacturacionClienteObtener(idCorreoValidacionFacturacionCliente: string): __Observable<CorreoValidacionFacturacionCliente> {
    return this.CorreoValidacionFacturacionClienteObtenerResponse(idCorreoValidacionFacturacionCliente).pipe(
      __map(_r => _r.body as CorreoValidacionFacturacionCliente)
    );
  }

  /**
   * GuardarOActualizar CorreoValidacionFacturacionCliente
   * @param CorreoValidacionFacturacionCliente undefined
   * @return OK
   */
  CorreoValidacionFacturacionClienteGuardarOActualizarResponse(CorreoValidacionFacturacionCliente: CorreoValidacionFacturacionCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CorreoValidacionFacturacionCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CorreoValidacionFacturacionCliente`,
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
   * GuardarOActualizar CorreoValidacionFacturacionCliente
   * @param CorreoValidacionFacturacionCliente undefined
   * @return OK
   */
  CorreoValidacionFacturacionClienteGuardarOActualizar(CorreoValidacionFacturacionCliente: CorreoValidacionFacturacionCliente): __Observable<string> {
    return this.CorreoValidacionFacturacionClienteGuardarOActualizarResponse(CorreoValidacionFacturacionCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult CorreoValidacionFacturacionCliente
   * @param info undefined
   * @return OK
   */
  CorreoValidacionFacturacionClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCorreoValidacionFacturacionCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CorreoValidacionFacturacionCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCorreoValidacionFacturacionCliente>;
      })
    );
  }
  /**
   * QueryResult CorreoValidacionFacturacionCliente
   * @param info undefined
   * @return OK
   */
  CorreoValidacionFacturacionClienteQueryResult(info: QueryInfo): __Observable<QueryResultCorreoValidacionFacturacionCliente> {
    return this.CorreoValidacionFacturacionClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCorreoValidacionFacturacionCliente)
    );
  }

  /**
   * Desactivar CorreoValidacionFacturacionCliente
   * @param idCorreoValidacionFacturacionCliente undefined
   * @return OK
   */
  CorreoValidacionFacturacionClienteDesactivarResponse(idCorreoValidacionFacturacionCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoValidacionFacturacionCliente != null) __params = __params.set('idCorreoValidacionFacturacionCliente', idCorreoValidacionFacturacionCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/CorreoValidacionFacturacionCliente`,
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
   * Desactivar CorreoValidacionFacturacionCliente
   * @param idCorreoValidacionFacturacionCliente undefined
   * @return OK
   */
  CorreoValidacionFacturacionClienteDesactivar(idCorreoValidacionFacturacionCliente: string): __Observable<string> {
    return this.CorreoValidacionFacturacionClienteDesactivarResponse(idCorreoValidacionFacturacionCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener DatosFacturacionCliente
   * @param idDatosFacturacionCliente undefined
   * @return OK
   */
  DatosFacturacionClienteObtenerResponse(idDatosFacturacionCliente: string): __Observable<__StrictHttpResponse<DatosFacturacionCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idDatosFacturacionCliente != null) __params = __params.set('idDatosFacturacionCliente', idDatosFacturacionCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/DatosFacturacionCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosFacturacionCliente>;
      })
    );
  }
  /**
   * Obtener DatosFacturacionCliente
   * @param idDatosFacturacionCliente undefined
   * @return OK
   */
  DatosFacturacionClienteObtener(idDatosFacturacionCliente: string): __Observable<DatosFacturacionCliente> {
    return this.DatosFacturacionClienteObtenerResponse(idDatosFacturacionCliente).pipe(
      __map(_r => _r.body as DatosFacturacionCliente)
    );
  }

  /**
   * GuardarOActualizar DatosFacturacionCliente
   * @param DatosFacturacionCliente undefined
   * @return OK
   */
  DatosFacturacionClienteGuardarOActualizarResponse(DatosFacturacionCliente: DatosFacturacionCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = DatosFacturacionCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/DatosFacturacionCliente`,
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
   * GuardarOActualizar DatosFacturacionCliente
   * @param DatosFacturacionCliente undefined
   * @return OK
   */
  DatosFacturacionClienteGuardarOActualizar(DatosFacturacionCliente: DatosFacturacionCliente): __Observable<string> {
    return this.DatosFacturacionClienteGuardarOActualizarResponse(DatosFacturacionCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult DatosFacturacionCliente
   * @param info undefined
   * @return OK
   */
  DatosFacturacionClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultDatosFacturacionCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DatosFacturacionCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultDatosFacturacionCliente>;
      })
    );
  }
  /**
   * QueryResult DatosFacturacionCliente
   * @param info undefined
   * @return OK
   */
  DatosFacturacionClienteQueryResult(info: QueryInfo): __Observable<QueryResultDatosFacturacionCliente> {
    return this.DatosFacturacionClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultDatosFacturacionCliente)
    );
  }

  /**
   * Desactivar DatosFacturacionCliente
   * @param idDatosFacturacionCliente undefined
   * @return OK
   */
  DatosFacturacionClienteDesactivarResponse(idDatosFacturacionCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idDatosFacturacionCliente != null) __params = __params.set('idDatosFacturacionCliente', idDatosFacturacionCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/DatosFacturacionCliente`,
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
   * Desactivar DatosFacturacionCliente
   * @param idDatosFacturacionCliente undefined
   * @return OK
   */
  DatosFacturacionClienteDesactivar(idDatosFacturacionCliente: string): __Observable<string> {
    return this.DatosFacturacionClienteDesactivarResponse(idDatosFacturacionCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GroupQueryResult DatosFacturacionClienteDetalle
   * @param info undefined
   * @return OK
   */
  DatosFacturacionClienteDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultDatosFacturacionClienteDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaDatosFacturacionClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultDatosFacturacionClienteDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult DatosFacturacionClienteDetalle
   * @param info undefined
   * @return OK
   */
  DatosFacturacionClienteDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultDatosFacturacionClienteDetalle> {
    return this.DatosFacturacionClienteDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultDatosFacturacionClienteDetalle)
    );
  }

  /**
   * Obtener DatosFacturacionClienteDetalle
   * @param idCliente undefined
   * @return OK
   */
  DatosFacturacionClienteDetalleObtenerResponse(idCliente: string): __Observable<__StrictHttpResponse<DatosFacturacionClienteDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCliente != null) __params = __params.set('idCliente', idCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/DatosFacturacionClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosFacturacionClienteDetalle>;
      })
    );
  }
  /**
   * Obtener DatosFacturacionClienteDetalle
   * @param idCliente undefined
   * @return OK
   */
  DatosFacturacionClienteDetalleObtener(idCliente: string): __Observable<DatosFacturacionClienteDetalle> {
    return this.DatosFacturacionClienteDetalleObtenerResponse(idCliente).pipe(
      __map(_r => _r.body as DatosFacturacionClienteDetalle)
    );
  }

  /**
   * QueryResult DatosFacturacionClienteDetalle
   * @param info undefined
   * @return OK
   */
  DatosFacturacionClienteDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultDatosFacturacionClienteDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DatosFacturacionClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultDatosFacturacionClienteDetalle>;
      })
    );
  }
  /**
   * QueryResult DatosFacturacionClienteDetalle
   * @param info undefined
   * @return OK
   */
  DatosFacturacionClienteDetalleQueryResult(info: QueryInfo): __Observable<QueryResultDatosFacturacionClienteDetalle> {
    return this.DatosFacturacionClienteDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultDatosFacturacionClienteDetalle)
    );
  }

  /**
   * Obtener vDatosFacturacionCliente
   * @param idvDatosFacturacionCliente undefined
   * @return OK
   */
  vDatosFacturacionClienteObtenerResponse(idvDatosFacturacionCliente: string): __Observable<__StrictHttpResponse<VDatosFacturacionCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idvDatosFacturacionCliente != null) __params = __params.set('idvDatosFacturacionCliente', idvDatosFacturacionCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vDatosFacturacionCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VDatosFacturacionCliente>;
      })
    );
  }
  /**
   * Obtener vDatosFacturacionCliente
   * @param idvDatosFacturacionCliente undefined
   * @return OK
   */
  vDatosFacturacionClienteObtener(idvDatosFacturacionCliente: string): __Observable<VDatosFacturacionCliente> {
    return this.vDatosFacturacionClienteObtenerResponse(idvDatosFacturacionCliente).pipe(
      __map(_r => _r.body as VDatosFacturacionCliente)
    );
  }

  /**
   * QueryResult vDatosFacturacionCliente
   * @param queryInfo undefined
   * @return OK
   */
  vDatosFacturacionClienteQueryResultResponse(queryInfo: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVDatosFacturacionCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = queryInfo;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vDatosFacturacionCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVDatosFacturacionCliente>;
      })
    );
  }
  /**
   * QueryResult vDatosFacturacionCliente
   * @param queryInfo undefined
   * @return OK
   */
  vDatosFacturacionClienteQueryResult(queryInfo: QueryInfo): __Observable<QueryResultVDatosFacturacionCliente> {
    return this.vDatosFacturacionClienteQueryResultResponse(queryInfo).pipe(
      __map(_r => _r.body as QueryResultVDatosFacturacionCliente)
    );
  }
}

module ConfiguracionClientesConfiguracionService {
}

export { ConfiguracionClientesConfiguracionService }
