/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { IndicadorDOF } from '../models/indicador-dof';
import { QueryResultIndicadorDOF } from '../models/query-result-indicador-dof';
import { QueryInfo } from '../models/query-info';
import { TipoDeCambioBanamex } from '../models/tipo-de-cambio-banamex';
import { QueryResultTipoDeCambioBanamex } from '../models/query-result-tipo-de-cambio-banamex';
import { QueryResultVTipoDeCambioBanamex } from '../models/query-result-vtipo-de-cambio-banamex';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionIndicadoresService extends __BaseService {
  static readonly ConversorDivisasConvertirPesosAUSDDOFPath = '/ConvertirPesosAUSDDOF';
  static readonly ConversorDivisasConvertirTipoDeCambioBancarioPath = '/ConvertirTipoDeCambioBancario';
  static readonly ConversorDivisasConvertirUSDAPesosDOFPath = '/ConvertirUSDAPesosDOF';
  static readonly IndicadorDOFObtenerPath = '/IndicadorDOF';
  static readonly IndicadorDOFGuardarOActualizarPath = '/IndicadorDOF';
  static readonly IndicadorDOFQueryResultPath = '/IndicadorDOF';
  static readonly IndicadorDOFDesactivarPath = '/IndicadorDOF';
  static readonly TipoDeCambioBanamexObtenerPath = '/TipoDeCambioBanamex';
  static readonly TipoDeCambioBanamexGuardarOActualizarPath = '/TipoDeCambioBanamex';
  static readonly TipoDeCambioBanamexQueryResultPath = '/TipoDeCambioBanamex';
  static readonly TipoDeCambioBanamexDesactivarPath = '/TipoDeCambioBanamex';
  static readonly vTipoDeCambioBanamexQueryResultPath = '/vTipoDeCambioBanamex';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * ConvertirPesosAUSDDOF ConversorDivisas
   * @param monto undefined
   * @return OK
   */
  ConversorDivisasConvertirPesosAUSDDOFResponse(monto: number): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (monto != null) __params = __params.set('monto', monto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConvertirPesosAUSDDOF`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * ConvertirPesosAUSDDOF ConversorDivisas
   * @param monto undefined
   * @return OK
   */
  ConversorDivisasConvertirPesosAUSDDOF(monto: number): __Observable<number> {
    return this.ConversorDivisasConvertirPesosAUSDDOFResponse(monto).pipe(
      __map(_r => _r.body as number)
    );
  }

  /**
   * ConvertirTipoDeCambioBancario ConversorDivisas
   * @param params The `ConfiguracionIndicadoresService.ConversorDivisasConvertirTipoDeCambioBancarioParams` containing the following parameters:
   *
   * - `tipoDeCambio`:
   *
   * - `monto`:
   *
   * - `idCatMonedaOrigen`:
   *
   * - `idCatMonedaDestino`:
   *
   * @return OK
   */
  ConversorDivisasConvertirTipoDeCambioBancarioResponse(params: ConfiguracionIndicadoresService.ConversorDivisasConvertirTipoDeCambioBancarioParams): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.tipoDeCambio != null) __params = __params.set('tipoDeCambio', params.tipoDeCambio.toString());
    if (params.monto != null) __params = __params.set('monto', params.monto.toString());
    if (params.idCatMonedaOrigen != null) __params = __params.set('idCatMonedaOrigen', params.idCatMonedaOrigen.toString());
    if (params.idCatMonedaDestino != null) __params = __params.set('idCatMonedaDestino', params.idCatMonedaDestino.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConvertirTipoDeCambioBancario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * ConvertirTipoDeCambioBancario ConversorDivisas
   * @param params The `ConfiguracionIndicadoresService.ConversorDivisasConvertirTipoDeCambioBancarioParams` containing the following parameters:
   *
   * - `tipoDeCambio`:
   *
   * - `monto`:
   *
   * - `idCatMonedaOrigen`:
   *
   * - `idCatMonedaDestino`:
   *
   * @return OK
   */
  ConversorDivisasConvertirTipoDeCambioBancario(params: ConfiguracionIndicadoresService.ConversorDivisasConvertirTipoDeCambioBancarioParams): __Observable<number> {
    return this.ConversorDivisasConvertirTipoDeCambioBancarioResponse(params).pipe(
      __map(_r => _r.body as number)
    );
  }

  /**
   * ConvertirUSDAPesosDOF ConversorDivisas
   * @param monto undefined
   * @return OK
   */
  ConversorDivisasConvertirUSDAPesosDOFResponse(monto: number): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (monto != null) __params = __params.set('monto', monto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConvertirUSDAPesosDOF`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * ConvertirUSDAPesosDOF ConversorDivisas
   * @param monto undefined
   * @return OK
   */
  ConversorDivisasConvertirUSDAPesosDOF(monto: number): __Observable<number> {
    return this.ConversorDivisasConvertirUSDAPesosDOFResponse(monto).pipe(
      __map(_r => _r.body as number)
    );
  }

  /**
   * Consultar registro de IndicadorDOF
   * @param idIndicadorDOF Identificador de IndicadorDOF
   * @return OK
   */
  IndicadorDOFObtenerResponse(idIndicadorDOF: string): __Observable<__StrictHttpResponse<IndicadorDOF>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idIndicadorDOF != null) __params = __params.set('idIndicadorDOF', idIndicadorDOF.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/IndicadorDOF`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<IndicadorDOF>;
      })
    );
  }
  /**
   * Consultar registro de IndicadorDOF
   * @param idIndicadorDOF Identificador de IndicadorDOF
   * @return OK
   */
  IndicadorDOFObtener(idIndicadorDOF: string): __Observable<IndicadorDOF> {
    return this.IndicadorDOFObtenerResponse(idIndicadorDOF).pipe(
      __map(_r => _r.body as IndicadorDOF)
    );
  }

  /**
   * Guardar o actualizar IndicadorDOF
   * @param IndicadorDOF IndicadorDOF
   * @return OK
   */
  IndicadorDOFGuardarOActualizarResponse(IndicadorDOF: IndicadorDOF): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = IndicadorDOF;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/IndicadorDOF`,
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
   * Guardar o actualizar IndicadorDOF
   * @param IndicadorDOF IndicadorDOF
   * @return OK
   */
  IndicadorDOFGuardarOActualizar(IndicadorDOF: IndicadorDOF): __Observable<string> {
    return this.IndicadorDOFGuardarOActualizarResponse(IndicadorDOF).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de IndicadorDOF
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  IndicadorDOFQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultIndicadorDOF>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/IndicadorDOF`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultIndicadorDOF>;
      })
    );
  }
  /**
   * Consultar lista paginada de IndicadorDOF
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  IndicadorDOFQueryResult(info: QueryInfo): __Observable<QueryResultIndicadorDOF> {
    return this.IndicadorDOFQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultIndicadorDOF)
    );
  }

  /**
   * Desactivar registro de IndicadorDOF
   * @param idIndicadorDOF Identificador de registro de IndicadorDOF
   * @return OK
   */
  IndicadorDOFDesactivarResponse(idIndicadorDOF: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idIndicadorDOF != null) __params = __params.set('idIndicadorDOF', idIndicadorDOF.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/IndicadorDOF`,
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
   * Desactivar registro de IndicadorDOF
   * @param idIndicadorDOF Identificador de registro de IndicadorDOF
   * @return OK
   */
  IndicadorDOFDesactivar(idIndicadorDOF: string): __Observable<string> {
    return this.IndicadorDOFDesactivarResponse(idIndicadorDOF).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener TipoDeCambioBanamex
   * @param idTipoDeCambioBanamex undefined
   * @return OK
   */
  TipoDeCambioBanamexObtenerResponse(idTipoDeCambioBanamex: string): __Observable<__StrictHttpResponse<TipoDeCambioBanamex>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idTipoDeCambioBanamex != null) __params = __params.set('idTipoDeCambioBanamex', idTipoDeCambioBanamex.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/TipoDeCambioBanamex`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TipoDeCambioBanamex>;
      })
    );
  }
  /**
   * Obtener TipoDeCambioBanamex
   * @param idTipoDeCambioBanamex undefined
   * @return OK
   */
  TipoDeCambioBanamexObtener(idTipoDeCambioBanamex: string): __Observable<TipoDeCambioBanamex> {
    return this.TipoDeCambioBanamexObtenerResponse(idTipoDeCambioBanamex).pipe(
      __map(_r => _r.body as TipoDeCambioBanamex)
    );
  }

  /**
   * GuardarOActualizar TipoDeCambioBanamex
   * @param tipoDeCambioBanamex undefined
   * @return OK
   */
  TipoDeCambioBanamexGuardarOActualizarResponse(tipoDeCambioBanamex: TipoDeCambioBanamex): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = tipoDeCambioBanamex;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/TipoDeCambioBanamex`,
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
   * GuardarOActualizar TipoDeCambioBanamex
   * @param tipoDeCambioBanamex undefined
   * @return OK
   */
  TipoDeCambioBanamexGuardarOActualizar(tipoDeCambioBanamex: TipoDeCambioBanamex): __Observable<string> {
    return this.TipoDeCambioBanamexGuardarOActualizarResponse(tipoDeCambioBanamex).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult TipoDeCambioBanamex
   * @param info undefined
   * @return OK
   */
  TipoDeCambioBanamexQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultTipoDeCambioBanamex>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/TipoDeCambioBanamex`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultTipoDeCambioBanamex>;
      })
    );
  }
  /**
   * QueryResult TipoDeCambioBanamex
   * @param info undefined
   * @return OK
   */
  TipoDeCambioBanamexQueryResult(info: QueryInfo): __Observable<QueryResultTipoDeCambioBanamex> {
    return this.TipoDeCambioBanamexQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultTipoDeCambioBanamex)
    );
  }

  /**
   * Desactivar TipoDeCambioBanamex
   * @param idTipoDeCambioBanamex undefined
   * @return OK
   */
  TipoDeCambioBanamexDesactivarResponse(idTipoDeCambioBanamex: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idTipoDeCambioBanamex != null) __params = __params.set('idTipoDeCambioBanamex', idTipoDeCambioBanamex.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/TipoDeCambioBanamex`,
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
   * Desactivar TipoDeCambioBanamex
   * @param idTipoDeCambioBanamex undefined
   * @return OK
   */
  TipoDeCambioBanamexDesactivar(idTipoDeCambioBanamex: string): __Observable<string> {
    return this.TipoDeCambioBanamexDesactivarResponse(idTipoDeCambioBanamex).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult vTipoDeCambioBanamex
   * @param info undefined
   * @return OK
   */
  vTipoDeCambioBanamexQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVTipoDeCambioBanamex>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vTipoDeCambioBanamex`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVTipoDeCambioBanamex>;
      })
    );
  }
  /**
   * QueryResult vTipoDeCambioBanamex
   * @param info undefined
   * @return OK
   */
  vTipoDeCambioBanamexQueryResult(info: QueryInfo): __Observable<QueryResultVTipoDeCambioBanamex> {
    return this.vTipoDeCambioBanamexQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVTipoDeCambioBanamex)
    );
  }
}

module ConfiguracionIndicadoresService {

  /**
   * Parameters for ConversorDivisasConvertirTipoDeCambioBancario
   */
  export interface ConversorDivisasConvertirTipoDeCambioBancarioParams {
    tipoDeCambio: string;
    monto: number;
    idCatMonedaOrigen: string;
    idCatMonedaDestino: string;
  }
}

export { ConfiguracionIndicadoresService }
