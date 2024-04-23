/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { GMCorreoPedidoFechaEstimadaDeAjuste } from '../models/gmcorreo-pedido-fecha-estimada-de-ajuste';
import { GMCorreoPedidoSolicitarFEA } from '../models/gmcorreo-pedido-solicitar-fea';
import { GMPedidoTramitarErrores } from '../models/gmpedido-tramitar-errores';
import { GMPedidoAceptarOCInterna } from '../models/gmpedido-aceptar-ocinterna';
@Injectable({
  providedIn: 'root',
})
class ProcesosL04PretramitarPedidoGestionarIntramitablesService extends __BaseService {
  static readonly ppPedidosSolicitarFEAEnviaCorreoPartidasIncidenciaPath = '/GestionarIntramitables/SolicitarFea';
  static readonly ppPedidoTramitarConIncidenciaEnviaCorreoPartidasIncidenciaPath = '/ppPedidoIncidencias/TramitarConErrores';
  static readonly ppPedidoTramitarConIncidenciaPpPedidoAceptarOCInternaPath = '/ppPedidoOCInterna/AceptarOCInterna';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Proceso con transacciones para solicitar la fecha estimada de ajuste de la OC.
   * @param GMCorreoPedidoSolicitarFEA Modelo de campos para el proceso GenerarCorreoSolicitarFEA.
   * @return OK
   */
  ppPedidosSolicitarFEAEnviaCorreoPartidasIncidenciaResponse(GMCorreoPedidoSolicitarFEA: GMCorreoPedidoSolicitarFEA): __Observable<__StrictHttpResponse<GMCorreoPedidoFechaEstimadaDeAjuste>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GMCorreoPedidoSolicitarFEA;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GestionarIntramitables/SolicitarFea`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMCorreoPedidoFechaEstimadaDeAjuste>;
      })
    );
  }
  /**
   * Proceso con transacciones para solicitar la fecha estimada de ajuste de la OC.
   * @param GMCorreoPedidoSolicitarFEA Modelo de campos para el proceso GenerarCorreoSolicitarFEA.
   * @return OK
   */
  ppPedidosSolicitarFEAEnviaCorreoPartidasIncidencia(GMCorreoPedidoSolicitarFEA: GMCorreoPedidoSolicitarFEA): __Observable<GMCorreoPedidoFechaEstimadaDeAjuste> {
    return this.ppPedidosSolicitarFEAEnviaCorreoPartidasIncidenciaResponse(GMCorreoPedidoSolicitarFEA).pipe(
      __map(_r => _r.body as GMCorreoPedidoFechaEstimadaDeAjuste)
    );
  }

  /**
   * Proceso con transacciones para la tramitacion de un pedido con incidencias en partidas.
   * @param IdPPPedido IdPPPedido del pedido que se tramitara con errores..
   * @return OK
   */
  ppPedidoTramitarConIncidenciaEnviaCorreoPartidasIncidenciaResponse(IdPPPedido: string): __Observable<__StrictHttpResponse<GMPedidoTramitarErrores>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdPPPedido != null) __params = __params.set('IdPPPedido', IdPPPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ppPedidoIncidencias/TramitarConErrores`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMPedidoTramitarErrores>;
      })
    );
  }
  /**
   * Proceso con transacciones para la tramitacion de un pedido con incidencias en partidas.
   * @param IdPPPedido IdPPPedido del pedido que se tramitara con errores..
   * @return OK
   */
  ppPedidoTramitarConIncidenciaEnviaCorreoPartidasIncidencia(IdPPPedido: string): __Observable<GMPedidoTramitarErrores> {
    return this.ppPedidoTramitarConIncidenciaEnviaCorreoPartidasIncidenciaResponse(IdPPPedido).pipe(
      __map(_r => _r.body as GMPedidoTramitarErrores)
    );
  }

  /**
   * Proceso con transacciones para aceptar OC interna de un pedido.
   * @param IdPPPedido IdPPPedido del pedido del cual se acepta la OC Interna
   *             y se procesde a tramitar.
   * @return OK
   */
  ppPedidoTramitarConIncidenciaPpPedidoAceptarOCInternaResponse(IdPPPedido: string): __Observable<__StrictHttpResponse<GMPedidoAceptarOCInterna>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdPPPedido != null) __params = __params.set('IdPPPedido', IdPPPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ppPedidoOCInterna/AceptarOCInterna`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GMPedidoAceptarOCInterna>;
      })
    );
  }
  /**
   * Proceso con transacciones para aceptar OC interna de un pedido.
   * @param IdPPPedido IdPPPedido del pedido del cual se acepta la OC Interna
   *             y se procesde a tramitar.
   * @return OK
   */
  ppPedidoTramitarConIncidenciaPpPedidoAceptarOCInterna(IdPPPedido: string): __Observable<GMPedidoAceptarOCInterna> {
    return this.ppPedidoTramitarConIncidenciaPpPedidoAceptarOCInternaResponse(IdPPPedido).pipe(
      __map(_r => _r.body as GMPedidoAceptarOCInterna)
    );
  }
}

module ProcesosL04PretramitarPedidoGestionarIntramitablesService {
}

export { ProcesosL04PretramitarPedidoGestionarIntramitablesService }
