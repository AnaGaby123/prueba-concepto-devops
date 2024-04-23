/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PcFlete } from '../models/pc-flete';
import { QueryResultPcFlete } from '../models/query-result-pc-flete';
import { QueryInfo } from '../models/query-info';
import { PcIncidenciaPartidaPromesaDeCompra } from '../models/pc-incidencia-partida-promesa-de-compra';
import { QueryResultPcIncidenciaPartidaPromesaDeCompra } from '../models/query-result-pc-incidencia-partida-promesa-de-compra';
import { PcPartidaPromesaDeCompra } from '../models/pc-partida-promesa-de-compra';
import { QueryResultPcPartidaPromesaDeCompra } from '../models/query-result-pc-partida-promesa-de-compra';
import { PcPromesaDeCompra } from '../models/pc-promesa-de-compra';
import { QueryResultPcPromesaDeCompra } from '../models/query-result-pc-promesa-de-compra';
import { PcPromesaDeCompraArchivo } from '../models/pc-promesa-de-compra-archivo';
import { QueryResultPcPromesaDeCompraArchivo } from '../models/query-result-pc-promesa-de-compra-archivo';
import { GMReferenciaOrdenDeCompra } from '../models/gmreferencia-orden-de-compra';
import { PpPedido } from '../models/pp-pedido';
import { GMPretramitarPromesaDeCompra } from '../models/gmpretramitar-promesa-de-compra';
import { QueryResultVClienteCotizacionesPromesaDeCompraCarrusel } from '../models/query-result-vcliente-cotizaciones-promesa-de-compra-carrusel';
import { QueryResultVPartidaPromesaDeCompra } from '../models/query-result-vpartida-promesa-de-compra';
import { QueryResultVPromesaDeCompra } from '../models/query-result-vpromesa-de-compra';
@Injectable({
  providedIn: 'root',
})
class ProcesosL03PromesaDeCompraService extends __BaseService {
  static readonly pcFleteObtenerPath = '/pcFlete';
  static readonly pcFleteGuardarOActualizarPath = '/pcFlete';
  static readonly pcFleteQueryResultPath = '/pcFlete';
  static readonly pcFleteDesactivarPath = '/pcFlete';
  static readonly pcIncidenciaPartidaPromesaDeCompraObtenerPath = '/pcIncidenciaPartidaPromesaDeCompra';
  static readonly pcIncidenciaPartidaPromesaDeCompraGuardarOActualizarPath = '/pcIncidenciaPartidaPromesaDeCompra';
  static readonly pcIncidenciaPartidaPromesaDeCompraQueryResultPath = '/pcIncidenciaPartidaPromesaDeCompra';
  static readonly pcIncidenciaPartidaPromesaDeCompraDesactivarPath = '/pcIncidenciaPartidaPromesaDeCompra';
  static readonly pcPartidaPromesaDeCompraObtenerPath = '/pcPartidaPromesaDeCompra';
  static readonly pcPartidaPromesaDeCompraGuardarOActualizarPath = '/pcPartidaPromesaDeCompra';
  static readonly pcPartidaPromesaDeCompraQueryResultPath = '/pcPartidaPromesaDeCompra';
  static readonly pcPartidaPromesaDeCompraDesactivarPath = '/pcPartidaPromesaDeCompra';
  static readonly pcPromesaDeCompraObtenerPath = '/pcPromesaDeCompra';
  static readonly pcPromesaDeCompraGuardarOActualizarPath = '/pcPromesaDeCompra';
  static readonly pcPromesaDeCompraQueryResultPath = '/pcPromesaDeCompra';
  static readonly pcPromesaDeCompraDesactivarPath = '/pcPromesaDeCompra';
  static readonly pcPromesaDeCompraArchivoObtenerPath = '/pcPromesaDeCompraArchivo';
  static readonly pcPromesaDeCompraArchivoGuardarOActualizarPath = '/pcPromesaDeCompraArchivo';
  static readonly pcPromesaDeCompraArchivoQueryResultPath = '/pcPromesaDeCompraArchivo';
  static readonly pcPromesaDeCompraArchivoDesactivarPath = '/pcPromesaDeCompraArchivo';
  static readonly pcPromesaDeCompraExtensionsActulizarRefecrenciaOrdenDeCompraPath = '/ActualizarRefenciaOC';
  static readonly pcPromesaDeCompraExtensionsProcessPath = '/PretramitarPcPromesaDeCompra';
  static readonly pcPromesaDeCompraExtensionsProcessTransaccionPath = '/PretramitarPcPromesaDeCompra/transaccion';
  static readonly vClienteCotizacionesPromesaDeCompraCarruselQueryResultPath = '/vClienteCotizacionesPromesaDeCompraCarrusel';
  static readonly vPartidaPromesaDeCompraQueryResultPath = '/vPartidaPromesaDeCompra';
  static readonly vPromesaDeCompraQueryResultPath = '/vPromesaDeCompra';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un pcFlete por su idpcFlete
   * @param idPcFlete identificador del pcFlete
   * @return OK
   */
  pcFleteObtenerResponse(idPcFlete: string): __Observable<__StrictHttpResponse<PcFlete>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idPcFlete != null) __params = __params.set('idPcFlete', idPcFlete.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pcFlete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PcFlete>;
      })
    );
  }
  /**
   * Obtener un pcFlete por su idpcFlete
   * @param idPcFlete identificador del pcFlete
   * @return OK
   */
  pcFleteObtener(idPcFlete: string): __Observable<PcFlete> {
    return this.pcFleteObtenerResponse(idPcFlete).pipe(
      __map(_r => _r.body as PcFlete)
    );
  }

  /**
   * Guardar o actualizar un pcFlete
   * @param PcFlete pcFlete a actualizar o guardar
   * @return OK
   */
  pcFleteGuardarOActualizarResponse(PcFlete: PcFlete): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = PcFlete;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/pcFlete`,
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
   * Guardar o actualizar un pcFlete
   * @param PcFlete pcFlete a actualizar o guardar
   * @return OK
   */
  pcFleteGuardarOActualizar(PcFlete: PcFlete): __Observable<string> {
    return this.pcFleteGuardarOActualizarResponse(PcFlete).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pcFlete.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  pcFleteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPcFlete>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/pcFlete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPcFlete>;
      })
    );
  }
  /**
   * Obtener lista de pcFlete.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  pcFleteQueryResult(info: QueryInfo): __Observable<QueryResultPcFlete> {
    return this.pcFleteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPcFlete)
    );
  }

  /**
   * Desactivar un pcFlete.
   * @param idPcFlete Identificador de pcFlete a ser desactivado.
   * @return OK
   */
  pcFleteDesactivarResponse(idPcFlete: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idPcFlete != null) __params = __params.set('idPcFlete', idPcFlete.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/pcFlete`,
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
   * Desactivar un pcFlete.
   * @param idPcFlete Identificador de pcFlete a ser desactivado.
   * @return OK
   */
  pcFleteDesactivar(idPcFlete: string): __Observable<string> {
    return this.pcFleteDesactivarResponse(idPcFlete).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un pcIncidenciaPartidaPromesaDeCompra por su idpcIncidenciaPartidaPromesaDeCompra
   * @param idpcIncidenciaPartidaPromesaDeCompra identificador del pcIncidenciaPartidaPromesaDeCompra
   * @return OK
   */
  pcIncidenciaPartidaPromesaDeCompraObtenerResponse(idpcIncidenciaPartidaPromesaDeCompra: string): __Observable<__StrictHttpResponse<PcIncidenciaPartidaPromesaDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idpcIncidenciaPartidaPromesaDeCompra != null) __params = __params.set('idpcIncidenciaPartidaPromesaDeCompra', idpcIncidenciaPartidaPromesaDeCompra.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pcIncidenciaPartidaPromesaDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PcIncidenciaPartidaPromesaDeCompra>;
      })
    );
  }
  /**
   * Obtener un pcIncidenciaPartidaPromesaDeCompra por su idpcIncidenciaPartidaPromesaDeCompra
   * @param idpcIncidenciaPartidaPromesaDeCompra identificador del pcIncidenciaPartidaPromesaDeCompra
   * @return OK
   */
  pcIncidenciaPartidaPromesaDeCompraObtener(idpcIncidenciaPartidaPromesaDeCompra: string): __Observable<PcIncidenciaPartidaPromesaDeCompra> {
    return this.pcIncidenciaPartidaPromesaDeCompraObtenerResponse(idpcIncidenciaPartidaPromesaDeCompra).pipe(
      __map(_r => _r.body as PcIncidenciaPartidaPromesaDeCompra)
    );
  }

  /**
   * Guardar o actualizar un pcIncidenciaPartidaPromesaDeCompra
   * @param PcIncidenciaPartidaPromesaDeCompra pcIncidenciaPartidaPromesaDeCompra a actualizar o guardar
   * @return OK
   */
  pcIncidenciaPartidaPromesaDeCompraGuardarOActualizarResponse(PcIncidenciaPartidaPromesaDeCompra: PcIncidenciaPartidaPromesaDeCompra): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = PcIncidenciaPartidaPromesaDeCompra;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/pcIncidenciaPartidaPromesaDeCompra`,
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
   * Guardar o actualizar un pcIncidenciaPartidaPromesaDeCompra
   * @param PcIncidenciaPartidaPromesaDeCompra pcIncidenciaPartidaPromesaDeCompra a actualizar o guardar
   * @return OK
   */
  pcIncidenciaPartidaPromesaDeCompraGuardarOActualizar(PcIncidenciaPartidaPromesaDeCompra: PcIncidenciaPartidaPromesaDeCompra): __Observable<string> {
    return this.pcIncidenciaPartidaPromesaDeCompraGuardarOActualizarResponse(PcIncidenciaPartidaPromesaDeCompra).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pcIncidenciaPartidaPromesaDeCompra.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  pcIncidenciaPartidaPromesaDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPcIncidenciaPartidaPromesaDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/pcIncidenciaPartidaPromesaDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPcIncidenciaPartidaPromesaDeCompra>;
      })
    );
  }
  /**
   * Obtener lista de pcIncidenciaPartidaPromesaDeCompra.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  pcIncidenciaPartidaPromesaDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultPcIncidenciaPartidaPromesaDeCompra> {
    return this.pcIncidenciaPartidaPromesaDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPcIncidenciaPartidaPromesaDeCompra)
    );
  }

  /**
   * Desactivar un pcIncidenciaPartidaPromesaDeCompra.
   * @param idPcIncidenciaPartidaPromesaDeCompra Identificador de pcIncidenciaPartidaPromesaDeCompra a ser
   * desactivado.
   * @return OK
   */
  pcIncidenciaPartidaPromesaDeCompraDesactivarResponse(idPcIncidenciaPartidaPromesaDeCompra: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idPcIncidenciaPartidaPromesaDeCompra != null) __params = __params.set('idPcIncidenciaPartidaPromesaDeCompra', idPcIncidenciaPartidaPromesaDeCompra.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/pcIncidenciaPartidaPromesaDeCompra`,
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
   * Desactivar un pcIncidenciaPartidaPromesaDeCompra.
   * @param idPcIncidenciaPartidaPromesaDeCompra Identificador de pcIncidenciaPartidaPromesaDeCompra a ser
   * desactivado.
   * @return OK
   */
  pcIncidenciaPartidaPromesaDeCompraDesactivar(idPcIncidenciaPartidaPromesaDeCompra: string): __Observable<string> {
    return this.pcIncidenciaPartidaPromesaDeCompraDesactivarResponse(idPcIncidenciaPartidaPromesaDeCompra).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un pcPartidaPromesaDeCompra por su idpcPartidaPromesaDeCompra
   * @param idPcPartidaPromesaDeCompra identificador del pcPartidaPromesaDeCompra
   * @return OK
   */
  pcPartidaPromesaDeCompraObtenerResponse(idPcPartidaPromesaDeCompra: string): __Observable<__StrictHttpResponse<PcPartidaPromesaDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idPcPartidaPromesaDeCompra != null) __params = __params.set('idPcPartidaPromesaDeCompra', idPcPartidaPromesaDeCompra.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pcPartidaPromesaDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PcPartidaPromesaDeCompra>;
      })
    );
  }
  /**
   * Obtener un pcPartidaPromesaDeCompra por su idpcPartidaPromesaDeCompra
   * @param idPcPartidaPromesaDeCompra identificador del pcPartidaPromesaDeCompra
   * @return OK
   */
  pcPartidaPromesaDeCompraObtener(idPcPartidaPromesaDeCompra: string): __Observable<PcPartidaPromesaDeCompra> {
    return this.pcPartidaPromesaDeCompraObtenerResponse(idPcPartidaPromesaDeCompra).pipe(
      __map(_r => _r.body as PcPartidaPromesaDeCompra)
    );
  }

  /**
   * Guardar o actualizar un pcPartidaPromesaDeCompra
   * @param PcPartidaPromesaDeCompra pcPartidaPromesaDeCompra a actualizar o guardar
   * @return OK
   */
  pcPartidaPromesaDeCompraGuardarOActualizarResponse(PcPartidaPromesaDeCompra: PcPartidaPromesaDeCompra): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = PcPartidaPromesaDeCompra;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/pcPartidaPromesaDeCompra`,
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
   * Guardar o actualizar un pcPartidaPromesaDeCompra
   * @param PcPartidaPromesaDeCompra pcPartidaPromesaDeCompra a actualizar o guardar
   * @return OK
   */
  pcPartidaPromesaDeCompraGuardarOActualizar(PcPartidaPromesaDeCompra: PcPartidaPromesaDeCompra): __Observable<string> {
    return this.pcPartidaPromesaDeCompraGuardarOActualizarResponse(PcPartidaPromesaDeCompra).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pcPartidaPromesaDeCompra.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  pcPartidaPromesaDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPcPartidaPromesaDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/pcPartidaPromesaDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPcPartidaPromesaDeCompra>;
      })
    );
  }
  /**
   * Obtener lista de pcPartidaPromesaDeCompra.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  pcPartidaPromesaDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultPcPartidaPromesaDeCompra> {
    return this.pcPartidaPromesaDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPcPartidaPromesaDeCompra)
    );
  }

  /**
   * Desactivar un pcPartidaPromesaDeCompra. Desactiva las pcIncidenciaPartidaPromesaDeCompra.
   * @param idPcPartidaPromesaDeCompra Identificador de pcPartidaPromesaDeCompra a ser desactivado.
   * @return OK
   */
  pcPartidaPromesaDeCompraDesactivarResponse(idPcPartidaPromesaDeCompra: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idPcPartidaPromesaDeCompra != null) __params = __params.set('idPcPartidaPromesaDeCompra', idPcPartidaPromesaDeCompra.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/pcPartidaPromesaDeCompra`,
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
   * Desactivar un pcPartidaPromesaDeCompra. Desactiva las pcIncidenciaPartidaPromesaDeCompra.
   * @param idPcPartidaPromesaDeCompra Identificador de pcPartidaPromesaDeCompra a ser desactivado.
   * @return OK
   */
  pcPartidaPromesaDeCompraDesactivar(idPcPartidaPromesaDeCompra: string): __Observable<string> {
    return this.pcPartidaPromesaDeCompraDesactivarResponse(idPcPartidaPromesaDeCompra).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un pcPromesaDeCompra por su idpcPromesaDeCompra
   * @param idPcPromesaDeCompra identificador del pcPromesaDeCompra
   * @return OK
   */
  pcPromesaDeCompraObtenerResponse(idPcPromesaDeCompra: string): __Observable<__StrictHttpResponse<PcPromesaDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idPcPromesaDeCompra != null) __params = __params.set('idPcPromesaDeCompra', idPcPromesaDeCompra.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pcPromesaDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PcPromesaDeCompra>;
      })
    );
  }
  /**
   * Obtener un pcPromesaDeCompra por su idpcPromesaDeCompra
   * @param idPcPromesaDeCompra identificador del pcPromesaDeCompra
   * @return OK
   */
  pcPromesaDeCompraObtener(idPcPromesaDeCompra: string): __Observable<PcPromesaDeCompra> {
    return this.pcPromesaDeCompraObtenerResponse(idPcPromesaDeCompra).pipe(
      __map(_r => _r.body as PcPromesaDeCompra)
    );
  }

  /**
   * Guardar o actualizar un pcPromesaDeCompra
   * @param PcPromesaDeCompra pcPromesaDeCompra a actualizar o guardar
   * @return OK
   */
  pcPromesaDeCompraGuardarOActualizarResponse(PcPromesaDeCompra: PcPromesaDeCompra): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = PcPromesaDeCompra;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/pcPromesaDeCompra`,
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
   * Guardar o actualizar un pcPromesaDeCompra
   * @param PcPromesaDeCompra pcPromesaDeCompra a actualizar o guardar
   * @return OK
   */
  pcPromesaDeCompraGuardarOActualizar(PcPromesaDeCompra: PcPromesaDeCompra): __Observable<string> {
    return this.pcPromesaDeCompraGuardarOActualizarResponse(PcPromesaDeCompra).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pcPromesaDeCompra.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  pcPromesaDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPcPromesaDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/pcPromesaDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPcPromesaDeCompra>;
      })
    );
  }
  /**
   * Obtener lista de pcPromesaDeCompra.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  pcPromesaDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultPcPromesaDeCompra> {
    return this.pcPromesaDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPcPromesaDeCompra)
    );
  }

  /**
   * Desactivar un pcPromesaDeCompra y las dependencias de pcPromesaDeCompra pcPartidaPromesaDeCompra y
   * pcPromesaDeCompraArchivo
   * @param idPcPromesaDeCompra Identificador de pcPromesaDeCompra a ser desactivado.
   * @return OK
   */
  pcPromesaDeCompraDesactivarResponse(idPcPromesaDeCompra: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idPcPromesaDeCompra != null) __params = __params.set('idPcPromesaDeCompra', idPcPromesaDeCompra.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/pcPromesaDeCompra`,
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
   * Desactivar un pcPromesaDeCompra y las dependencias de pcPromesaDeCompra pcPartidaPromesaDeCompra y
   * pcPromesaDeCompraArchivo
   * @param idPcPromesaDeCompra Identificador de pcPromesaDeCompra a ser desactivado.
   * @return OK
   */
  pcPromesaDeCompraDesactivar(idPcPromesaDeCompra: string): __Observable<string> {
    return this.pcPromesaDeCompraDesactivarResponse(idPcPromesaDeCompra).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener un pcPromesaDeCompraArchivo por su idpcPromesaDeCompraArchivo
   * @param idPcPromesaDeCompraArchivo identificador del pcPromesaDeCompraArchivo
   * @return OK
   */
  pcPromesaDeCompraArchivoObtenerResponse(idPcPromesaDeCompraArchivo: string): __Observable<__StrictHttpResponse<PcPromesaDeCompraArchivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idPcPromesaDeCompraArchivo != null) __params = __params.set('idPcPromesaDeCompraArchivo', idPcPromesaDeCompraArchivo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/pcPromesaDeCompraArchivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PcPromesaDeCompraArchivo>;
      })
    );
  }
  /**
   * Obtener un pcPromesaDeCompraArchivo por su idpcPromesaDeCompraArchivo
   * @param idPcPromesaDeCompraArchivo identificador del pcPromesaDeCompraArchivo
   * @return OK
   */
  pcPromesaDeCompraArchivoObtener(idPcPromesaDeCompraArchivo: string): __Observable<PcPromesaDeCompraArchivo> {
    return this.pcPromesaDeCompraArchivoObtenerResponse(idPcPromesaDeCompraArchivo).pipe(
      __map(_r => _r.body as PcPromesaDeCompraArchivo)
    );
  }

  /**
   * Guardar o actualizar un pcPromesaDeCompraArchivo
   * @param PcPromesaDeCompraArchivo pcPromesaDeCompraArchivo a actualizar o guardar
   * @return OK
   */
  pcPromesaDeCompraArchivoGuardarOActualizarResponse(PcPromesaDeCompraArchivo: PcPromesaDeCompraArchivo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = PcPromesaDeCompraArchivo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/pcPromesaDeCompraArchivo`,
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
   * Guardar o actualizar un pcPromesaDeCompraArchivo
   * @param PcPromesaDeCompraArchivo pcPromesaDeCompraArchivo a actualizar o guardar
   * @return OK
   */
  pcPromesaDeCompraArchivoGuardarOActualizar(PcPromesaDeCompraArchivo: PcPromesaDeCompraArchivo): __Observable<string> {
    return this.pcPromesaDeCompraArchivoGuardarOActualizarResponse(PcPromesaDeCompraArchivo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de pcPromesaDeCompraArchivo.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  pcPromesaDeCompraArchivoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultPcPromesaDeCompraArchivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/pcPromesaDeCompraArchivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultPcPromesaDeCompraArchivo>;
      })
    );
  }
  /**
   * Obtener lista de pcPromesaDeCompraArchivo.
   * @param info Objeto de tipo QueryInfo para obtener la lista.
   * @return OK
   */
  pcPromesaDeCompraArchivoQueryResult(info: QueryInfo): __Observable<QueryResultPcPromesaDeCompraArchivo> {
    return this.pcPromesaDeCompraArchivoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultPcPromesaDeCompraArchivo)
    );
  }

  /**
   * Desactivar un pcPromesaDeCompraArchivo.
   * @param idPcPromesaDeCompraArchivo Identificador de pcPromesaDeCompraArchivo a ser desactivado.
   * @return OK
   */
  pcPromesaDeCompraArchivoDesactivarResponse(idPcPromesaDeCompraArchivo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idPcPromesaDeCompraArchivo != null) __params = __params.set('idPcPromesaDeCompraArchivo', idPcPromesaDeCompraArchivo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/pcPromesaDeCompraArchivo`,
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
   * Desactivar un pcPromesaDeCompraArchivo.
   * @param idPcPromesaDeCompraArchivo Identificador de pcPromesaDeCompraArchivo a ser desactivado.
   * @return OK
   */
  pcPromesaDeCompraArchivoDesactivar(idPcPromesaDeCompraArchivo: string): __Observable<string> {
    return this.pcPromesaDeCompraArchivoDesactivarResponse(idPcPromesaDeCompraArchivo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * ActulizarRefecrenciaOrdenDeCompra pcPromesaDeCompraExtensions
   * @param GMReferenciaOrdenDeCompra undefined
   * @return OK
   */
  pcPromesaDeCompraExtensionsActulizarRefecrenciaOrdenDeCompraResponse(GMReferenciaOrdenDeCompra: GMReferenciaOrdenDeCompra): __Observable<__StrictHttpResponse<GMReferenciaOrdenDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMReferenciaOrdenDeCompra;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ActualizarRefenciaOC`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMReferenciaOrdenDeCompra>;
      })
    );
  }
  /**
   * ActulizarRefecrenciaOrdenDeCompra pcPromesaDeCompraExtensions
   * @param GMReferenciaOrdenDeCompra undefined
   * @return OK
   */
  pcPromesaDeCompraExtensionsActulizarRefecrenciaOrdenDeCompra(GMReferenciaOrdenDeCompra: GMReferenciaOrdenDeCompra): __Observable<GMReferenciaOrdenDeCompra> {
    return this.pcPromesaDeCompraExtensionsActulizarRefecrenciaOrdenDeCompraResponse(GMReferenciaOrdenDeCompra).pipe(
      __map(_r => _r.body as GMReferenciaOrdenDeCompra)
    );
  }

  /**
   * Process pcPromesaDeCompraExtensions
   * @param idPCPromesaDeCompra undefined
   * @return OK
   */
  pcPromesaDeCompraExtensionsProcessResponse(idPCPromesaDeCompra: string): __Observable<__StrictHttpResponse<PpPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idPCPromesaDeCompra != null) __params = __params.set('idPCPromesaDeCompra', idPCPromesaDeCompra.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/PretramitarPcPromesaDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PpPedido>;
      })
    );
  }
  /**
   * Process pcPromesaDeCompraExtensions
   * @param idPCPromesaDeCompra undefined
   * @return OK
   */
  pcPromesaDeCompraExtensionsProcess(idPCPromesaDeCompra: string): __Observable<PpPedido> {
    return this.pcPromesaDeCompraExtensionsProcessResponse(idPCPromesaDeCompra).pipe(
      __map(_r => _r.body as PpPedido)
    );
  }

  /**
   * ProcessTransaccion pcPromesaDeCompraExtensions
   * @param GMPretramitarPromesaDeCompra undefined
   * @return OK
   */
  pcPromesaDeCompraExtensionsProcessTransaccionResponse(GMPretramitarPromesaDeCompra: GMPretramitarPromesaDeCompra): __Observable<__StrictHttpResponse<GMPretramitarPromesaDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMPretramitarPromesaDeCompra;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/PretramitarPcPromesaDeCompra/transaccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMPretramitarPromesaDeCompra>;
      })
    );
  }
  /**
   * ProcessTransaccion pcPromesaDeCompraExtensions
   * @param GMPretramitarPromesaDeCompra undefined
   * @return OK
   */
  pcPromesaDeCompraExtensionsProcessTransaccion(GMPretramitarPromesaDeCompra: GMPretramitarPromesaDeCompra): __Observable<GMPretramitarPromesaDeCompra> {
    return this.pcPromesaDeCompraExtensionsProcessTransaccionResponse(GMPretramitarPromesaDeCompra).pipe(
      __map(_r => _r.body as GMPretramitarPromesaDeCompra)
    );
  }

  /**
   * QueryResult vClienteCotizacionesPromesaDeCompraCarrusel
   * @param info undefined
   * @return OK
   */
  vClienteCotizacionesPromesaDeCompraCarruselQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVClienteCotizacionesPromesaDeCompraCarrusel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vClienteCotizacionesPromesaDeCompraCarrusel`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVClienteCotizacionesPromesaDeCompraCarrusel>;
      })
    );
  }
  /**
   * QueryResult vClienteCotizacionesPromesaDeCompraCarrusel
   * @param info undefined
   * @return OK
   */
  vClienteCotizacionesPromesaDeCompraCarruselQueryResult(info: QueryInfo): __Observable<QueryResultVClienteCotizacionesPromesaDeCompraCarrusel> {
    return this.vClienteCotizacionesPromesaDeCompraCarruselQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVClienteCotizacionesPromesaDeCompraCarrusel)
    );
  }

  /**
   * QueryResult vPartidaPromesaDeCompra
   * @param info undefined
   * @return OK
   */
  vPartidaPromesaDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPartidaPromesaDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPartidaPromesaDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPartidaPromesaDeCompra>;
      })
    );
  }
  /**
   * QueryResult vPartidaPromesaDeCompra
   * @param info undefined
   * @return OK
   */
  vPartidaPromesaDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultVPartidaPromesaDeCompra> {
    return this.vPartidaPromesaDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPartidaPromesaDeCompra)
    );
  }

  /**
   * QueryResult vPromesaDeCompra
   * @param info undefined
   * @return OK
   */
  vPromesaDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVPromesaDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vPromesaDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVPromesaDeCompra>;
      })
    );
  }
  /**
   * QueryResult vPromesaDeCompra
   * @param info undefined
   * @return OK
   */
  vPromesaDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultVPromesaDeCompra> {
    return this.vPromesaDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVPromesaDeCompra)
    );
  }
}

module ProcesosL03PromesaDeCompraService {
}

export { ProcesosL03PromesaDeCompraService }
