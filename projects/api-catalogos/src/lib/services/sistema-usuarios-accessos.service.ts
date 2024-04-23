/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CodigoValidacion } from '../models/codigo-validacion';
import { QueryResultCodigoValidacion } from '../models/query-result-codigo-validacion';
import { QueryInfo } from '../models/query-info';
import { SolicitudAutorizacionCambio } from '../models/solicitud-autorizacion-cambio';
import { QueryResultSolicitudAutorizacionCambio } from '../models/query-result-solicitud-autorizacion-cambio';
import { VSolicitudAutorizacionCambio } from '../models/vsolicitud-autorizacion-cambio';
import { QueryResultVSolicitudAutorizacionCambio } from '../models/query-result-vsolicitud-autorizacion-cambio';
@Injectable({
  providedIn: 'root',
})
class SistemaUsuariosAccessosService extends __BaseService {
  static readonly CodigoValidacionObtenerPath = '/CodigoValidacion';
  static readonly CodigoValidacionGuardarOActualizarPath = '/CodigoValidacion';
  static readonly CodigoValidacionQueryResultPath = '/CodigoValidacion';
  static readonly SolicitudAutorizacionCambioObtenerPath = '/SolicitudAutorizacionCambio';
  static readonly SolicitudAutorizacionCambioGuardarOActualizarPath = '/SolicitudAutorizacionCambio';
  static readonly SolicitudAutorizacionCambioQueryResultPath = '/SolicitudAutorizacionCambio';
  static readonly SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionAjustarOfertaPath = '/GenerarSolicitudAutorizacionAjustarOferta';
  static readonly SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioCCargarFacturaPath = '/GenerarSolicitudAutorizacionCambioCCargarFactura';
  static readonly SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioPromesaCompraPath = '/GenerarSolicitudAutorizacionCambioPromesaCompra';
  static readonly SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioSimplePath = '/GenerarSolicitudAutorizacionCambioSimple';
  static readonly SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionClienteTipoDeCambioDOFPath = '/GenerarSolicitudAutorizacionClienteTipoDeCambioDOF';
  static readonly SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionImpOrdenDespachoPath = '/GenerarSolicitudAutorizacionImpOrdenDespacho';
  static readonly SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionPretramitarPedidoPath = '/GenerarSolicitudAutorizacionPretramitarPedido';
  static readonly SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoPath = '/GenerarSolicitudAutorizacionTramitarPedido';
  static readonly SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoPath = '/ValidarCodigoAcceso';
  static readonly vSolicitudAutorizacionCambioObtenerPath = '/vSolicitudAutorizacionCambio';
  static readonly vSolicitudAutorizacionCambioQueryResultPath = '/vSolicitudAutorizacionCambio';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un CodigoValidacion por su idCodigoValidacion
   * @param idCodigoValidacion Identificador de CodigoValidacion.
   * @return OK
   */
  CodigoValidacionObtenerResponse(idCodigoValidacion: string): __Observable<__StrictHttpResponse<CodigoValidacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCodigoValidacion != null) __params = __params.set('idCodigoValidacion', idCodigoValidacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/CodigoValidacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CodigoValidacion>;
      })
    );
  }
  /**
   * Obtener un CodigoValidacion por su idCodigoValidacion
   * @param idCodigoValidacion Identificador de CodigoValidacion.
   * @return OK
   */
  CodigoValidacionObtener(idCodigoValidacion: string): __Observable<CodigoValidacion> {
    return this.CodigoValidacionObtenerResponse(idCodigoValidacion).pipe(
      __map(_r => _r.body as CodigoValidacion)
    );
  }

  /**
   * Guarda o actualiza un CodigoValidacion.
   * @param CodigoValidacion Objeto de tipo "CodigoValidacion" a ser guardado.
   * @return OK
   */
  CodigoValidacionGuardarOActualizarResponse(CodigoValidacion: CodigoValidacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CodigoValidacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/CodigoValidacion`,
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
   * Guarda o actualiza un CodigoValidacion.
   * @param CodigoValidacion Objeto de tipo "CodigoValidacion" a ser guardado.
   * @return OK
   */
  CodigoValidacionGuardarOActualizar(CodigoValidacion: CodigoValidacion): __Observable<string> {
    return this.CodigoValidacionGuardarOActualizarResponse(CodigoValidacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult CodigoValidacion
   * @param info undefined
   * @return OK
   */
  CodigoValidacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCodigoValidacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/CodigoValidacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCodigoValidacion>;
      })
    );
  }
  /**
   * QueryResult CodigoValidacion
   * @param info undefined
   * @return OK
   */
  CodigoValidacionQueryResult(info: QueryInfo): __Observable<QueryResultCodigoValidacion> {
    return this.CodigoValidacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCodigoValidacion)
    );
  }

  /**
   * Obtener un SolicitudAutorizacionCambio por su idSolicitudAutorizacionCambio
   * @param idSolicitudAutorizacionCambio Identificador de SolicitudAutorizacionCambio.
   * @return OK
   */
  SolicitudAutorizacionCambioObtenerResponse(idSolicitudAutorizacionCambio: string): __Observable<__StrictHttpResponse<SolicitudAutorizacionCambio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idSolicitudAutorizacionCambio != null) __params = __params.set('idSolicitudAutorizacionCambio', idSolicitudAutorizacionCambio.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/SolicitudAutorizacionCambio`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SolicitudAutorizacionCambio>;
      })
    );
  }
  /**
   * Obtener un SolicitudAutorizacionCambio por su idSolicitudAutorizacionCambio
   * @param idSolicitudAutorizacionCambio Identificador de SolicitudAutorizacionCambio.
   * @return OK
   */
  SolicitudAutorizacionCambioObtener(idSolicitudAutorizacionCambio: string): __Observable<SolicitudAutorizacionCambio> {
    return this.SolicitudAutorizacionCambioObtenerResponse(idSolicitudAutorizacionCambio).pipe(
      __map(_r => _r.body as SolicitudAutorizacionCambio)
    );
  }

  /**
   * Guarda o actualiza un SolicitudAutorizacionCambio.
   * @param SolicitudAutorizacionCambio Objeto de tipo "SolicitudAutorizacionCambio" a ser guardado.
   * @return OK
   */
  SolicitudAutorizacionCambioGuardarOActualizarResponse(SolicitudAutorizacionCambio: SolicitudAutorizacionCambio): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = SolicitudAutorizacionCambio;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/SolicitudAutorizacionCambio`,
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
   * Guarda o actualiza un SolicitudAutorizacionCambio.
   * @param SolicitudAutorizacionCambio Objeto de tipo "SolicitudAutorizacionCambio" a ser guardado.
   * @return OK
   */
  SolicitudAutorizacionCambioGuardarOActualizar(SolicitudAutorizacionCambio: SolicitudAutorizacionCambio): __Observable<string> {
    return this.SolicitudAutorizacionCambioGuardarOActualizarResponse(SolicitudAutorizacionCambio).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult SolicitudAutorizacionCambio
   * @param info undefined
   * @return OK
   */
  SolicitudAutorizacionCambioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultSolicitudAutorizacionCambio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/SolicitudAutorizacionCambio`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultSolicitudAutorizacionCambio>;
      })
    );
  }
  /**
   * QueryResult SolicitudAutorizacionCambio
   * @param info undefined
   * @return OK
   */
  SolicitudAutorizacionCambioQueryResult(info: QueryInfo): __Observable<QueryResultSolicitudAutorizacionCambio> {
    return this.SolicitudAutorizacionCambioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultSolicitudAutorizacionCambio)
    );
  }

  /**
   * GenerarSolicitudAutorizacionAjustarOferta SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionAjustarOfertaParams` containing the following parameters:
   *
   * - `ventas`:
   *
   * - `tesoreria`:
   *
   * - `logistica`:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idCotCotizacion`:
   *
   * - `finanzas`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionAjustarOfertaResponse(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionAjustarOfertaParams): __Observable<__StrictHttpResponse<SolicitudAutorizacionCambio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.ventas != null) __params = __params.set('ventas', params.ventas.toString());
    if (params.tesoreria != null) __params = __params.set('tesoreria', params.tesoreria.toString());
    if (params.logistica != null) __params = __params.set('logistica', params.logistica.toString());
    if (params.idUsuarioSolicitaAutorizacion != null) __params = __params.set('idUsuarioSolicitaAutorizacion', params.idUsuarioSolicitaAutorizacion.toString());
    if (params.idCotCotizacion != null) __params = __params.set('idCotCotizacion', params.idCotCotizacion.toString());
    if (params.finanzas != null) __params = __params.set('finanzas', params.finanzas.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GenerarSolicitudAutorizacionAjustarOferta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SolicitudAutorizacionCambio>;
      })
    );
  }
  /**
   * GenerarSolicitudAutorizacionAjustarOferta SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionAjustarOfertaParams` containing the following parameters:
   *
   * - `ventas`:
   *
   * - `tesoreria`:
   *
   * - `logistica`:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idCotCotizacion`:
   *
   * - `finanzas`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionAjustarOferta(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionAjustarOfertaParams): __Observable<SolicitudAutorizacionCambio> {
    return this.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionAjustarOfertaResponse(params).pipe(
      __map(_r => _r.body as SolicitudAutorizacionCambio)
    );
  }

  /**
   * GenerarSolicitudAutorizacionCambioCCargarFactura SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioCCargarFacturaParams` containing the following parameters:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idOcOrdenDeCompra`:
   *
   * - `idUsuarioAprueba`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioCCargarFacturaResponse(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioCCargarFacturaParams): __Observable<__StrictHttpResponse<SolicitudAutorizacionCambio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idUsuarioSolicitaAutorizacion != null) __params = __params.set('idUsuarioSolicitaAutorizacion', params.idUsuarioSolicitaAutorizacion.toString());
    if (params.idOcOrdenDeCompra != null) __params = __params.set('idOcOrdenDeCompra', params.idOcOrdenDeCompra.toString());
    if (params.idUsuarioAprueba != null) __params = __params.set('idUsuarioAprueba', params.idUsuarioAprueba.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GenerarSolicitudAutorizacionCambioCCargarFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SolicitudAutorizacionCambio>;
      })
    );
  }
  /**
   * GenerarSolicitudAutorizacionCambioCCargarFactura SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioCCargarFacturaParams` containing the following parameters:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idOcOrdenDeCompra`:
   *
   * - `idUsuarioAprueba`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioCCargarFactura(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioCCargarFacturaParams): __Observable<SolicitudAutorizacionCambio> {
    return this.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioCCargarFacturaResponse(params).pipe(
      __map(_r => _r.body as SolicitudAutorizacionCambio)
    );
  }

  /**
   * GenerarSolicitudAutorizacionCambioPromesaCompra SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioPromesaCompraParams` containing the following parameters:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idPcPromesaDeCompra`:
   *
   * - `idUsuarioAprueba`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioPromesaCompraResponse(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioPromesaCompraParams): __Observable<__StrictHttpResponse<SolicitudAutorizacionCambio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idUsuarioSolicitaAutorizacion != null) __params = __params.set('idUsuarioSolicitaAutorizacion', params.idUsuarioSolicitaAutorizacion.toString());
    if (params.idPcPromesaDeCompra != null) __params = __params.set('idPcPromesaDeCompra', params.idPcPromesaDeCompra.toString());
    if (params.idUsuarioAprueba != null) __params = __params.set('idUsuarioAprueba', params.idUsuarioAprueba.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GenerarSolicitudAutorizacionCambioPromesaCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SolicitudAutorizacionCambio>;
      })
    );
  }
  /**
   * GenerarSolicitudAutorizacionCambioPromesaCompra SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioPromesaCompraParams` containing the following parameters:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idPcPromesaDeCompra`:
   *
   * - `idUsuarioAprueba`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioPromesaCompra(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioPromesaCompraParams): __Observable<SolicitudAutorizacionCambio> {
    return this.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioPromesaCompraResponse(params).pipe(
      __map(_r => _r.body as SolicitudAutorizacionCambio)
    );
  }

  /**
   * GenerarSolicitudAutorizacionCambioSimple SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioSimpleParams` containing the following parameters:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idUsuarioAprueba`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioSimpleResponse(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioSimpleParams): __Observable<__StrictHttpResponse<SolicitudAutorizacionCambio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idUsuarioSolicitaAutorizacion != null) __params = __params.set('idUsuarioSolicitaAutorizacion', params.idUsuarioSolicitaAutorizacion.toString());
    if (params.idUsuarioAprueba != null) __params = __params.set('idUsuarioAprueba', params.idUsuarioAprueba.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GenerarSolicitudAutorizacionCambioSimple`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SolicitudAutorizacionCambio>;
      })
    );
  }
  /**
   * GenerarSolicitudAutorizacionCambioSimple SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioSimpleParams` containing the following parameters:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idUsuarioAprueba`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioSimple(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioSimpleParams): __Observable<SolicitudAutorizacionCambio> {
    return this.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioSimpleResponse(params).pipe(
      __map(_r => _r.body as SolicitudAutorizacionCambio)
    );
  }

  /**
   * GenerarSolicitudAutorizacionClienteTipoDeCambioDOF SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionClienteTipoDeCambioDOFParams` containing the following parameters:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idCliente`:
   *
   * - `fechaFinVigencia`:
   *
   * - `comentarios`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionClienteTipoDeCambioDOFResponse(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionClienteTipoDeCambioDOFParams): __Observable<__StrictHttpResponse<SolicitudAutorizacionCambio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idUsuarioSolicitaAutorizacion != null) __params = __params.set('idUsuarioSolicitaAutorizacion', params.idUsuarioSolicitaAutorizacion.toString());
    if (params.idCliente != null) __params = __params.set('idCliente', params.idCliente.toString());
    if (params.fechaFinVigencia != null) __params = __params.set('fechaFinVigencia', params.fechaFinVigencia.toString());
    if (params.comentarios != null) __params = __params.set('comentarios', params.comentarios.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GenerarSolicitudAutorizacionClienteTipoDeCambioDOF`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SolicitudAutorizacionCambio>;
      })
    );
  }
  /**
   * GenerarSolicitudAutorizacionClienteTipoDeCambioDOF SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionClienteTipoDeCambioDOFParams` containing the following parameters:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idCliente`:
   *
   * - `fechaFinVigencia`:
   *
   * - `comentarios`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionClienteTipoDeCambioDOF(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionClienteTipoDeCambioDOFParams): __Observable<SolicitudAutorizacionCambio> {
    return this.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionClienteTipoDeCambioDOFResponse(params).pipe(
      __map(_r => _r.body as SolicitudAutorizacionCambio)
    );
  }

  /**
   * GenerarSolicitudAutorizacionImpOrdenDespacho SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionImpOrdenDespachoParams` containing the following parameters:
   *
   * - `tipoDeMovimiento`:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `IdImpOrdenDespacho`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionImpOrdenDespachoResponse(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionImpOrdenDespachoParams): __Observable<__StrictHttpResponse<SolicitudAutorizacionCambio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.tipoDeMovimiento != null) __params = __params.set('tipoDeMovimiento', params.tipoDeMovimiento.toString());
    if (params.idUsuarioSolicitaAutorizacion != null) __params = __params.set('idUsuarioSolicitaAutorizacion', params.idUsuarioSolicitaAutorizacion.toString());
    if (params.IdImpOrdenDespacho != null) __params = __params.set('IdImpOrdenDespacho', params.IdImpOrdenDespacho.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GenerarSolicitudAutorizacionImpOrdenDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SolicitudAutorizacionCambio>;
      })
    );
  }
  /**
   * GenerarSolicitudAutorizacionImpOrdenDespacho SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionImpOrdenDespachoParams` containing the following parameters:
   *
   * - `tipoDeMovimiento`:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `IdImpOrdenDespacho`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionImpOrdenDespacho(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionImpOrdenDespachoParams): __Observable<SolicitudAutorizacionCambio> {
    return this.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionImpOrdenDespachoResponse(params).pipe(
      __map(_r => _r.body as SolicitudAutorizacionCambio)
    );
  }

  /**
   * GenerarSolicitudAutorizacionPretramitarPedido SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionPretramitarPedidoParams` containing the following parameters:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idUsuarioAprueba`:
   *
   * - `idPPPedido`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionPretramitarPedidoResponse(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionPretramitarPedidoParams): __Observable<__StrictHttpResponse<SolicitudAutorizacionCambio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idUsuarioSolicitaAutorizacion != null) __params = __params.set('idUsuarioSolicitaAutorizacion', params.idUsuarioSolicitaAutorizacion.toString());
    if (params.idUsuarioAprueba != null) __params = __params.set('idUsuarioAprueba', params.idUsuarioAprueba.toString());
    if (params.idPPPedido != null) __params = __params.set('idPPPedido', params.idPPPedido.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GenerarSolicitudAutorizacionPretramitarPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SolicitudAutorizacionCambio>;
      })
    );
  }
  /**
   * GenerarSolicitudAutorizacionPretramitarPedido SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionPretramitarPedidoParams` containing the following parameters:
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idUsuarioAprueba`:
   *
   * - `idPPPedido`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionPretramitarPedido(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionPretramitarPedidoParams): __Observable<SolicitudAutorizacionCambio> {
    return this.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionPretramitarPedidoResponse(params).pipe(
      __map(_r => _r.body as SolicitudAutorizacionCambio)
    );
  }

  /**
   * GenerarSolicitudAutorizacionTramitarPedido SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoParams` containing the following parameters:
   *
   * - `tipoDeMovimiento`: Valores esperados: "EditarDatosFacturacion", "FacturarPorAdelantado",
   *   "TramitarPClienteMoroso", "CancelarPedido", "CancelarPartida"
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idTPPedido`:
   *
   * - `idUsuarioAprueba`: Valor opcional
   *
   * - `idTPPartidaPedido`: Valor opcinal, para caso de eliminar partida en Modificar Pedido
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoResponse(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoParams): __Observable<__StrictHttpResponse<SolicitudAutorizacionCambio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.tipoDeMovimiento != null) __params = __params.set('tipoDeMovimiento', params.tipoDeMovimiento.toString());
    if (params.idUsuarioSolicitaAutorizacion != null) __params = __params.set('idUsuarioSolicitaAutorizacion', params.idUsuarioSolicitaAutorizacion.toString());
    if (params.idTPPedido != null) __params = __params.set('idTPPedido', params.idTPPedido.toString());
    if (params.idUsuarioAprueba != null) __params = __params.set('idUsuarioAprueba', params.idUsuarioAprueba.toString());
    if (params.idTPPartidaPedido != null) __params = __params.set('idTPPartidaPedido', params.idTPPartidaPedido.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/GenerarSolicitudAutorizacionTramitarPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<SolicitudAutorizacionCambio>;
      })
    );
  }
  /**
   * GenerarSolicitudAutorizacionTramitarPedido SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoParams` containing the following parameters:
   *
   * - `tipoDeMovimiento`: Valores esperados: "EditarDatosFacturacion", "FacturarPorAdelantado",
   *   "TramitarPClienteMoroso", "CancelarPedido", "CancelarPartida"
   *
   * - `idUsuarioSolicitaAutorizacion`:
   *
   * - `idTPPedido`:
   *
   * - `idUsuarioAprueba`: Valor opcional
   *
   * - `idTPPartidaPedido`: Valor opcinal, para caso de eliminar partida en Modificar Pedido
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedido(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoParams): __Observable<SolicitudAutorizacionCambio> {
    return this.SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoResponse(params).pipe(
      __map(_r => _r.body as SolicitudAutorizacionCambio)
    );
  }

  /**
   * ValidarCodigoAcceso SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoParams` containing the following parameters:
   *
   * - `idSolicitudAutorizacionCambio`:
   *
   * - `codigoAcceso`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoResponse(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoParams): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idSolicitudAutorizacionCambio != null) __params = __params.set('idSolicitudAutorizacionCambio', params.idSolicitudAutorizacionCambio.toString());
    if (params.codigoAcceso != null) __params = __params.set('codigoAcceso', params.codigoAcceso.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ValidarCodigoAcceso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * ValidarCodigoAcceso SolicitudAutorizacionCambioExtensions
   * @param params The `SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoParams` containing the following parameters:
   *
   * - `idSolicitudAutorizacionCambio`:
   *
   * - `codigoAcceso`:
   *
   * @return OK
   */
  SolicitudAutorizacionCambioExtensionsValidarCodigoAcceso(params: SistemaUsuariosAccessosService.SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoParams): __Observable<boolean> {
    return this.SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoResponse(params).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * Obtener vSolicitudAutorizacionCambio
   * @param idSolicitudAutorizacionCambio undefined
   * @return OK
   */
  vSolicitudAutorizacionCambioObtenerResponse(idSolicitudAutorizacionCambio: string): __Observable<__StrictHttpResponse<VSolicitudAutorizacionCambio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idSolicitudAutorizacionCambio != null) __params = __params.set('idSolicitudAutorizacionCambio', idSolicitudAutorizacionCambio.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vSolicitudAutorizacionCambio`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VSolicitudAutorizacionCambio>;
      })
    );
  }
  /**
   * Obtener vSolicitudAutorizacionCambio
   * @param idSolicitudAutorizacionCambio undefined
   * @return OK
   */
  vSolicitudAutorizacionCambioObtener(idSolicitudAutorizacionCambio: string): __Observable<VSolicitudAutorizacionCambio> {
    return this.vSolicitudAutorizacionCambioObtenerResponse(idSolicitudAutorizacionCambio).pipe(
      __map(_r => _r.body as VSolicitudAutorizacionCambio)
    );
  }

  /**
   * Consultar lista paginada de vSolicitudAutorizacionCambio
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vSolicitudAutorizacionCambioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVSolicitudAutorizacionCambio>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vSolicitudAutorizacionCambio`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVSolicitudAutorizacionCambio>;
      })
    );
  }
  /**
   * Consultar lista paginada de vSolicitudAutorizacionCambio
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vSolicitudAutorizacionCambioQueryResult(info: QueryInfo): __Observable<QueryResultVSolicitudAutorizacionCambio> {
    return this.vSolicitudAutorizacionCambioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVSolicitudAutorizacionCambio)
    );
  }
}

module SistemaUsuariosAccessosService {

  /**
   * Parameters for SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionAjustarOferta
   */
  export interface SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionAjustarOfertaParams {
    ventas: boolean;
    tesoreria: boolean;
    logistica: boolean;
    idUsuarioSolicitaAutorizacion: string;
    idCotCotizacion: string;
    finanzas: boolean;
  }

  /**
   * Parameters for SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioCCargarFactura
   */
  export interface SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioCCargarFacturaParams {
    idUsuarioSolicitaAutorizacion: string;
    idOcOrdenDeCompra: string;
    idUsuarioAprueba?: string;
  }

  /**
   * Parameters for SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioPromesaCompra
   */
  export interface SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioPromesaCompraParams {
    idUsuarioSolicitaAutorizacion: string;
    idPcPromesaDeCompra: string;
    idUsuarioAprueba?: string;
  }

  /**
   * Parameters for SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioSimple
   */
  export interface SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionCambioSimpleParams {
    idUsuarioSolicitaAutorizacion: string;
    idUsuarioAprueba: string;
  }

  /**
   * Parameters for SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionClienteTipoDeCambioDOF
   */
  export interface SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionClienteTipoDeCambioDOFParams {
    idUsuarioSolicitaAutorizacion: string;
    idCliente: string;
    fechaFinVigencia: string;
    comentarios: string;
  }

  /**
   * Parameters for SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionImpOrdenDespacho
   */
  export interface SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionImpOrdenDespachoParams {
    tipoDeMovimiento: string;
    idUsuarioSolicitaAutorizacion: string;
    IdImpOrdenDespacho: string;
  }

  /**
   * Parameters for SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionPretramitarPedido
   */
  export interface SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionPretramitarPedidoParams {
    idUsuarioSolicitaAutorizacion: string;
    idUsuarioAprueba: string;
    idPPPedido: string;
  }

  /**
   * Parameters for SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedido
   */
  export interface SolicitudAutorizacionCambioExtensionsGenerarSolicitudAutorizacionTramitarPedidoParams {

    /**
     * Valores esperados: "EditarDatosFacturacion", "FacturarPorAdelantado",
     * "TramitarPClienteMoroso", "CancelarPedido", "CancelarPartida"
     */
    tipoDeMovimiento: string;
    idUsuarioSolicitaAutorizacion: string;
    idTPPedido: string;

    /**
     * Valor opcional
     */
    idUsuarioAprueba?: string;

    /**
     * Valor opcinal, para caso de eliminar partida en Modificar Pedido
     */
    idTPPartidaPedido?: string;
  }

  /**
   * Parameters for SolicitudAutorizacionCambioExtensionsValidarCodigoAcceso
   */
  export interface SolicitudAutorizacionCambioExtensionsValidarCodigoAccesoParams {
    idSolicitudAutorizacionCambio: string;
    codigoAcceso: string;
  }
}

export { SistemaUsuariosAccessosService }
