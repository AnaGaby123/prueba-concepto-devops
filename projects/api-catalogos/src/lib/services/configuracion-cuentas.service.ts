/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ConfiguracionPagos } from '../models/configuracion-pagos';
import { QueryResultConfiguracionPagos } from '../models/query-result-configuracion-pagos';
import { QueryInfo } from '../models/query-info';
import { ConfiguracionPagosDatosBancarios } from '../models/configuracion-pagos-datos-bancarios';
import { QueryResultConfiguracionPagosDatosBancarios } from '../models/query-result-configuracion-pagos-datos-bancarios';
import { ConfiguracionPagosDatosBancariosDetalle } from '../models/configuracion-pagos-datos-bancarios-detalle';
import { Cuenta } from '../models/cuenta';
import { QueryResultCuenta } from '../models/query-result-cuenta';
import { DatosBancarios } from '../models/datos-bancarios';
import { QueryResultDatosBancarios } from '../models/query-result-datos-bancarios';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionCuentasService extends __BaseService {
  static readonly ConfiguracionPagosObtenerPath = '/ConfiguracionPagos';
  static readonly ConfiguracionPagosGuardarOActualizarPath = '/ConfiguracionPagos';
  static readonly ConfiguracionPagosQueryResultPath = '/ConfiguracionPagos';
  static readonly ConfiguracionPagosDatosBancariosObtenerPath = '/ConfiguracionPagosDatosBancarios';
  static readonly ConfiguracionPagosDatosBancariosGuardarOActualizarPath = '/ConfiguracionPagosDatosBancarios';
  static readonly ConfiguracionPagosDatosBancariosQueryResultPath = '/ConfiguracionPagosDatosBancarios';
  static readonly ConfiguracionPagosDatosBancariosDesactivarPath = '/ConfiguracionPagosDatosBancarios';
  static readonly ConfiguracionPagosDatosBancariosConsultaProcessPath = '/ConfiguracionPagosDatosBancariosConsulta';
  static readonly CuentaObtenerPath = '/Cuenta';
  static readonly CuentaGuardarOActualizarPath = '/Cuenta';
  static readonly CuentaQueryResultPath = '/Cuenta';
  static readonly DatosBancariosObtenerPath = '/DatosBancarios';
  static readonly DatosBancariosGuardarOActualizarPath = '/DatosBancarios';
  static readonly DatosBancariosQueryResultPath = '/DatosBancarios';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener ConfiguracionPagos
   * @param idConfiguracionPagos undefined
   * @return OK
   */
  ConfiguracionPagosObtenerResponse(idConfiguracionPagos: string): __Observable<__StrictHttpResponse<ConfiguracionPagos>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionPagos != null) __params = __params.set('idConfiguracionPagos', idConfiguracionPagos.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionPagos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionPagos>;
      })
    );
  }
  /**
   * Obtener ConfiguracionPagos
   * @param idConfiguracionPagos undefined
   * @return OK
   */
  ConfiguracionPagosObtener(idConfiguracionPagos: string): __Observable<ConfiguracionPagos> {
    return this.ConfiguracionPagosObtenerResponse(idConfiguracionPagos).pipe(
      __map(_r => _r.body as ConfiguracionPagos)
    );
  }

  /**
   * GuardarOActualizar ConfiguracionPagos
   * @param ConfiguracionPagos undefined
   * @return OK
   */
  ConfiguracionPagosGuardarOActualizarResponse(ConfiguracionPagos: ConfiguracionPagos): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionPagos;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionPagos`,
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
   * GuardarOActualizar ConfiguracionPagos
   * @param ConfiguracionPagos undefined
   * @return OK
   */
  ConfiguracionPagosGuardarOActualizar(ConfiguracionPagos: ConfiguracionPagos): __Observable<string> {
    return this.ConfiguracionPagosGuardarOActualizarResponse(ConfiguracionPagos).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ConfiguracionPagos
   * @param info undefined
   * @return OK
   */
  ConfiguracionPagosQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionPagos>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionPagos`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionPagos>;
      })
    );
  }
  /**
   * QueryResult ConfiguracionPagos
   * @param info undefined
   * @return OK
   */
  ConfiguracionPagosQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionPagos> {
    return this.ConfiguracionPagosQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionPagos)
    );
  }

  /**
   * Obtener ConfiguracionPagosDatosBancarios
   * @param idConfiguracionPagosDatosBancarios undefined
   * @return OK
   */
  ConfiguracionPagosDatosBancariosObtenerResponse(idConfiguracionPagosDatosBancarios: string): __Observable<__StrictHttpResponse<ConfiguracionPagosDatosBancarios>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionPagosDatosBancarios != null) __params = __params.set('idConfiguracionPagosDatosBancarios', idConfiguracionPagosDatosBancarios.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionPagosDatosBancarios`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ConfiguracionPagosDatosBancarios>;
      })
    );
  }
  /**
   * Obtener ConfiguracionPagosDatosBancarios
   * @param idConfiguracionPagosDatosBancarios undefined
   * @return OK
   */
  ConfiguracionPagosDatosBancariosObtener(idConfiguracionPagosDatosBancarios: string): __Observable<ConfiguracionPagosDatosBancarios> {
    return this.ConfiguracionPagosDatosBancariosObtenerResponse(idConfiguracionPagosDatosBancarios).pipe(
      __map(_r => _r.body as ConfiguracionPagosDatosBancarios)
    );
  }

  /**
   * GuardarOActualizar ConfiguracionPagosDatosBancarios
   * @param ConfiguracionPagosDatosBancarios undefined
   * @return OK
   */
  ConfiguracionPagosDatosBancariosGuardarOActualizarResponse(ConfiguracionPagosDatosBancarios: ConfiguracionPagosDatosBancarios): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ConfiguracionPagosDatosBancarios;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ConfiguracionPagosDatosBancarios`,
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
   * GuardarOActualizar ConfiguracionPagosDatosBancarios
   * @param ConfiguracionPagosDatosBancarios undefined
   * @return OK
   */
  ConfiguracionPagosDatosBancariosGuardarOActualizar(ConfiguracionPagosDatosBancarios: ConfiguracionPagosDatosBancarios): __Observable<string> {
    return this.ConfiguracionPagosDatosBancariosGuardarOActualizarResponse(ConfiguracionPagosDatosBancarios).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult ConfiguracionPagosDatosBancarios
   * @param info undefined
   * @return OK
   */
  ConfiguracionPagosDatosBancariosQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultConfiguracionPagosDatosBancarios>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ConfiguracionPagosDatosBancarios`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultConfiguracionPagosDatosBancarios>;
      })
    );
  }
  /**
   * QueryResult ConfiguracionPagosDatosBancarios
   * @param info undefined
   * @return OK
   */
  ConfiguracionPagosDatosBancariosQueryResult(info: QueryInfo): __Observable<QueryResultConfiguracionPagosDatosBancarios> {
    return this.ConfiguracionPagosDatosBancariosQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultConfiguracionPagosDatosBancarios)
    );
  }

  /**
   * Desactivar ConfiguracionPagosDatosBancarios
   * @param idConfiguracionPagosDatosBancarios undefined
   * @return OK
   */
  ConfiguracionPagosDatosBancariosDesactivarResponse(idConfiguracionPagosDatosBancarios: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionPagosDatosBancarios != null) __params = __params.set('idConfiguracionPagosDatosBancarios', idConfiguracionPagosDatosBancarios.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/ConfiguracionPagosDatosBancarios`,
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
   * Desactivar ConfiguracionPagosDatosBancarios
   * @param idConfiguracionPagosDatosBancarios undefined
   * @return OK
   */
  ConfiguracionPagosDatosBancariosDesactivar(idConfiguracionPagosDatosBancarios: string): __Observable<string> {
    return this.ConfiguracionPagosDatosBancariosDesactivarResponse(idConfiguracionPagosDatosBancarios).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Process ConfiguracionPagosDatosBancariosConsulta
   * @param idConfiguracionPagos undefined
   * @return OK
   */
  ConfiguracionPagosDatosBancariosConsultaProcessResponse(idConfiguracionPagos: string): __Observable<__StrictHttpResponse<Array<ConfiguracionPagosDatosBancariosDetalle>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idConfiguracionPagos != null) __params = __params.set('idConfiguracionPagos', idConfiguracionPagos.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ConfiguracionPagosDatosBancariosConsulta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ConfiguracionPagosDatosBancariosDetalle>>;
      })
    );
  }
  /**
   * Process ConfiguracionPagosDatosBancariosConsulta
   * @param idConfiguracionPagos undefined
   * @return OK
   */
  ConfiguracionPagosDatosBancariosConsultaProcess(idConfiguracionPagos: string): __Observable<Array<ConfiguracionPagosDatosBancariosDetalle>> {
    return this.ConfiguracionPagosDatosBancariosConsultaProcessResponse(idConfiguracionPagos).pipe(
      __map(_r => _r.body as Array<ConfiguracionPagosDatosBancariosDetalle>)
    );
  }

  /**
   * Obtener Cuenta
   * @param idCuenta undefined
   * @return OK
   */
  CuentaObtenerResponse(idCuenta: string): __Observable<__StrictHttpResponse<Cuenta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCuenta != null) __params = __params.set('idCuenta', idCuenta.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Cuenta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Cuenta>;
      })
    );
  }
  /**
   * Obtener Cuenta
   * @param idCuenta undefined
   * @return OK
   */
  CuentaObtener(idCuenta: string): __Observable<Cuenta> {
    return this.CuentaObtenerResponse(idCuenta).pipe(
      __map(_r => _r.body as Cuenta)
    );
  }

  /**
   * GuardarOActualizar Cuenta
   * @param Cuenta undefined
   * @return OK
   */
  CuentaGuardarOActualizarResponse(Cuenta: Cuenta): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = Cuenta;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Cuenta`,
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
   * GuardarOActualizar Cuenta
   * @param Cuenta undefined
   * @return OK
   */
  CuentaGuardarOActualizar(Cuenta: Cuenta): __Observable<string> {
    return this.CuentaGuardarOActualizarResponse(Cuenta).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult Cuenta
   * @param info undefined
   * @return OK
   */
  CuentaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCuenta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Cuenta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCuenta>;
      })
    );
  }
  /**
   * QueryResult Cuenta
   * @param info undefined
   * @return OK
   */
  CuentaQueryResult(info: QueryInfo): __Observable<QueryResultCuenta> {
    return this.CuentaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCuenta)
    );
  }

  /**
   * Obtener DatosBancarios
   * @param idDatosBancarios undefined
   * @return OK
   */
  DatosBancariosObtenerResponse(idDatosBancarios: string): __Observable<__StrictHttpResponse<DatosBancarios>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idDatosBancarios != null) __params = __params.set('idDatosBancarios', idDatosBancarios.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/DatosBancarios`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DatosBancarios>;
      })
    );
  }
  /**
   * Obtener DatosBancarios
   * @param idDatosBancarios undefined
   * @return OK
   */
  DatosBancariosObtener(idDatosBancarios: string): __Observable<DatosBancarios> {
    return this.DatosBancariosObtenerResponse(idDatosBancarios).pipe(
      __map(_r => _r.body as DatosBancarios)
    );
  }

  /**
   * GuardarOActualizar DatosBancarios
   * @param DatosBancarios undefined
   * @return OK
   */
  DatosBancariosGuardarOActualizarResponse(DatosBancarios: DatosBancarios): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = DatosBancarios;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/DatosBancarios`,
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
   * GuardarOActualizar DatosBancarios
   * @param DatosBancarios undefined
   * @return OK
   */
  DatosBancariosGuardarOActualizar(DatosBancarios: DatosBancarios): __Observable<string> {
    return this.DatosBancariosGuardarOActualizarResponse(DatosBancarios).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult DatosBancarios
   * @param info undefined
   * @return OK
   */
  DatosBancariosQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultDatosBancarios>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/DatosBancarios`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultDatosBancarios>;
      })
    );
  }
  /**
   * QueryResult DatosBancarios
   * @param info undefined
   * @return OK
   */
  DatosBancariosQueryResult(info: QueryInfo): __Observable<QueryResultDatosBancarios> {
    return this.DatosBancariosQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultDatosBancarios)
    );
  }
}

module ConfiguracionCuentasService {
}

export { ConfiguracionCuentasService }
