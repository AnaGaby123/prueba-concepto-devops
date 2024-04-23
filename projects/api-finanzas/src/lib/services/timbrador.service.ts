/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CFDI } from '../models/cfdi';
import { CFDICancelacion } from '../models/cfdicancelacion';
import { SolicitudCancelacion } from '../models/solicitud-cancelacion';
import { ParametroDistribuidorParcialidadesPagos } from '../models/parametro-distribuidor-parcialidades-pagos';
import { RespuestaMonitorCfdiBD } from '../models/respuesta-monitor-cfdi-bd';
@Injectable({
  providedIn: 'root',
})
class TimbradorService extends __BaseService {
  static readonly PqfTimbradoCancelCancelarCFDIPath = '/CancelarCFDI';
  static readonly PqfTimbradoCancelarConSolicitudCancelacionProcessPath = '/CancelarConSolicitudCancelacion';
  static readonly PqfTimbradoEmbPackingListProcessPath = '/embPackingListToComprobante33';
  static readonly PqfTimbradoFccNotaCreditoTimbrarNotaCreditoPath = '/fccNotaCreditoToComprobante33';
  static readonly PqfTimbradoFccPagoClienteTimbrarComplementoPagoFccPagoClientePath = '/FccPagoClienteToComprobante33';
  static readonly PqfTimbradoFccPagoClienteProcesoProcessPath = '/fccPagoClienteProcesar';
  static readonly PqfTimbradoFccPagoFacturaAdelantoTimbrarEgresoAnticipoPath = '/fccPagoFacturaAdelantoToComprobante33';
  static readonly PqfTimbradoIfCFDITimbrarFacturaFiCFDIPath = '/FiCFDIToComprobante33';
  static readonly PqfTimbradoTpProformaAdelantoProcessPath = '/tpProformaAdelantoToComprobante33';
  static readonly PqfTimbradoTpProformaPedidoTimbrarFacturasPorAdelantadoPedidoPath = '/TpPedidoToListComprobante33';
  static readonly PqfTimbradoTpProformaPedidoTimbrarFacturaTpProformaPedidoPath = '/TpProformaPedidoToComprobante33';
  static readonly PqfTimbradoTpProformaPedidoMonitorProcessPath = '/MonitorearListaCFDIProformaPedido';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * CancelarCFDI PqfTimbradoCancel
   * @param idCFDI undefined
   * @return OK
   */
  PqfTimbradoCancelCancelarCFDIResponse(idCFDI: string): __Observable<__StrictHttpResponse<CFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCFDI != null) __params = __params.set('idCFDI', idCFDI.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/CancelarCFDI`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CFDI>;
      })
    );
  }
  /**
   * CancelarCFDI PqfTimbradoCancel
   * @param idCFDI undefined
   * @return OK
   */
  PqfTimbradoCancelCancelarCFDI(idCFDI: string): __Observable<CFDI> {
    return this.PqfTimbradoCancelCancelarCFDIResponse(idCFDI).pipe(
      __map(_r => _r.body as CFDI)
    );
  }

  /**
   * Process PqfTimbradoCancelarConSolicitudCancelacion
   * @param param undefined
   * @return OK
   */
  PqfTimbradoCancelarConSolicitudCancelacionProcessResponse(param: SolicitudCancelacion): __Observable<__StrictHttpResponse<Array<CFDICancelacion>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/CancelarConSolicitudCancelacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CFDICancelacion>>;
      })
    );
  }
  /**
   * Process PqfTimbradoCancelarConSolicitudCancelacion
   * @param param undefined
   * @return OK
   */
  PqfTimbradoCancelarConSolicitudCancelacionProcess(param: SolicitudCancelacion): __Observable<Array<CFDICancelacion>> {
    return this.PqfTimbradoCancelarConSolicitudCancelacionProcessResponse(param).pipe(
      __map(_r => _r.body as Array<CFDICancelacion>)
    );
  }

  /**
   * Genera la lista de facturas de las partidas del embalaje de los clientes con crédito
   * @param IdEmbPackingList IdEmbPackingList
   * @return OK
   */
  PqfTimbradoEmbPackingListProcessResponse(IdEmbPackingList: string): __Observable<__StrictHttpResponse<Array<CFDI>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdEmbPackingList != null) __params = __params.set('IdEmbPackingList', IdEmbPackingList.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/embPackingListToComprobante33`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CFDI>>;
      })
    );
  }
  /**
   * Genera la lista de facturas de las partidas del embalaje de los clientes con crédito
   * @param IdEmbPackingList IdEmbPackingList
   * @return OK
   */
  PqfTimbradoEmbPackingListProcess(IdEmbPackingList: string): __Observable<Array<CFDI>> {
    return this.PqfTimbradoEmbPackingListProcessResponse(IdEmbPackingList).pipe(
      __map(_r => _r.body as Array<CFDI>)
    );
  }

  /**
   * TimbrarNotaCredito PqfTimbradoFccNotaCredito
   * @param idFCCNotaCredito undefined
   * @return OK
   */
  PqfTimbradoFccNotaCreditoTimbrarNotaCreditoResponse(idFCCNotaCredito: string): __Observable<__StrictHttpResponse<CFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idFCCNotaCredito != null) __params = __params.set('idFCCNotaCredito', idFCCNotaCredito.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/fccNotaCreditoToComprobante33`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CFDI>;
      })
    );
  }
  /**
   * TimbrarNotaCredito PqfTimbradoFccNotaCredito
   * @param idFCCNotaCredito undefined
   * @return OK
   */
  PqfTimbradoFccNotaCreditoTimbrarNotaCredito(idFCCNotaCredito: string): __Observable<CFDI> {
    return this.PqfTimbradoFccNotaCreditoTimbrarNotaCreditoResponse(idFCCNotaCredito).pipe(
      __map(_r => _r.body as CFDI)
    );
  }

  /**
   * Timbrado de complemento de pago
   * @param idFccPagoCliente Identificador de complemento de pago
   * @return OK
   */
  PqfTimbradoFccPagoClienteTimbrarComplementoPagoFccPagoClienteResponse(idFccPagoCliente: string): __Observable<__StrictHttpResponse<CFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idFccPagoCliente != null) __params = __params.set('idFccPagoCliente', idFccPagoCliente.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/FccPagoClienteToComprobante33`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CFDI>;
      })
    );
  }
  /**
   * Timbrado de complemento de pago
   * @param idFccPagoCliente Identificador de complemento de pago
   * @return OK
   */
  PqfTimbradoFccPagoClienteTimbrarComplementoPagoFccPagoCliente(idFccPagoCliente: string): __Observable<CFDI> {
    return this.PqfTimbradoFccPagoClienteTimbrarComplementoPagoFccPagoClienteResponse(idFccPagoCliente).pipe(
      __map(_r => _r.body as CFDI)
    );
  }

  /**
   * Process PqfTimbradoFccPagoClienteProceso
   * @param param undefined
   * @return OK
   */
  PqfTimbradoFccPagoClienteProcesoProcessResponse(param: ParametroDistribuidorParcialidadesPagos): __Observable<__StrictHttpResponse<Array<CFDI>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/fccPagoClienteProcesar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CFDI>>;
      })
    );
  }
  /**
   * Process PqfTimbradoFccPagoClienteProceso
   * @param param undefined
   * @return OK
   */
  PqfTimbradoFccPagoClienteProcesoProcess(param: ParametroDistribuidorParcialidadesPagos): __Observable<Array<CFDI>> {
    return this.PqfTimbradoFccPagoClienteProcesoProcessResponse(param).pipe(
      __map(_r => _r.body as Array<CFDI>)
    );
  }

  /**
   * TimbrarEgresoAnticipo PqfTimbradoFccPagoFacturaAdelanto
   * @param idFCCPagoFacturaAdelanto undefined
   * @return OK
   */
  PqfTimbradoFccPagoFacturaAdelantoTimbrarEgresoAnticipoResponse(idFCCPagoFacturaAdelanto: string): __Observable<__StrictHttpResponse<CFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idFCCPagoFacturaAdelanto != null) __params = __params.set('idFCCPagoFacturaAdelanto', idFCCPagoFacturaAdelanto.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/fccPagoFacturaAdelantoToComprobante33`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CFDI>;
      })
    );
  }
  /**
   * TimbrarEgresoAnticipo PqfTimbradoFccPagoFacturaAdelanto
   * @param idFCCPagoFacturaAdelanto undefined
   * @return OK
   */
  PqfTimbradoFccPagoFacturaAdelantoTimbrarEgresoAnticipo(idFCCPagoFacturaAdelanto: string): __Observable<CFDI> {
    return this.PqfTimbradoFccPagoFacturaAdelantoTimbrarEgresoAnticipoResponse(idFCCPagoFacturaAdelanto).pipe(
      __map(_r => _r.body as CFDI)
    );
  }

  /**
   * TimbrarFacturaFiCFDI PqfTimbradoIfCFDI
   * @param idFICFDI undefined
   * @return OK
   */
  PqfTimbradoIfCFDITimbrarFacturaFiCFDIResponse(idFICFDI: string): __Observable<__StrictHttpResponse<CFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idFICFDI != null) __params = __params.set('idFICFDI', idFICFDI.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/FiCFDIToComprobante33`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CFDI>;
      })
    );
  }
  /**
   * TimbrarFacturaFiCFDI PqfTimbradoIfCFDI
   * @param idFICFDI undefined
   * @return OK
   */
  PqfTimbradoIfCFDITimbrarFacturaFiCFDI(idFICFDI: string): __Observable<CFDI> {
    return this.PqfTimbradoIfCFDITimbrarFacturaFiCFDIResponse(idFICFDI).pipe(
      __map(_r => _r.body as CFDI)
    );
  }

  /**
   * Process PqfTimbradoTpProformaAdelanto
   * @param idTPProformaAdelanto undefined
   * @return OK
   */
  PqfTimbradoTpProformaAdelantoProcessResponse(idTPProformaAdelanto: string): __Observable<__StrictHttpResponse<CFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idTPProformaAdelanto != null) __params = __params.set('idTPProformaAdelanto', idTPProformaAdelanto.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/tpProformaAdelantoToComprobante33`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CFDI>;
      })
    );
  }
  /**
   * Process PqfTimbradoTpProformaAdelanto
   * @param idTPProformaAdelanto undefined
   * @return OK
   */
  PqfTimbradoTpProformaAdelantoProcess(idTPProformaAdelanto: string): __Observable<CFDI> {
    return this.PqfTimbradoTpProformaAdelantoProcessResponse(idTPProformaAdelanto).pipe(
      __map(_r => _r.body as CFDI)
    );
  }

  /**
   * TimbrarFacturasPorAdelantadoPedido PqfTimbradoTpProformaPedido
   * @param idTPPedido undefined
   * @return OK
   */
  PqfTimbradoTpProformaPedidoTimbrarFacturasPorAdelantadoPedidoResponse(idTPPedido: string): __Observable<__StrictHttpResponse<Array<CFDI>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idTPPedido != null) __params = __params.set('idTPPedido', idTPPedido.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/TpPedidoToListComprobante33`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CFDI>>;
      })
    );
  }
  /**
   * TimbrarFacturasPorAdelantadoPedido PqfTimbradoTpProformaPedido
   * @param idTPPedido undefined
   * @return OK
   */
  PqfTimbradoTpProformaPedidoTimbrarFacturasPorAdelantadoPedido(idTPPedido: string): __Observable<Array<CFDI>> {
    return this.PqfTimbradoTpProformaPedidoTimbrarFacturasPorAdelantadoPedidoResponse(idTPPedido).pipe(
      __map(_r => _r.body as Array<CFDI>)
    );
  }

  /**
   * Timbrado de proforma de pedido
   * @param idTpProformaPedido Identificador de proforma de pedido
   * @return OK
   */
  PqfTimbradoTpProformaPedidoTimbrarFacturaTpProformaPedidoResponse(idTpProformaPedido: string): __Observable<__StrictHttpResponse<CFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idTpProformaPedido != null) __params = __params.set('idTpProformaPedido', idTpProformaPedido.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/TpProformaPedidoToComprobante33`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CFDI>;
      })
    );
  }
  /**
   * Timbrado de proforma de pedido
   * @param idTpProformaPedido Identificador de proforma de pedido
   * @return OK
   */
  PqfTimbradoTpProformaPedidoTimbrarFacturaTpProformaPedido(idTpProformaPedido: string): __Observable<CFDI> {
    return this.PqfTimbradoTpProformaPedidoTimbrarFacturaTpProformaPedidoResponse(idTpProformaPedido).pipe(
      __map(_r => _r.body as CFDI)
    );
  }

  /**
   * Process PqfTimbradoTpProformaPedidoMonitor
   * @param ListaIdCFDI undefined
   * @return OK
   */
  PqfTimbradoTpProformaPedidoMonitorProcessResponse(ListaIdCFDI: Array<string>): __Observable<__StrictHttpResponse<RespuestaMonitorCfdiBD>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ListaIdCFDI;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/MonitorearListaCFDIProformaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<RespuestaMonitorCfdiBD>;
      })
    );
  }
  /**
   * Process PqfTimbradoTpProformaPedidoMonitor
   * @param ListaIdCFDI undefined
   * @return OK
   */
  PqfTimbradoTpProformaPedidoMonitorProcess(ListaIdCFDI: Array<string>): __Observable<RespuestaMonitorCfdiBD> {
    return this.PqfTimbradoTpProformaPedidoMonitorProcessResponse(ListaIdCFDI).pipe(
      __map(_r => _r.body as RespuestaMonitorCfdiBD)
    );
  }
}

module TimbradorService {
}

export { TimbradorService }
