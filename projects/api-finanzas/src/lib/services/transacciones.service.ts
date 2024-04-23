/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Cuenta } from '../models/cuenta';
@Injectable({
  providedIn: 'root',
})
class TransaccionesService extends __BaseService {
  static readonly CuentaObtenerCuentaClientePath = '/ObtenerCuentaCliente';
  static readonly CuentaObtenerCuentaEmpresaPath = '/ObtenerCuentaEmpresa';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * ObtenerCuentaCliente Cuenta
   * @param params The `TransaccionesService.CuentaObtenerCuentaClienteParams` containing the following parameters:
   *
   * - `idEmpresa`:
   *
   * - `idCliente`:
   *
   * - `USD`:
   *
   * - `MXN`:
   *
   * @return OK
   */
  CuentaObtenerCuentaClienteResponse(params: TransaccionesService.CuentaObtenerCuentaClienteParams): __Observable<__StrictHttpResponse<Cuenta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idEmpresa != null) __params = __params.set('idEmpresa', params.idEmpresa.toString());
    if (params.idCliente != null) __params = __params.set('idCliente', params.idCliente.toString());
    if (params.USD != null) __params = __params.set('USD', params.USD.toString());
    if (params.MXN != null) __params = __params.set('MXN', params.MXN.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ObtenerCuentaCliente`,
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
   * ObtenerCuentaCliente Cuenta
   * @param params The `TransaccionesService.CuentaObtenerCuentaClienteParams` containing the following parameters:
   *
   * - `idEmpresa`:
   *
   * - `idCliente`:
   *
   * - `USD`:
   *
   * - `MXN`:
   *
   * @return OK
   */
  CuentaObtenerCuentaCliente(params: TransaccionesService.CuentaObtenerCuentaClienteParams): __Observable<Cuenta> {
    return this.CuentaObtenerCuentaClienteResponse(params).pipe(
      __map(_r => _r.body as Cuenta)
    );
  }

  /**
   * ObtenerCuentaEmpresa Cuenta
   * @param params The `TransaccionesService.CuentaObtenerCuentaEmpresaParams` containing the following parameters:
   *
   * - `idEmpresa`:
   *
   * - `USD`:
   *
   * - `MXN`:
   *
   * @return OK
   */
  CuentaObtenerCuentaEmpresaResponse(params: TransaccionesService.CuentaObtenerCuentaEmpresaParams): __Observable<__StrictHttpResponse<Cuenta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idEmpresa != null) __params = __params.set('idEmpresa', params.idEmpresa.toString());
    if (params.USD != null) __params = __params.set('USD', params.USD.toString());
    if (params.MXN != null) __params = __params.set('MXN', params.MXN.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ObtenerCuentaEmpresa`,
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
   * ObtenerCuentaEmpresa Cuenta
   * @param params The `TransaccionesService.CuentaObtenerCuentaEmpresaParams` containing the following parameters:
   *
   * - `idEmpresa`:
   *
   * - `USD`:
   *
   * - `MXN`:
   *
   * @return OK
   */
  CuentaObtenerCuentaEmpresa(params: TransaccionesService.CuentaObtenerCuentaEmpresaParams): __Observable<Cuenta> {
    return this.CuentaObtenerCuentaEmpresaResponse(params).pipe(
      __map(_r => _r.body as Cuenta)
    );
  }
}

module TransaccionesService {

  /**
   * Parameters for CuentaObtenerCuentaCliente
   */
  export interface CuentaObtenerCuentaClienteParams {
    idEmpresa: string;
    idCliente: string;
    USD: boolean;
    MXN: boolean;
  }

  /**
   * Parameters for CuentaObtenerCuentaEmpresa
   */
  export interface CuentaObtenerCuentaEmpresaParams {
    idEmpresa: string;
    USD: boolean;
    MXN: boolean;
  }
}

export { TransaccionesService }
