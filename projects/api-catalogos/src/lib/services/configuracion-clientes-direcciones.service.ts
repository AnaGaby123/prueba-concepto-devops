/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DatosDireccionCliente } from '../models/datos-direccion-cliente';
import { QueryResultDatosDireccionCliente } from '../models/query-result-datos-direccion-cliente';
import { QueryInfo } from '../models/query-info';
import { DatosDireccionClienteComentario } from '../models/datos-direccion-cliente-comentario';
import { QueryResultDatosDireccionClienteComentario } from '../models/query-result-datos-direccion-cliente-comentario';
import { DireccionCliente } from '../models/direccion-cliente';
import { QueryResultDireccionCliente } from '../models/query-result-direccion-cliente';
import { GroupQueryResultDireccionClienteDetalle } from '../models/group-query-result-direccion-cliente-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { DireccionClienteDetalle } from '../models/direccion-cliente-detalle';
import { QueryResultDireccionClienteDetalle } from '../models/query-result-direccion-cliente-detalle';
import { QueryResultDateTime } from '../models/query-result-date-time';
import { HorarioAtencion } from '../models/horario-atencion';
import { QueryResultHorarioAtencion } from '../models/query-result-horario-atencion';
import { HorarioAtencionCobro } from '../models/horario-atencion-cobro';
import { QueryResultHorarioAtencionCobro } from '../models/query-result-horario-atencion-cobro';
import { HorarioAtencionEntrega } from '../models/horario-atencion-entrega';
import { QueryResultHorarioAtencionEntrega } from '../models/query-result-horario-atencion-entrega';
import { HorarioAtencionRevision } from '../models/horario-atencion-revision';
import { QueryResultHorarioAtencionRevision } from '../models/query-result-horario-atencion-revision';
import { HorarioAtencionVisita } from '../models/horario-atencion-visita';
import { QueryResultHorarioAtencionVisita } from '../models/query-result-horario-atencion-visita';
import { RestriccionMensualDatosFacturacion } from '../models/restriccion-mensual-datos-facturacion';
import { QueryResultRestriccionMensualDatosFacturacion } from '../models/query-result-restriccion-mensual-datos-facturacion';
import { RestriccionTemporalDatosFacturacion } from '../models/restriccion-temporal-datos-facturacion';
import { QueryResultRestriccionTemporalDatosFacturacion } from '../models/query-result-restriccion-temporal-datos-facturacion';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionClientesDireccionesService extends __BaseService {
  static readonly DatosDireccionClienteObtenerPath = '/DatosDireccionCliente';
  static readonly DatosDireccionClienteGuardarOActualizarPath = '/DatosDireccionCliente';
  static readonly DatosDireccionClienteQueryResultPath = '/DatosDireccionCliente';
  static readonly DatosDireccionClienteComentarioObtenerPath = '/DatosDireccionClienteComentario';
  static readonly DatosDireccionClienteComentarioGuardarOActualizarPath = '/DatosDireccionClienteComentario';
  static readonly DatosDireccionClienteComentarioQueryResultPath = '/DatosDireccionClienteComentario';
  static readonly DatosDireccionClienteComentarioDesactivarPath = '/DatosDireccionClienteComentario';
  static readonly DireccionClienteObtenerPath = '/DireccionCliente';
  static readonly DireccionClienteGuardarOActualizarPath = '/DireccionCliente';
  static readonly DireccionClienteQueryResultPath = '/DireccionCliente';
  static readonly DireccionClienteDesactivarPath = '/DireccionCliente';
  static readonly DireccionClienteDetalleGroupQueryResultPath = '/GrupoListaDireccionClienteDetalle';
  static readonly DireccionClienteDetalleObtenerPath = '/DireccionClienteDetalle';
  static readonly DireccionClienteDetalleQueryResultPath = '/DireccionClienteDetalle';
  static readonly DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoPath = '/FechasNoSePuedeEntregarPedido';
  static readonly HorarioAtencionObtenerPath = '/HorarioAtencion';
  static readonly HorarioAtencionGuardarOActualizarPath = '/HorarioAtencion';
  static readonly HorarioAtencionQueryResultPath = '/HorarioAtencion';
  static readonly HorarioAtencionDesactivarPath = '/HorarioAtencion';
  static readonly HorarioAtencionCobroObtenerPath = '/HorarioAtencionCobro';
  static readonly HorarioAtencionCobroGuardarOActualizarPath = '/HorarioAtencionCobro';
  static readonly HorarioAtencionCobroQueryResultPath = '/HorarioAtencionCobro';
  static readonly HorarioAtencionCobroDesactivarPath = '/HorarioAtencionCobro';
  static readonly HorarioAtencionEntregaObtenerPath = '/HorarioAtencionEntrega';
  static readonly HorarioAtencionEntregaGuardarOActualizarPath = '/HorarioAtencionEntrega';
  static readonly HorarioAtencionEntregaQueryResultPath = '/HorarioAtencionEntrega';
  static readonly HorarioAtencionEntregaDesactivarPath = '/HorarioAtencionEntrega';
  static readonly HorarioAtencionRevisionObtenerPath = '/HorarioAtencionRevision';
  static readonly HorarioAtencionRevisionGuardarOActualizarPath = '/HorarioAtencionRevision';
  static readonly HorarioAtencionRevisionQueryResultPath = '/HorarioAtencionRevision';
  static readonly HorarioAtencionRevisionDesactivarPath = '/HorarioAtencionRevision';
  static readonly HorarioAtencionVisitaObtenerPath = '/HorarioAtencionVisita';
  static readonly HorarioAtencionVisitaGuardarOActualizarPath = '/HorarioAtencionVisita';
  static readonly HorarioAtencionVisitaQueryResultPath = '/HorarioAtencionVisita';
  static readonly HorarioAtencionVisitaDesactivarPath = '/HorarioAtencionVisita';
  static readonly RestriccionMensualDatosFacturacionObtenerPath = '/RestriccionMensualDatosFacturacion';
  static readonly RestriccionMensualDatosFacturacionGuardarOActualizarPath = '/RestriccionMensualDatosFacturacion';
  static readonly RestriccionMensualDatosFacturacionQueryResultPath = '/RestriccionMensualDatosFacturacion';
  static readonly RestriccionTemporalDatosFacturacionObtenerPath = '/RestriccionTemporalDatosFacturacion';
  static readonly RestriccionTemporalDatosFacturacionGuardarOActualizarPath = '/RestriccionTemporalDatosFacturacion';
  static readonly RestriccionTemporalDatosFacturacionQueryResultPath = '/RestriccionTemporalDatosFacturacion';
  static readonly RestriccionTemporalDatosFacturacionDesactivarPath = '/RestriccionTemporalDatosFacturacion';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de DatosDireccionCliente
   * @param idDatosDireccionCliente Identificador de DatosDireccionCliente
   * @return OK
   */
  DatosDireccionClienteObtenerResponse(idDatosDireccionCliente: string): __Observable<__StrictHttpResponse<DatosDireccionCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idDatosDireccionCliente != null) __params = __params.set('idDatosDireccionCliente', idDatosDireccionCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/DatosDireccionCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosDireccionCliente>;
      })
    );
  }
  /**
   * Consultar registro de DatosDireccionCliente
   * @param idDatosDireccionCliente Identificador de DatosDireccionCliente
   * @return OK
   */
  DatosDireccionClienteObtener(idDatosDireccionCliente: string): __Observable<DatosDireccionCliente> {
    return this.DatosDireccionClienteObtenerResponse(idDatosDireccionCliente).pipe(
      __map(_r => _r.body as DatosDireccionCliente)
    );
  }

  /**
   * Guardar o actualizar DatosDireccionCliente
   * @param DatosDireccionCliente DatosDireccionCliente
   * @return OK
   */
  DatosDireccionClienteGuardarOActualizarResponse(DatosDireccionCliente: DatosDireccionCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = DatosDireccionCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/DatosDireccionCliente`,
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
   * Guardar o actualizar DatosDireccionCliente
   * @param DatosDireccionCliente DatosDireccionCliente
   * @return OK
   */
  DatosDireccionClienteGuardarOActualizar(DatosDireccionCliente: DatosDireccionCliente): __Observable<string> {
    return this.DatosDireccionClienteGuardarOActualizarResponse(DatosDireccionCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de DatosDireccionCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  DatosDireccionClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultDatosDireccionCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DatosDireccionCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultDatosDireccionCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de DatosDireccionCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  DatosDireccionClienteQueryResult(info: QueryInfo): __Observable<QueryResultDatosDireccionCliente> {
    return this.DatosDireccionClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultDatosDireccionCliente)
    );
  }

  /**
   * Consultar registro de DatosDireccionClienteComentario
   * @param idDatosDireccionClienteComentario Identificador de DatosDireccionClienteComentario
   * @return OK
   */
  DatosDireccionClienteComentarioObtenerResponse(idDatosDireccionClienteComentario: string): __Observable<__StrictHttpResponse<DatosDireccionClienteComentario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idDatosDireccionClienteComentario != null) __params = __params.set('idDatosDireccionClienteComentario', idDatosDireccionClienteComentario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/DatosDireccionClienteComentario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosDireccionClienteComentario>;
      })
    );
  }
  /**
   * Consultar registro de DatosDireccionClienteComentario
   * @param idDatosDireccionClienteComentario Identificador de DatosDireccionClienteComentario
   * @return OK
   */
  DatosDireccionClienteComentarioObtener(idDatosDireccionClienteComentario: string): __Observable<DatosDireccionClienteComentario> {
    return this.DatosDireccionClienteComentarioObtenerResponse(idDatosDireccionClienteComentario).pipe(
      __map(_r => _r.body as DatosDireccionClienteComentario)
    );
  }

  /**
   * Guardar o actualizar DatosDireccionClienteComentario
   * @param DatosDireccionClienteComentario DatosDireccionClienteComentario
   * @return OK
   */
  DatosDireccionClienteComentarioGuardarOActualizarResponse(DatosDireccionClienteComentario: DatosDireccionClienteComentario): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = DatosDireccionClienteComentario;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/DatosDireccionClienteComentario`,
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
   * Guardar o actualizar DatosDireccionClienteComentario
   * @param DatosDireccionClienteComentario DatosDireccionClienteComentario
   * @return OK
   */
  DatosDireccionClienteComentarioGuardarOActualizar(DatosDireccionClienteComentario: DatosDireccionClienteComentario): __Observable<string> {
    return this.DatosDireccionClienteComentarioGuardarOActualizarResponse(DatosDireccionClienteComentario).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de DatosDireccionClienteComentario
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  DatosDireccionClienteComentarioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultDatosDireccionClienteComentario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DatosDireccionClienteComentario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultDatosDireccionClienteComentario>;
      })
    );
  }
  /**
   * Consultar lista paginada de DatosDireccionClienteComentario
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  DatosDireccionClienteComentarioQueryResult(info: QueryInfo): __Observable<QueryResultDatosDireccionClienteComentario> {
    return this.DatosDireccionClienteComentarioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultDatosDireccionClienteComentario)
    );
  }

  /**
   * Desactivar DatosDireccionClienteComentario
   * @param idDatosDireccionClienteComentario undefined
   * @return OK
   */
  DatosDireccionClienteComentarioDesactivarResponse(idDatosDireccionClienteComentario: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idDatosDireccionClienteComentario != null) __params = __params.set('idDatosDireccionClienteComentario', idDatosDireccionClienteComentario.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/DatosDireccionClienteComentario`,
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
   * Desactivar DatosDireccionClienteComentario
   * @param idDatosDireccionClienteComentario undefined
   * @return OK
   */
  DatosDireccionClienteComentarioDesactivar(idDatosDireccionClienteComentario: string): __Observable<string> {
    return this.DatosDireccionClienteComentarioDesactivarResponse(idDatosDireccionClienteComentario).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener DireccionCliente
   * @param idDireccionCliente undefined
   * @return OK
   */
  DireccionClienteObtenerResponse(idDireccionCliente: string): __Observable<__StrictHttpResponse<DireccionCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idDireccionCliente != null) __params = __params.set('idDireccionCliente', idDireccionCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/DireccionCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DireccionCliente>;
      })
    );
  }
  /**
   * Obtener DireccionCliente
   * @param idDireccionCliente undefined
   * @return OK
   */
  DireccionClienteObtener(idDireccionCliente: string): __Observable<DireccionCliente> {
    return this.DireccionClienteObtenerResponse(idDireccionCliente).pipe(
      __map(_r => _r.body as DireccionCliente)
    );
  }

  /**
   * GuardarOActualizar DireccionCliente
   * @param DireccionCliente undefined
   * @return OK
   */
  DireccionClienteGuardarOActualizarResponse(DireccionCliente: DireccionCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = DireccionCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/DireccionCliente`,
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
   * GuardarOActualizar DireccionCliente
   * @param DireccionCliente undefined
   * @return OK
   */
  DireccionClienteGuardarOActualizar(DireccionCliente: DireccionCliente): __Observable<string> {
    return this.DireccionClienteGuardarOActualizarResponse(DireccionCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult DireccionCliente
   * @param info undefined
   * @return OK
   */
  DireccionClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultDireccionCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DireccionCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultDireccionCliente>;
      })
    );
  }
  /**
   * QueryResult DireccionCliente
   * @param info undefined
   * @return OK
   */
  DireccionClienteQueryResult(info: QueryInfo): __Observable<QueryResultDireccionCliente> {
    return this.DireccionClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultDireccionCliente)
    );
  }

  /**
   * Desactivar DireccionCliente
   * @param idDireccionCliente undefined
   * @return OK
   */
  DireccionClienteDesactivarResponse(idDireccionCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idDireccionCliente != null) __params = __params.set('idDireccionCliente', idDireccionCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/DireccionCliente`,
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
   * Desactivar DireccionCliente
   * @param idDireccionCliente undefined
   * @return OK
   */
  DireccionClienteDesactivar(idDireccionCliente: string): __Observable<string> {
    return this.DireccionClienteDesactivarResponse(idDireccionCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GroupQueryResult DireccionClienteDetalle
   * @param info undefined
   * @return OK
   */
  DireccionClienteDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultDireccionClienteDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListaDireccionClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultDireccionClienteDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult DireccionClienteDetalle
   * @param info undefined
   * @return OK
   */
  DireccionClienteDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultDireccionClienteDetalle> {
    return this.DireccionClienteDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultDireccionClienteDetalle)
    );
  }

  /**
   * Obtener DireccionClienteDetalle
   * @param idDireccionCliente undefined
   * @return OK
   */
  DireccionClienteDetalleObtenerResponse(idDireccionCliente: string): __Observable<__StrictHttpResponse<DireccionClienteDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idDireccionCliente != null) __params = __params.set('idDireccionCliente', idDireccionCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/DireccionClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DireccionClienteDetalle>;
      })
    );
  }
  /**
   * Obtener DireccionClienteDetalle
   * @param idDireccionCliente undefined
   * @return OK
   */
  DireccionClienteDetalleObtener(idDireccionCliente: string): __Observable<DireccionClienteDetalle> {
    return this.DireccionClienteDetalleObtenerResponse(idDireccionCliente).pipe(
      __map(_r => _r.body as DireccionClienteDetalle)
    );
  }

  /**
   * QueryResult DireccionClienteDetalle
   * @param info undefined
   * @return OK
   */
  DireccionClienteDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultDireccionClienteDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DireccionClienteDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultDireccionClienteDetalle>;
      })
    );
  }
  /**
   * QueryResult DireccionClienteDetalle
   * @param info undefined
   * @return OK
   */
  DireccionClienteDetalleQueryResult(info: QueryInfo): __Observable<QueryResultDireccionClienteDetalle> {
    return this.DireccionClienteDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultDireccionClienteDetalle)
    );
  }

  /**
   * FechasNoSePuedeEntregarPedido DireccionClienteExtensions
   * @param params The `ConfiguracionClientesDireccionesService.DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams` containing the following parameters:
   *
   * - `idDireccionCliente`:
   *
   * - `hasta`:
   *
   * - `desde`:
   *
   * @return OK
   */
  DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoResponse(params: ConfiguracionClientesDireccionesService.DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams): __Observable<__StrictHttpResponse<QueryResultDateTime>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idDireccionCliente != null) __params = __params.set('idDireccionCliente', params.idDireccionCliente.toString());
    if (params.hasta != null) __params = __params.set('hasta', params.hasta.toString());
    if (params.desde != null) __params = __params.set('desde', params.desde.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/FechasNoSePuedeEntregarPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultDateTime>;
      })
    );
  }
  /**
   * FechasNoSePuedeEntregarPedido DireccionClienteExtensions
   * @param params The `ConfiguracionClientesDireccionesService.DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams` containing the following parameters:
   *
   * - `idDireccionCliente`:
   *
   * - `hasta`:
   *
   * - `desde`:
   *
   * @return OK
   */
  DireccionClienteExtensionsFechasNoSePuedeEntregarPedido(params: ConfiguracionClientesDireccionesService.DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams): __Observable<QueryResultDateTime> {
    return this.DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoResponse(params).pipe(
      __map(_r => _r.body as QueryResultDateTime)
    );
  }

  /**
   * Consultar registro de HorarioAtencion
   * @param idHorarioAtencion Identificador de HorarioAtencion
   * @return OK
   */
  HorarioAtencionObtenerResponse(idHorarioAtencion: string): __Observable<__StrictHttpResponse<HorarioAtencion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idHorarioAtencion != null) __params = __params.set('idHorarioAtencion', idHorarioAtencion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/HorarioAtencion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<HorarioAtencion>;
      })
    );
  }
  /**
   * Consultar registro de HorarioAtencion
   * @param idHorarioAtencion Identificador de HorarioAtencion
   * @return OK
   */
  HorarioAtencionObtener(idHorarioAtencion: string): __Observable<HorarioAtencion> {
    return this.HorarioAtencionObtenerResponse(idHorarioAtencion).pipe(
      __map(_r => _r.body as HorarioAtencion)
    );
  }

  /**
   * Guardar o actualizar HorarioAtencion
   * @param HorarioAtencion HorarioAtencion
   * @return OK
   */
  HorarioAtencionGuardarOActualizarResponse(HorarioAtencion: HorarioAtencion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = HorarioAtencion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/HorarioAtencion`,
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
   * Guardar o actualizar HorarioAtencion
   * @param HorarioAtencion HorarioAtencion
   * @return OK
   */
  HorarioAtencionGuardarOActualizar(HorarioAtencion: HorarioAtencion): __Observable<string> {
    return this.HorarioAtencionGuardarOActualizarResponse(HorarioAtencion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de HorarioAtencion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  HorarioAtencionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultHorarioAtencion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/HorarioAtencion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultHorarioAtencion>;
      })
    );
  }
  /**
   * Consultar lista paginada de HorarioAtencion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  HorarioAtencionQueryResult(info: QueryInfo): __Observable<QueryResultHorarioAtencion> {
    return this.HorarioAtencionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultHorarioAtencion)
    );
  }

  /**
   * Desactivar registro de HorarioAtencion
   * @param idHorarioAtencion Identificador de registro de HorarioAtencion
   * @return OK
   */
  HorarioAtencionDesactivarResponse(idHorarioAtencion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idHorarioAtencion != null) __params = __params.set('idHorarioAtencion', idHorarioAtencion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/HorarioAtencion`,
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
   * Desactivar registro de HorarioAtencion
   * @param idHorarioAtencion Identificador de registro de HorarioAtencion
   * @return OK
   */
  HorarioAtencionDesactivar(idHorarioAtencion: string): __Observable<string> {
    return this.HorarioAtencionDesactivarResponse(idHorarioAtencion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de HorarioAtencionCobro
   * @param idHorarioAtencionCobro Identificador de HorarioAtencionCobro
   * @return OK
   */
  HorarioAtencionCobroObtenerResponse(idHorarioAtencionCobro: string): __Observable<__StrictHttpResponse<HorarioAtencionCobro>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idHorarioAtencionCobro != null) __params = __params.set('idHorarioAtencionCobro', idHorarioAtencionCobro.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/HorarioAtencionCobro`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<HorarioAtencionCobro>;
      })
    );
  }
  /**
   * Consultar registro de HorarioAtencionCobro
   * @param idHorarioAtencionCobro Identificador de HorarioAtencionCobro
   * @return OK
   */
  HorarioAtencionCobroObtener(idHorarioAtencionCobro: string): __Observable<HorarioAtencionCobro> {
    return this.HorarioAtencionCobroObtenerResponse(idHorarioAtencionCobro).pipe(
      __map(_r => _r.body as HorarioAtencionCobro)
    );
  }

  /**
   * Guardar o actualizar HorarioAtencionCobro
   * @param HorarioAtencionCobro HorarioAtencionCobro
   * @return OK
   */
  HorarioAtencionCobroGuardarOActualizarResponse(HorarioAtencionCobro: HorarioAtencionCobro): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = HorarioAtencionCobro;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/HorarioAtencionCobro`,
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
   * Guardar o actualizar HorarioAtencionCobro
   * @param HorarioAtencionCobro HorarioAtencionCobro
   * @return OK
   */
  HorarioAtencionCobroGuardarOActualizar(HorarioAtencionCobro: HorarioAtencionCobro): __Observable<string> {
    return this.HorarioAtencionCobroGuardarOActualizarResponse(HorarioAtencionCobro).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de HorarioAtencionCobro
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  HorarioAtencionCobroQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultHorarioAtencionCobro>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/HorarioAtencionCobro`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultHorarioAtencionCobro>;
      })
    );
  }
  /**
   * Consultar lista paginada de HorarioAtencionCobro
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  HorarioAtencionCobroQueryResult(info: QueryInfo): __Observable<QueryResultHorarioAtencionCobro> {
    return this.HorarioAtencionCobroQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultHorarioAtencionCobro)
    );
  }

  /**
   * Desactivar registro de horario de atenci�n de cobro.
   * @param idHorarioAtencionCobro Identificador de registro de horario de atenci�n de cobro.
   * @return OK
   */
  HorarioAtencionCobroDesactivarResponse(idHorarioAtencionCobro: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idHorarioAtencionCobro != null) __params = __params.set('idHorarioAtencionCobro', idHorarioAtencionCobro.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/HorarioAtencionCobro`,
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
   * Desactivar registro de horario de atenci�n de cobro.
   * @param idHorarioAtencionCobro Identificador de registro de horario de atenci�n de cobro.
   * @return OK
   */
  HorarioAtencionCobroDesactivar(idHorarioAtencionCobro: string): __Observable<string> {
    return this.HorarioAtencionCobroDesactivarResponse(idHorarioAtencionCobro).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de HorarioAtencionEntrega
   * @param idHorarioAtencionEntrega Identificador de HorarioAtencionEntrega
   * @return OK
   */
  HorarioAtencionEntregaObtenerResponse(idHorarioAtencionEntrega: string): __Observable<__StrictHttpResponse<HorarioAtencionEntrega>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idHorarioAtencionEntrega != null) __params = __params.set('idHorarioAtencionEntrega', idHorarioAtencionEntrega.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/HorarioAtencionEntrega`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<HorarioAtencionEntrega>;
      })
    );
  }
  /**
   * Consultar registro de HorarioAtencionEntrega
   * @param idHorarioAtencionEntrega Identificador de HorarioAtencionEntrega
   * @return OK
   */
  HorarioAtencionEntregaObtener(idHorarioAtencionEntrega: string): __Observable<HorarioAtencionEntrega> {
    return this.HorarioAtencionEntregaObtenerResponse(idHorarioAtencionEntrega).pipe(
      __map(_r => _r.body as HorarioAtencionEntrega)
    );
  }

  /**
   * Guardar o actualizar HorarioAtencionEntrega
   * @param HorarioAtencionEntrega HorarioAtencionEntrega
   * @return OK
   */
  HorarioAtencionEntregaGuardarOActualizarResponse(HorarioAtencionEntrega: HorarioAtencionEntrega): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = HorarioAtencionEntrega;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/HorarioAtencionEntrega`,
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
   * Guardar o actualizar HorarioAtencionEntrega
   * @param HorarioAtencionEntrega HorarioAtencionEntrega
   * @return OK
   */
  HorarioAtencionEntregaGuardarOActualizar(HorarioAtencionEntrega: HorarioAtencionEntrega): __Observable<string> {
    return this.HorarioAtencionEntregaGuardarOActualizarResponse(HorarioAtencionEntrega).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de HorarioAtencionEntrega
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  HorarioAtencionEntregaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultHorarioAtencionEntrega>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/HorarioAtencionEntrega`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultHorarioAtencionEntrega>;
      })
    );
  }
  /**
   * Consultar lista paginada de HorarioAtencionEntrega
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  HorarioAtencionEntregaQueryResult(info: QueryInfo): __Observable<QueryResultHorarioAtencionEntrega> {
    return this.HorarioAtencionEntregaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultHorarioAtencionEntrega)
    );
  }

  /**
   * Desactivar registro de horario de atenci�n de entrega.
   * @param idHorarioAtencionEntrega Identificador de registro de horario de atenci�n de entrega.
   * @return OK
   */
  HorarioAtencionEntregaDesactivarResponse(idHorarioAtencionEntrega: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idHorarioAtencionEntrega != null) __params = __params.set('idHorarioAtencionEntrega', idHorarioAtencionEntrega.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/HorarioAtencionEntrega`,
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
   * Desactivar registro de horario de atenci�n de entrega.
   * @param idHorarioAtencionEntrega Identificador de registro de horario de atenci�n de entrega.
   * @return OK
   */
  HorarioAtencionEntregaDesactivar(idHorarioAtencionEntrega: string): __Observable<string> {
    return this.HorarioAtencionEntregaDesactivarResponse(idHorarioAtencionEntrega).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de HorarioAtencionRevision
   * @param idHorarioAtencionRevision Identificador de HorarioAtencionRevision
   * @return OK
   */
  HorarioAtencionRevisionObtenerResponse(idHorarioAtencionRevision: string): __Observable<__StrictHttpResponse<HorarioAtencionRevision>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idHorarioAtencionRevision != null) __params = __params.set('idHorarioAtencionRevision', idHorarioAtencionRevision.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/HorarioAtencionRevision`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<HorarioAtencionRevision>;
      })
    );
  }
  /**
   * Consultar registro de HorarioAtencionRevision
   * @param idHorarioAtencionRevision Identificador de HorarioAtencionRevision
   * @return OK
   */
  HorarioAtencionRevisionObtener(idHorarioAtencionRevision: string): __Observable<HorarioAtencionRevision> {
    return this.HorarioAtencionRevisionObtenerResponse(idHorarioAtencionRevision).pipe(
      __map(_r => _r.body as HorarioAtencionRevision)
    );
  }

  /**
   * Guardar o actualizar HorarioAtencionRevision
   * @param HorarioAtencionRevision HorarioAtencionRevision
   * @return OK
   */
  HorarioAtencionRevisionGuardarOActualizarResponse(HorarioAtencionRevision: HorarioAtencionRevision): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = HorarioAtencionRevision;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/HorarioAtencionRevision`,
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
   * Guardar o actualizar HorarioAtencionRevision
   * @param HorarioAtencionRevision HorarioAtencionRevision
   * @return OK
   */
  HorarioAtencionRevisionGuardarOActualizar(HorarioAtencionRevision: HorarioAtencionRevision): __Observable<string> {
    return this.HorarioAtencionRevisionGuardarOActualizarResponse(HorarioAtencionRevision).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de HorarioAtencionRevision
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  HorarioAtencionRevisionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultHorarioAtencionRevision>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/HorarioAtencionRevision`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultHorarioAtencionRevision>;
      })
    );
  }
  /**
   * Consultar lista paginada de HorarioAtencionRevision
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  HorarioAtencionRevisionQueryResult(info: QueryInfo): __Observable<QueryResultHorarioAtencionRevision> {
    return this.HorarioAtencionRevisionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultHorarioAtencionRevision)
    );
  }

  /**
   * Desactivar registro de horario de atenci�n de revisi�n.
   * @param idHorarioAtencionRevision Identificador de registro de horario de atenci�n de revisi�n.
   * @return OK
   */
  HorarioAtencionRevisionDesactivarResponse(idHorarioAtencionRevision: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idHorarioAtencionRevision != null) __params = __params.set('idHorarioAtencionRevision', idHorarioAtencionRevision.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/HorarioAtencionRevision`,
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
   * Desactivar registro de horario de atenci�n de revisi�n.
   * @param idHorarioAtencionRevision Identificador de registro de horario de atenci�n de revisi�n.
   * @return OK
   */
  HorarioAtencionRevisionDesactivar(idHorarioAtencionRevision: string): __Observable<string> {
    return this.HorarioAtencionRevisionDesactivarResponse(idHorarioAtencionRevision).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de HorarioAtencionVisita
   * @param idHorarioAtencionVisita Identificador de HorarioAtencionVisita
   * @return OK
   */
  HorarioAtencionVisitaObtenerResponse(idHorarioAtencionVisita: string): __Observable<__StrictHttpResponse<HorarioAtencionVisita>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idHorarioAtencionVisita != null) __params = __params.set('idHorarioAtencionVisita', idHorarioAtencionVisita.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/HorarioAtencionVisita`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<HorarioAtencionVisita>;
      })
    );
  }
  /**
   * Consultar registro de HorarioAtencionVisita
   * @param idHorarioAtencionVisita Identificador de HorarioAtencionVisita
   * @return OK
   */
  HorarioAtencionVisitaObtener(idHorarioAtencionVisita: string): __Observable<HorarioAtencionVisita> {
    return this.HorarioAtencionVisitaObtenerResponse(idHorarioAtencionVisita).pipe(
      __map(_r => _r.body as HorarioAtencionVisita)
    );
  }

  /**
   * Guardar o actualizar HorarioAtencionVisita
   * @param HorarioAtencionVisita HorarioAtencionVisita
   * @return OK
   */
  HorarioAtencionVisitaGuardarOActualizarResponse(HorarioAtencionVisita: HorarioAtencionVisita): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = HorarioAtencionVisita;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/HorarioAtencionVisita`,
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
   * Guardar o actualizar HorarioAtencionVisita
   * @param HorarioAtencionVisita HorarioAtencionVisita
   * @return OK
   */
  HorarioAtencionVisitaGuardarOActualizar(HorarioAtencionVisita: HorarioAtencionVisita): __Observable<string> {
    return this.HorarioAtencionVisitaGuardarOActualizarResponse(HorarioAtencionVisita).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de HorarioAtencionVisita
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  HorarioAtencionVisitaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultHorarioAtencionVisita>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/HorarioAtencionVisita`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultHorarioAtencionVisita>;
      })
    );
  }
  /**
   * Consultar lista paginada de HorarioAtencionVisita
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  HorarioAtencionVisitaQueryResult(info: QueryInfo): __Observable<QueryResultHorarioAtencionVisita> {
    return this.HorarioAtencionVisitaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultHorarioAtencionVisita)
    );
  }

  /**
   * Desactivar registro de horario de atenci�n de visita.
   * @param idHorarioAtencionVisita Identificador de registro de horario de atenci�n de visita.
   * @return OK
   */
  HorarioAtencionVisitaDesactivarResponse(idHorarioAtencionVisita: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idHorarioAtencionVisita != null) __params = __params.set('idHorarioAtencionVisita', idHorarioAtencionVisita.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/HorarioAtencionVisita`,
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
   * Desactivar registro de horario de atenci�n de visita.
   * @param idHorarioAtencionVisita Identificador de registro de horario de atenci�n de visita.
   * @return OK
   */
  HorarioAtencionVisitaDesactivar(idHorarioAtencionVisita: string): __Observable<string> {
    return this.HorarioAtencionVisitaDesactivarResponse(idHorarioAtencionVisita).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de RestriccionMensualDatosFacturacion
   * @param idRestriccionMensualDatosFacturacion Identificador de RestriccionMensualDatosFacturacion
   * @return OK
   */
  RestriccionMensualDatosFacturacionObtenerResponse(idRestriccionMensualDatosFacturacion: string): __Observable<__StrictHttpResponse<RestriccionMensualDatosFacturacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idRestriccionMensualDatosFacturacion != null) __params = __params.set('idRestriccionMensualDatosFacturacion', idRestriccionMensualDatosFacturacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/RestriccionMensualDatosFacturacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestriccionMensualDatosFacturacion>;
      })
    );
  }
  /**
   * Consultar registro de RestriccionMensualDatosFacturacion
   * @param idRestriccionMensualDatosFacturacion Identificador de RestriccionMensualDatosFacturacion
   * @return OK
   */
  RestriccionMensualDatosFacturacionObtener(idRestriccionMensualDatosFacturacion: string): __Observable<RestriccionMensualDatosFacturacion> {
    return this.RestriccionMensualDatosFacturacionObtenerResponse(idRestriccionMensualDatosFacturacion).pipe(
      __map(_r => _r.body as RestriccionMensualDatosFacturacion)
    );
  }

  /**
   * Guardar o actualizar RestriccionMensualDatosFacturacion
   * @param restriccionMensualDatosFacturacion RestriccionMensualDatosFacturacion
   * @return OK
   */
  RestriccionMensualDatosFacturacionGuardarOActualizarResponse(restriccionMensualDatosFacturacion: RestriccionMensualDatosFacturacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = restriccionMensualDatosFacturacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/RestriccionMensualDatosFacturacion`,
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
   * Guardar o actualizar RestriccionMensualDatosFacturacion
   * @param restriccionMensualDatosFacturacion RestriccionMensualDatosFacturacion
   * @return OK
   */
  RestriccionMensualDatosFacturacionGuardarOActualizar(restriccionMensualDatosFacturacion: RestriccionMensualDatosFacturacion): __Observable<string> {
    return this.RestriccionMensualDatosFacturacionGuardarOActualizarResponse(restriccionMensualDatosFacturacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de RestriccionMensualDatosFacturacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  RestriccionMensualDatosFacturacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultRestriccionMensualDatosFacturacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/RestriccionMensualDatosFacturacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultRestriccionMensualDatosFacturacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de RestriccionMensualDatosFacturacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  RestriccionMensualDatosFacturacionQueryResult(info: QueryInfo): __Observable<QueryResultRestriccionMensualDatosFacturacion> {
    return this.RestriccionMensualDatosFacturacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultRestriccionMensualDatosFacturacion)
    );
  }

  /**
   * Consultar registro de RestriccionTemporalDatosFacturacion
   * @param idRestriccionTemporalDatosFacturacion Identificador de RestriccionTemporalDatosFacturacion
   * @return OK
   */
  RestriccionTemporalDatosFacturacionObtenerResponse(idRestriccionTemporalDatosFacturacion: string): __Observable<__StrictHttpResponse<RestriccionTemporalDatosFacturacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idRestriccionTemporalDatosFacturacion != null) __params = __params.set('idRestriccionTemporalDatosFacturacion', idRestriccionTemporalDatosFacturacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/RestriccionTemporalDatosFacturacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RestriccionTemporalDatosFacturacion>;
      })
    );
  }
  /**
   * Consultar registro de RestriccionTemporalDatosFacturacion
   * @param idRestriccionTemporalDatosFacturacion Identificador de RestriccionTemporalDatosFacturacion
   * @return OK
   */
  RestriccionTemporalDatosFacturacionObtener(idRestriccionTemporalDatosFacturacion: string): __Observable<RestriccionTemporalDatosFacturacion> {
    return this.RestriccionTemporalDatosFacturacionObtenerResponse(idRestriccionTemporalDatosFacturacion).pipe(
      __map(_r => _r.body as RestriccionTemporalDatosFacturacion)
    );
  }

  /**
   * Guardar o actualizar RestriccionTemporalDatosFacturacion
   * @param restriccionTemporalDatosFacturacion RestriccionTemporalDatosFacturacion
   * @return OK
   */
  RestriccionTemporalDatosFacturacionGuardarOActualizarResponse(restriccionTemporalDatosFacturacion: RestriccionTemporalDatosFacturacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = restriccionTemporalDatosFacturacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/RestriccionTemporalDatosFacturacion`,
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
   * Guardar o actualizar RestriccionTemporalDatosFacturacion
   * @param restriccionTemporalDatosFacturacion RestriccionTemporalDatosFacturacion
   * @return OK
   */
  RestriccionTemporalDatosFacturacionGuardarOActualizar(restriccionTemporalDatosFacturacion: RestriccionTemporalDatosFacturacion): __Observable<string> {
    return this.RestriccionTemporalDatosFacturacionGuardarOActualizarResponse(restriccionTemporalDatosFacturacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de RestriccionTemporalDatosFacturacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  RestriccionTemporalDatosFacturacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultRestriccionTemporalDatosFacturacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/RestriccionTemporalDatosFacturacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultRestriccionTemporalDatosFacturacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de RestriccionTemporalDatosFacturacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  RestriccionTemporalDatosFacturacionQueryResult(info: QueryInfo): __Observable<QueryResultRestriccionTemporalDatosFacturacion> {
    return this.RestriccionTemporalDatosFacturacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultRestriccionTemporalDatosFacturacion)
    );
  }

  /**
   * Desactivar registro de RestriccionTemporalDatosFacturacion
   * @param idRestriccionTemporalDatosFacturacion Identificador de registro de RestriccionTemporalDatosFacturacion
   * @return OK
   */
  RestriccionTemporalDatosFacturacionDesactivarResponse(idRestriccionTemporalDatosFacturacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idRestriccionTemporalDatosFacturacion != null) __params = __params.set('idRestriccionTemporalDatosFacturacion', idRestriccionTemporalDatosFacturacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/RestriccionTemporalDatosFacturacion`,
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
   * Desactivar registro de RestriccionTemporalDatosFacturacion
   * @param idRestriccionTemporalDatosFacturacion Identificador de registro de RestriccionTemporalDatosFacturacion
   * @return OK
   */
  RestriccionTemporalDatosFacturacionDesactivar(idRestriccionTemporalDatosFacturacion: string): __Observable<string> {
    return this.RestriccionTemporalDatosFacturacionDesactivarResponse(idRestriccionTemporalDatosFacturacion).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ConfiguracionClientesDireccionesService {

  /**
   * Parameters for DireccionClienteExtensionsFechasNoSePuedeEntregarPedido
   */
  export interface DireccionClienteExtensionsFechasNoSePuedeEntregarPedidoParams {
    idDireccionCliente?: string;
    hasta?: string;
    desde?: string;
  }
}

export { ConfiguracionClientesDireccionesService }
