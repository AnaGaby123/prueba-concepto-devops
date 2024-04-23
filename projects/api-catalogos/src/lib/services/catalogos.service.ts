/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CatAplicacion } from '../models/cat-aplicacion';
import { QueryResultCatAplicacion } from '../models/query-result-cat-aplicacion';
import { QueryInfo } from '../models/query-info';
import { CatAspectoEvaluacion } from '../models/cat-aspecto-evaluacion';
import { QueryResultCatAspectoEvaluacion } from '../models/query-result-cat-aspecto-evaluacion';
import { CatBanco } from '../models/cat-banco';
import { QueryResultCatBanco } from '../models/query-result-cat-banco';
import { CatBrokerCliente } from '../models/cat-broker-cliente';
import { QueryResultCatBrokerCliente } from '../models/query-result-cat-broker-cliente';
import { CatClasificacionCorreoRecibido } from '../models/cat-clasificacion-correo-recibido';
import { QueryResultCatClasificacionCorreoRecibido } from '../models/query-result-cat-clasificacion-correo-recibido';
import { CatClasificacionCorreoRecibidoReferencia } from '../models/cat-clasificacion-correo-recibido-referencia';
import { QueryResultCatClasificacionCorreoRecibidoReferencia } from '../models/query-result-cat-clasificacion-correo-recibido-referencia';
import { CatClasificacionInformativaProducto } from '../models/cat-clasificacion-informativa-producto';
import { QueryResultCatClasificacionInformativaProducto } from '../models/query-result-cat-clasificacion-informativa-producto';
import { CatClasificacionRegulatoria } from '../models/cat-clasificacion-regulatoria';
import { QueryResultCatClasificacionRegulatoria } from '../models/query-result-cat-clasificacion-regulatoria';
import { CatConceptoFactura } from '../models/cat-concepto-factura';
import { QueryResultCatConceptoFactura } from '../models/query-result-cat-concepto-factura';
import { CatCondicionesDePago } from '../models/cat-condiciones-de-pago';
import { QueryResultCatCondicionesDePago } from '../models/query-result-cat-condiciones-de-pago';
import { CatContinente } from '../models/cat-continente';
import { QueryResultCatContinente } from '../models/query-result-cat-continente';
import { CatControl } from '../models/cat-control';
import { QueryResultCatControl } from '../models/query-result-cat-control';
import { CatCorporativo } from '../models/cat-corporativo';
import { QueryResultCatCorporativo } from '../models/query-result-cat-corporativo';
import { CatCorreoElectronicoSpam } from '../models/cat-correo-electronico-spam';
import { QueryResultCatCorreoElectronicoSpam } from '../models/query-result-cat-correo-electronico-spam';
import { CatDepositarioInternacional } from '../models/cat-depositario-internacional';
import { QueryResultCatDepositarioInternacional } from '../models/query-result-cat-depositario-internacional';
import { CatDestino } from '../models/cat-destino';
import { QueryResultCatDestino } from '../models/query-result-cat-destino';
import { CatDificultadDatosPersona } from '../models/cat-dificultad-datos-persona';
import { QueryResultCatDificultadDatosPersona } from '../models/query-result-cat-dificultad-datos-persona';
import { CatDisponibilidad } from '../models/cat-disponibilidad';
import { QueryResultCatDisponibilidad } from '../models/query-result-cat-disponibilidad';
import { CatDominioCorreoElectronico } from '../models/cat-dominio-correo-electronico';
import { QueryResultCatDominioCorreoElectronico } from '../models/query-result-cat-dominio-correo-electronico';
import { CatEstadoCotizacion } from '../models/cat-estado-cotizacion';
import { QueryResultCatEstadoCotizacion } from '../models/query-result-cat-estado-cotizacion';
import { CatEstadoFisico } from '../models/cat-estado-fisico';
import { QueryResultCatEstadoFisico } from '../models/query-result-cat-estado-fisico';
import { CatEstadoInvestigacion } from '../models/cat-estado-investigacion';
import { QueryResultCatEstadoInvestigacion } from '../models/query-result-cat-estado-investigacion';
import { CatEstadoPartidaPedido } from '../models/cat-estado-partida-pedido';
import { QueryResultCatEstadoPartidaPedido } from '../models/query-result-cat-estado-partida-pedido';
import { CatEstadoPedido } from '../models/cat-estado-pedido';
import { QueryResultCatEstadoPedido } from '../models/query-result-cat-estado-pedido';
import { CatEstadoPretramitacionPedido } from '../models/cat-estado-pretramitacion-pedido';
import { QueryResultCatEstadoPretramitacionPedido } from '../models/query-result-cat-estado-pretramitacion-pedido';
import { CatEstrategiaCotizacion } from '../models/cat-estrategia-cotizacion';
import { QueryResultCatEstrategiaCotizacion } from '../models/query-result-cat-estrategia-cotizacion';
import { CatEstrategiaCotizacionSubtactica } from '../models/cat-estrategia-cotizacion-subtactica';
import { QueryResultCatEstrategiaCotizacionSubtactica } from '../models/query-result-cat-estrategia-cotizacion-subtactica';
import { CatEstrategiaCotizacionTactica } from '../models/cat-estrategia-cotizacion-tactica';
import { QueryResultCatEstrategiaCotizacionTactica } from '../models/query-result-cat-estrategia-cotizacion-tactica';
import { CatFletera } from '../models/cat-fletera';
import { QueryResultCatFletera } from '../models/query-result-cat-fletera';
import { CatFormatoPublicacion } from '../models/cat-formato-publicacion';
import { QueryResultCatFormatoPublicacion } from '../models/query-result-cat-formato-publicacion';
import { CatImportanciaCliente } from '../models/cat-importancia-cliente';
import { QueryResultCatImportanciaCliente } from '../models/query-result-cat-importancia-cliente';
import { CatIncoterm } from '../models/cat-incoterm';
import { QueryResultCatIncoterm } from '../models/query-result-cat-incoterm';
import { CatIndustria } from '../models/cat-industria';
import { QueryResultCatIndustria } from '../models/query-result-cat-industria';
import { CatLinea } from '../models/cat-linea';
import { QueryResultCatLinea } from '../models/query-result-cat-linea';
import { CatLugarDespacho } from '../models/cat-lugar-despacho';
import { QueryResultCatLugarDespacho } from '../models/query-result-cat-lugar-despacho';
import { CatManejo } from '../models/cat-manejo';
import { QueryResultCatManejo } from '../models/query-result-cat-manejo';
import { CatMantenimientoDatosPersona } from '../models/cat-mantenimiento-datos-persona';
import { QueryResultCatMantenimientoDatosPersona } from '../models/query-result-cat-mantenimiento-datos-persona';
import { CatMarcaTarjeta } from '../models/cat-marca-tarjeta';
import { QueryResultCatMarcaTarjeta } from '../models/query-result-cat-marca-tarjeta';
import { CatMarcaVehiculo } from '../models/cat-marca-vehiculo';
import { QueryResultCatMarcaVehiculo } from '../models/query-result-cat-marca-vehiculo';
import { CatMedioComunicacion } from '../models/cat-medio-comunicacion';
import { QueryResultCatMedioComunicacion } from '../models/query-result-cat-medio-comunicacion';
import { CatMedioDePago } from '../models/cat-medio-de-pago';
import { QueryResultCatMedioDePago } from '../models/query-result-cat-medio-de-pago';
import { CatMedioDifusion } from '../models/cat-medio-difusion';
import { QueryResultCatMedioDifusion } from '../models/query-result-cat-medio-difusion';
import { CatMedioTransporte } from '../models/cat-medio-transporte';
import { QueryResultCatMedioTransporte } from '../models/query-result-cat-medio-transporte';
import { CatMetodoDePagoCFDI } from '../models/cat-metodo-de-pago-cfdi';
import { QueryResultCatMetodoDePagoCFDI } from '../models/query-result-cat-metodo-de-pago-cfdi';
import { CatMoneda } from '../models/cat-moneda';
import { QueryResultCatMoneda } from '../models/query-result-cat-moneda';
import { CatMotivoCancelacionPartidaCotizacion } from '../models/cat-motivo-cancelacion-partida-cotizacion';
import { QueryResultCatMotivoCancelacionPartidaCotizacion } from '../models/query-result-cat-motivo-cancelacion-partida-cotizacion';
import { CatMotivoCancelacionPartidaCotizacionNota } from '../models/cat-motivo-cancelacion-partida-cotizacion-nota';
import { QueryResultCatMotivoCancelacionPartidaCotizacionNota } from '../models/query-result-cat-motivo-cancelacion-partida-cotizacion-nota';
import { CatMotivoEntregaNoRealizada } from '../models/cat-motivo-entrega-no-realizada';
import { QueryResultCatMotivoEntregaNoRealizada } from '../models/query-result-cat-motivo-entrega-no-realizada';
import { CatMotivoSeguimientoCotizacion } from '../models/cat-motivo-seguimiento-cotizacion';
import { QueryResultCatMotivoSeguimientoCotizacion } from '../models/query-result-cat-motivo-seguimiento-cotizacion';
import { CatNivelDecisionDatosPersona } from '../models/cat-nivel-decision-datos-persona';
import { QueryResultCatNivelDecisionDatosPersona } from '../models/query-result-cat-nivel-decision-datos-persona';
import { CatNivelIngreso } from '../models/cat-nivel-ingreso';
import { QueryResultCatNivelIngreso } from '../models/query-result-cat-nivel-ingreso';
import { CatNivelPuestoDatosPersona } from '../models/cat-nivel-puesto-datos-persona';
import { QueryResultCatNivelPuestoDatosPersona } from '../models/query-result-cat-nivel-puesto-datos-persona';
import { CatOrigenVisitante } from '../models/cat-origen-visitante';
import { QueryResultCatOrigenVisitante } from '../models/query-result-cat-origen-visitante';
import { CatPagoIndirecto } from '../models/cat-pago-indirecto';
import { QueryResultCatPagoIndirecto } from '../models/query-result-cat-pago-indirecto';
import { CatPais } from '../models/cat-pais';
import { QueryResultCatPais } from '../models/query-result-cat-pais';
import { CatPrioridad } from '../models/cat-prioridad';
import { QueryResultCatPrioridad } from '../models/query-result-cat-prioridad';
import { CatProceso } from '../models/cat-proceso';
import { QueryResultCatProceso } from '../models/query-result-cat-proceso';
import { CatProcesoSistema } from '../models/cat-proceso-sistema';
import { QueryResultCatProcesoSistema } from '../models/query-result-cat-proceso-sistema';
import { CatProductoInvestigacionSeguimiento } from '../models/cat-producto-investigacion-seguimiento';
import { QueryResultCatProductoInvestigacionSeguimiento } from '../models/query-result-cat-producto-investigacion-seguimiento';
import { CatPuesto } from '../models/cat-puesto';
import { QueryResultCatPuesto } from '../models/query-result-cat-puesto';
import { CatRegimenFiscal } from '../models/cat-regimen-fiscal';
import { QueryResultCatRegimenFiscal } from '../models/query-result-cat-regimen-fiscal';
import { CatRestriccionDeCompra } from '../models/cat-restriccion-de-compra';
import { QueryResultCatRestriccionDeCompra } from '../models/query-result-cat-restriccion-de-compra';
import { CatRestriccionFlete } from '../models/cat-restriccion-flete';
import { QueryResultCatRestriccionFlete } from '../models/query-result-cat-restriccion-flete';
import { CatRevision } from '../models/cat-revision';
import { QueryResultCatRevision } from '../models/query-result-cat-revision';
import { CatRolCliente } from '../models/cat-rol-cliente';
import { QueryResultCatRolCliente } from '../models/query-result-cat-rol-cliente';
import { CatRolProveedor } from '../models/cat-rol-proveedor';
import { QueryResultCatRolProveedor } from '../models/query-result-cat-rol-proveedor';
import { CatRutaEntrega } from '../models/cat-ruta-entrega';
import { QueryResultCatRutaEntrega } from '../models/query-result-cat-ruta-entrega';
import { CatSector } from '../models/cat-sector';
import { QueryResultCatSector } from '../models/query-result-cat-sector';
import { CatServicioSistema } from '../models/cat-servicio-sistema';
import { QueryResultCatServicioSistema } from '../models/query-result-cat-servicio-sistema';
import { CatSubtipoProducto } from '../models/cat-subtipo-producto';
import { QueryResultCatSubtipoProducto } from '../models/query-result-cat-subtipo-producto';
import { CatTemaComentario } from '../models/cat-tema-comentario';
import { QueryResultCatTemaComentario } from '../models/query-result-cat-tema-comentario';
import { CatTipoAutorizacion } from '../models/cat-tipo-autorizacion';
import { QueryResultCatTipoAutorizacion } from '../models/query-result-cat-tipo-autorizacion';
import { CatTipoCampana } from '../models/cat-tipo-campana';
import { QueryResultCatTipoCampana } from '../models/query-result-cat-tipo-campana';
import { CatTipoControl } from '../models/cat-tipo-control';
import { QueryResultCatTipoControl } from '../models/query-result-cat-tipo-control';
import { CatTipoCotizacion } from '../models/cat-tipo-cotizacion';
import { QueryResultCatTipoCotizacion } from '../models/query-result-cat-tipo-cotizacion';
import { CatTipoCuenta } from '../models/cat-tipo-cuenta';
import { QueryResultCatTipoCuenta } from '../models/query-result-cat-tipo-cuenta';
import { CatTipoCuentaContable } from '../models/cat-tipo-cuenta-contable';
import { QueryResultCatTipoCuentaContable } from '../models/query-result-cat-tipo-cuenta-contable';
import { CatTipoDireccion } from '../models/cat-tipo-direccion';
import { QueryResultCatTipoDireccion } from '../models/query-result-cat-tipo-direccion';
import { CatTipoDocumento } from '../models/cat-tipo-documento';
import { QueryResultCatTipoDocumento } from '../models/query-result-cat-tipo-documento';
import { CatTipoNumeroTelefonico } from '../models/cat-tipo-numero-telefonico';
import { QueryResultCatTipoNumeroTelefonico } from '../models/query-result-cat-tipo-numero-telefonico';
import { CatTipoPartidaCotizacion } from '../models/cat-tipo-partida-cotizacion';
import { QueryResultCatTipoPartidaCotizacion } from '../models/query-result-cat-tipo-partida-cotizacion';
import { CatTipoPermiso } from '../models/cat-tipo-permiso';
import { QueryResultCatTipoPermiso } from '../models/query-result-cat-tipo-permiso';
import { CatTipoPresentacion } from '../models/cat-tipo-presentacion';
import { QueryResultCatTipoPresentacion } from '../models/query-result-cat-tipo-presentacion';
import { CatTipoProducto } from '../models/cat-tipo-producto';
import { QueryResultCatTipoProducto } from '../models/query-result-cat-tipo-producto';
import { CatTipoSociedadMercantil } from '../models/cat-tipo-sociedad-mercantil';
import { QueryResultCatTipoSociedadMercantil } from '../models/query-result-cat-tipo-sociedad-mercantil';
import { CatTipoValidacion } from '../models/cat-tipo-validacion';
import { QueryResultCatTipoValidacion } from '../models/query-result-cat-tipo-validacion';
import { CatTipoVehiculo } from '../models/cat-tipo-vehiculo';
import { QueryResultCatTipoVehiculo } from '../models/query-result-cat-tipo-vehiculo';
import { CatUnidad } from '../models/cat-unidad';
import { QueryResultCatUnidad } from '../models/query-result-cat-unidad';
import { CatUnidadFlete } from '../models/cat-unidad-flete';
import { QueryResultCatUnidadFlete } from '../models/query-result-cat-unidad-flete';
import { CatUnidadTiempo } from '../models/cat-unidad-tiempo';
import { QueryResultCatUnidadTiempo } from '../models/query-result-cat-unidad-tiempo';
import { CatUso } from '../models/cat-uso';
import { QueryResultCatUso } from '../models/query-result-cat-uso';
import { CatUsoArchivoSistema } from '../models/cat-uso-archivo-sistema';
import { QueryResultCatUsoArchivoSistema } from '../models/query-result-cat-uso-archivo-sistema';
import { CatUsoCFDI } from '../models/cat-uso-cfdi';
import { QueryResultCatUsoCFDI } from '../models/query-result-cat-uso-cfdi';
import { CatVariableSistema } from '../models/cat-variable-sistema';
import { QueryResultCatVariableSistema } from '../models/query-result-cat-variable-sistema';
import { CatZona } from '../models/cat-zona';
import { QueryResultCatZona } from '../models/query-result-cat-zona';
@Injectable({
  providedIn: 'root',
})
class CatalogosService extends __BaseService {
  static readonly catAplicacionObtenerPath = '/catAplicacion';
  static readonly catAplicacionGuardarOActualizarPath = '/catAplicacion';
  static readonly catAplicacionQueryResultPath = '/catAplicacion';
  static readonly catAplicacionDesactivarPath = '/catAplicacion';
  static readonly catAspectoEvaluacionObtenerPath = '/catAspectoEvaluacion';
  static readonly catAspectoEvaluacionQueryResultPath = '/catAspectoEvaluacion';
  static readonly catAspectoEvaluacionGuardarOActualizarPath = '/catAspectoEvaluacion';
  static readonly catAspectoEvaluacionDesactivarPath = '/catAspectoEvaluacion';
  static readonly catBancoObtenerPath = '/catBanco';
  static readonly catBancoGuardarOActualizarPath = '/catBanco';
  static readonly catBancoQueryResultPath = '/catBanco';
  static readonly catBancoDesactivarPath = '/catBanco';
  static readonly catBrokerClienteObtenerPath = '/catBrokerCliente';
  static readonly catBrokerClienteGuardarOActualizarPath = '/catBrokerCliente';
  static readonly catBrokerClienteQueryResultPath = '/catBrokerCliente';
  static readonly catBrokerClienteDesactivarPath = '/catBrokerCliente';
  static readonly catClasificacionCorreoRecibidoObtenerPath = '/catClasificacionCorreoRecibido';
  static readonly catClasificacionCorreoRecibidoGuardarOActualizarPath = '/catClasificacionCorreoRecibido';
  static readonly catClasificacionCorreoRecibidoQueryResultPath = '/catClasificacionCorreoRecibido';
  static readonly catClasificacionCorreoRecibidoDesactivarPath = '/catClasificacionCorreoRecibido';
  static readonly catClasificacionCorreoRecibidoReferenciaObtenerPath = '/catClasificacionCorreoRecibidoReferencia';
  static readonly catClasificacionCorreoRecibidoReferenciaGuardarOActualizarPath = '/catClasificacionCorreoRecibidoReferencia';
  static readonly catClasificacionCorreoRecibidoReferenciaQueryResultPath = '/catClasificacionCorreoRecibidoReferencia';
  static readonly catClasificacionCorreoRecibidoReferenciaDesactivarPath = '/catClasificacionCorreoRecibidoReferencia';
  static readonly catClasificacionInformativaProductoObtenerPath = '/catClasificacionInformativaProducto';
  static readonly catClasificacionInformativaProductoGuardarOActualizarPath = '/catClasificacionInformativaProducto';
  static readonly catClasificacionInformativaProductoQueryResultPath = '/catClasificacionInformativaProducto';
  static readonly catClasificacionInformativaProductoDesactivarPath = '/catClasificacionInformativaProducto';
  static readonly catClasificacionRegulatoriaObtenerPath = '/catClasificacionRegulatoria';
  static readonly catClasificacionRegulatoriaGuardarOActualizarPath = '/catClasificacionRegulatoria';
  static readonly catClasificacionRegulatoriaQueryResultPath = '/catClasificacionRegulatoria';
  static readonly catClasificacionRegulatoriaDesactivarPath = '/catClasificacionRegulatoria';
  static readonly catConceptoFacturaObtenerPath = '/catConceptoFactura';
  static readonly catConceptoFacturaGuardarOActualizarPath = '/catConceptoFactura';
  static readonly catConceptoFacturaQueryResultPath = '/catConceptoFactura';
  static readonly catConceptoFacturaDesactivarPath = '/catConceptoFactura';
  static readonly catCondicionesDePagoObtenerPath = '/catCondicionesDePago';
  static readonly catCondicionesDePagoGuardarOActualizarPath = '/catCondicionesDePago';
  static readonly catCondicionesDePagoQueryResultPath = '/catCondicionesDePago';
  static readonly catCondicionesDePagoDesactivarPath = '/catCondicionesDePago';
  static readonly catContinenteObtenerPath = '/catContinente';
  static readonly catContinenteGuardarOActualizarPath = '/catContinente';
  static readonly catContinenteQueryResultPath = '/catContinente';
  static readonly catContinenteDesactivarPath = '/catContinente';
  static readonly catControlObtenerPath = '/catControl';
  static readonly catControlGuardarOActualizarPath = '/catControl';
  static readonly catControlQueryResultPath = '/catControl';
  static readonly catControlDesactivarPath = '/catControl';
  static readonly catCorporativoObtenerPath = '/catCorporativo';
  static readonly catCorporativoGuardarOActualizarPath = '/catCorporativo';
  static readonly catCorporativoQueryResultPath = '/catCorporativo';
  static readonly catCorporativoDesactivarPath = '/catCorporativo';
  static readonly catCorreoElectronicoSpamObtenerPath = '/catCorreoElectronicoSpam';
  static readonly catCorreoElectronicoSpamGuardarOActualizarPath = '/catCorreoElectronicoSpam';
  static readonly catCorreoElectronicoSpamQueryResultPath = '/catCorreoElectronicoSpam';
  static readonly catCorreoElectronicoSpamDesactivarPath = '/catCorreoElectronicoSpam';
  static readonly catDepositarioInternacionalObtenerPath = '/catDepositarioInternacional';
  static readonly catDepositarioInternacionalGuardarOActualizarPath = '/catDepositarioInternacional';
  static readonly catDepositarioInternacionalQueryResultPath = '/catDepositarioInternacional';
  static readonly catDepositarioInternacionalDesactivarPath = '/catDepositarioInternacional';
  static readonly catDestinoObtenerPath = '/catDestino';
  static readonly catDestinoGuardarOActualizarPath = '/catDestino';
  static readonly catDestinoQueryResultPath = '/catDestino';
  static readonly catDestinoDesactivarPath = '/catDestino';
  static readonly catDificultadDatosPersonaObtenerPath = '/catDificultadDatosPersona';
  static readonly catDificultadDatosPersonaGuardarOActualizarPath = '/catDificultadDatosPersona';
  static readonly catDificultadDatosPersonaQueryResultPath = '/catDificultadDatosPersona';
  static readonly catDificultadDatosPersonaDesactivarPath = '/catDificultadDatosPersona';
  static readonly catDisponibilidadObtenerPath = '/catDisponibilidad';
  static readonly catDisponibilidadGuardarOActualizarPath = '/catDisponibilidad';
  static readonly catDisponibilidadQueryResultPath = '/catDisponibilidad';
  static readonly catDisponibilidadDesactivarPath = '/catDisponibilidad';
  static readonly catDominioCorreoElectronicoObtenerPath = '/catDominioCorreoElectronico';
  static readonly catDominioCorreoElectronicoGuardarOActualizarPath = '/catDominioCorreoElectronico';
  static readonly catDominioCorreoElectronicoQueryResultPath = '/catDominioCorreoElectronico';
  static readonly catDominioCorreoElectronicoDesactivarPath = '/catDominioCorreoElectronico';
  static readonly catEstadoCotizacionObtenerPath = '/catEstadoCotizacion';
  static readonly catEstadoCotizacionGuardarOActualizarPath = '/catEstadoCotizacion';
  static readonly catEstadoCotizacionQueryResultPath = '/catEstadoCotizacion';
  static readonly catEstadoCotizacionDesactivarPath = '/catEstadoCotizacion';
  static readonly catEstadoFisicoObtenerPath = '/catEstadoFisico';
  static readonly catEstadoFisicoGuardarOActualizarPath = '/catEstadoFisico';
  static readonly catEstadoFisicoQueryResultPath = '/catEstadoFisico';
  static readonly catEstadoFisicoDesactivarPath = '/catEstadoFisico';
  static readonly catEstadoInvestigacionObtenerPath = '/catEstadoInvestigacion';
  static readonly catEstadoInvestigacionGuardarOActualizarPath = '/catEstadoInvestigacion';
  static readonly catEstadoInvestigacionQueryResultPath = '/catEstadoInvestigacion';
  static readonly catEstadoInvestigacionDesactivarPath = '/catEstadoInvestigacion';
  static readonly catEstadoPartidaPedidoObtenerPath = '/catEstadoPartidaPedido';
  static readonly catEstadoPartidaPedidoGuardarOActualizarPath = '/catEstadoPartidaPedido';
  static readonly catEstadoPartidaPedidoQueryResultPath = '/catEstadoPartidaPedido';
  static readonly catEstadoPartidaPedidoDesactivarPath = '/catEstadoPartidaPedido';
  static readonly catEstadoPedidoObtenerPath = '/catEstadoPedido';
  static readonly catEstadoPedidoGuardarOActualizarPath = '/catEstadoPedido';
  static readonly catEstadoPedidoQueryResultPath = '/catEstadoPedido';
  static readonly catEstadoPedidoDesactivarPath = '/catEstadoPedido';
  static readonly catEstadoPretramitacionPedidoObtenerPath = '/catEstadoPretramitacionPedido';
  static readonly catEstadoPretramitacionPedidoGuardarOActualizarPath = '/catEstadoPretramitacionPedido';
  static readonly catEstadoPretramitacionPedidoQueryResultPath = '/catEstadoPretramitacionPedido';
  static readonly catEstadoPretramitacionPedidoDesactivarPath = '/catEstadoPretramitacionPedido';
  static readonly catEstrategiaCotizacionObtenerPath = '/catEstrategiaCotizacion';
  static readonly catEstrategiaCotizacionGuardarOActualizarPath = '/catEstrategiaCotizacion';
  static readonly catEstrategiaCotizacionQueryResultPath = '/catEstrategiaCotizacion';
  static readonly catEstrategiaCotizacionDesactivarPath = '/catEstrategiaCotizacion';
  static readonly catEstrategiaCotizacionSubtacticaObtenerPath = '/catEstrategiaCotizacionSubtactica';
  static readonly catEstrategiaCotizacionSubtacticaGuardarOActualizarPath = '/catEstrategiaCotizacionSubtactica';
  static readonly catEstrategiaCotizacionSubtacticaQueryResultPath = '/catEstrategiaCotizacionSubtactica';
  static readonly catEstrategiaCotizacionSubtacticaDesactivarPath = '/catEstrategiaCotizacionSubtactica';
  static readonly catEstrategiaCotizacionTacticaObtenerPath = '/catEstrategiaCotizacionTactica';
  static readonly catEstrategiaCotizacionTacticaGuardarOActualizarPath = '/catEstrategiaCotizacionTactica';
  static readonly catEstrategiaCotizacionTacticaQueryResultPath = '/catEstrategiaCotizacionTactica';
  static readonly catEstrategiaCotizacionTacticaDesactivarPath = '/catEstrategiaCotizacionTactica';
  static readonly catFleteraObtenerPath = '/catFletera';
  static readonly catFleteraGuardarOActualizarPath = '/catFletera';
  static readonly catFleteraQueryResultPath = '/catFletera';
  static readonly catFleteraDesactivarPath = '/catFletera';
  static readonly catFormatoPublicacionObtenerPath = '/catFormatoPublicacion';
  static readonly catFormatoPublicacionGuardarOActualizarPath = '/catFormatoPublicacion';
  static readonly catFormatoPublicacionQueryResultPath = '/catFormatoPublicacion';
  static readonly catFormatoPublicacionDesactivarPath = '/catFormatoPublicacion';
  static readonly catImportanciaClienteObtenerPath = '/catImportanciaCliente';
  static readonly catImportanciaClienteGuardarOActualizarPath = '/catImportanciaCliente';
  static readonly catImportanciaClienteQueryResultPath = '/catImportanciaCliente';
  static readonly catImportanciaClienteDesactivarPath = '/catImportanciaCliente';
  static readonly catIncotermObtenerPath = '/catIncoterm';
  static readonly catIncotermGuardarOActualizarPath = '/catIncoterm';
  static readonly catIncotermQueryResultPath = '/catIncoterm';
  static readonly catIncotermDesactivarPath = '/catIncoterm';
  static readonly catIndustriaObtenerPath = '/catIndustria';
  static readonly catIndustriaGuardarOActualizarPath = '/catIndustria';
  static readonly catIndustriaQueryResultPath = '/catIndustria';
  static readonly catIndustriaDesactivarPath = '/catIndustria';
  static readonly catLineaObtenerPath = '/catLinea';
  static readonly catLineaGuardarOActualizarPath = '/catLinea';
  static readonly catLineaQueryResultPath = '/catLinea';
  static readonly catLineaDesactivarPath = '/catLinea';
  static readonly catLugarDespachoObtenerPath = '/catLugarDespacho';
  static readonly catLugarDespachoGuardarOActualizarPath = '/catLugarDespacho';
  static readonly catLugarDespachoQueryResultPath = '/catLugarDespacho';
  static readonly catLugarDespachoDesactivarPath = '/catLugarDespacho';
  static readonly catManejoObtenerPath = '/catManejo';
  static readonly catManejoGuardarOActualizarPath = '/catManejo';
  static readonly catManejoQueryResultPath = '/catManejo';
  static readonly catManejoDesactivarPath = '/catManejo';
  static readonly catMantenimientoDatosPersonaObtenerPath = '/catMantenimientoDatosPersona';
  static readonly catMantenimientoDatosPersonaGuardarOActualizarPath = '/catMantenimientoDatosPersona';
  static readonly catMantenimientoDatosPersonaQueryResultPath = '/catMantenimientoDatosPersona';
  static readonly catMantenimientoDatosPersonaDesactivarPath = '/catMantenimientoDatosPersona';
  static readonly catMarcaTarjetaObtenerPath = '/catMarcaTarjeta';
  static readonly catMarcaTarjetaGuardarOActualizarPath = '/catMarcaTarjeta';
  static readonly catMarcaTarjetaQueryResultPath = '/catMarcaTarjeta';
  static readonly catMarcaTarjetaDesactivarPath = '/catMarcaTarjeta';
  static readonly catMarcaVehiculoObtenerPath = '/catMarcaVehiculo';
  static readonly catMarcaVehiculoGuardarOActualizarPath = '/catMarcaVehiculo';
  static readonly catMarcaVehiculoQueryResultPath = '/catMarcaVehiculo';
  static readonly catMarcaVehiculoDesactivarPath = '/catMarcaVehiculo';
  static readonly catMedioComunicacionObtenerPath = '/catMedioComunicacion';
  static readonly catMedioComunicacionGuardarOActualizarPath = '/catMedioComunicacion';
  static readonly catMedioComunicacionQueryResultPath = '/catMedioComunicacion';
  static readonly catMedioComunicacionDesactivarPath = '/catMedioComunicacion';
  static readonly catMedioDePagoObtenerPath = '/catMedioDePago';
  static readonly catMedioDePagoGuardarOActualizarPath = '/catMedioDePago';
  static readonly catMedioDePagoQueryResultPath = '/catMedioDePago';
  static readonly catMedioDePagoDesactivarPath = '/catMedioDePago';
  static readonly catMedioDifusionObtenerPath = '/catMedioDifusion';
  static readonly catMedioDifusionGuardarOActualizarPath = '/catMedioDifusion';
  static readonly catMedioDifusionQueryResultPath = '/catMedioDifusion';
  static readonly catMedioDifusionDesactivarPath = '/catMedioDifusion';
  static readonly catMedioTransporteObtenerPath = '/catMedioTransporte';
  static readonly catMedioTransporteGuardarOActualizarPath = '/catMedioTransporte';
  static readonly catMedioTransporteQueryResultPath = '/catMedioTransporte';
  static readonly catMedioTransporteDesactivarPath = '/catMedioTransporte';
  static readonly catMetodoDePagoCFDIObtenerPath = '/catMetodoDePagoCFDI';
  static readonly catMetodoDePagoCFDIGuardarOActualizarPath = '/catMetodoDePagoCFDI';
  static readonly catMetodoDePagoCFDIQueryResultPath = '/catMetodoDePagoCFDI';
  static readonly catMetodoDePagoCFDIDesactivarPath = '/catMetodoDePagoCFDI';
  static readonly catMonedaObtenerPath = '/catMoneda';
  static readonly catMonedaGuardarOActualizarPath = '/catMoneda';
  static readonly catMonedaQueryResultPath = '/catMoneda';
  static readonly catMonedaDesactivarPath = '/catMoneda';
  static readonly catMotivoCancelacionPartidaCotizacionObtenerPath = '/catMotivoCancelacionPartidaCotizacion';
  static readonly catMotivoCancelacionPartidaCotizacionGuardarOActualizarPath = '/catMotivoCancelacionPartidaCotizacion';
  static readonly catMotivoCancelacionPartidaCotizacionQueryResultPath = '/catMotivoCancelacionPartidaCotizacion';
  static readonly catMotivoCancelacionPartidaCotizacionDesactivarPath = '/catMotivoCancelacionPartidaCotizacion';
  static readonly catMotivoCancelacionPartidaCotizacionNotaObtenerPath = '/catMotivoCancelacionPartidaCotizacionNota';
  static readonly catMotivoCancelacionPartidaCotizacionNotaGuardarOActualizarPath = '/catMotivoCancelacionPartidaCotizacionNota';
  static readonly catMotivoCancelacionPartidaCotizacionNotaQueryResultPath = '/catMotivoCancelacionPartidaCotizacionNota';
  static readonly catMotivoCancelacionPartidaCotizacionNotaDesactivarPath = '/catMotivoCancelacionPartidaCotizacionNota';
  static readonly catMotivoEntregaNoRealizadaObtenerPath = '/catMotivoEntregaNoRealizada';
  static readonly catMotivoEntregaNoRealizadaGuardarOActualizarPath = '/catMotivoEntregaNoRealizada';
  static readonly catMotivoEntregaNoRealizadaQueryResultPath = '/catMotivoEntregaNoRealizada';
  static readonly catMotivoEntregaNoRealizadaDesactivarPath = '/catMotivoEntregaNoRealizada';
  static readonly catMotivoSeguimientoCotizacionObtenerPath = '/catMotivoSeguimientoCotizacion';
  static readonly catMotivoSeguimientoCotizacionGuardarOActualizarPath = '/catMotivoSeguimientoCotizacion';
  static readonly catMotivoSeguimientoCotizacionQueryResultPath = '/catMotivoSeguimientoCotizacion';
  static readonly catMotivoSeguimientoCotizacionDesactivarPath = '/catMotivoSeguimientoCotizacion';
  static readonly catNivelDecisionDatosPersonaObtenerPath = '/catNivelDecisionDatosPersona';
  static readonly catNivelDecisionDatosPersonaGuardarOActualizarPath = '/catNivelDecisionDatosPersona';
  static readonly catNivelDecisionDatosPersonaQueryResultPath = '/catNivelDecisionDatosPersona';
  static readonly catNivelDecisionDatosPersonaDesactivarPath = '/catNivelDecisionDatosPersona';
  static readonly catNivelIngresoObtenerPath = '/catNivelIngreso';
  static readonly catNivelIngresoGuardarOActualizarPath = '/catNivelIngreso';
  static readonly catNivelIngresoQueryResultPath = '/catNivelIngreso';
  static readonly catNivelIngresoDesactivarPath = '/catNivelIngreso';
  static readonly catNivelPuestoDatosPersonaObtenerPath = '/catNivelPuestoDatosPersona';
  static readonly catNivelPuestoDatosPersonaGuardarOActualizarPath = '/catNivelPuestoDatosPersona';
  static readonly catNivelPuestoDatosPersonaQueryResultPath = '/catNivelPuestoDatosPersona';
  static readonly catNivelPuestoDatosPersonaDesactivarPath = '/catNivelPuestoDatosPersona';
  static readonly catOrigenVisitanteObtenerPath = '/catOrigenVisitante';
  static readonly catOrigenVisitanteGuardarOActualizarPath = '/catOrigenVisitante';
  static readonly catOrigenVisitanteQueryResultPath = '/catOrigenVisitante';
  static readonly catOrigenVisitanteDesactivarPath = '/catOrigenVisitante';
  static readonly catPagoIndirectoObtenerPath = '/catPagoIndirecto';
  static readonly catPagoIndirectoGuardarOActualizarPath = '/catPagoIndirecto';
  static readonly catPagoIndirectoQueryResultPath = '/catPagoIndirecto';
  static readonly catPagoIndirectoDesactivarPath = '/catPagoIndirecto';
  static readonly catPaisObtenerPath = '/catPais';
  static readonly catPaisGuardarOActualizarPath = '/catPais';
  static readonly catPaisQueryResultPath = '/catPais';
  static readonly catPaisDesactivarPath = '/catPais';
  static readonly catPrioridadObtenerPath = '/catPrioridad';
  static readonly catPrioridadGuardarOActualizarPath = '/catPrioridad';
  static readonly catPrioridadQueryResultPath = '/catPrioridad';
  static readonly catPrioridadDesactivarPath = '/catPrioridad';
  static readonly catProcesoObtenerPath = '/catProceso';
  static readonly catProcesoGuardarOActualizarPath = '/catProceso';
  static readonly catProcesoQueryResultPath = '/catProceso';
  static readonly catProcesoDesactivarPath = '/catProceso';
  static readonly catProcesoSistemaObtenerPath = '/catProcesoSistema';
  static readonly catProcesoSistemaGuardarOActualizarPath = '/catProcesoSistema';
  static readonly catProcesoSistemaQueryResultPath = '/catProcesoSistema';
  static readonly catProcesoSistemaDesactivarPath = '/catProcesoSistema';
  static readonly catProductoInvestigacionSeguimientoObtenerPath = '/catProductoInvestigacionSeguimiento';
  static readonly catProductoInvestigacionSeguimientoGuardarOActualizarPath = '/catProductoInvestigacionSeguimiento';
  static readonly catProductoInvestigacionSeguimientoQueryResultPath = '/catProductoInvestigacionSeguimiento';
  static readonly catProductoInvestigacionSeguimientoDesactivarPath = '/catProductoInvestigacionSeguimiento';
  static readonly catPuestoObtenerPath = '/catPuesto';
  static readonly catPuestoGuardarOActualizarPath = '/catPuesto';
  static readonly catPuestoQueryResultPath = '/catPuesto';
  static readonly catPuestoDesactivarPath = '/catPuesto';
  static readonly catRegimenFiscalObtenerPath = '/catRegimenFiscal';
  static readonly catRegimenFiscalGuardarOActualizarPath = '/catRegimenFiscal';
  static readonly catRegimenFiscalQueryResultPath = '/catRegimenFiscal';
  static readonly catRegimenFiscalDesactivarPath = '/catRegimenFiscal';
  static readonly catRestriccionDeCompraObtenerPath = '/catRestriccionDeCompra';
  static readonly catRestriccionDeCompraGuardarOActualizarPath = '/catRestriccionDeCompra';
  static readonly catRestriccionDeCompraQueryResultPath = '/catRestriccionDeCompra';
  static readonly catRestriccionDeCompraDesactivarPath = '/catRestriccionDeCompra';
  static readonly catRestriccionFleteObtenerPath = '/catRestriccionFlete';
  static readonly catRestriccionFleteGuardarOActualizarPath = '/catRestriccionFlete';
  static readonly catRestriccionFleteQueryResultPath = '/catRestriccionFlete';
  static readonly catRestriccionFleteDesactivarPath = '/catRestriccionFlete';
  static readonly catRevisionObtenerPath = '/catRevision';
  static readonly catRevisionGuardarOActualizarPath = '/catRevision';
  static readonly catRevisionQueryResultPath = '/catRevision';
  static readonly catRevisionDesactivarPath = '/catRevision';
  static readonly catRolClienteObtenerPath = '/catRolCliente';
  static readonly catRolClienteGuardarOActualizarPath = '/catRolCliente';
  static readonly catRolClienteQueryResultPath = '/catRolCliente';
  static readonly catRolClienteDesactivarPath = '/catRolCliente';
  static readonly catRolProveedorObtenerPath = '/catRolProveedor';
  static readonly catRolProveedorGuardarOActualizarPath = '/catRolProveedor';
  static readonly catRolProveedorQueryResultPath = '/catRolProveedor';
  static readonly catRolProveedorDesactivarPath = '/catRolProveedor';
  static readonly catRutaEntregaObtenerPath = '/catRutaEntrega';
  static readonly catRutaEntregaGuardarOActualizarPath = '/catRutaEntrega';
  static readonly catRutaEntregaQueryResultPath = '/catRutaEntrega';
  static readonly catRutaEntregaDesactivarPath = '/catRutaEntrega';
  static readonly catSectorObtenerPath = '/catSector';
  static readonly catSectorGuardarOActualizarPath = '/catSector';
  static readonly catSectorQueryResultPath = '/catSector';
  static readonly catSectorDesactivarPath = '/catSector';
  static readonly catServicioSistemaDesactivarPath = '/GrupoListacatServicioSistema';
  static readonly catServicioSistemaObtenerPath = '/catServicioSistema';
  static readonly catServicioSistemaGuardarOActualizarPath = '/catServicioSistema';
  static readonly catServicioSistemaQueryResultPath = '/catServicioSistema';
  static readonly catSubtipoProductoObtenerPath = '/catSubtipoProducto';
  static readonly catSubtipoProductoGuardarOActualizarPath = '/catSubtipoProducto';
  static readonly catSubtipoProductoQueryResultPath = '/catSubtipoProducto';
  static readonly catSubtipoProductoDesactivarPath = '/catSubtipoProducto';
  static readonly catTemaComentarioObtenerPath = '/catTemaComentario';
  static readonly catTemaComentarioGuardarOActualizarPath = '/catTemaComentario';
  static readonly catTemaComentarioQueryResultPath = '/catTemaComentario';
  static readonly catTemaComentarioDesactivarPath = '/catTemaComentario';
  static readonly catTipoAutorizacionObtenerPath = '/catTipoAutorizacion';
  static readonly catTipoAutorizacionGuardarOActualizarPath = '/catTipoAutorizacion';
  static readonly catTipoAutorizacionQueryResultPath = '/catTipoAutorizacion';
  static readonly catTipoAutorizacionDesactivarPath = '/catTipoAutorizacion';
  static readonly catTipoCampanaObtenerPath = '/catTipoCampana';
  static readonly catTipoCampanaGuardarOActualizarPath = '/catTipoCampana';
  static readonly catTipoCampanaQueryResultPath = '/catTipoCampana';
  static readonly catTipoCampanaDesactivarPath = '/catTipoCampana';
  static readonly catTipoControlObtenerPath = '/catTipoControl';
  static readonly catTipoControlGuardarOActualizarPath = '/catTipoControl';
  static readonly catTipoControlQueryResultPath = '/catTipoControl';
  static readonly catTipoControlDesactivarPath = '/catTipoControl';
  static readonly catTipoCotizacionObtenerPath = '/catTipoCotizacion';
  static readonly catTipoCotizacionGuardarOActualizarPath = '/catTipoCotizacion';
  static readonly catTipoCotizacionQueryResultPath = '/catTipoCotizacion';
  static readonly catTipoCotizacionDesactivarPath = '/catTipoCotizacion';
  static readonly catTipoCuentaObtenerPath = '/catTipoCuenta';
  static readonly catTipoCuentaGuardarOActualizarPath = '/catTipoCuenta';
  static readonly catTipoCuentaQueryResultPath = '/catTipoCuenta';
  static readonly catTipoCuentaDesactivarPath = '/catTipoCuenta';
  static readonly catTipoCuentaContableObtenerPath = '/catTipoCuentaContable';
  static readonly catTipoCuentaContableGuardarOActualizarPath = '/catTipoCuentaContable';
  static readonly catTipoCuentaContableQueryResultPath = '/catTipoCuentaContable';
  static readonly catTipoCuentaContableDesactivarPath = '/catTipoCuentaContable';
  static readonly catTipoDireccionObtenerPath = '/catTipoDireccion';
  static readonly catTipoDireccionGuardarOActualizarPath = '/catTipoDireccion';
  static readonly catTipoDireccionQueryResultPath = '/catTipoDireccion';
  static readonly catTipoDireccionDesactivarPath = '/catTipoDireccion';
  static readonly catTipoDocumentoObtenerPath = '/catTipoDocumento';
  static readonly catTipoDocumentoGuardarOActualizarPath = '/catTipoDocumento';
  static readonly catTipoDocumentoQueryResultPath = '/catTipoDocumento';
  static readonly catTipoDocumentoDesactivarPath = '/catTipoDocumento';
  static readonly catTipoNumeroTelefonicoObtenerPath = '/catTipoNumeroTelefonico';
  static readonly catTipoNumeroTelefonicoGuardarOActualizarPath = '/catTipoNumeroTelefonico';
  static readonly catTipoNumeroTelefonicoQueryResultPath = '/catTipoNumeroTelefonico';
  static readonly catTipoNumeroTelefonicoDesactivarPath = '/catTipoNumeroTelefonico';
  static readonly catTipoPartidaCotizacionObtenerPath = '/catTipoPartidaCotizacion';
  static readonly catTipoPartidaCotizacionGuardarOActualizarPath = '/catTipoPartidaCotizacion';
  static readonly catTipoPartidaCotizacionQueryResultPath = '/catTipoPartidaCotizacion';
  static readonly catTipoPartidaCotizacionDesactivarPath = '/catTipoPartidaCotizacion';
  static readonly catTipoPermisoObtenerPath = '/catTipoPermiso';
  static readonly catTipoPermisoGuardarOActualizarPath = '/catTipoPermiso';
  static readonly catTipoPermisoQueryResultPath = '/catTipoPermiso';
  static readonly catTipoPermisoDesactivarPath = '/catTipoPermiso';
  static readonly catTipoPresentacionObtenerPath = '/catTipoPresentacion';
  static readonly catTipoPresentacionGuardarOActualizarPath = '/catTipoPresentacion';
  static readonly catTipoPresentacionQueryResultPath = '/catTipoPresentacion';
  static readonly catTipoPresentacionDesactivarPath = '/catTipoPresentacion';
  static readonly catTipoProductoObtenerPath = '/catTipoProducto';
  static readonly catTipoProductoGuardarOActualizarPath = '/catTipoProducto';
  static readonly catTipoProductoQueryResultPath = '/catTipoProducto';
  static readonly catTipoProductoDesactivarPath = '/catTipoProducto';
  static readonly catTipoSociedadMercantilObtenerPath = '/catTipoSociedadMercantil';
  static readonly catTipoSociedadMercantilGuardarOActualizarPath = '/catTipoSociedadMercantil';
  static readonly catTipoSociedadMercantilQueryResultPath = '/catTipoSociedadMercantil';
  static readonly catTipoSociedadMercantilDesactivarPath = '/catTipoSociedadMercantil';
  static readonly catTipoValidacionObtenerPath = '/catTipoValidacion';
  static readonly catTipoValidacionGuardarOActualizarPath = '/catTipoValidacion';
  static readonly catTipoValidacionQueryResultPath = '/catTipoValidacion';
  static readonly catTipoValidacionDesactivarPath = '/catTipoValidacion';
  static readonly catTipoVehiculoObtenerPath = '/catTipoVehiculo';
  static readonly catTipoVehiculoGuardarOActualizarPath = '/catTipoVehiculo';
  static readonly catTipoVehiculoQueryResultPath = '/catTipoVehiculo';
  static readonly catTipoVehiculoDesactivarPath = '/catTipoVehiculo';
  static readonly catUnidadObtenerPath = '/catUnidad';
  static readonly catUnidadGuardarOActualizarPath = '/catUnidad';
  static readonly catUnidadQueryResultPath = '/catUnidad';
  static readonly catUnidadDesactivarPath = '/catUnidad';
  static readonly catUnidadFleteObtenerPath = '/catUnidadFlete';
  static readonly catUnidadFleteGuardarOActualizarPath = '/catUnidadFlete';
  static readonly catUnidadFleteQueryResultPath = '/catUnidadFlete';
  static readonly catUnidadFleteDesactivarPath = '/catUnidadFlete';
  static readonly catUnidadTiempoObtenerPath = '/catUnidadTiempo';
  static readonly catUnidadTiempoGuardarOActualizarPath = '/catUnidadTiempo';
  static readonly catUnidadTiempoQueryResultPath = '/catUnidadTiempo';
  static readonly catUnidadTiempoDesactivarPath = '/catUnidadTiempo';
  static readonly catUsoObtenerPath = '/catUso';
  static readonly catUsoGuardarOActualizarPath = '/catUso';
  static readonly catUsoQueryResultPath = '/catUso';
  static readonly catUsoDesactivarPath = '/catUso';
  static readonly catUsoArchivoSistemaObtenerPath = '/catUsoArchivoSistema';
  static readonly catUsoArchivoSistemaGuardarOActualizarPath = '/catUsoArchivoSistema';
  static readonly catUsoArchivoSistemaQueryResultPath = '/catUsoArchivoSistema';
  static readonly catUsoArchivoSistemaDesactivarPath = '/catUsoArchivoSistema';
  static readonly catUsoCFDIObtenerPath = '/catUsoCFDI';
  static readonly catUsoCFDIGuardarOActualizarPath = '/catUsoCFDI';
  static readonly catUsoCFDIQueryResultPath = '/catUsoCFDI';
  static readonly catUsoCFDIDesactivarPath = '/catUsoCFDI';
  static readonly catVariableSistemaObtenerPath = '/catVariableSistema';
  static readonly catVariableSistemaGuardarOActualizarPath = '/catVariableSistema';
  static readonly catVariableSistemaQueryResultPath = '/catVariableSistema';
  static readonly catVariableSistemaDesactivarPath = '/catVariableSistema';
  static readonly catZonaObtenerPath = '/catZona';
  static readonly catZonaGuardarOActualizarPath = '/catZona';
  static readonly catZonaQueryResultPath = '/catZona';
  static readonly catZonaDesactivarPath = '/catZona';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de catAplicacion
   * @param idcatAplicacion Identificador de catAplicacion
   * @return OK
   */
  catAplicacionObtenerResponse(idcatAplicacion: string): __Observable<__StrictHttpResponse<CatAplicacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatAplicacion != null) __params = __params.set('idcatAplicacion', idcatAplicacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catAplicacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatAplicacion>;
      })
    );
  }
  /**
   * Consultar registro de catAplicacion
   * @param idcatAplicacion Identificador de catAplicacion
   * @return OK
   */
  catAplicacionObtener(idcatAplicacion: string): __Observable<CatAplicacion> {
    return this.catAplicacionObtenerResponse(idcatAplicacion).pipe(
      __map(_r => _r.body as CatAplicacion)
    );
  }

  /**
   * Guardar o actualizar catAplicacion
   * @param catAplicacion catAplicacion
   * @return OK
   */
  catAplicacionGuardarOActualizarResponse(catAplicacion: CatAplicacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catAplicacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catAplicacion`,
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
   * Guardar o actualizar catAplicacion
   * @param catAplicacion catAplicacion
   * @return OK
   */
  catAplicacionGuardarOActualizar(catAplicacion: CatAplicacion): __Observable<string> {
    return this.catAplicacionGuardarOActualizarResponse(catAplicacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catAplicacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catAplicacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatAplicacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catAplicacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatAplicacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catAplicacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catAplicacionQueryResult(info: QueryInfo): __Observable<QueryResultCatAplicacion> {
    return this.catAplicacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatAplicacion)
    );
  }

  /**
   * Desactivar registro de catAplicacion
   * @param idcatAplicacion Identificador de registro de catAplicacion
   * @return OK
   */
  catAplicacionDesactivarResponse(idcatAplicacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatAplicacion != null) __params = __params.set('idcatAplicacion', idcatAplicacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catAplicacion`,
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
   * Desactivar registro de catAplicacion
   * @param idcatAplicacion Identificador de registro de catAplicacion
   * @return OK
   */
  catAplicacionDesactivar(idcatAplicacion: string): __Observable<string> {
    return this.catAplicacionDesactivarResponse(idcatAplicacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catAspectoEvaluacion
   * @param idCatAspectoEvaluacion undefined
   * @return OK
   */
  catAspectoEvaluacionObtenerResponse(idCatAspectoEvaluacion: string): __Observable<__StrictHttpResponse<CatAspectoEvaluacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatAspectoEvaluacion != null) __params = __params.set('idCatAspectoEvaluacion', idCatAspectoEvaluacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catAspectoEvaluacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatAspectoEvaluacion>;
      })
    );
  }
  /**
   * Obtener catAspectoEvaluacion
   * @param idCatAspectoEvaluacion undefined
   * @return OK
   */
  catAspectoEvaluacionObtener(idCatAspectoEvaluacion: string): __Observable<CatAspectoEvaluacion> {
    return this.catAspectoEvaluacionObtenerResponse(idCatAspectoEvaluacion).pipe(
      __map(_r => _r.body as CatAspectoEvaluacion)
    );
  }

  /**
   * QueryResult catAspectoEvaluacion
   * @param info undefined
   * @return OK
   */
  catAspectoEvaluacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatAspectoEvaluacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catAspectoEvaluacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatAspectoEvaluacion>;
      })
    );
  }
  /**
   * QueryResult catAspectoEvaluacion
   * @param info undefined
   * @return OK
   */
  catAspectoEvaluacionQueryResult(info: QueryInfo): __Observable<QueryResultCatAspectoEvaluacion> {
    return this.catAspectoEvaluacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatAspectoEvaluacion)
    );
  }

  /**
   * GuardarOActualizar catAspectoEvaluacion
   * @param catAspectoEvaluacion undefined
   * @return OK
   */
  catAspectoEvaluacionGuardarOActualizarResponse(catAspectoEvaluacion: CatAspectoEvaluacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catAspectoEvaluacion;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catAspectoEvaluacion`,
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
   * GuardarOActualizar catAspectoEvaluacion
   * @param catAspectoEvaluacion undefined
   * @return OK
   */
  catAspectoEvaluacionGuardarOActualizar(catAspectoEvaluacion: CatAspectoEvaluacion): __Observable<string> {
    return this.catAspectoEvaluacionGuardarOActualizarResponse(catAspectoEvaluacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Desactivar catAspectoEvaluacion
   * @param idCatAspectoEvaluacion undefined
   * @return OK
   */
  catAspectoEvaluacionDesactivarResponse(idCatAspectoEvaluacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatAspectoEvaluacion != null) __params = __params.set('idCatAspectoEvaluacion', idCatAspectoEvaluacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catAspectoEvaluacion`,
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
   * Desactivar catAspectoEvaluacion
   * @param idCatAspectoEvaluacion undefined
   * @return OK
   */
  catAspectoEvaluacionDesactivar(idCatAspectoEvaluacion: string): __Observable<string> {
    return this.catAspectoEvaluacionDesactivarResponse(idCatAspectoEvaluacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catBanco
   * @param idcatBanco Identificador de catBanco
   * @return OK
   */
  catBancoObtenerResponse(idcatBanco: string): __Observable<__StrictHttpResponse<CatBanco>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatBanco != null) __params = __params.set('idcatBanco', idcatBanco.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catBanco`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatBanco>;
      })
    );
  }
  /**
   * Consultar registro de catBanco
   * @param idcatBanco Identificador de catBanco
   * @return OK
   */
  catBancoObtener(idcatBanco: string): __Observable<CatBanco> {
    return this.catBancoObtenerResponse(idcatBanco).pipe(
      __map(_r => _r.body as CatBanco)
    );
  }

  /**
   * Guardar o actualizar catBanco
   * @param catBanco catBanco
   * @return OK
   */
  catBancoGuardarOActualizarResponse(catBanco: CatBanco): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catBanco;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catBanco`,
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
   * Guardar o actualizar catBanco
   * @param catBanco catBanco
   * @return OK
   */
  catBancoGuardarOActualizar(catBanco: CatBanco): __Observable<string> {
    return this.catBancoGuardarOActualizarResponse(catBanco).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catBanco
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catBancoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatBanco>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catBanco`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatBanco>;
      })
    );
  }
  /**
   * Consultar lista paginada de catBanco
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catBancoQueryResult(info: QueryInfo): __Observable<QueryResultCatBanco> {
    return this.catBancoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatBanco)
    );
  }

  /**
   * Desactivar registro de catBanco
   * @param idcatBanco Identificador de registro de catBanco
   * @return OK
   */
  catBancoDesactivarResponse(idcatBanco: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatBanco != null) __params = __params.set('idcatBanco', idcatBanco.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catBanco`,
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
   * Desactivar registro de catBanco
   * @param idcatBanco Identificador de registro de catBanco
   * @return OK
   */
  catBancoDesactivar(idcatBanco: string): __Observable<string> {
    return this.catBancoDesactivarResponse(idcatBanco).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catBrokerCliente
   * @param idcatBrokerCliente Identificador de catBrokerCliente
   * @return OK
   */
  catBrokerClienteObtenerResponse(idcatBrokerCliente: string): __Observable<__StrictHttpResponse<CatBrokerCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatBrokerCliente != null) __params = __params.set('idcatBrokerCliente', idcatBrokerCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catBrokerCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatBrokerCliente>;
      })
    );
  }
  /**
   * Consultar registro de catBrokerCliente
   * @param idcatBrokerCliente Identificador de catBrokerCliente
   * @return OK
   */
  catBrokerClienteObtener(idcatBrokerCliente: string): __Observable<CatBrokerCliente> {
    return this.catBrokerClienteObtenerResponse(idcatBrokerCliente).pipe(
      __map(_r => _r.body as CatBrokerCliente)
    );
  }

  /**
   * Guardar o actualizar catBrokerCliente
   * @param catBrokerCliente catBrokerCliente
   * @return OK
   */
  catBrokerClienteGuardarOActualizarResponse(catBrokerCliente: CatBrokerCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catBrokerCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catBrokerCliente`,
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
   * Guardar o actualizar catBrokerCliente
   * @param catBrokerCliente catBrokerCliente
   * @return OK
   */
  catBrokerClienteGuardarOActualizar(catBrokerCliente: CatBrokerCliente): __Observable<string> {
    return this.catBrokerClienteGuardarOActualizarResponse(catBrokerCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catBrokerCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catBrokerClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatBrokerCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catBrokerCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatBrokerCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de catBrokerCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catBrokerClienteQueryResult(info: QueryInfo): __Observable<QueryResultCatBrokerCliente> {
    return this.catBrokerClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatBrokerCliente)
    );
  }

  /**
   * Desactivar registro de catBrokerCliente
   * @param idcatBrokerCliente Identificador de registro de catBrokerCliente
   * @return OK
   */
  catBrokerClienteDesactivarResponse(idcatBrokerCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatBrokerCliente != null) __params = __params.set('idcatBrokerCliente', idcatBrokerCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catBrokerCliente`,
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
   * Desactivar registro de catBrokerCliente
   * @param idcatBrokerCliente Identificador de registro de catBrokerCliente
   * @return OK
   */
  catBrokerClienteDesactivar(idcatBrokerCliente: string): __Observable<string> {
    return this.catBrokerClienteDesactivarResponse(idcatBrokerCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catClasificacionCorreoRecibido
   * @param idCatClasificacionCorreoRecibido undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoObtenerResponse(idCatClasificacionCorreoRecibido: string): __Observable<__StrictHttpResponse<CatClasificacionCorreoRecibido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatClasificacionCorreoRecibido != null) __params = __params.set('idCatClasificacionCorreoRecibido', idCatClasificacionCorreoRecibido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catClasificacionCorreoRecibido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatClasificacionCorreoRecibido>;
      })
    );
  }
  /**
   * Obtener catClasificacionCorreoRecibido
   * @param idCatClasificacionCorreoRecibido undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoObtener(idCatClasificacionCorreoRecibido: string): __Observable<CatClasificacionCorreoRecibido> {
    return this.catClasificacionCorreoRecibidoObtenerResponse(idCatClasificacionCorreoRecibido).pipe(
      __map(_r => _r.body as CatClasificacionCorreoRecibido)
    );
  }

  /**
   * GuardarOActualizar catClasificacionCorreoRecibido
   * @param catClasificacionCorreoRecibido undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoGuardarOActualizarResponse(catClasificacionCorreoRecibido: CatClasificacionCorreoRecibido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catClasificacionCorreoRecibido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catClasificacionCorreoRecibido`,
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
   * GuardarOActualizar catClasificacionCorreoRecibido
   * @param catClasificacionCorreoRecibido undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoGuardarOActualizar(catClasificacionCorreoRecibido: CatClasificacionCorreoRecibido): __Observable<string> {
    return this.catClasificacionCorreoRecibidoGuardarOActualizarResponse(catClasificacionCorreoRecibido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult catClasificacionCorreoRecibido
   * @param info undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatClasificacionCorreoRecibido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catClasificacionCorreoRecibido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatClasificacionCorreoRecibido>;
      })
    );
  }
  /**
   * QueryResult catClasificacionCorreoRecibido
   * @param info undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoQueryResult(info: QueryInfo): __Observable<QueryResultCatClasificacionCorreoRecibido> {
    return this.catClasificacionCorreoRecibidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatClasificacionCorreoRecibido)
    );
  }

  /**
   * Desactivar catClasificacionCorreoRecibido
   * @param idCatClasificacionCorreoRecibido undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoDesactivarResponse(idCatClasificacionCorreoRecibido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatClasificacionCorreoRecibido != null) __params = __params.set('idCatClasificacionCorreoRecibido', idCatClasificacionCorreoRecibido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catClasificacionCorreoRecibido`,
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
   * Desactivar catClasificacionCorreoRecibido
   * @param idCatClasificacionCorreoRecibido undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoDesactivar(idCatClasificacionCorreoRecibido: string): __Observable<string> {
    return this.catClasificacionCorreoRecibidoDesactivarResponse(idCatClasificacionCorreoRecibido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catClasificacionCorreoRecibidoReferencia
   * @param idCatClasificacionCorreoRecibidoReferencia undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoReferenciaObtenerResponse(idCatClasificacionCorreoRecibidoReferencia: string): __Observable<__StrictHttpResponse<CatClasificacionCorreoRecibidoReferencia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatClasificacionCorreoRecibidoReferencia != null) __params = __params.set('idCatClasificacionCorreoRecibidoReferencia', idCatClasificacionCorreoRecibidoReferencia.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catClasificacionCorreoRecibidoReferencia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatClasificacionCorreoRecibidoReferencia>;
      })
    );
  }
  /**
   * Obtener catClasificacionCorreoRecibidoReferencia
   * @param idCatClasificacionCorreoRecibidoReferencia undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoReferenciaObtener(idCatClasificacionCorreoRecibidoReferencia: string): __Observable<CatClasificacionCorreoRecibidoReferencia> {
    return this.catClasificacionCorreoRecibidoReferenciaObtenerResponse(idCatClasificacionCorreoRecibidoReferencia).pipe(
      __map(_r => _r.body as CatClasificacionCorreoRecibidoReferencia)
    );
  }

  /**
   * GuardarOActualizar catClasificacionCorreoRecibidoReferencia
   * @param catClasificacionCorreoRecibidoReferencia undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoReferenciaGuardarOActualizarResponse(catClasificacionCorreoRecibidoReferencia: CatClasificacionCorreoRecibidoReferencia): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catClasificacionCorreoRecibidoReferencia;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catClasificacionCorreoRecibidoReferencia`,
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
   * GuardarOActualizar catClasificacionCorreoRecibidoReferencia
   * @param catClasificacionCorreoRecibidoReferencia undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoReferenciaGuardarOActualizar(catClasificacionCorreoRecibidoReferencia: CatClasificacionCorreoRecibidoReferencia): __Observable<string> {
    return this.catClasificacionCorreoRecibidoReferenciaGuardarOActualizarResponse(catClasificacionCorreoRecibidoReferencia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult catClasificacionCorreoRecibidoReferencia
   * @param info undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoReferenciaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatClasificacionCorreoRecibidoReferencia>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catClasificacionCorreoRecibidoReferencia`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatClasificacionCorreoRecibidoReferencia>;
      })
    );
  }
  /**
   * QueryResult catClasificacionCorreoRecibidoReferencia
   * @param info undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoReferenciaQueryResult(info: QueryInfo): __Observable<QueryResultCatClasificacionCorreoRecibidoReferencia> {
    return this.catClasificacionCorreoRecibidoReferenciaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatClasificacionCorreoRecibidoReferencia)
    );
  }

  /**
   * Desactivar catClasificacionCorreoRecibidoReferencia
   * @param idCatClasificacionCorreoRecibidoReferencia undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoReferenciaDesactivarResponse(idCatClasificacionCorreoRecibidoReferencia: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatClasificacionCorreoRecibidoReferencia != null) __params = __params.set('idCatClasificacionCorreoRecibidoReferencia', idCatClasificacionCorreoRecibidoReferencia.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catClasificacionCorreoRecibidoReferencia`,
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
   * Desactivar catClasificacionCorreoRecibidoReferencia
   * @param idCatClasificacionCorreoRecibidoReferencia undefined
   * @return OK
   */
  catClasificacionCorreoRecibidoReferenciaDesactivar(idCatClasificacionCorreoRecibidoReferencia: string): __Observable<string> {
    return this.catClasificacionCorreoRecibidoReferenciaDesactivarResponse(idCatClasificacionCorreoRecibidoReferencia).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catClasificacionInformativaProducto
   * @param idcatClasificacionInformativaProducto Identificador de catClasificacionInformativaProducto
   * @return OK
   */
  catClasificacionInformativaProductoObtenerResponse(idcatClasificacionInformativaProducto: string): __Observable<__StrictHttpResponse<CatClasificacionInformativaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatClasificacionInformativaProducto != null) __params = __params.set('idcatClasificacionInformativaProducto', idcatClasificacionInformativaProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catClasificacionInformativaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatClasificacionInformativaProducto>;
      })
    );
  }
  /**
   * Consultar registro de catClasificacionInformativaProducto
   * @param idcatClasificacionInformativaProducto Identificador de catClasificacionInformativaProducto
   * @return OK
   */
  catClasificacionInformativaProductoObtener(idcatClasificacionInformativaProducto: string): __Observable<CatClasificacionInformativaProducto> {
    return this.catClasificacionInformativaProductoObtenerResponse(idcatClasificacionInformativaProducto).pipe(
      __map(_r => _r.body as CatClasificacionInformativaProducto)
    );
  }

  /**
   * Guardar o actualizar catClasificacionInformativaProducto
   * @param catClasificacionInformativaProducto catClasificacionInformativaProducto
   * @return OK
   */
  catClasificacionInformativaProductoGuardarOActualizarResponse(catClasificacionInformativaProducto: CatClasificacionInformativaProducto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catClasificacionInformativaProducto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catClasificacionInformativaProducto`,
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
   * Guardar o actualizar catClasificacionInformativaProducto
   * @param catClasificacionInformativaProducto catClasificacionInformativaProducto
   * @return OK
   */
  catClasificacionInformativaProductoGuardarOActualizar(catClasificacionInformativaProducto: CatClasificacionInformativaProducto): __Observable<string> {
    return this.catClasificacionInformativaProductoGuardarOActualizarResponse(catClasificacionInformativaProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catClasificacionInformativaProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catClasificacionInformativaProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatClasificacionInformativaProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catClasificacionInformativaProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatClasificacionInformativaProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de catClasificacionInformativaProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catClasificacionInformativaProductoQueryResult(info: QueryInfo): __Observable<QueryResultCatClasificacionInformativaProducto> {
    return this.catClasificacionInformativaProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatClasificacionInformativaProducto)
    );
  }

  /**
   * Desactivar registro de catClasificacionInformativaProducto
   * @param idcatClasificacionInformativaProducto Identificador de registro de catClasificacionInformativaProducto
   * @return OK
   */
  catClasificacionInformativaProductoDesactivarResponse(idcatClasificacionInformativaProducto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatClasificacionInformativaProducto != null) __params = __params.set('idcatClasificacionInformativaProducto', idcatClasificacionInformativaProducto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catClasificacionInformativaProducto`,
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
   * Desactivar registro de catClasificacionInformativaProducto
   * @param idcatClasificacionInformativaProducto Identificador de registro de catClasificacionInformativaProducto
   * @return OK
   */
  catClasificacionInformativaProductoDesactivar(idcatClasificacionInformativaProducto: string): __Observable<string> {
    return this.catClasificacionInformativaProductoDesactivarResponse(idcatClasificacionInformativaProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catClasificacionRegulatoria
   * @param idcatClasificacionRegulatoria Identificador de catClasificacionRegulatoria
   * @return OK
   */
  catClasificacionRegulatoriaObtenerResponse(idcatClasificacionRegulatoria: string): __Observable<__StrictHttpResponse<CatClasificacionRegulatoria>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatClasificacionRegulatoria != null) __params = __params.set('idcatClasificacionRegulatoria', idcatClasificacionRegulatoria.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catClasificacionRegulatoria`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatClasificacionRegulatoria>;
      })
    );
  }
  /**
   * Consultar registro de catClasificacionRegulatoria
   * @param idcatClasificacionRegulatoria Identificador de catClasificacionRegulatoria
   * @return OK
   */
  catClasificacionRegulatoriaObtener(idcatClasificacionRegulatoria: string): __Observable<CatClasificacionRegulatoria> {
    return this.catClasificacionRegulatoriaObtenerResponse(idcatClasificacionRegulatoria).pipe(
      __map(_r => _r.body as CatClasificacionRegulatoria)
    );
  }

  /**
   * Guardar o actualizar catClasificacionRegulatoria
   * @param catClasificacionRegulatoria catClasificacionRegulatoria
   * @return OK
   */
  catClasificacionRegulatoriaGuardarOActualizarResponse(catClasificacionRegulatoria: CatClasificacionRegulatoria): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catClasificacionRegulatoria;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catClasificacionRegulatoria`,
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
   * Guardar o actualizar catClasificacionRegulatoria
   * @param catClasificacionRegulatoria catClasificacionRegulatoria
   * @return OK
   */
  catClasificacionRegulatoriaGuardarOActualizar(catClasificacionRegulatoria: CatClasificacionRegulatoria): __Observable<string> {
    return this.catClasificacionRegulatoriaGuardarOActualizarResponse(catClasificacionRegulatoria).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catClasificacionRegulatoria
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catClasificacionRegulatoriaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatClasificacionRegulatoria>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catClasificacionRegulatoria`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatClasificacionRegulatoria>;
      })
    );
  }
  /**
   * Consultar lista paginada de catClasificacionRegulatoria
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catClasificacionRegulatoriaQueryResult(info: QueryInfo): __Observable<QueryResultCatClasificacionRegulatoria> {
    return this.catClasificacionRegulatoriaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatClasificacionRegulatoria)
    );
  }

  /**
   * Desactivar registro de catClasificacionRegulatoria
   * @param idcatClasificacionRegulatoria Identificador de registro de catClasificacionRegulatoria
   * @return OK
   */
  catClasificacionRegulatoriaDesactivarResponse(idcatClasificacionRegulatoria: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatClasificacionRegulatoria != null) __params = __params.set('idcatClasificacionRegulatoria', idcatClasificacionRegulatoria.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catClasificacionRegulatoria`,
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
   * Desactivar registro de catClasificacionRegulatoria
   * @param idcatClasificacionRegulatoria Identificador de registro de catClasificacionRegulatoria
   * @return OK
   */
  catClasificacionRegulatoriaDesactivar(idcatClasificacionRegulatoria: string): __Observable<string> {
    return this.catClasificacionRegulatoriaDesactivarResponse(idcatClasificacionRegulatoria).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catConceptoFactura
   * @param idcatConceptoFactura Identificador de catConceptoFactura
   * @return OK
   */
  catConceptoFacturaObtenerResponse(idcatConceptoFactura: string): __Observable<__StrictHttpResponse<CatConceptoFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatConceptoFactura != null) __params = __params.set('idcatConceptoFactura', idcatConceptoFactura.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catConceptoFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatConceptoFactura>;
      })
    );
  }
  /**
   * Consultar registro de catConceptoFactura
   * @param idcatConceptoFactura Identificador de catConceptoFactura
   * @return OK
   */
  catConceptoFacturaObtener(idcatConceptoFactura: string): __Observable<CatConceptoFactura> {
    return this.catConceptoFacturaObtenerResponse(idcatConceptoFactura).pipe(
      __map(_r => _r.body as CatConceptoFactura)
    );
  }

  /**
   * Guardar o actualizar catConceptoFactura
   * @param catConceptoFactura catConceptoFactura
   * @return OK
   */
  catConceptoFacturaGuardarOActualizarResponse(catConceptoFactura: CatConceptoFactura): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catConceptoFactura;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catConceptoFactura`,
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
   * Guardar o actualizar catConceptoFactura
   * @param catConceptoFactura catConceptoFactura
   * @return OK
   */
  catConceptoFacturaGuardarOActualizar(catConceptoFactura: CatConceptoFactura): __Observable<string> {
    return this.catConceptoFacturaGuardarOActualizarResponse(catConceptoFactura).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catConceptoFactura
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catConceptoFacturaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatConceptoFactura>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catConceptoFactura`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatConceptoFactura>;
      })
    );
  }
  /**
   * Consultar lista paginada de catConceptoFactura
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catConceptoFacturaQueryResult(info: QueryInfo): __Observable<QueryResultCatConceptoFactura> {
    return this.catConceptoFacturaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatConceptoFactura)
    );
  }

  /**
   * Desactivar registro de catConceptoFactura
   * @param idcatConceptoFactura Identificador de registro de catConceptoFactura
   * @return OK
   */
  catConceptoFacturaDesactivarResponse(idcatConceptoFactura: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatConceptoFactura != null) __params = __params.set('idcatConceptoFactura', idcatConceptoFactura.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catConceptoFactura`,
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
   * Desactivar registro de catConceptoFactura
   * @param idcatConceptoFactura Identificador de registro de catConceptoFactura
   * @return OK
   */
  catConceptoFacturaDesactivar(idcatConceptoFactura: string): __Observable<string> {
    return this.catConceptoFacturaDesactivarResponse(idcatConceptoFactura).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catCondicionesDePago
   * @param idcatCondicionesDePago Identificador de catCondicionesDePago
   * @return OK
   */
  catCondicionesDePagoObtenerResponse(idcatCondicionesDePago: string): __Observable<__StrictHttpResponse<CatCondicionesDePago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatCondicionesDePago != null) __params = __params.set('idcatCondicionesDePago', idcatCondicionesDePago.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catCondicionesDePago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatCondicionesDePago>;
      })
    );
  }
  /**
   * Consultar registro de catCondicionesDePago
   * @param idcatCondicionesDePago Identificador de catCondicionesDePago
   * @return OK
   */
  catCondicionesDePagoObtener(idcatCondicionesDePago: string): __Observable<CatCondicionesDePago> {
    return this.catCondicionesDePagoObtenerResponse(idcatCondicionesDePago).pipe(
      __map(_r => _r.body as CatCondicionesDePago)
    );
  }

  /**
   * Guardar o actualizar catCondicionesDePago
   * @param catCondicionesDePago catCondicionesDePago
   * @return OK
   */
  catCondicionesDePagoGuardarOActualizarResponse(catCondicionesDePago: CatCondicionesDePago): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catCondicionesDePago;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catCondicionesDePago`,
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
   * Guardar o actualizar catCondicionesDePago
   * @param catCondicionesDePago catCondicionesDePago
   * @return OK
   */
  catCondicionesDePagoGuardarOActualizar(catCondicionesDePago: CatCondicionesDePago): __Observable<string> {
    return this.catCondicionesDePagoGuardarOActualizarResponse(catCondicionesDePago).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catCondicionesDePago
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catCondicionesDePagoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatCondicionesDePago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catCondicionesDePago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatCondicionesDePago>;
      })
    );
  }
  /**
   * Consultar lista paginada de catCondicionesDePago
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catCondicionesDePagoQueryResult(info: QueryInfo): __Observable<QueryResultCatCondicionesDePago> {
    return this.catCondicionesDePagoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatCondicionesDePago)
    );
  }

  /**
   * Desactivar registro de catCondicionesDePago
   * @param idcatCondicionesDePago Identificador de registro de catCondicionesDePago
   * @return OK
   */
  catCondicionesDePagoDesactivarResponse(idcatCondicionesDePago: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatCondicionesDePago != null) __params = __params.set('idcatCondicionesDePago', idcatCondicionesDePago.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catCondicionesDePago`,
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
   * Desactivar registro de catCondicionesDePago
   * @param idcatCondicionesDePago Identificador de registro de catCondicionesDePago
   * @return OK
   */
  catCondicionesDePagoDesactivar(idcatCondicionesDePago: string): __Observable<string> {
    return this.catCondicionesDePagoDesactivarResponse(idcatCondicionesDePago).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catContinente
   * @param idCatContinente Identificador de catContinente
   * @return OK
   */
  catContinenteObtenerResponse(idCatContinente: string): __Observable<__StrictHttpResponse<CatContinente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatContinente != null) __params = __params.set('idCatContinente', idCatContinente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catContinente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatContinente>;
      })
    );
  }
  /**
   * Consultar registro de catContinente
   * @param idCatContinente Identificador de catContinente
   * @return OK
   */
  catContinenteObtener(idCatContinente: string): __Observable<CatContinente> {
    return this.catContinenteObtenerResponse(idCatContinente).pipe(
      __map(_r => _r.body as CatContinente)
    );
  }

  /**
   * Guardar o actualizar catContinente
   * @param catContinente catContinente
   * @return OK
   */
  catContinenteGuardarOActualizarResponse(catContinente: CatContinente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catContinente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catContinente`,
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
   * Guardar o actualizar catContinente
   * @param catContinente catContinente
   * @return OK
   */
  catContinenteGuardarOActualizar(catContinente: CatContinente): __Observable<string> {
    return this.catContinenteGuardarOActualizarResponse(catContinente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catContinente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catContinenteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatContinente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catContinente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatContinente>;
      })
    );
  }
  /**
   * Consultar lista paginada de catContinente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catContinenteQueryResult(info: QueryInfo): __Observable<QueryResultCatContinente> {
    return this.catContinenteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatContinente)
    );
  }

  /**
   * Desactivar registro de catContinente
   * @param idCatContinente Identificador de registro de catContinente
   * @return OK
   */
  catContinenteDesactivarResponse(idCatContinente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatContinente != null) __params = __params.set('idCatContinente', idCatContinente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catContinente`,
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
   * Desactivar registro de catContinente
   * @param idCatContinente Identificador de registro de catContinente
   * @return OK
   */
  catContinenteDesactivar(idCatContinente: string): __Observable<string> {
    return this.catContinenteDesactivarResponse(idCatContinente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catControl
   * @param idcatControl Identificador de catControl
   * @return OK
   */
  catControlObtenerResponse(idcatControl: string): __Observable<__StrictHttpResponse<CatControl>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatControl != null) __params = __params.set('idcatControl', idcatControl.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catControl`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatControl>;
      })
    );
  }
  /**
   * Consultar registro de catControl
   * @param idcatControl Identificador de catControl
   * @return OK
   */
  catControlObtener(idcatControl: string): __Observable<CatControl> {
    return this.catControlObtenerResponse(idcatControl).pipe(
      __map(_r => _r.body as CatControl)
    );
  }

  /**
   * Guardar o actualizar catControl
   * @param catControl catControl
   * @return OK
   */
  catControlGuardarOActualizarResponse(catControl: CatControl): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catControl;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catControl`,
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
   * Guardar o actualizar catControl
   * @param catControl catControl
   * @return OK
   */
  catControlGuardarOActualizar(catControl: CatControl): __Observable<string> {
    return this.catControlGuardarOActualizarResponse(catControl).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catControl
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catControlQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatControl>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catControl`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatControl>;
      })
    );
  }
  /**
   * Consultar lista paginada de catControl
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catControlQueryResult(info: QueryInfo): __Observable<QueryResultCatControl> {
    return this.catControlQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatControl)
    );
  }

  /**
   * Desactivar registro de catControl
   * @param idcatControl Identificador de registro de catControl
   * @return OK
   */
  catControlDesactivarResponse(idcatControl: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatControl != null) __params = __params.set('idcatControl', idcatControl.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catControl`,
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
   * Desactivar registro de catControl
   * @param idcatControl Identificador de registro de catControl
   * @return OK
   */
  catControlDesactivar(idcatControl: string): __Observable<string> {
    return this.catControlDesactivarResponse(idcatControl).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catCorporativo
   * @param idcatCorporativo Identificador de catCorporativo
   * @return OK
   */
  catCorporativoObtenerResponse(idcatCorporativo: string): __Observable<__StrictHttpResponse<CatCorporativo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatCorporativo != null) __params = __params.set('idcatCorporativo', idcatCorporativo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catCorporativo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatCorporativo>;
      })
    );
  }
  /**
   * Consultar registro de catCorporativo
   * @param idcatCorporativo Identificador de catCorporativo
   * @return OK
   */
  catCorporativoObtener(idcatCorporativo: string): __Observable<CatCorporativo> {
    return this.catCorporativoObtenerResponse(idcatCorporativo).pipe(
      __map(_r => _r.body as CatCorporativo)
    );
  }

  /**
   * Guardar o actualizar catCorporativo
   * @param catCorporativo catCorporativo
   * @return OK
   */
  catCorporativoGuardarOActualizarResponse(catCorporativo: CatCorporativo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catCorporativo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catCorporativo`,
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
   * Guardar o actualizar catCorporativo
   * @param catCorporativo catCorporativo
   * @return OK
   */
  catCorporativoGuardarOActualizar(catCorporativo: CatCorporativo): __Observable<string> {
    return this.catCorporativoGuardarOActualizarResponse(catCorporativo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catCorporativo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catCorporativoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatCorporativo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catCorporativo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatCorporativo>;
      })
    );
  }
  /**
   * Consultar lista paginada de catCorporativo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catCorporativoQueryResult(info: QueryInfo): __Observable<QueryResultCatCorporativo> {
    return this.catCorporativoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatCorporativo)
    );
  }

  /**
   * Desactivar registro de catCorporativo
   * @param idcatCorporativo Identificador de registro de catCorporativo
   * @return OK
   */
  catCorporativoDesactivarResponse(idcatCorporativo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatCorporativo != null) __params = __params.set('idcatCorporativo', idcatCorporativo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catCorporativo`,
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
   * Desactivar registro de catCorporativo
   * @param idcatCorporativo Identificador de registro de catCorporativo
   * @return OK
   */
  catCorporativoDesactivar(idcatCorporativo: string): __Observable<string> {
    return this.catCorporativoDesactivarResponse(idcatCorporativo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consulta registro de catCorreoElectronicoSpam
   * @param idCatCorreoElectronicoSpam Identificador de catCorreoElectronicoSpam
   * @return OK
   */
  catCorreoElectronicoSpamObtenerResponse(idCatCorreoElectronicoSpam: string): __Observable<__StrictHttpResponse<CatCorreoElectronicoSpam>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatCorreoElectronicoSpam != null) __params = __params.set('idCatCorreoElectronicoSpam', idCatCorreoElectronicoSpam.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catCorreoElectronicoSpam`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatCorreoElectronicoSpam>;
      })
    );
  }
  /**
   * Consulta registro de catCorreoElectronicoSpam
   * @param idCatCorreoElectronicoSpam Identificador de catCorreoElectronicoSpam
   * @return OK
   */
  catCorreoElectronicoSpamObtener(idCatCorreoElectronicoSpam: string): __Observable<CatCorreoElectronicoSpam> {
    return this.catCorreoElectronicoSpamObtenerResponse(idCatCorreoElectronicoSpam).pipe(
      __map(_r => _r.body as CatCorreoElectronicoSpam)
    );
  }

  /**
   * Guarda o actualiza catCorreoElectronicoSpam
   * @param catCorreoElectronicoSpam catCorreoElectronicoSpam
   * @return OK
   */
  catCorreoElectronicoSpamGuardarOActualizarResponse(catCorreoElectronicoSpam: CatCorreoElectronicoSpam): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catCorreoElectronicoSpam;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catCorreoElectronicoSpam`,
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
   * Guarda o actualiza catCorreoElectronicoSpam
   * @param catCorreoElectronicoSpam catCorreoElectronicoSpam
   * @return OK
   */
  catCorreoElectronicoSpamGuardarOActualizar(catCorreoElectronicoSpam: CatCorreoElectronicoSpam): __Observable<string> {
    return this.catCorreoElectronicoSpamGuardarOActualizarResponse(catCorreoElectronicoSpam).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consulta lista paginada de catCorreoElectronicoSpam
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catCorreoElectronicoSpamQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatCorreoElectronicoSpam>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catCorreoElectronicoSpam`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatCorreoElectronicoSpam>;
      })
    );
  }
  /**
   * Consulta lista paginada de catCorreoElectronicoSpam
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catCorreoElectronicoSpamQueryResult(info: QueryInfo): __Observable<QueryResultCatCorreoElectronicoSpam> {
    return this.catCorreoElectronicoSpamQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatCorreoElectronicoSpam)
    );
  }

  /**
   * Desactiva registro de correo de spam
   * @param idCatCorreoElectronicoSpam Identificador de catCorreoElectronicoSpam
   * @return OK
   */
  catCorreoElectronicoSpamDesactivarResponse(idCatCorreoElectronicoSpam: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatCorreoElectronicoSpam != null) __params = __params.set('idCatCorreoElectronicoSpam', idCatCorreoElectronicoSpam.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catCorreoElectronicoSpam`,
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
   * Desactiva registro de correo de spam
   * @param idCatCorreoElectronicoSpam Identificador de catCorreoElectronicoSpam
   * @return OK
   */
  catCorreoElectronicoSpamDesactivar(idCatCorreoElectronicoSpam: string): __Observable<string> {
    return this.catCorreoElectronicoSpamDesactivarResponse(idCatCorreoElectronicoSpam).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catDepositarioInternacional
   * @param idcatDepositarioInternacional Identificador de catDepositarioInternacional
   * @return OK
   */
  catDepositarioInternacionalObtenerResponse(idcatDepositarioInternacional: string): __Observable<__StrictHttpResponse<CatDepositarioInternacional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatDepositarioInternacional != null) __params = __params.set('idcatDepositarioInternacional', idcatDepositarioInternacional.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catDepositarioInternacional`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatDepositarioInternacional>;
      })
    );
  }
  /**
   * Consultar registro de catDepositarioInternacional
   * @param idcatDepositarioInternacional Identificador de catDepositarioInternacional
   * @return OK
   */
  catDepositarioInternacionalObtener(idcatDepositarioInternacional: string): __Observable<CatDepositarioInternacional> {
    return this.catDepositarioInternacionalObtenerResponse(idcatDepositarioInternacional).pipe(
      __map(_r => _r.body as CatDepositarioInternacional)
    );
  }

  /**
   * Guardar o actualizar catDepositarioInternacional
   * @param catDepositarioInternacional catDepositarioInternacional
   * @return OK
   */
  catDepositarioInternacionalGuardarOActualizarResponse(catDepositarioInternacional: CatDepositarioInternacional): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catDepositarioInternacional;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catDepositarioInternacional`,
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
   * Guardar o actualizar catDepositarioInternacional
   * @param catDepositarioInternacional catDepositarioInternacional
   * @return OK
   */
  catDepositarioInternacionalGuardarOActualizar(catDepositarioInternacional: CatDepositarioInternacional): __Observable<string> {
    return this.catDepositarioInternacionalGuardarOActualizarResponse(catDepositarioInternacional).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catDepositarioInternacional
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catDepositarioInternacionalQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatDepositarioInternacional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catDepositarioInternacional`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatDepositarioInternacional>;
      })
    );
  }
  /**
   * Consultar lista paginada de catDepositarioInternacional
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catDepositarioInternacionalQueryResult(info: QueryInfo): __Observable<QueryResultCatDepositarioInternacional> {
    return this.catDepositarioInternacionalQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatDepositarioInternacional)
    );
  }

  /**
   * Desactivar registro de catDepositarioInternacional
   * @param idcatDepositarioInternacional Identificador de registro de catDepositarioInternacional
   * @return OK
   */
  catDepositarioInternacionalDesactivarResponse(idcatDepositarioInternacional: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatDepositarioInternacional != null) __params = __params.set('idcatDepositarioInternacional', idcatDepositarioInternacional.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catDepositarioInternacional`,
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
   * Desactivar registro de catDepositarioInternacional
   * @param idcatDepositarioInternacional Identificador de registro de catDepositarioInternacional
   * @return OK
   */
  catDepositarioInternacionalDesactivar(idcatDepositarioInternacional: string): __Observable<string> {
    return this.catDepositarioInternacionalDesactivarResponse(idcatDepositarioInternacional).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catDestino
   * @param idcatDestino Identificador de catDestino
   * @return OK
   */
  catDestinoObtenerResponse(idcatDestino: string): __Observable<__StrictHttpResponse<CatDestino>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatDestino != null) __params = __params.set('idcatDestino', idcatDestino.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catDestino`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatDestino>;
      })
    );
  }
  /**
   * Consultar registro de catDestino
   * @param idcatDestino Identificador de catDestino
   * @return OK
   */
  catDestinoObtener(idcatDestino: string): __Observable<CatDestino> {
    return this.catDestinoObtenerResponse(idcatDestino).pipe(
      __map(_r => _r.body as CatDestino)
    );
  }

  /**
   * Guardar o actualizar catDestino
   * @param catDestino catDestino
   * @return OK
   */
  catDestinoGuardarOActualizarResponse(catDestino: CatDestino): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catDestino;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catDestino`,
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
   * Guardar o actualizar catDestino
   * @param catDestino catDestino
   * @return OK
   */
  catDestinoGuardarOActualizar(catDestino: CatDestino): __Observable<string> {
    return this.catDestinoGuardarOActualizarResponse(catDestino).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catDestino
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catDestinoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatDestino>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catDestino`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatDestino>;
      })
    );
  }
  /**
   * Consultar lista paginada de catDestino
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catDestinoQueryResult(info: QueryInfo): __Observable<QueryResultCatDestino> {
    return this.catDestinoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatDestino)
    );
  }

  /**
   * Desactivar registro de catDestino
   * @param idcatDestino Identificador de registro de catDestino
   * @return OK
   */
  catDestinoDesactivarResponse(idcatDestino: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatDestino != null) __params = __params.set('idcatDestino', idcatDestino.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catDestino`,
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
   * Desactivar registro de catDestino
   * @param idcatDestino Identificador de registro de catDestino
   * @return OK
   */
  catDestinoDesactivar(idcatDestino: string): __Observable<string> {
    return this.catDestinoDesactivarResponse(idcatDestino).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catDificultadDatosPersona
   * @param idcatDificultadDatosPersona Identificador de catDificultadDatosPersona
   * @return OK
   */
  catDificultadDatosPersonaObtenerResponse(idcatDificultadDatosPersona: string): __Observable<__StrictHttpResponse<CatDificultadDatosPersona>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatDificultadDatosPersona != null) __params = __params.set('idcatDificultadDatosPersona', idcatDificultadDatosPersona.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catDificultadDatosPersona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatDificultadDatosPersona>;
      })
    );
  }
  /**
   * Consultar registro de catDificultadDatosPersona
   * @param idcatDificultadDatosPersona Identificador de catDificultadDatosPersona
   * @return OK
   */
  catDificultadDatosPersonaObtener(idcatDificultadDatosPersona: string): __Observable<CatDificultadDatosPersona> {
    return this.catDificultadDatosPersonaObtenerResponse(idcatDificultadDatosPersona).pipe(
      __map(_r => _r.body as CatDificultadDatosPersona)
    );
  }

  /**
   * Guardar o actualizar catDificultadDatosPersona
   * @param catDificultadDatosPersona catDificultadDatosPersona
   * @return OK
   */
  catDificultadDatosPersonaGuardarOActualizarResponse(catDificultadDatosPersona: CatDificultadDatosPersona): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catDificultadDatosPersona;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catDificultadDatosPersona`,
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
   * Guardar o actualizar catDificultadDatosPersona
   * @param catDificultadDatosPersona catDificultadDatosPersona
   * @return OK
   */
  catDificultadDatosPersonaGuardarOActualizar(catDificultadDatosPersona: CatDificultadDatosPersona): __Observable<string> {
    return this.catDificultadDatosPersonaGuardarOActualizarResponse(catDificultadDatosPersona).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catDificultadDatosPersona
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catDificultadDatosPersonaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatDificultadDatosPersona>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catDificultadDatosPersona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatDificultadDatosPersona>;
      })
    );
  }
  /**
   * Consultar lista paginada de catDificultadDatosPersona
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catDificultadDatosPersonaQueryResult(info: QueryInfo): __Observable<QueryResultCatDificultadDatosPersona> {
    return this.catDificultadDatosPersonaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatDificultadDatosPersona)
    );
  }

  /**
   * Desactivar registro de catDificultadDatosPersona
   * @param idcatDificultadDatosPersona Identificador de registro de catDificultadDatosPersona
   * @return OK
   */
  catDificultadDatosPersonaDesactivarResponse(idcatDificultadDatosPersona: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatDificultadDatosPersona != null) __params = __params.set('idcatDificultadDatosPersona', idcatDificultadDatosPersona.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catDificultadDatosPersona`,
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
   * Desactivar registro de catDificultadDatosPersona
   * @param idcatDificultadDatosPersona Identificador de registro de catDificultadDatosPersona
   * @return OK
   */
  catDificultadDatosPersonaDesactivar(idcatDificultadDatosPersona: string): __Observable<string> {
    return this.catDificultadDatosPersonaDesactivarResponse(idcatDificultadDatosPersona).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catDisponibilidad
   * @param idcatDisponibilidad Identificador de catDisponibilidad
   * @return OK
   */
  catDisponibilidadObtenerResponse(idcatDisponibilidad: string): __Observable<__StrictHttpResponse<CatDisponibilidad>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatDisponibilidad != null) __params = __params.set('idcatDisponibilidad', idcatDisponibilidad.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catDisponibilidad`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatDisponibilidad>;
      })
    );
  }
  /**
   * Consultar registro de catDisponibilidad
   * @param idcatDisponibilidad Identificador de catDisponibilidad
   * @return OK
   */
  catDisponibilidadObtener(idcatDisponibilidad: string): __Observable<CatDisponibilidad> {
    return this.catDisponibilidadObtenerResponse(idcatDisponibilidad).pipe(
      __map(_r => _r.body as CatDisponibilidad)
    );
  }

  /**
   * Guardar o actualizar catDisponibilidad
   * @param catDisponibilidad catDisponibilidad
   * @return OK
   */
  catDisponibilidadGuardarOActualizarResponse(catDisponibilidad: CatDisponibilidad): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catDisponibilidad;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catDisponibilidad`,
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
   * Guardar o actualizar catDisponibilidad
   * @param catDisponibilidad catDisponibilidad
   * @return OK
   */
  catDisponibilidadGuardarOActualizar(catDisponibilidad: CatDisponibilidad): __Observable<string> {
    return this.catDisponibilidadGuardarOActualizarResponse(catDisponibilidad).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catDisponibilidad
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catDisponibilidadQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatDisponibilidad>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catDisponibilidad`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatDisponibilidad>;
      })
    );
  }
  /**
   * Consultar lista paginada de catDisponibilidad
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catDisponibilidadQueryResult(info: QueryInfo): __Observable<QueryResultCatDisponibilidad> {
    return this.catDisponibilidadQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatDisponibilidad)
    );
  }

  /**
   * Desactivar registro de catDisponibilidad
   * @param idcatDisponibilidad Identificador de registro de catDisponibilidad
   * @return OK
   */
  catDisponibilidadDesactivarResponse(idcatDisponibilidad: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatDisponibilidad != null) __params = __params.set('idcatDisponibilidad', idcatDisponibilidad.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catDisponibilidad`,
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
   * Desactivar registro de catDisponibilidad
   * @param idcatDisponibilidad Identificador de registro de catDisponibilidad
   * @return OK
   */
  catDisponibilidadDesactivar(idcatDisponibilidad: string): __Observable<string> {
    return this.catDisponibilidadDesactivarResponse(idcatDisponibilidad).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catDominioCorreoElectronico
   * @param idcatDominioCorreoElectronico Identificador de catDominioCorreoElectronico
   * @return OK
   */
  catDominioCorreoElectronicoObtenerResponse(idcatDominioCorreoElectronico: string): __Observable<__StrictHttpResponse<CatDominioCorreoElectronico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatDominioCorreoElectronico != null) __params = __params.set('idcatDominioCorreoElectronico', idcatDominioCorreoElectronico.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catDominioCorreoElectronico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatDominioCorreoElectronico>;
      })
    );
  }
  /**
   * Consultar registro de catDominioCorreoElectronico
   * @param idcatDominioCorreoElectronico Identificador de catDominioCorreoElectronico
   * @return OK
   */
  catDominioCorreoElectronicoObtener(idcatDominioCorreoElectronico: string): __Observable<CatDominioCorreoElectronico> {
    return this.catDominioCorreoElectronicoObtenerResponse(idcatDominioCorreoElectronico).pipe(
      __map(_r => _r.body as CatDominioCorreoElectronico)
    );
  }

  /**
   * Guardar o actualizar catDominioCorreoElectronico
   * @param catDominioCorreoElectronico catDominioCorreoElectronico
   * @return OK
   */
  catDominioCorreoElectronicoGuardarOActualizarResponse(catDominioCorreoElectronico: CatDominioCorreoElectronico): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catDominioCorreoElectronico;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catDominioCorreoElectronico`,
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
   * Guardar o actualizar catDominioCorreoElectronico
   * @param catDominioCorreoElectronico catDominioCorreoElectronico
   * @return OK
   */
  catDominioCorreoElectronicoGuardarOActualizar(catDominioCorreoElectronico: CatDominioCorreoElectronico): __Observable<string> {
    return this.catDominioCorreoElectronicoGuardarOActualizarResponse(catDominioCorreoElectronico).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catDominioCorreoElectronico
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catDominioCorreoElectronicoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatDominioCorreoElectronico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catDominioCorreoElectronico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatDominioCorreoElectronico>;
      })
    );
  }
  /**
   * Consultar lista paginada de catDominioCorreoElectronico
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catDominioCorreoElectronicoQueryResult(info: QueryInfo): __Observable<QueryResultCatDominioCorreoElectronico> {
    return this.catDominioCorreoElectronicoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatDominioCorreoElectronico)
    );
  }

  /**
   * Desactivar registro de catDominioCorreoElectronico
   * @param idcatDominioCorreoElectronico Identificador de registro de catDominioCorreoElectronico
   * @return OK
   */
  catDominioCorreoElectronicoDesactivarResponse(idcatDominioCorreoElectronico: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatDominioCorreoElectronico != null) __params = __params.set('idcatDominioCorreoElectronico', idcatDominioCorreoElectronico.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catDominioCorreoElectronico`,
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
   * Desactivar registro de catDominioCorreoElectronico
   * @param idcatDominioCorreoElectronico Identificador de registro de catDominioCorreoElectronico
   * @return OK
   */
  catDominioCorreoElectronicoDesactivar(idcatDominioCorreoElectronico: string): __Observable<string> {
    return this.catDominioCorreoElectronicoDesactivarResponse(idcatDominioCorreoElectronico).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catEstadoCotizacion
   * @param idcatEstadoCotizacion Identificador de catEstadoCotizacion
   * @return OK
   */
  catEstadoCotizacionObtenerResponse(idcatEstadoCotizacion: string): __Observable<__StrictHttpResponse<CatEstadoCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstadoCotizacion != null) __params = __params.set('idcatEstadoCotizacion', idcatEstadoCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catEstadoCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatEstadoCotizacion>;
      })
    );
  }
  /**
   * Consultar registro de catEstadoCotizacion
   * @param idcatEstadoCotizacion Identificador de catEstadoCotizacion
   * @return OK
   */
  catEstadoCotizacionObtener(idcatEstadoCotizacion: string): __Observable<CatEstadoCotizacion> {
    return this.catEstadoCotizacionObtenerResponse(idcatEstadoCotizacion).pipe(
      __map(_r => _r.body as CatEstadoCotizacion)
    );
  }

  /**
   * Guardar o actualizar catEstadoCotizacion
   * @param catEstadoCotizacion catEstadoCotizacion
   * @return OK
   */
  catEstadoCotizacionGuardarOActualizarResponse(catEstadoCotizacion: CatEstadoCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catEstadoCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catEstadoCotizacion`,
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
   * Guardar o actualizar catEstadoCotizacion
   * @param catEstadoCotizacion catEstadoCotizacion
   * @return OK
   */
  catEstadoCotizacionGuardarOActualizar(catEstadoCotizacion: CatEstadoCotizacion): __Observable<string> {
    return this.catEstadoCotizacionGuardarOActualizarResponse(catEstadoCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catEstadoCotizacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catEstadoCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatEstadoCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catEstadoCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatEstadoCotizacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catEstadoCotizacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catEstadoCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultCatEstadoCotizacion> {
    return this.catEstadoCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatEstadoCotizacion)
    );
  }

  /**
   * Desactivar registro de catEstadoCotizacion
   * @param idcatEstadoCotizacion Identificador de registro de catEstadoCotizacion
   * @return OK
   */
  catEstadoCotizacionDesactivarResponse(idcatEstadoCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstadoCotizacion != null) __params = __params.set('idcatEstadoCotizacion', idcatEstadoCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catEstadoCotizacion`,
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
   * Desactivar registro de catEstadoCotizacion
   * @param idcatEstadoCotizacion Identificador de registro de catEstadoCotizacion
   * @return OK
   */
  catEstadoCotizacionDesactivar(idcatEstadoCotizacion: string): __Observable<string> {
    return this.catEstadoCotizacionDesactivarResponse(idcatEstadoCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catEstadoFisico
   * @param idcatEstadoFisico Identificador de catEstadoFisico
   * @return OK
   */
  catEstadoFisicoObtenerResponse(idcatEstadoFisico: string): __Observable<__StrictHttpResponse<CatEstadoFisico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstadoFisico != null) __params = __params.set('idcatEstadoFisico', idcatEstadoFisico.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catEstadoFisico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatEstadoFisico>;
      })
    );
  }
  /**
   * Consultar registro de catEstadoFisico
   * @param idcatEstadoFisico Identificador de catEstadoFisico
   * @return OK
   */
  catEstadoFisicoObtener(idcatEstadoFisico: string): __Observable<CatEstadoFisico> {
    return this.catEstadoFisicoObtenerResponse(idcatEstadoFisico).pipe(
      __map(_r => _r.body as CatEstadoFisico)
    );
  }

  /**
   * Guardar o actualizar catEstadoFisico
   * @param catEstadoFisico catEstadoFisico
   * @return OK
   */
  catEstadoFisicoGuardarOActualizarResponse(catEstadoFisico: CatEstadoFisico): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catEstadoFisico;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catEstadoFisico`,
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
   * Guardar o actualizar catEstadoFisico
   * @param catEstadoFisico catEstadoFisico
   * @return OK
   */
  catEstadoFisicoGuardarOActualizar(catEstadoFisico: CatEstadoFisico): __Observable<string> {
    return this.catEstadoFisicoGuardarOActualizarResponse(catEstadoFisico).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catEstadoFisico
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catEstadoFisicoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatEstadoFisico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catEstadoFisico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatEstadoFisico>;
      })
    );
  }
  /**
   * Consultar lista paginada de catEstadoFisico
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catEstadoFisicoQueryResult(info: QueryInfo): __Observable<QueryResultCatEstadoFisico> {
    return this.catEstadoFisicoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatEstadoFisico)
    );
  }

  /**
   * Desactivar registro de catEstadoFisico
   * @param idcatEstadoFisico Identificador de registro de catEstadoFisico
   * @return OK
   */
  catEstadoFisicoDesactivarResponse(idcatEstadoFisico: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstadoFisico != null) __params = __params.set('idcatEstadoFisico', idcatEstadoFisico.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catEstadoFisico`,
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
   * Desactivar registro de catEstadoFisico
   * @param idcatEstadoFisico Identificador de registro de catEstadoFisico
   * @return OK
   */
  catEstadoFisicoDesactivar(idcatEstadoFisico: string): __Observable<string> {
    return this.catEstadoFisicoDesactivarResponse(idcatEstadoFisico).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catEstadoInvestigacion
   * @param idcatEstadoInvestigacion Identificador de catEstadoInvestigacion
   * @return OK
   */
  catEstadoInvestigacionObtenerResponse(idcatEstadoInvestigacion: string): __Observable<__StrictHttpResponse<CatEstadoInvestigacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstadoInvestigacion != null) __params = __params.set('idcatEstadoInvestigacion', idcatEstadoInvestigacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catEstadoInvestigacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatEstadoInvestigacion>;
      })
    );
  }
  /**
   * Consultar registro de catEstadoInvestigacion
   * @param idcatEstadoInvestigacion Identificador de catEstadoInvestigacion
   * @return OK
   */
  catEstadoInvestigacionObtener(idcatEstadoInvestigacion: string): __Observable<CatEstadoInvestigacion> {
    return this.catEstadoInvestigacionObtenerResponse(idcatEstadoInvestigacion).pipe(
      __map(_r => _r.body as CatEstadoInvestigacion)
    );
  }

  /**
   * Guardar o actualizar catEstadoInvestigacion
   * @param catEstadoInvestigacion catEstadoInvestigacion
   * @return OK
   */
  catEstadoInvestigacionGuardarOActualizarResponse(catEstadoInvestigacion: CatEstadoInvestigacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catEstadoInvestigacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catEstadoInvestigacion`,
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
   * Guardar o actualizar catEstadoInvestigacion
   * @param catEstadoInvestigacion catEstadoInvestigacion
   * @return OK
   */
  catEstadoInvestigacionGuardarOActualizar(catEstadoInvestigacion: CatEstadoInvestigacion): __Observable<string> {
    return this.catEstadoInvestigacionGuardarOActualizarResponse(catEstadoInvestigacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catEstadoInvestigacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catEstadoInvestigacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatEstadoInvestigacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catEstadoInvestigacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatEstadoInvestigacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catEstadoInvestigacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catEstadoInvestigacionQueryResult(info: QueryInfo): __Observable<QueryResultCatEstadoInvestigacion> {
    return this.catEstadoInvestigacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatEstadoInvestigacion)
    );
  }

  /**
   * Desactivar registro de catEstadoInvestigacion
   * @param idcatEstadoInvestigacion Identificador de registro de catEstadoInvestigacion
   * @return OK
   */
  catEstadoInvestigacionDesactivarResponse(idcatEstadoInvestigacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstadoInvestigacion != null) __params = __params.set('idcatEstadoInvestigacion', idcatEstadoInvestigacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catEstadoInvestigacion`,
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
   * Desactivar registro de catEstadoInvestigacion
   * @param idcatEstadoInvestigacion Identificador de registro de catEstadoInvestigacion
   * @return OK
   */
  catEstadoInvestigacionDesactivar(idcatEstadoInvestigacion: string): __Observable<string> {
    return this.catEstadoInvestigacionDesactivarResponse(idcatEstadoInvestigacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catEstadoPartidaPedido
   * @param idcatEstadoPartidaPedido undefined
   * @return OK
   */
  catEstadoPartidaPedidoObtenerResponse(idcatEstadoPartidaPedido: string): __Observable<__StrictHttpResponse<CatEstadoPartidaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstadoPartidaPedido != null) __params = __params.set('idcatEstadoPartidaPedido', idcatEstadoPartidaPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catEstadoPartidaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatEstadoPartidaPedido>;
      })
    );
  }
  /**
   * Obtener catEstadoPartidaPedido
   * @param idcatEstadoPartidaPedido undefined
   * @return OK
   */
  catEstadoPartidaPedidoObtener(idcatEstadoPartidaPedido: string): __Observable<CatEstadoPartidaPedido> {
    return this.catEstadoPartidaPedidoObtenerResponse(idcatEstadoPartidaPedido).pipe(
      __map(_r => _r.body as CatEstadoPartidaPedido)
    );
  }

  /**
   * GuardarOActualizar catEstadoPartidaPedido
   * @param catEstadoPartidaPedido undefined
   * @return OK
   */
  catEstadoPartidaPedidoGuardarOActualizarResponse(catEstadoPartidaPedido: CatEstadoPartidaPedido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catEstadoPartidaPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catEstadoPartidaPedido`,
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
   * GuardarOActualizar catEstadoPartidaPedido
   * @param catEstadoPartidaPedido undefined
   * @return OK
   */
  catEstadoPartidaPedidoGuardarOActualizar(catEstadoPartidaPedido: CatEstadoPartidaPedido): __Observable<string> {
    return this.catEstadoPartidaPedidoGuardarOActualizarResponse(catEstadoPartidaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult catEstadoPartidaPedido
   * @param info undefined
   * @return OK
   */
  catEstadoPartidaPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatEstadoPartidaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catEstadoPartidaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatEstadoPartidaPedido>;
      })
    );
  }
  /**
   * QueryResult catEstadoPartidaPedido
   * @param info undefined
   * @return OK
   */
  catEstadoPartidaPedidoQueryResult(info: QueryInfo): __Observable<QueryResultCatEstadoPartidaPedido> {
    return this.catEstadoPartidaPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatEstadoPartidaPedido)
    );
  }

  /**
   * Desactivar catEstadoPartidaPedido
   * @param idcatEstadoPartidaPedido undefined
   * @return OK
   */
  catEstadoPartidaPedidoDesactivarResponse(idcatEstadoPartidaPedido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstadoPartidaPedido != null) __params = __params.set('idcatEstadoPartidaPedido', idcatEstadoPartidaPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catEstadoPartidaPedido`,
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
   * Desactivar catEstadoPartidaPedido
   * @param idcatEstadoPartidaPedido undefined
   * @return OK
   */
  catEstadoPartidaPedidoDesactivar(idcatEstadoPartidaPedido: string): __Observable<string> {
    return this.catEstadoPartidaPedidoDesactivarResponse(idcatEstadoPartidaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catEstadoPedido
   * @param IdcatEstadoPedido undefined
   * @return OK
   */
  catEstadoPedidoObtenerResponse(IdcatEstadoPedido: string): __Observable<__StrictHttpResponse<CatEstadoPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdcatEstadoPedido != null) __params = __params.set('IdcatEstadoPedido', IdcatEstadoPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catEstadoPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatEstadoPedido>;
      })
    );
  }
  /**
   * Obtener catEstadoPedido
   * @param IdcatEstadoPedido undefined
   * @return OK
   */
  catEstadoPedidoObtener(IdcatEstadoPedido: string): __Observable<CatEstadoPedido> {
    return this.catEstadoPedidoObtenerResponse(IdcatEstadoPedido).pipe(
      __map(_r => _r.body as CatEstadoPedido)
    );
  }

  /**
   * GuardarOActualizar catEstadoPedido
   * @param catEstadoPedido undefined
   * @return OK
   */
  catEstadoPedidoGuardarOActualizarResponse(catEstadoPedido: CatEstadoPedido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catEstadoPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catEstadoPedido`,
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
   * GuardarOActualizar catEstadoPedido
   * @param catEstadoPedido undefined
   * @return OK
   */
  catEstadoPedidoGuardarOActualizar(catEstadoPedido: CatEstadoPedido): __Observable<string> {
    return this.catEstadoPedidoGuardarOActualizarResponse(catEstadoPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult catEstadoPedido
   * @param info undefined
   * @return OK
   */
  catEstadoPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatEstadoPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catEstadoPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatEstadoPedido>;
      })
    );
  }
  /**
   * QueryResult catEstadoPedido
   * @param info undefined
   * @return OK
   */
  catEstadoPedidoQueryResult(info: QueryInfo): __Observable<QueryResultCatEstadoPedido> {
    return this.catEstadoPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatEstadoPedido)
    );
  }

  /**
   * Desactivar catEstadoPedido
   * @param idcatEstadoPedido undefined
   * @return OK
   */
  catEstadoPedidoDesactivarResponse(idcatEstadoPedido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstadoPedido != null) __params = __params.set('idcatEstadoPedido', idcatEstadoPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catEstadoPedido`,
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
   * Desactivar catEstadoPedido
   * @param idcatEstadoPedido undefined
   * @return OK
   */
  catEstadoPedidoDesactivar(idcatEstadoPedido: string): __Observable<string> {
    return this.catEstadoPedidoDesactivarResponse(idcatEstadoPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catEstadoPretramitacionPedido
   * @param idcatEstadoPretramitacionPedido Identificador de catEstadoPretramitacionPedido
   * @return OK
   */
  catEstadoPretramitacionPedidoObtenerResponse(idcatEstadoPretramitacionPedido: string): __Observable<__StrictHttpResponse<CatEstadoPretramitacionPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstadoPretramitacionPedido != null) __params = __params.set('idcatEstadoPretramitacionPedido', idcatEstadoPretramitacionPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catEstadoPretramitacionPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatEstadoPretramitacionPedido>;
      })
    );
  }
  /**
   * Consultar registro de catEstadoPretramitacionPedido
   * @param idcatEstadoPretramitacionPedido Identificador de catEstadoPretramitacionPedido
   * @return OK
   */
  catEstadoPretramitacionPedidoObtener(idcatEstadoPretramitacionPedido: string): __Observable<CatEstadoPretramitacionPedido> {
    return this.catEstadoPretramitacionPedidoObtenerResponse(idcatEstadoPretramitacionPedido).pipe(
      __map(_r => _r.body as CatEstadoPretramitacionPedido)
    );
  }

  /**
   * Guardar o actualizar catEstadoPretramitacionPedido
   * @param catEstadoPretramitacionPedido catEstadoPretramitacionPedido
   * @return OK
   */
  catEstadoPretramitacionPedidoGuardarOActualizarResponse(catEstadoPretramitacionPedido: CatEstadoPretramitacionPedido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catEstadoPretramitacionPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catEstadoPretramitacionPedido`,
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
   * Guardar o actualizar catEstadoPretramitacionPedido
   * @param catEstadoPretramitacionPedido catEstadoPretramitacionPedido
   * @return OK
   */
  catEstadoPretramitacionPedidoGuardarOActualizar(catEstadoPretramitacionPedido: CatEstadoPretramitacionPedido): __Observable<string> {
    return this.catEstadoPretramitacionPedidoGuardarOActualizarResponse(catEstadoPretramitacionPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catEstadoPretramitacionPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catEstadoPretramitacionPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatEstadoPretramitacionPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catEstadoPretramitacionPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatEstadoPretramitacionPedido>;
      })
    );
  }
  /**
   * Consultar lista paginada de catEstadoPretramitacionPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catEstadoPretramitacionPedidoQueryResult(info: QueryInfo): __Observable<QueryResultCatEstadoPretramitacionPedido> {
    return this.catEstadoPretramitacionPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatEstadoPretramitacionPedido)
    );
  }

  /**
   * Desactivar registro de catEstadoPretramitacionPedido
   * @param idcatEstadoPretramitacionPedido Identificador de registro de catEstadoPretramitacionPedido
   * @return OK
   */
  catEstadoPretramitacionPedidoDesactivarResponse(idcatEstadoPretramitacionPedido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstadoPretramitacionPedido != null) __params = __params.set('idcatEstadoPretramitacionPedido', idcatEstadoPretramitacionPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catEstadoPretramitacionPedido`,
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
   * Desactivar registro de catEstadoPretramitacionPedido
   * @param idcatEstadoPretramitacionPedido Identificador de registro de catEstadoPretramitacionPedido
   * @return OK
   */
  catEstadoPretramitacionPedidoDesactivar(idcatEstadoPretramitacionPedido: string): __Observable<string> {
    return this.catEstadoPretramitacionPedidoDesactivarResponse(idcatEstadoPretramitacionPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catEstrategiaCotizacion
   * @param idcatEstrategiaCotizacion Identificador de catEstrategiaCotizacion
   * @return OK
   */
  catEstrategiaCotizacionObtenerResponse(idcatEstrategiaCotizacion: string): __Observable<__StrictHttpResponse<CatEstrategiaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstrategiaCotizacion != null) __params = __params.set('idcatEstrategiaCotizacion', idcatEstrategiaCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catEstrategiaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatEstrategiaCotizacion>;
      })
    );
  }
  /**
   * Consultar registro de catEstrategiaCotizacion
   * @param idcatEstrategiaCotizacion Identificador de catEstrategiaCotizacion
   * @return OK
   */
  catEstrategiaCotizacionObtener(idcatEstrategiaCotizacion: string): __Observable<CatEstrategiaCotizacion> {
    return this.catEstrategiaCotizacionObtenerResponse(idcatEstrategiaCotizacion).pipe(
      __map(_r => _r.body as CatEstrategiaCotizacion)
    );
  }

  /**
   * Guardar o actualizar catEstrategiaCotizacion
   * @param catEstrategiaCotizacion catEstrategiaCotizacion
   * @return OK
   */
  catEstrategiaCotizacionGuardarOActualizarResponse(catEstrategiaCotizacion: CatEstrategiaCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catEstrategiaCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catEstrategiaCotizacion`,
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
   * Guardar o actualizar catEstrategiaCotizacion
   * @param catEstrategiaCotizacion catEstrategiaCotizacion
   * @return OK
   */
  catEstrategiaCotizacionGuardarOActualizar(catEstrategiaCotizacion: CatEstrategiaCotizacion): __Observable<string> {
    return this.catEstrategiaCotizacionGuardarOActualizarResponse(catEstrategiaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catEstrategiaCotizacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catEstrategiaCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatEstrategiaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catEstrategiaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatEstrategiaCotizacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catEstrategiaCotizacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catEstrategiaCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultCatEstrategiaCotizacion> {
    return this.catEstrategiaCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatEstrategiaCotizacion)
    );
  }

  /**
   * Desactivar registro de catEstrategiaCotizacion
   * @param idcatEstrategiaCotizacion Identificador de registro de catEstrategiaCotizacion
   * @return OK
   */
  catEstrategiaCotizacionDesactivarResponse(idcatEstrategiaCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatEstrategiaCotizacion != null) __params = __params.set('idcatEstrategiaCotizacion', idcatEstrategiaCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catEstrategiaCotizacion`,
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
   * Desactivar registro de catEstrategiaCotizacion
   * @param idcatEstrategiaCotizacion Identificador de registro de catEstrategiaCotizacion
   * @return OK
   */
  catEstrategiaCotizacionDesactivar(idcatEstrategiaCotizacion: string): __Observable<string> {
    return this.catEstrategiaCotizacionDesactivarResponse(idcatEstrategiaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catEstrategiaCotizacionSubtactica
   * @param idCatEstrategiaCotizacionSubtactica undefined
   * @return OK
   */
  catEstrategiaCotizacionSubtacticaObtenerResponse(idCatEstrategiaCotizacionSubtactica: string): __Observable<__StrictHttpResponse<CatEstrategiaCotizacionSubtactica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatEstrategiaCotizacionSubtactica != null) __params = __params.set('idCatEstrategiaCotizacionSubtactica', idCatEstrategiaCotizacionSubtactica.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catEstrategiaCotizacionSubtactica`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatEstrategiaCotizacionSubtactica>;
      })
    );
  }
  /**
   * Obtener catEstrategiaCotizacionSubtactica
   * @param idCatEstrategiaCotizacionSubtactica undefined
   * @return OK
   */
  catEstrategiaCotizacionSubtacticaObtener(idCatEstrategiaCotizacionSubtactica: string): __Observable<CatEstrategiaCotizacionSubtactica> {
    return this.catEstrategiaCotizacionSubtacticaObtenerResponse(idCatEstrategiaCotizacionSubtactica).pipe(
      __map(_r => _r.body as CatEstrategiaCotizacionSubtactica)
    );
  }

  /**
   * GuardarOActualizar catEstrategiaCotizacionSubtactica
   * @param catEstrategiaCotizacionSubtactica undefined
   * @return OK
   */
  catEstrategiaCotizacionSubtacticaGuardarOActualizarResponse(catEstrategiaCotizacionSubtactica: CatEstrategiaCotizacionSubtactica): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catEstrategiaCotizacionSubtactica;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catEstrategiaCotizacionSubtactica`,
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
   * GuardarOActualizar catEstrategiaCotizacionSubtactica
   * @param catEstrategiaCotizacionSubtactica undefined
   * @return OK
   */
  catEstrategiaCotizacionSubtacticaGuardarOActualizar(catEstrategiaCotizacionSubtactica: CatEstrategiaCotizacionSubtactica): __Observable<string> {
    return this.catEstrategiaCotizacionSubtacticaGuardarOActualizarResponse(catEstrategiaCotizacionSubtactica).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult catEstrategiaCotizacionSubtactica
   * @param info undefined
   * @return OK
   */
  catEstrategiaCotizacionSubtacticaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatEstrategiaCotizacionSubtactica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catEstrategiaCotizacionSubtactica`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatEstrategiaCotizacionSubtactica>;
      })
    );
  }
  /**
   * QueryResult catEstrategiaCotizacionSubtactica
   * @param info undefined
   * @return OK
   */
  catEstrategiaCotizacionSubtacticaQueryResult(info: QueryInfo): __Observable<QueryResultCatEstrategiaCotizacionSubtactica> {
    return this.catEstrategiaCotizacionSubtacticaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatEstrategiaCotizacionSubtactica)
    );
  }

  /**
   * Desactivar catEstrategiaCotizacionSubtactica
   * @param idCatEstrategiaCotizacionSubtactica undefined
   * @return OK
   */
  catEstrategiaCotizacionSubtacticaDesactivarResponse(idCatEstrategiaCotizacionSubtactica: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatEstrategiaCotizacionSubtactica != null) __params = __params.set('idCatEstrategiaCotizacionSubtactica', idCatEstrategiaCotizacionSubtactica.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catEstrategiaCotizacionSubtactica`,
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
   * Desactivar catEstrategiaCotizacionSubtactica
   * @param idCatEstrategiaCotizacionSubtactica undefined
   * @return OK
   */
  catEstrategiaCotizacionSubtacticaDesactivar(idCatEstrategiaCotizacionSubtactica: string): __Observable<string> {
    return this.catEstrategiaCotizacionSubtacticaDesactivarResponse(idCatEstrategiaCotizacionSubtactica).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catEstrategiaCotizacionTactica
   * @param idCatEstrategiaCotizacionTactica undefined
   * @return OK
   */
  catEstrategiaCotizacionTacticaObtenerResponse(idCatEstrategiaCotizacionTactica: string): __Observable<__StrictHttpResponse<CatEstrategiaCotizacionTactica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatEstrategiaCotizacionTactica != null) __params = __params.set('idCatEstrategiaCotizacionTactica', idCatEstrategiaCotizacionTactica.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catEstrategiaCotizacionTactica`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatEstrategiaCotizacionTactica>;
      })
    );
  }
  /**
   * Obtener catEstrategiaCotizacionTactica
   * @param idCatEstrategiaCotizacionTactica undefined
   * @return OK
   */
  catEstrategiaCotizacionTacticaObtener(idCatEstrategiaCotizacionTactica: string): __Observable<CatEstrategiaCotizacionTactica> {
    return this.catEstrategiaCotizacionTacticaObtenerResponse(idCatEstrategiaCotizacionTactica).pipe(
      __map(_r => _r.body as CatEstrategiaCotizacionTactica)
    );
  }

  /**
   * GuardarOActualizar catEstrategiaCotizacionTactica
   * @param catEstrategiaCotizacionTactica undefined
   * @return OK
   */
  catEstrategiaCotizacionTacticaGuardarOActualizarResponse(catEstrategiaCotizacionTactica: CatEstrategiaCotizacionTactica): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catEstrategiaCotizacionTactica;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catEstrategiaCotizacionTactica`,
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
   * GuardarOActualizar catEstrategiaCotizacionTactica
   * @param catEstrategiaCotizacionTactica undefined
   * @return OK
   */
  catEstrategiaCotizacionTacticaGuardarOActualizar(catEstrategiaCotizacionTactica: CatEstrategiaCotizacionTactica): __Observable<string> {
    return this.catEstrategiaCotizacionTacticaGuardarOActualizarResponse(catEstrategiaCotizacionTactica).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult catEstrategiaCotizacionTactica
   * @param info undefined
   * @return OK
   */
  catEstrategiaCotizacionTacticaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatEstrategiaCotizacionTactica>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catEstrategiaCotizacionTactica`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatEstrategiaCotizacionTactica>;
      })
    );
  }
  /**
   * QueryResult catEstrategiaCotizacionTactica
   * @param info undefined
   * @return OK
   */
  catEstrategiaCotizacionTacticaQueryResult(info: QueryInfo): __Observable<QueryResultCatEstrategiaCotizacionTactica> {
    return this.catEstrategiaCotizacionTacticaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatEstrategiaCotizacionTactica)
    );
  }

  /**
   * Desactivar catEstrategiaCotizacionTactica
   * @param idCatEstrategiaCotizacionTactica undefined
   * @return OK
   */
  catEstrategiaCotizacionTacticaDesactivarResponse(idCatEstrategiaCotizacionTactica: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatEstrategiaCotizacionTactica != null) __params = __params.set('idCatEstrategiaCotizacionTactica', idCatEstrategiaCotizacionTactica.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catEstrategiaCotizacionTactica`,
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
   * Desactivar catEstrategiaCotizacionTactica
   * @param idCatEstrategiaCotizacionTactica undefined
   * @return OK
   */
  catEstrategiaCotizacionTacticaDesactivar(idCatEstrategiaCotizacionTactica: string): __Observable<string> {
    return this.catEstrategiaCotizacionTacticaDesactivarResponse(idCatEstrategiaCotizacionTactica).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catFletera
   * @param idcatFletera Identificador de catFletera
   * @return OK
   */
  catFleteraObtenerResponse(idcatFletera: string): __Observable<__StrictHttpResponse<CatFletera>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatFletera != null) __params = __params.set('idcatFletera', idcatFletera.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catFletera`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatFletera>;
      })
    );
  }
  /**
   * Consultar registro de catFletera
   * @param idcatFletera Identificador de catFletera
   * @return OK
   */
  catFleteraObtener(idcatFletera: string): __Observable<CatFletera> {
    return this.catFleteraObtenerResponse(idcatFletera).pipe(
      __map(_r => _r.body as CatFletera)
    );
  }

  /**
   * Guardar o actualizar catFletera
   * @param catFletera catFletera
   * @return OK
   */
  catFleteraGuardarOActualizarResponse(catFletera: CatFletera): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catFletera;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catFletera`,
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
   * Guardar o actualizar catFletera
   * @param catFletera catFletera
   * @return OK
   */
  catFleteraGuardarOActualizar(catFletera: CatFletera): __Observable<string> {
    return this.catFleteraGuardarOActualizarResponse(catFletera).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catFletera
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catFleteraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatFletera>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catFletera`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatFletera>;
      })
    );
  }
  /**
   * Consultar lista paginada de catFletera
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catFleteraQueryResult(info: QueryInfo): __Observable<QueryResultCatFletera> {
    return this.catFleteraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatFletera)
    );
  }

  /**
   * Desactivar registro de catFletera
   * @param idcatFletera Identificador de registro de catFletera
   * @return OK
   */
  catFleteraDesactivarResponse(idcatFletera: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatFletera != null) __params = __params.set('idcatFletera', idcatFletera.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catFletera`,
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
   * Desactivar registro de catFletera
   * @param idcatFletera Identificador de registro de catFletera
   * @return OK
   */
  catFleteraDesactivar(idcatFletera: string): __Observable<string> {
    return this.catFleteraDesactivarResponse(idcatFletera).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catFormatoPublicacion
   * @param idcatFormatoPublicacion Identificador de catFormatoPublicacion
   * @return OK
   */
  catFormatoPublicacionObtenerResponse(idcatFormatoPublicacion: string): __Observable<__StrictHttpResponse<CatFormatoPublicacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatFormatoPublicacion != null) __params = __params.set('idcatFormatoPublicacion', idcatFormatoPublicacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catFormatoPublicacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatFormatoPublicacion>;
      })
    );
  }
  /**
   * Consultar registro de catFormatoPublicacion
   * @param idcatFormatoPublicacion Identificador de catFormatoPublicacion
   * @return OK
   */
  catFormatoPublicacionObtener(idcatFormatoPublicacion: string): __Observable<CatFormatoPublicacion> {
    return this.catFormatoPublicacionObtenerResponse(idcatFormatoPublicacion).pipe(
      __map(_r => _r.body as CatFormatoPublicacion)
    );
  }

  /**
   * Guardar o actualizar catFormatoPublicacion
   * @param catFormatoPublicacion catFormatoPublicacion
   * @return OK
   */
  catFormatoPublicacionGuardarOActualizarResponse(catFormatoPublicacion: CatFormatoPublicacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catFormatoPublicacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catFormatoPublicacion`,
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
   * Guardar o actualizar catFormatoPublicacion
   * @param catFormatoPublicacion catFormatoPublicacion
   * @return OK
   */
  catFormatoPublicacionGuardarOActualizar(catFormatoPublicacion: CatFormatoPublicacion): __Observable<string> {
    return this.catFormatoPublicacionGuardarOActualizarResponse(catFormatoPublicacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catFormatoPublicacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catFormatoPublicacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatFormatoPublicacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catFormatoPublicacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatFormatoPublicacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catFormatoPublicacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catFormatoPublicacionQueryResult(info: QueryInfo): __Observable<QueryResultCatFormatoPublicacion> {
    return this.catFormatoPublicacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatFormatoPublicacion)
    );
  }

  /**
   * Desactivar registro de catFormatoPublicacion
   * @param idcatFormatoPublicacion Identificador de registro de catFormatoPublicacion
   * @return OK
   */
  catFormatoPublicacionDesactivarResponse(idcatFormatoPublicacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatFormatoPublicacion != null) __params = __params.set('idcatFormatoPublicacion', idcatFormatoPublicacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catFormatoPublicacion`,
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
   * Desactivar registro de catFormatoPublicacion
   * @param idcatFormatoPublicacion Identificador de registro de catFormatoPublicacion
   * @return OK
   */
  catFormatoPublicacionDesactivar(idcatFormatoPublicacion: string): __Observable<string> {
    return this.catFormatoPublicacionDesactivarResponse(idcatFormatoPublicacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catImportanciaCliente
   * @param idcatImportanciaCliente Identificador de catImportanciaCliente
   * @return OK
   */
  catImportanciaClienteObtenerResponse(idcatImportanciaCliente: string): __Observable<__StrictHttpResponse<CatImportanciaCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatImportanciaCliente != null) __params = __params.set('idcatImportanciaCliente', idcatImportanciaCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catImportanciaCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatImportanciaCliente>;
      })
    );
  }
  /**
   * Consultar registro de catImportanciaCliente
   * @param idcatImportanciaCliente Identificador de catImportanciaCliente
   * @return OK
   */
  catImportanciaClienteObtener(idcatImportanciaCliente: string): __Observable<CatImportanciaCliente> {
    return this.catImportanciaClienteObtenerResponse(idcatImportanciaCliente).pipe(
      __map(_r => _r.body as CatImportanciaCliente)
    );
  }

  /**
   * Guardar o actualizar catImportanciaCliente
   * @param catImportanciaCliente catImportanciaCliente
   * @return OK
   */
  catImportanciaClienteGuardarOActualizarResponse(catImportanciaCliente: CatImportanciaCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catImportanciaCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catImportanciaCliente`,
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
   * Guardar o actualizar catImportanciaCliente
   * @param catImportanciaCliente catImportanciaCliente
   * @return OK
   */
  catImportanciaClienteGuardarOActualizar(catImportanciaCliente: CatImportanciaCliente): __Observable<string> {
    return this.catImportanciaClienteGuardarOActualizarResponse(catImportanciaCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catImportanciaCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catImportanciaClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatImportanciaCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catImportanciaCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatImportanciaCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de catImportanciaCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catImportanciaClienteQueryResult(info: QueryInfo): __Observable<QueryResultCatImportanciaCliente> {
    return this.catImportanciaClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatImportanciaCliente)
    );
  }

  /**
   * Desactivar registro de catImportanciaCliente
   * @param idcatImportanciaCliente Identificador de registro de catImportanciaCliente
   * @return OK
   */
  catImportanciaClienteDesactivarResponse(idcatImportanciaCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatImportanciaCliente != null) __params = __params.set('idcatImportanciaCliente', idcatImportanciaCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catImportanciaCliente`,
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
   * Desactivar registro de catImportanciaCliente
   * @param idcatImportanciaCliente Identificador de registro de catImportanciaCliente
   * @return OK
   */
  catImportanciaClienteDesactivar(idcatImportanciaCliente: string): __Observable<string> {
    return this.catImportanciaClienteDesactivarResponse(idcatImportanciaCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catIncoterm
   * @param idcatIncoterm Identificador de catIncoterm
   * @return OK
   */
  catIncotermObtenerResponse(idcatIncoterm: string): __Observable<__StrictHttpResponse<CatIncoterm>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatIncoterm != null) __params = __params.set('idcatIncoterm', idcatIncoterm.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catIncoterm`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatIncoterm>;
      })
    );
  }
  /**
   * Consultar registro de catIncoterm
   * @param idcatIncoterm Identificador de catIncoterm
   * @return OK
   */
  catIncotermObtener(idcatIncoterm: string): __Observable<CatIncoterm> {
    return this.catIncotermObtenerResponse(idcatIncoterm).pipe(
      __map(_r => _r.body as CatIncoterm)
    );
  }

  /**
   * Guardar o actualizar catIncoterm
   * @param catIncoterm catIncoterm
   * @return OK
   */
  catIncotermGuardarOActualizarResponse(catIncoterm: CatIncoterm): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catIncoterm;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catIncoterm`,
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
   * Guardar o actualizar catIncoterm
   * @param catIncoterm catIncoterm
   * @return OK
   */
  catIncotermGuardarOActualizar(catIncoterm: CatIncoterm): __Observable<string> {
    return this.catIncotermGuardarOActualizarResponse(catIncoterm).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catIncoterm
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catIncotermQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatIncoterm>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catIncoterm`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatIncoterm>;
      })
    );
  }
  /**
   * Consultar lista paginada de catIncoterm
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catIncotermQueryResult(info: QueryInfo): __Observable<QueryResultCatIncoterm> {
    return this.catIncotermQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatIncoterm)
    );
  }

  /**
   * Desactivar registro de catIncoterm
   * @param idcatIncoterm Identificador de registro de catIncoterm
   * @return OK
   */
  catIncotermDesactivarResponse(idcatIncoterm: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatIncoterm != null) __params = __params.set('idcatIncoterm', idcatIncoterm.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catIncoterm`,
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
   * Desactivar registro de catIncoterm
   * @param idcatIncoterm Identificador de registro de catIncoterm
   * @return OK
   */
  catIncotermDesactivar(idcatIncoterm: string): __Observable<string> {
    return this.catIncotermDesactivarResponse(idcatIncoterm).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catIndustria
   * @param idcatIndustria Identificador de catIndustria
   * @return OK
   */
  catIndustriaObtenerResponse(idcatIndustria: string): __Observable<__StrictHttpResponse<CatIndustria>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatIndustria != null) __params = __params.set('idcatIndustria', idcatIndustria.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catIndustria`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatIndustria>;
      })
    );
  }
  /**
   * Consultar registro de catIndustria
   * @param idcatIndustria Identificador de catIndustria
   * @return OK
   */
  catIndustriaObtener(idcatIndustria: string): __Observable<CatIndustria> {
    return this.catIndustriaObtenerResponse(idcatIndustria).pipe(
      __map(_r => _r.body as CatIndustria)
    );
  }

  /**
   * Guardar o actualizar catIndustria
   * @param catIndustria catIndustria
   * @return OK
   */
  catIndustriaGuardarOActualizarResponse(catIndustria: CatIndustria): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catIndustria;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catIndustria`,
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
   * Guardar o actualizar catIndustria
   * @param catIndustria catIndustria
   * @return OK
   */
  catIndustriaGuardarOActualizar(catIndustria: CatIndustria): __Observable<string> {
    return this.catIndustriaGuardarOActualizarResponse(catIndustria).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catIndustria
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catIndustriaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatIndustria>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catIndustria`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatIndustria>;
      })
    );
  }
  /**
   * Consultar lista paginada de catIndustria
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catIndustriaQueryResult(info: QueryInfo): __Observable<QueryResultCatIndustria> {
    return this.catIndustriaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatIndustria)
    );
  }

  /**
   * Desactivar registro de catIndustria
   * @param idcatIndustria Identificador de registro de catIndustria
   * @return OK
   */
  catIndustriaDesactivarResponse(idcatIndustria: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatIndustria != null) __params = __params.set('idcatIndustria', idcatIndustria.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catIndustria`,
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
   * Desactivar registro de catIndustria
   * @param idcatIndustria Identificador de registro de catIndustria
   * @return OK
   */
  catIndustriaDesactivar(idcatIndustria: string): __Observable<string> {
    return this.catIndustriaDesactivarResponse(idcatIndustria).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catLinea
   * @param idcatLinea Identificador de catLinea
   * @return OK
   */
  catLineaObtenerResponse(idcatLinea: string): __Observable<__StrictHttpResponse<CatLinea>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatLinea != null) __params = __params.set('idcatLinea', idcatLinea.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catLinea`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatLinea>;
      })
    );
  }
  /**
   * Consultar registro de catLinea
   * @param idcatLinea Identificador de catLinea
   * @return OK
   */
  catLineaObtener(idcatLinea: string): __Observable<CatLinea> {
    return this.catLineaObtenerResponse(idcatLinea).pipe(
      __map(_r => _r.body as CatLinea)
    );
  }

  /**
   * Guardar o actualizar catLinea
   * @param catLinea catLinea
   * @return OK
   */
  catLineaGuardarOActualizarResponse(catLinea: CatLinea): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catLinea;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catLinea`,
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
   * Guardar o actualizar catLinea
   * @param catLinea catLinea
   * @return OK
   */
  catLineaGuardarOActualizar(catLinea: CatLinea): __Observable<string> {
    return this.catLineaGuardarOActualizarResponse(catLinea).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catLinea
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catLineaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatLinea>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catLinea`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatLinea>;
      })
    );
  }
  /**
   * Consultar lista paginada de catLinea
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catLineaQueryResult(info: QueryInfo): __Observable<QueryResultCatLinea> {
    return this.catLineaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatLinea)
    );
  }

  /**
   * Desactivar registro de catLinea
   * @param idcatLinea Identificador de registro de catLinea
   * @return OK
   */
  catLineaDesactivarResponse(idcatLinea: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatLinea != null) __params = __params.set('idcatLinea', idcatLinea.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catLinea`,
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
   * Desactivar registro de catLinea
   * @param idcatLinea Identificador de registro de catLinea
   * @return OK
   */
  catLineaDesactivar(idcatLinea: string): __Observable<string> {
    return this.catLineaDesactivarResponse(idcatLinea).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catLugarDespacho
   * @param idcatLugarDespacho Identificador de catLugarDespacho
   * @return OK
   */
  catLugarDespachoObtenerResponse(idcatLugarDespacho: string): __Observable<__StrictHttpResponse<CatLugarDespacho>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatLugarDespacho != null) __params = __params.set('idcatLugarDespacho', idcatLugarDespacho.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catLugarDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatLugarDespacho>;
      })
    );
  }
  /**
   * Consultar registro de catLugarDespacho
   * @param idcatLugarDespacho Identificador de catLugarDespacho
   * @return OK
   */
  catLugarDespachoObtener(idcatLugarDespacho: string): __Observable<CatLugarDespacho> {
    return this.catLugarDespachoObtenerResponse(idcatLugarDespacho).pipe(
      __map(_r => _r.body as CatLugarDespacho)
    );
  }

  /**
   * Guardar o actualizar catLugarDespacho
   * @param catLugarDespacho catLugarDespacho
   * @return OK
   */
  catLugarDespachoGuardarOActualizarResponse(catLugarDespacho: CatLugarDespacho): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catLugarDespacho;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catLugarDespacho`,
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
   * Guardar o actualizar catLugarDespacho
   * @param catLugarDespacho catLugarDespacho
   * @return OK
   */
  catLugarDespachoGuardarOActualizar(catLugarDespacho: CatLugarDespacho): __Observable<string> {
    return this.catLugarDespachoGuardarOActualizarResponse(catLugarDespacho).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catLugarDespacho
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catLugarDespachoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatLugarDespacho>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catLugarDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatLugarDespacho>;
      })
    );
  }
  /**
   * Consultar lista paginada de catLugarDespacho
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catLugarDespachoQueryResult(info: QueryInfo): __Observable<QueryResultCatLugarDespacho> {
    return this.catLugarDespachoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatLugarDespacho)
    );
  }

  /**
   * Desactivar registro de catLugarDespacho
   * @param idcatLugarDespacho Identificador de registro de catLugarDespacho
   * @return OK
   */
  catLugarDespachoDesactivarResponse(idcatLugarDespacho: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatLugarDespacho != null) __params = __params.set('idcatLugarDespacho', idcatLugarDespacho.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catLugarDespacho`,
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
   * Desactivar registro de catLugarDespacho
   * @param idcatLugarDespacho Identificador de registro de catLugarDespacho
   * @return OK
   */
  catLugarDespachoDesactivar(idcatLugarDespacho: string): __Observable<string> {
    return this.catLugarDespachoDesactivarResponse(idcatLugarDespacho).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catManejo
   * @param idcatManejo Identificador de catManejo
   * @return OK
   */
  catManejoObtenerResponse(idcatManejo: string): __Observable<__StrictHttpResponse<CatManejo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatManejo != null) __params = __params.set('idcatManejo', idcatManejo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catManejo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatManejo>;
      })
    );
  }
  /**
   * Consultar registro de catManejo
   * @param idcatManejo Identificador de catManejo
   * @return OK
   */
  catManejoObtener(idcatManejo: string): __Observable<CatManejo> {
    return this.catManejoObtenerResponse(idcatManejo).pipe(
      __map(_r => _r.body as CatManejo)
    );
  }

  /**
   * Guardar o actualizar catManejo
   * @param catManejo catManejo
   * @return OK
   */
  catManejoGuardarOActualizarResponse(catManejo: CatManejo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catManejo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catManejo`,
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
   * Guardar o actualizar catManejo
   * @param catManejo catManejo
   * @return OK
   */
  catManejoGuardarOActualizar(catManejo: CatManejo): __Observable<string> {
    return this.catManejoGuardarOActualizarResponse(catManejo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catManejo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catManejoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatManejo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catManejo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatManejo>;
      })
    );
  }
  /**
   * Consultar lista paginada de catManejo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catManejoQueryResult(info: QueryInfo): __Observable<QueryResultCatManejo> {
    return this.catManejoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatManejo)
    );
  }

  /**
   * Desactivar registro de catManejo
   * @param idcatManejo Identificador de registro de catManejo
   * @return OK
   */
  catManejoDesactivarResponse(idcatManejo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatManejo != null) __params = __params.set('idcatManejo', idcatManejo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catManejo`,
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
   * Desactivar registro de catManejo
   * @param idcatManejo Identificador de registro de catManejo
   * @return OK
   */
  catManejoDesactivar(idcatManejo: string): __Observable<string> {
    return this.catManejoDesactivarResponse(idcatManejo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catMantenimientoDatosPersona
   * @param idcatMantenimientoDatosPersona Identificador de catMantenimientoDatosPersona
   * @return OK
   */
  catMantenimientoDatosPersonaObtenerResponse(idcatMantenimientoDatosPersona: string): __Observable<__StrictHttpResponse<CatMantenimientoDatosPersona>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMantenimientoDatosPersona != null) __params = __params.set('idcatMantenimientoDatosPersona', idcatMantenimientoDatosPersona.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMantenimientoDatosPersona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMantenimientoDatosPersona>;
      })
    );
  }
  /**
   * Consultar registro de catMantenimientoDatosPersona
   * @param idcatMantenimientoDatosPersona Identificador de catMantenimientoDatosPersona
   * @return OK
   */
  catMantenimientoDatosPersonaObtener(idcatMantenimientoDatosPersona: string): __Observable<CatMantenimientoDatosPersona> {
    return this.catMantenimientoDatosPersonaObtenerResponse(idcatMantenimientoDatosPersona).pipe(
      __map(_r => _r.body as CatMantenimientoDatosPersona)
    );
  }

  /**
   * Guardar o actualizar catMantenimientoDatosPersona
   * @param catMantenimientoDatosPersona catMantenimientoDatosPersona
   * @return OK
   */
  catMantenimientoDatosPersonaGuardarOActualizarResponse(catMantenimientoDatosPersona: CatMantenimientoDatosPersona): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMantenimientoDatosPersona;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMantenimientoDatosPersona`,
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
   * Guardar o actualizar catMantenimientoDatosPersona
   * @param catMantenimientoDatosPersona catMantenimientoDatosPersona
   * @return OK
   */
  catMantenimientoDatosPersonaGuardarOActualizar(catMantenimientoDatosPersona: CatMantenimientoDatosPersona): __Observable<string> {
    return this.catMantenimientoDatosPersonaGuardarOActualizarResponse(catMantenimientoDatosPersona).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catMantenimientoDatosPersona
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMantenimientoDatosPersonaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMantenimientoDatosPersona>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMantenimientoDatosPersona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMantenimientoDatosPersona>;
      })
    );
  }
  /**
   * Consultar lista paginada de catMantenimientoDatosPersona
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMantenimientoDatosPersonaQueryResult(info: QueryInfo): __Observable<QueryResultCatMantenimientoDatosPersona> {
    return this.catMantenimientoDatosPersonaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMantenimientoDatosPersona)
    );
  }

  /**
   * Desactivar registro de catMantenimientoDatosPersona
   * @param idcatMantenimientoDatosPersona Identificador de registro de catMantenimientoDatosPersona
   * @return OK
   */
  catMantenimientoDatosPersonaDesactivarResponse(idcatMantenimientoDatosPersona: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMantenimientoDatosPersona != null) __params = __params.set('idcatMantenimientoDatosPersona', idcatMantenimientoDatosPersona.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMantenimientoDatosPersona`,
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
   * Desactivar registro de catMantenimientoDatosPersona
   * @param idcatMantenimientoDatosPersona Identificador de registro de catMantenimientoDatosPersona
   * @return OK
   */
  catMantenimientoDatosPersonaDesactivar(idcatMantenimientoDatosPersona: string): __Observable<string> {
    return this.catMantenimientoDatosPersonaDesactivarResponse(idcatMantenimientoDatosPersona).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catMarcaTarjeta
   * @param idcatMarcaTarjeta Identificador de catMarcaTarjeta
   * @return OK
   */
  catMarcaTarjetaObtenerResponse(idcatMarcaTarjeta: string): __Observable<__StrictHttpResponse<CatMarcaTarjeta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMarcaTarjeta != null) __params = __params.set('idcatMarcaTarjeta', idcatMarcaTarjeta.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMarcaTarjeta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMarcaTarjeta>;
      })
    );
  }
  /**
   * Consultar registro de catMarcaTarjeta
   * @param idcatMarcaTarjeta Identificador de catMarcaTarjeta
   * @return OK
   */
  catMarcaTarjetaObtener(idcatMarcaTarjeta: string): __Observable<CatMarcaTarjeta> {
    return this.catMarcaTarjetaObtenerResponse(idcatMarcaTarjeta).pipe(
      __map(_r => _r.body as CatMarcaTarjeta)
    );
  }

  /**
   * Guardar o actualizar catMarcaTarjeta
   * @param catMarcaTarjeta catMarcaTarjeta
   * @return OK
   */
  catMarcaTarjetaGuardarOActualizarResponse(catMarcaTarjeta: CatMarcaTarjeta): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMarcaTarjeta;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMarcaTarjeta`,
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
   * Guardar o actualizar catMarcaTarjeta
   * @param catMarcaTarjeta catMarcaTarjeta
   * @return OK
   */
  catMarcaTarjetaGuardarOActualizar(catMarcaTarjeta: CatMarcaTarjeta): __Observable<string> {
    return this.catMarcaTarjetaGuardarOActualizarResponse(catMarcaTarjeta).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catMarcaTarjeta
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMarcaTarjetaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMarcaTarjeta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMarcaTarjeta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMarcaTarjeta>;
      })
    );
  }
  /**
   * Consultar lista paginada de catMarcaTarjeta
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMarcaTarjetaQueryResult(info: QueryInfo): __Observable<QueryResultCatMarcaTarjeta> {
    return this.catMarcaTarjetaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMarcaTarjeta)
    );
  }

  /**
   * Desactivar registro de catMarcaTarjeta
   * @param idcatMarcaTarjeta Identificador de registro de catMarcaTarjeta
   * @return OK
   */
  catMarcaTarjetaDesactivarResponse(idcatMarcaTarjeta: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMarcaTarjeta != null) __params = __params.set('idcatMarcaTarjeta', idcatMarcaTarjeta.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMarcaTarjeta`,
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
   * Desactivar registro de catMarcaTarjeta
   * @param idcatMarcaTarjeta Identificador de registro de catMarcaTarjeta
   * @return OK
   */
  catMarcaTarjetaDesactivar(idcatMarcaTarjeta: string): __Observable<string> {
    return this.catMarcaTarjetaDesactivarResponse(idcatMarcaTarjeta).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catMarcaVehiculo
   * @param idcatMarcaVehiculo Identificador de catMarcaVehiculo
   * @return OK
   */
  catMarcaVehiculoObtenerResponse(idcatMarcaVehiculo: string): __Observable<__StrictHttpResponse<CatMarcaVehiculo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMarcaVehiculo != null) __params = __params.set('idcatMarcaVehiculo', idcatMarcaVehiculo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMarcaVehiculo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMarcaVehiculo>;
      })
    );
  }
  /**
   * Consultar registro de catMarcaVehiculo
   * @param idcatMarcaVehiculo Identificador de catMarcaVehiculo
   * @return OK
   */
  catMarcaVehiculoObtener(idcatMarcaVehiculo: string): __Observable<CatMarcaVehiculo> {
    return this.catMarcaVehiculoObtenerResponse(idcatMarcaVehiculo).pipe(
      __map(_r => _r.body as CatMarcaVehiculo)
    );
  }

  /**
   * Guardar o actualizar catMarcaVehiculo
   * @param catMarcaVehiculo catMarcaVehiculo
   * @return OK
   */
  catMarcaVehiculoGuardarOActualizarResponse(catMarcaVehiculo: CatMarcaVehiculo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMarcaVehiculo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMarcaVehiculo`,
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
   * Guardar o actualizar catMarcaVehiculo
   * @param catMarcaVehiculo catMarcaVehiculo
   * @return OK
   */
  catMarcaVehiculoGuardarOActualizar(catMarcaVehiculo: CatMarcaVehiculo): __Observable<string> {
    return this.catMarcaVehiculoGuardarOActualizarResponse(catMarcaVehiculo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catMarcaVehiculo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMarcaVehiculoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMarcaVehiculo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMarcaVehiculo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMarcaVehiculo>;
      })
    );
  }
  /**
   * Consultar lista paginada de catMarcaVehiculo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMarcaVehiculoQueryResult(info: QueryInfo): __Observable<QueryResultCatMarcaVehiculo> {
    return this.catMarcaVehiculoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMarcaVehiculo)
    );
  }

  /**
   * Desactivar registro de catMarcaVehiculo
   * @param idcatMarcaVehiculo Identificador de registro de catMarcaVehiculo
   * @return OK
   */
  catMarcaVehiculoDesactivarResponse(idcatMarcaVehiculo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMarcaVehiculo != null) __params = __params.set('idcatMarcaVehiculo', idcatMarcaVehiculo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMarcaVehiculo`,
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
   * Desactivar registro de catMarcaVehiculo
   * @param idcatMarcaVehiculo Identificador de registro de catMarcaVehiculo
   * @return OK
   */
  catMarcaVehiculoDesactivar(idcatMarcaVehiculo: string): __Observable<string> {
    return this.catMarcaVehiculoDesactivarResponse(idcatMarcaVehiculo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catMedioComunicacion
   * @param idcatMedioComunicacion Identificador de catMedioComunicacion
   * @return OK
   */
  catMedioComunicacionObtenerResponse(idcatMedioComunicacion: string): __Observable<__StrictHttpResponse<CatMedioComunicacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMedioComunicacion != null) __params = __params.set('idcatMedioComunicacion', idcatMedioComunicacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMedioComunicacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMedioComunicacion>;
      })
    );
  }
  /**
   * Consultar registro de catMedioComunicacion
   * @param idcatMedioComunicacion Identificador de catMedioComunicacion
   * @return OK
   */
  catMedioComunicacionObtener(idcatMedioComunicacion: string): __Observable<CatMedioComunicacion> {
    return this.catMedioComunicacionObtenerResponse(idcatMedioComunicacion).pipe(
      __map(_r => _r.body as CatMedioComunicacion)
    );
  }

  /**
   * Guardar o actualizar catMedioComunicacion
   * @param catMedioComunicacion catMedioComunicacion
   * @return OK
   */
  catMedioComunicacionGuardarOActualizarResponse(catMedioComunicacion: CatMedioComunicacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMedioComunicacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMedioComunicacion`,
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
   * Guardar o actualizar catMedioComunicacion
   * @param catMedioComunicacion catMedioComunicacion
   * @return OK
   */
  catMedioComunicacionGuardarOActualizar(catMedioComunicacion: CatMedioComunicacion): __Observable<string> {
    return this.catMedioComunicacionGuardarOActualizarResponse(catMedioComunicacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catMedioComunicacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMedioComunicacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMedioComunicacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMedioComunicacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMedioComunicacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catMedioComunicacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMedioComunicacionQueryResult(info: QueryInfo): __Observable<QueryResultCatMedioComunicacion> {
    return this.catMedioComunicacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMedioComunicacion)
    );
  }

  /**
   * Desactivar registro de catMedioComunicacion
   * @param idcatMedioComunicacion Identificador de registro de catMedioComunicacion
   * @return OK
   */
  catMedioComunicacionDesactivarResponse(idcatMedioComunicacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMedioComunicacion != null) __params = __params.set('idcatMedioComunicacion', idcatMedioComunicacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMedioComunicacion`,
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
   * Desactivar registro de catMedioComunicacion
   * @param idcatMedioComunicacion Identificador de registro de catMedioComunicacion
   * @return OK
   */
  catMedioComunicacionDesactivar(idcatMedioComunicacion: string): __Observable<string> {
    return this.catMedioComunicacionDesactivarResponse(idcatMedioComunicacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catMedioDePago
   * @param idcatMedioDePago Identificador de catMedioDePago
   * @return OK
   */
  catMedioDePagoObtenerResponse(idcatMedioDePago: string): __Observable<__StrictHttpResponse<CatMedioDePago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMedioDePago != null) __params = __params.set('idcatMedioDePago', idcatMedioDePago.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMedioDePago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMedioDePago>;
      })
    );
  }
  /**
   * Consultar registro de catMedioDePago
   * @param idcatMedioDePago Identificador de catMedioDePago
   * @return OK
   */
  catMedioDePagoObtener(idcatMedioDePago: string): __Observable<CatMedioDePago> {
    return this.catMedioDePagoObtenerResponse(idcatMedioDePago).pipe(
      __map(_r => _r.body as CatMedioDePago)
    );
  }

  /**
   * Guardar o actualizar catMedioDePago
   * @param catMedioDePago catMedioDePago
   * @return OK
   */
  catMedioDePagoGuardarOActualizarResponse(catMedioDePago: CatMedioDePago): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMedioDePago;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMedioDePago`,
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
   * Guardar o actualizar catMedioDePago
   * @param catMedioDePago catMedioDePago
   * @return OK
   */
  catMedioDePagoGuardarOActualizar(catMedioDePago: CatMedioDePago): __Observable<string> {
    return this.catMedioDePagoGuardarOActualizarResponse(catMedioDePago).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catMedioDePago
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMedioDePagoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMedioDePago>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMedioDePago`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMedioDePago>;
      })
    );
  }
  /**
   * Consultar lista paginada de catMedioDePago
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMedioDePagoQueryResult(info: QueryInfo): __Observable<QueryResultCatMedioDePago> {
    return this.catMedioDePagoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMedioDePago)
    );
  }

  /**
   * Desactivar registro de catMedioDePago
   * @param idcatMedioDePago Identificador de registro de catMedioDePago
   * @return OK
   */
  catMedioDePagoDesactivarResponse(idcatMedioDePago: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMedioDePago != null) __params = __params.set('idcatMedioDePago', idcatMedioDePago.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMedioDePago`,
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
   * Desactivar registro de catMedioDePago
   * @param idcatMedioDePago Identificador de registro de catMedioDePago
   * @return OK
   */
  catMedioDePagoDesactivar(idcatMedioDePago: string): __Observable<string> {
    return this.catMedioDePagoDesactivarResponse(idcatMedioDePago).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catMedioDifusion
   * @param idcatMedioDifusion Identificador de catMedioDifusion
   * @return OK
   */
  catMedioDifusionObtenerResponse(idcatMedioDifusion: string): __Observable<__StrictHttpResponse<CatMedioDifusion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMedioDifusion != null) __params = __params.set('idcatMedioDifusion', idcatMedioDifusion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMedioDifusion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMedioDifusion>;
      })
    );
  }
  /**
   * Consultar registro de catMedioDifusion
   * @param idcatMedioDifusion Identificador de catMedioDifusion
   * @return OK
   */
  catMedioDifusionObtener(idcatMedioDifusion: string): __Observable<CatMedioDifusion> {
    return this.catMedioDifusionObtenerResponse(idcatMedioDifusion).pipe(
      __map(_r => _r.body as CatMedioDifusion)
    );
  }

  /**
   * Guardar o actualizar catMedioDifusion
   * @param catMedioDifusion catMedioDifusion
   * @return OK
   */
  catMedioDifusionGuardarOActualizarResponse(catMedioDifusion: CatMedioDifusion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMedioDifusion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMedioDifusion`,
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
   * Guardar o actualizar catMedioDifusion
   * @param catMedioDifusion catMedioDifusion
   * @return OK
   */
  catMedioDifusionGuardarOActualizar(catMedioDifusion: CatMedioDifusion): __Observable<string> {
    return this.catMedioDifusionGuardarOActualizarResponse(catMedioDifusion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catMedioDifusion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMedioDifusionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMedioDifusion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMedioDifusion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMedioDifusion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catMedioDifusion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMedioDifusionQueryResult(info: QueryInfo): __Observable<QueryResultCatMedioDifusion> {
    return this.catMedioDifusionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMedioDifusion)
    );
  }

  /**
   * Desactivar registro de catMedioDifusion
   * @param idcatMedioDifusion Identificador de registro de catMedioDifusion
   * @return OK
   */
  catMedioDifusionDesactivarResponse(idcatMedioDifusion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMedioDifusion != null) __params = __params.set('idcatMedioDifusion', idcatMedioDifusion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMedioDifusion`,
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
   * Desactivar registro de catMedioDifusion
   * @param idcatMedioDifusion Identificador de registro de catMedioDifusion
   * @return OK
   */
  catMedioDifusionDesactivar(idcatMedioDifusion: string): __Observable<string> {
    return this.catMedioDifusionDesactivarResponse(idcatMedioDifusion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catMedioTransporte
   * @param idcatMedioTransporte Identificador de catMedioTransporte
   * @return OK
   */
  catMedioTransporteObtenerResponse(idcatMedioTransporte: string): __Observable<__StrictHttpResponse<CatMedioTransporte>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMedioTransporte != null) __params = __params.set('idcatMedioTransporte', idcatMedioTransporte.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMedioTransporte`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMedioTransporte>;
      })
    );
  }
  /**
   * Consultar registro de catMedioTransporte
   * @param idcatMedioTransporte Identificador de catMedioTransporte
   * @return OK
   */
  catMedioTransporteObtener(idcatMedioTransporte: string): __Observable<CatMedioTransporte> {
    return this.catMedioTransporteObtenerResponse(idcatMedioTransporte).pipe(
      __map(_r => _r.body as CatMedioTransporte)
    );
  }

  /**
   * Guardar o actualizar catMedioTransporte
   * @param catMedioTransporte catMedioTransporte
   * @return OK
   */
  catMedioTransporteGuardarOActualizarResponse(catMedioTransporte: CatMedioTransporte): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMedioTransporte;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMedioTransporte`,
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
   * Guardar o actualizar catMedioTransporte
   * @param catMedioTransporte catMedioTransporte
   * @return OK
   */
  catMedioTransporteGuardarOActualizar(catMedioTransporte: CatMedioTransporte): __Observable<string> {
    return this.catMedioTransporteGuardarOActualizarResponse(catMedioTransporte).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catMedioTransporte
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMedioTransporteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMedioTransporte>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMedioTransporte`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMedioTransporte>;
      })
    );
  }
  /**
   * Consultar lista paginada de catMedioTransporte
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMedioTransporteQueryResult(info: QueryInfo): __Observable<QueryResultCatMedioTransporte> {
    return this.catMedioTransporteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMedioTransporte)
    );
  }

  /**
   * Desactivar registro de catMedioTransporte
   * @param idcatMedioTransporte Identificador de registro de catMedioTransporte
   * @return OK
   */
  catMedioTransporteDesactivarResponse(idcatMedioTransporte: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMedioTransporte != null) __params = __params.set('idcatMedioTransporte', idcatMedioTransporte.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMedioTransporte`,
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
   * Desactivar registro de catMedioTransporte
   * @param idcatMedioTransporte Identificador de registro de catMedioTransporte
   * @return OK
   */
  catMedioTransporteDesactivar(idcatMedioTransporte: string): __Observable<string> {
    return this.catMedioTransporteDesactivarResponse(idcatMedioTransporte).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catMetodoDePagoCFDI
   * @param idcatMetodoDePagoCFDI Identificador de catMetodoDePagoCFDI
   * @return OK
   */
  catMetodoDePagoCFDIObtenerResponse(idcatMetodoDePagoCFDI: string): __Observable<__StrictHttpResponse<CatMetodoDePagoCFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMetodoDePagoCFDI != null) __params = __params.set('idcatMetodoDePagoCFDI', idcatMetodoDePagoCFDI.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMetodoDePagoCFDI`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMetodoDePagoCFDI>;
      })
    );
  }
  /**
   * Consultar registro de catMetodoDePagoCFDI
   * @param idcatMetodoDePagoCFDI Identificador de catMetodoDePagoCFDI
   * @return OK
   */
  catMetodoDePagoCFDIObtener(idcatMetodoDePagoCFDI: string): __Observable<CatMetodoDePagoCFDI> {
    return this.catMetodoDePagoCFDIObtenerResponse(idcatMetodoDePagoCFDI).pipe(
      __map(_r => _r.body as CatMetodoDePagoCFDI)
    );
  }

  /**
   * Guardar o actualizar catMetodoDePagoCFDI
   * @param catMetodoDePagoCFDI catMetodoDePagoCFDI
   * @return OK
   */
  catMetodoDePagoCFDIGuardarOActualizarResponse(catMetodoDePagoCFDI: CatMetodoDePagoCFDI): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMetodoDePagoCFDI;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMetodoDePagoCFDI`,
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
   * Guardar o actualizar catMetodoDePagoCFDI
   * @param catMetodoDePagoCFDI catMetodoDePagoCFDI
   * @return OK
   */
  catMetodoDePagoCFDIGuardarOActualizar(catMetodoDePagoCFDI: CatMetodoDePagoCFDI): __Observable<string> {
    return this.catMetodoDePagoCFDIGuardarOActualizarResponse(catMetodoDePagoCFDI).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catMetodoDePagoCFDI
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMetodoDePagoCFDIQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMetodoDePagoCFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMetodoDePagoCFDI`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMetodoDePagoCFDI>;
      })
    );
  }
  /**
   * Consultar lista paginada de catMetodoDePagoCFDI
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMetodoDePagoCFDIQueryResult(info: QueryInfo): __Observable<QueryResultCatMetodoDePagoCFDI> {
    return this.catMetodoDePagoCFDIQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMetodoDePagoCFDI)
    );
  }

  /**
   * Desactivar registro de catMetodoDePagoCFDI
   * @param idcatMetodoDePagoCFDI Identificador de registro de catMetodoDePagoCFDI
   * @return OK
   */
  catMetodoDePagoCFDIDesactivarResponse(idcatMetodoDePagoCFDI: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMetodoDePagoCFDI != null) __params = __params.set('idcatMetodoDePagoCFDI', idcatMetodoDePagoCFDI.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMetodoDePagoCFDI`,
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
   * Desactivar registro de catMetodoDePagoCFDI
   * @param idcatMetodoDePagoCFDI Identificador de registro de catMetodoDePagoCFDI
   * @return OK
   */
  catMetodoDePagoCFDIDesactivar(idcatMetodoDePagoCFDI: string): __Observable<string> {
    return this.catMetodoDePagoCFDIDesactivarResponse(idcatMetodoDePagoCFDI).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catMoneda
   * @param idcatMoneda Identificador de catMoneda
   * @return OK
   */
  catMonedaObtenerResponse(idcatMoneda: string): __Observable<__StrictHttpResponse<CatMoneda>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMoneda != null) __params = __params.set('idcatMoneda', idcatMoneda.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMoneda`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMoneda>;
      })
    );
  }
  /**
   * Consultar registro de catMoneda
   * @param idcatMoneda Identificador de catMoneda
   * @return OK
   */
  catMonedaObtener(idcatMoneda: string): __Observable<CatMoneda> {
    return this.catMonedaObtenerResponse(idcatMoneda).pipe(
      __map(_r => _r.body as CatMoneda)
    );
  }

  /**
   * Guardar o actualizar catMoneda
   * @param catMoneda catMoneda
   * @return OK
   */
  catMonedaGuardarOActualizarResponse(catMoneda: CatMoneda): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMoneda;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMoneda`,
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
   * Guardar o actualizar catMoneda
   * @param catMoneda catMoneda
   * @return OK
   */
  catMonedaGuardarOActualizar(catMoneda: CatMoneda): __Observable<string> {
    return this.catMonedaGuardarOActualizarResponse(catMoneda).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catMoneda
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMonedaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMoneda>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMoneda`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMoneda>;
      })
    );
  }
  /**
   * Consultar lista paginada de catMoneda
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMonedaQueryResult(info: QueryInfo): __Observable<QueryResultCatMoneda> {
    return this.catMonedaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMoneda)
    );
  }

  /**
   * Desactivar registro de catMoneda
   * @param idcatMoneda Identificador de registro de catMoneda
   * @return OK
   */
  catMonedaDesactivarResponse(idcatMoneda: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMoneda != null) __params = __params.set('idcatMoneda', idcatMoneda.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMoneda`,
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
   * Desactivar registro de catMoneda
   * @param idcatMoneda Identificador de registro de catMoneda
   * @return OK
   */
  catMonedaDesactivar(idcatMoneda: string): __Observable<string> {
    return this.catMonedaDesactivarResponse(idcatMoneda).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catMotivoCancelacionPartidaCotizacion
   * @param idcatMotivoCancelacionPartidaCotizacion undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionObtenerResponse(idcatMotivoCancelacionPartidaCotizacion: string): __Observable<__StrictHttpResponse<CatMotivoCancelacionPartidaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMotivoCancelacionPartidaCotizacion != null) __params = __params.set('idcatMotivoCancelacionPartidaCotizacion', idcatMotivoCancelacionPartidaCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMotivoCancelacionPartidaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMotivoCancelacionPartidaCotizacion>;
      })
    );
  }
  /**
   * Obtener catMotivoCancelacionPartidaCotizacion
   * @param idcatMotivoCancelacionPartidaCotizacion undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionObtener(idcatMotivoCancelacionPartidaCotizacion: string): __Observable<CatMotivoCancelacionPartidaCotizacion> {
    return this.catMotivoCancelacionPartidaCotizacionObtenerResponse(idcatMotivoCancelacionPartidaCotizacion).pipe(
      __map(_r => _r.body as CatMotivoCancelacionPartidaCotizacion)
    );
  }

  /**
   * GuardarOActualizar catMotivoCancelacionPartidaCotizacion
   * @param catMotivoCancelacionPartidaCotizacion undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionGuardarOActualizarResponse(catMotivoCancelacionPartidaCotizacion: CatMotivoCancelacionPartidaCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMotivoCancelacionPartidaCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMotivoCancelacionPartidaCotizacion`,
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
   * GuardarOActualizar catMotivoCancelacionPartidaCotizacion
   * @param catMotivoCancelacionPartidaCotizacion undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionGuardarOActualizar(catMotivoCancelacionPartidaCotizacion: CatMotivoCancelacionPartidaCotizacion): __Observable<string> {
    return this.catMotivoCancelacionPartidaCotizacionGuardarOActualizarResponse(catMotivoCancelacionPartidaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult catMotivoCancelacionPartidaCotizacion
   * @param info undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMotivoCancelacionPartidaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMotivoCancelacionPartidaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMotivoCancelacionPartidaCotizacion>;
      })
    );
  }
  /**
   * QueryResult catMotivoCancelacionPartidaCotizacion
   * @param info undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultCatMotivoCancelacionPartidaCotizacion> {
    return this.catMotivoCancelacionPartidaCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMotivoCancelacionPartidaCotizacion)
    );
  }

  /**
   * Desactivar catMotivoCancelacionPartidaCotizacion
   * @param idcatMotivoCancelacionPartidaCotizacion undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionDesactivarResponse(idcatMotivoCancelacionPartidaCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMotivoCancelacionPartidaCotizacion != null) __params = __params.set('idcatMotivoCancelacionPartidaCotizacion', idcatMotivoCancelacionPartidaCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMotivoCancelacionPartidaCotizacion`,
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
   * Desactivar catMotivoCancelacionPartidaCotizacion
   * @param idcatMotivoCancelacionPartidaCotizacion undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionDesactivar(idcatMotivoCancelacionPartidaCotizacion: string): __Observable<string> {
    return this.catMotivoCancelacionPartidaCotizacionDesactivarResponse(idcatMotivoCancelacionPartidaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catMotivoCancelacionPartidaCotizacionNota
   * @param idcatMotivoCancelacionPartidaCotizacionNota undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionNotaObtenerResponse(idcatMotivoCancelacionPartidaCotizacionNota: string): __Observable<__StrictHttpResponse<CatMotivoCancelacionPartidaCotizacionNota>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMotivoCancelacionPartidaCotizacionNota != null) __params = __params.set('idcatMotivoCancelacionPartidaCotizacionNota', idcatMotivoCancelacionPartidaCotizacionNota.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMotivoCancelacionPartidaCotizacionNota`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMotivoCancelacionPartidaCotizacionNota>;
      })
    );
  }
  /**
   * Obtener catMotivoCancelacionPartidaCotizacionNota
   * @param idcatMotivoCancelacionPartidaCotizacionNota undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionNotaObtener(idcatMotivoCancelacionPartidaCotizacionNota: string): __Observable<CatMotivoCancelacionPartidaCotizacionNota> {
    return this.catMotivoCancelacionPartidaCotizacionNotaObtenerResponse(idcatMotivoCancelacionPartidaCotizacionNota).pipe(
      __map(_r => _r.body as CatMotivoCancelacionPartidaCotizacionNota)
    );
  }

  /**
   * GuardarOActualizar catMotivoCancelacionPartidaCotizacionNota
   * @param catMotivoCancelacionPartidaCotizacionNota undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionNotaGuardarOActualizarResponse(catMotivoCancelacionPartidaCotizacionNota: CatMotivoCancelacionPartidaCotizacionNota): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMotivoCancelacionPartidaCotizacionNota;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMotivoCancelacionPartidaCotizacionNota`,
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
   * GuardarOActualizar catMotivoCancelacionPartidaCotizacionNota
   * @param catMotivoCancelacionPartidaCotizacionNota undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionNotaGuardarOActualizar(catMotivoCancelacionPartidaCotizacionNota: CatMotivoCancelacionPartidaCotizacionNota): __Observable<string> {
    return this.catMotivoCancelacionPartidaCotizacionNotaGuardarOActualizarResponse(catMotivoCancelacionPartidaCotizacionNota).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult catMotivoCancelacionPartidaCotizacionNota
   * @param info undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionNotaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMotivoCancelacionPartidaCotizacionNota>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMotivoCancelacionPartidaCotizacionNota`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMotivoCancelacionPartidaCotizacionNota>;
      })
    );
  }
  /**
   * QueryResult catMotivoCancelacionPartidaCotizacionNota
   * @param info undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionNotaQueryResult(info: QueryInfo): __Observable<QueryResultCatMotivoCancelacionPartidaCotizacionNota> {
    return this.catMotivoCancelacionPartidaCotizacionNotaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMotivoCancelacionPartidaCotizacionNota)
    );
  }

  /**
   * Desactivar catMotivoCancelacionPartidaCotizacionNota
   * @param idcatMotivoCancelacionPartidaCotizacionNota undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionNotaDesactivarResponse(idcatMotivoCancelacionPartidaCotizacionNota: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMotivoCancelacionPartidaCotizacionNota != null) __params = __params.set('idcatMotivoCancelacionPartidaCotizacionNota', idcatMotivoCancelacionPartidaCotizacionNota.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMotivoCancelacionPartidaCotizacionNota`,
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
   * Desactivar catMotivoCancelacionPartidaCotizacionNota
   * @param idcatMotivoCancelacionPartidaCotizacionNota undefined
   * @return OK
   */
  catMotivoCancelacionPartidaCotizacionNotaDesactivar(idcatMotivoCancelacionPartidaCotizacionNota: string): __Observable<string> {
    return this.catMotivoCancelacionPartidaCotizacionNotaDesactivarResponse(idcatMotivoCancelacionPartidaCotizacionNota).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catMotivoEntregaNoRealizada
   * @param idcatMotivoEntregaNoRealizada Identificador de catMotivoEntregaNoRealizada
   * @return OK
   */
  catMotivoEntregaNoRealizadaObtenerResponse(idcatMotivoEntregaNoRealizada: string): __Observable<__StrictHttpResponse<CatMotivoEntregaNoRealizada>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMotivoEntregaNoRealizada != null) __params = __params.set('idcatMotivoEntregaNoRealizada', idcatMotivoEntregaNoRealizada.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMotivoEntregaNoRealizada`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMotivoEntregaNoRealizada>;
      })
    );
  }
  /**
   * Consultar registro de catMotivoEntregaNoRealizada
   * @param idcatMotivoEntregaNoRealizada Identificador de catMotivoEntregaNoRealizada
   * @return OK
   */
  catMotivoEntregaNoRealizadaObtener(idcatMotivoEntregaNoRealizada: string): __Observable<CatMotivoEntregaNoRealizada> {
    return this.catMotivoEntregaNoRealizadaObtenerResponse(idcatMotivoEntregaNoRealizada).pipe(
      __map(_r => _r.body as CatMotivoEntregaNoRealizada)
    );
  }

  /**
   * Guardar o actualizar catMotivoEntregaNoRealizada
   * @param catMotivoEntregaNoRealizada catMotivoEntregaNoRealizada
   * @return OK
   */
  catMotivoEntregaNoRealizadaGuardarOActualizarResponse(catMotivoEntregaNoRealizada: CatMotivoEntregaNoRealizada): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMotivoEntregaNoRealizada;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMotivoEntregaNoRealizada`,
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
   * Guardar o actualizar catMotivoEntregaNoRealizada
   * @param catMotivoEntregaNoRealizada catMotivoEntregaNoRealizada
   * @return OK
   */
  catMotivoEntregaNoRealizadaGuardarOActualizar(catMotivoEntregaNoRealizada: CatMotivoEntregaNoRealizada): __Observable<string> {
    return this.catMotivoEntregaNoRealizadaGuardarOActualizarResponse(catMotivoEntregaNoRealizada).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catMotivoEntregaNoRealizada
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMotivoEntregaNoRealizadaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMotivoEntregaNoRealizada>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMotivoEntregaNoRealizada`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMotivoEntregaNoRealizada>;
      })
    );
  }
  /**
   * Consultar lista paginada de catMotivoEntregaNoRealizada
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMotivoEntregaNoRealizadaQueryResult(info: QueryInfo): __Observable<QueryResultCatMotivoEntregaNoRealizada> {
    return this.catMotivoEntregaNoRealizadaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMotivoEntregaNoRealizada)
    );
  }

  /**
   * Desactivar registro de catMotivoEntregaNoRealizada
   * @param idcatMotivoEntregaNoRealizada Identificador de registro de catMotivoEntregaNoRealizada
   * @return OK
   */
  catMotivoEntregaNoRealizadaDesactivarResponse(idcatMotivoEntregaNoRealizada: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMotivoEntregaNoRealizada != null) __params = __params.set('idcatMotivoEntregaNoRealizada', idcatMotivoEntregaNoRealizada.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMotivoEntregaNoRealizada`,
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
   * Desactivar registro de catMotivoEntregaNoRealizada
   * @param idcatMotivoEntregaNoRealizada Identificador de registro de catMotivoEntregaNoRealizada
   * @return OK
   */
  catMotivoEntregaNoRealizadaDesactivar(idcatMotivoEntregaNoRealizada: string): __Observable<string> {
    return this.catMotivoEntregaNoRealizadaDesactivarResponse(idcatMotivoEntregaNoRealizada).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catMotivoSeguimientoCotizacion
   * @param idcatMotivoSeguimientoCotizacion Identificador de catMotivoSeguimientoCotizacion
   * @return OK
   */
  catMotivoSeguimientoCotizacionObtenerResponse(idcatMotivoSeguimientoCotizacion: string): __Observable<__StrictHttpResponse<CatMotivoSeguimientoCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMotivoSeguimientoCotizacion != null) __params = __params.set('idcatMotivoSeguimientoCotizacion', idcatMotivoSeguimientoCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catMotivoSeguimientoCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatMotivoSeguimientoCotizacion>;
      })
    );
  }
  /**
   * Consultar registro de catMotivoSeguimientoCotizacion
   * @param idcatMotivoSeguimientoCotizacion Identificador de catMotivoSeguimientoCotizacion
   * @return OK
   */
  catMotivoSeguimientoCotizacionObtener(idcatMotivoSeguimientoCotizacion: string): __Observable<CatMotivoSeguimientoCotizacion> {
    return this.catMotivoSeguimientoCotizacionObtenerResponse(idcatMotivoSeguimientoCotizacion).pipe(
      __map(_r => _r.body as CatMotivoSeguimientoCotizacion)
    );
  }

  /**
   * Guardar o actualizar catMotivoSeguimientoCotizacion
   * @param catMotivoSeguimientoCotizacion catMotivoSeguimientoCotizacion
   * @return OK
   */
  catMotivoSeguimientoCotizacionGuardarOActualizarResponse(catMotivoSeguimientoCotizacion: CatMotivoSeguimientoCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catMotivoSeguimientoCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catMotivoSeguimientoCotizacion`,
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
   * Guardar o actualizar catMotivoSeguimientoCotizacion
   * @param catMotivoSeguimientoCotizacion catMotivoSeguimientoCotizacion
   * @return OK
   */
  catMotivoSeguimientoCotizacionGuardarOActualizar(catMotivoSeguimientoCotizacion: CatMotivoSeguimientoCotizacion): __Observable<string> {
    return this.catMotivoSeguimientoCotizacionGuardarOActualizarResponse(catMotivoSeguimientoCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catMotivoSeguimientoCotizacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMotivoSeguimientoCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatMotivoSeguimientoCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catMotivoSeguimientoCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatMotivoSeguimientoCotizacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catMotivoSeguimientoCotizacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catMotivoSeguimientoCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultCatMotivoSeguimientoCotizacion> {
    return this.catMotivoSeguimientoCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatMotivoSeguimientoCotizacion)
    );
  }

  /**
   * Desactivar registro de catMotivoSeguimientoCotizacion
   * @param idcatMotivoSeguimientoCotizacion Identificador de registro de catMotivoSeguimientoCotizacion
   * @return OK
   */
  catMotivoSeguimientoCotizacionDesactivarResponse(idcatMotivoSeguimientoCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatMotivoSeguimientoCotizacion != null) __params = __params.set('idcatMotivoSeguimientoCotizacion', idcatMotivoSeguimientoCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catMotivoSeguimientoCotizacion`,
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
   * Desactivar registro de catMotivoSeguimientoCotizacion
   * @param idcatMotivoSeguimientoCotizacion Identificador de registro de catMotivoSeguimientoCotizacion
   * @return OK
   */
  catMotivoSeguimientoCotizacionDesactivar(idcatMotivoSeguimientoCotizacion: string): __Observable<string> {
    return this.catMotivoSeguimientoCotizacionDesactivarResponse(idcatMotivoSeguimientoCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catNivelDecisionDatosPersona
   * @param idcatNivelDecisionDatosPersona Identificador de catNivelDecisionDatosPersona
   * @return OK
   */
  catNivelDecisionDatosPersonaObtenerResponse(idcatNivelDecisionDatosPersona: string): __Observable<__StrictHttpResponse<CatNivelDecisionDatosPersona>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatNivelDecisionDatosPersona != null) __params = __params.set('idcatNivelDecisionDatosPersona', idcatNivelDecisionDatosPersona.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catNivelDecisionDatosPersona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatNivelDecisionDatosPersona>;
      })
    );
  }
  /**
   * Consultar registro de catNivelDecisionDatosPersona
   * @param idcatNivelDecisionDatosPersona Identificador de catNivelDecisionDatosPersona
   * @return OK
   */
  catNivelDecisionDatosPersonaObtener(idcatNivelDecisionDatosPersona: string): __Observable<CatNivelDecisionDatosPersona> {
    return this.catNivelDecisionDatosPersonaObtenerResponse(idcatNivelDecisionDatosPersona).pipe(
      __map(_r => _r.body as CatNivelDecisionDatosPersona)
    );
  }

  /**
   * Guardar o actualizar catNivelDecisionDatosPersona
   * @param catNivelDecisionDatosPersona catNivelDecisionDatosPersona
   * @return OK
   */
  catNivelDecisionDatosPersonaGuardarOActualizarResponse(catNivelDecisionDatosPersona: CatNivelDecisionDatosPersona): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catNivelDecisionDatosPersona;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catNivelDecisionDatosPersona`,
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
   * Guardar o actualizar catNivelDecisionDatosPersona
   * @param catNivelDecisionDatosPersona catNivelDecisionDatosPersona
   * @return OK
   */
  catNivelDecisionDatosPersonaGuardarOActualizar(catNivelDecisionDatosPersona: CatNivelDecisionDatosPersona): __Observable<string> {
    return this.catNivelDecisionDatosPersonaGuardarOActualizarResponse(catNivelDecisionDatosPersona).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catNivelDecisionDatosPersona
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catNivelDecisionDatosPersonaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatNivelDecisionDatosPersona>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catNivelDecisionDatosPersona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatNivelDecisionDatosPersona>;
      })
    );
  }
  /**
   * Consultar lista paginada de catNivelDecisionDatosPersona
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catNivelDecisionDatosPersonaQueryResult(info: QueryInfo): __Observable<QueryResultCatNivelDecisionDatosPersona> {
    return this.catNivelDecisionDatosPersonaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatNivelDecisionDatosPersona)
    );
  }

  /**
   * Desactivar registro de catNivelDecisionDatosPersona
   * @param idcatNivelDecisionDatosPersona Identificador de registro de catNivelDecisionDatosPersona
   * @return OK
   */
  catNivelDecisionDatosPersonaDesactivarResponse(idcatNivelDecisionDatosPersona: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatNivelDecisionDatosPersona != null) __params = __params.set('idcatNivelDecisionDatosPersona', idcatNivelDecisionDatosPersona.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catNivelDecisionDatosPersona`,
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
   * Desactivar registro de catNivelDecisionDatosPersona
   * @param idcatNivelDecisionDatosPersona Identificador de registro de catNivelDecisionDatosPersona
   * @return OK
   */
  catNivelDecisionDatosPersonaDesactivar(idcatNivelDecisionDatosPersona: string): __Observable<string> {
    return this.catNivelDecisionDatosPersonaDesactivarResponse(idcatNivelDecisionDatosPersona).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catNivelIngreso
   * @param idcatNivelIngreso Identificador de catNivelIngreso
   * @return OK
   */
  catNivelIngresoObtenerResponse(idcatNivelIngreso: string): __Observable<__StrictHttpResponse<CatNivelIngreso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatNivelIngreso != null) __params = __params.set('idcatNivelIngreso', idcatNivelIngreso.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catNivelIngreso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatNivelIngreso>;
      })
    );
  }
  /**
   * Consultar registro de catNivelIngreso
   * @param idcatNivelIngreso Identificador de catNivelIngreso
   * @return OK
   */
  catNivelIngresoObtener(idcatNivelIngreso: string): __Observable<CatNivelIngreso> {
    return this.catNivelIngresoObtenerResponse(idcatNivelIngreso).pipe(
      __map(_r => _r.body as CatNivelIngreso)
    );
  }

  /**
   * Guardar o actualizar catNivelIngreso
   * @param catNivelIngreso catNivelIngreso
   * @return OK
   */
  catNivelIngresoGuardarOActualizarResponse(catNivelIngreso: CatNivelIngreso): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catNivelIngreso;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catNivelIngreso`,
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
   * Guardar o actualizar catNivelIngreso
   * @param catNivelIngreso catNivelIngreso
   * @return OK
   */
  catNivelIngresoGuardarOActualizar(catNivelIngreso: CatNivelIngreso): __Observable<string> {
    return this.catNivelIngresoGuardarOActualizarResponse(catNivelIngreso).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catNivelIngreso
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catNivelIngresoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatNivelIngreso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catNivelIngreso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatNivelIngreso>;
      })
    );
  }
  /**
   * Consultar lista paginada de catNivelIngreso
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catNivelIngresoQueryResult(info: QueryInfo): __Observable<QueryResultCatNivelIngreso> {
    return this.catNivelIngresoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatNivelIngreso)
    );
  }

  /**
   * Desactivar registro de catNivelIngreso
   * @param idcatNivelIngreso Identificador de registro de catNivelIngreso
   * @return OK
   */
  catNivelIngresoDesactivarResponse(idcatNivelIngreso: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatNivelIngreso != null) __params = __params.set('idcatNivelIngreso', idcatNivelIngreso.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catNivelIngreso`,
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
   * Desactivar registro de catNivelIngreso
   * @param idcatNivelIngreso Identificador de registro de catNivelIngreso
   * @return OK
   */
  catNivelIngresoDesactivar(idcatNivelIngreso: string): __Observable<string> {
    return this.catNivelIngresoDesactivarResponse(idcatNivelIngreso).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catNivelPuestoDatosPersona
   * @param idcatNivelPuestoDatosPersona Identificador de catNivelPuestoDatosPersona
   * @return OK
   */
  catNivelPuestoDatosPersonaObtenerResponse(idcatNivelPuestoDatosPersona: string): __Observable<__StrictHttpResponse<CatNivelPuestoDatosPersona>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatNivelPuestoDatosPersona != null) __params = __params.set('idcatNivelPuestoDatosPersona', idcatNivelPuestoDatosPersona.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catNivelPuestoDatosPersona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatNivelPuestoDatosPersona>;
      })
    );
  }
  /**
   * Consultar registro de catNivelPuestoDatosPersona
   * @param idcatNivelPuestoDatosPersona Identificador de catNivelPuestoDatosPersona
   * @return OK
   */
  catNivelPuestoDatosPersonaObtener(idcatNivelPuestoDatosPersona: string): __Observable<CatNivelPuestoDatosPersona> {
    return this.catNivelPuestoDatosPersonaObtenerResponse(idcatNivelPuestoDatosPersona).pipe(
      __map(_r => _r.body as CatNivelPuestoDatosPersona)
    );
  }

  /**
   * Guardar o actualizar catNivelPuestoDatosPersona
   * @param catNivelPuestoDatosPersona catNivelPuestoDatosPersona
   * @return OK
   */
  catNivelPuestoDatosPersonaGuardarOActualizarResponse(catNivelPuestoDatosPersona: CatNivelPuestoDatosPersona): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catNivelPuestoDatosPersona;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catNivelPuestoDatosPersona`,
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
   * Guardar o actualizar catNivelPuestoDatosPersona
   * @param catNivelPuestoDatosPersona catNivelPuestoDatosPersona
   * @return OK
   */
  catNivelPuestoDatosPersonaGuardarOActualizar(catNivelPuestoDatosPersona: CatNivelPuestoDatosPersona): __Observable<string> {
    return this.catNivelPuestoDatosPersonaGuardarOActualizarResponse(catNivelPuestoDatosPersona).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catNivelPuestoDatosPersona
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catNivelPuestoDatosPersonaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatNivelPuestoDatosPersona>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catNivelPuestoDatosPersona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatNivelPuestoDatosPersona>;
      })
    );
  }
  /**
   * Consultar lista paginada de catNivelPuestoDatosPersona
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catNivelPuestoDatosPersonaQueryResult(info: QueryInfo): __Observable<QueryResultCatNivelPuestoDatosPersona> {
    return this.catNivelPuestoDatosPersonaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatNivelPuestoDatosPersona)
    );
  }

  /**
   * Desactivar registro de catNivelPuestoDatosPersona
   * @param idcatNivelPuestoDatosPersona Identificador de registro de catNivelPuestoDatosPersona
   * @return OK
   */
  catNivelPuestoDatosPersonaDesactivarResponse(idcatNivelPuestoDatosPersona: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatNivelPuestoDatosPersona != null) __params = __params.set('idcatNivelPuestoDatosPersona', idcatNivelPuestoDatosPersona.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catNivelPuestoDatosPersona`,
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
   * Desactivar registro de catNivelPuestoDatosPersona
   * @param idcatNivelPuestoDatosPersona Identificador de registro de catNivelPuestoDatosPersona
   * @return OK
   */
  catNivelPuestoDatosPersonaDesactivar(idcatNivelPuestoDatosPersona: string): __Observable<string> {
    return this.catNivelPuestoDatosPersonaDesactivarResponse(idcatNivelPuestoDatosPersona).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catOrigenVisitante
   * @param idcatOrigenVisitante Identificador de catOrigenVisitante
   * @return OK
   */
  catOrigenVisitanteObtenerResponse(idcatOrigenVisitante: string): __Observable<__StrictHttpResponse<CatOrigenVisitante>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatOrigenVisitante != null) __params = __params.set('idcatOrigenVisitante', idcatOrigenVisitante.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catOrigenVisitante`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatOrigenVisitante>;
      })
    );
  }
  /**
   * Consultar registro de catOrigenVisitante
   * @param idcatOrigenVisitante Identificador de catOrigenVisitante
   * @return OK
   */
  catOrigenVisitanteObtener(idcatOrigenVisitante: string): __Observable<CatOrigenVisitante> {
    return this.catOrigenVisitanteObtenerResponse(idcatOrigenVisitante).pipe(
      __map(_r => _r.body as CatOrigenVisitante)
    );
  }

  /**
   * Guardar o actualizar catOrigenVisitante
   * @param catOrigenVisitante catOrigenVisitante
   * @return OK
   */
  catOrigenVisitanteGuardarOActualizarResponse(catOrigenVisitante: CatOrigenVisitante): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catOrigenVisitante;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catOrigenVisitante`,
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
   * Guardar o actualizar catOrigenVisitante
   * @param catOrigenVisitante catOrigenVisitante
   * @return OK
   */
  catOrigenVisitanteGuardarOActualizar(catOrigenVisitante: CatOrigenVisitante): __Observable<string> {
    return this.catOrigenVisitanteGuardarOActualizarResponse(catOrigenVisitante).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catOrigenVisitante
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catOrigenVisitanteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatOrigenVisitante>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catOrigenVisitante`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatOrigenVisitante>;
      })
    );
  }
  /**
   * Consultar lista paginada de catOrigenVisitante
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catOrigenVisitanteQueryResult(info: QueryInfo): __Observable<QueryResultCatOrigenVisitante> {
    return this.catOrigenVisitanteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatOrigenVisitante)
    );
  }

  /**
   * Desactivar registro de catOrigenVisitante
   * @param idcatOrigenVisitante Identificador de registro de catOrigenVisitante
   * @return OK
   */
  catOrigenVisitanteDesactivarResponse(idcatOrigenVisitante: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatOrigenVisitante != null) __params = __params.set('idcatOrigenVisitante', idcatOrigenVisitante.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catOrigenVisitante`,
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
   * Desactivar registro de catOrigenVisitante
   * @param idcatOrigenVisitante Identificador de registro de catOrigenVisitante
   * @return OK
   */
  catOrigenVisitanteDesactivar(idcatOrigenVisitante: string): __Observable<string> {
    return this.catOrigenVisitanteDesactivarResponse(idcatOrigenVisitante).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catPagoIndirecto
   * @param IdCatPagoIndirecto Identificador de catPagoIndirecto
   * @return OK
   */
  catPagoIndirectoObtenerResponse(IdCatPagoIndirecto: string): __Observable<__StrictHttpResponse<CatPagoIndirecto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdCatPagoIndirecto != null) __params = __params.set('IdCatPagoIndirecto', IdCatPagoIndirecto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catPagoIndirecto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatPagoIndirecto>;
      })
    );
  }
  /**
   * Consultar registro de catPagoIndirecto
   * @param IdCatPagoIndirecto Identificador de catPagoIndirecto
   * @return OK
   */
  catPagoIndirectoObtener(IdCatPagoIndirecto: string): __Observable<CatPagoIndirecto> {
    return this.catPagoIndirectoObtenerResponse(IdCatPagoIndirecto).pipe(
      __map(_r => _r.body as CatPagoIndirecto)
    );
  }

  /**
   * Guardar o actualizar catPagoIndirecto
   * @param catPagoIndirecto catPagoIndirecto
   * @return OK
   */
  catPagoIndirectoGuardarOActualizarResponse(catPagoIndirecto: CatPagoIndirecto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catPagoIndirecto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catPagoIndirecto`,
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
   * Guardar o actualizar catPagoIndirecto
   * @param catPagoIndirecto catPagoIndirecto
   * @return OK
   */
  catPagoIndirectoGuardarOActualizar(catPagoIndirecto: CatPagoIndirecto): __Observable<string> {
    return this.catPagoIndirectoGuardarOActualizarResponse(catPagoIndirecto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catPagoIndirecto
   * @param info
   * @return OK
   */
  catPagoIndirectoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatPagoIndirecto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catPagoIndirecto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatPagoIndirecto>;
      })
    );
  }
  /**
   * Consultar lista paginada de catPagoIndirecto
   * @param info
   * @return OK
   */
  catPagoIndirectoQueryResult(info: QueryInfo): __Observable<QueryResultCatPagoIndirecto> {
    return this.catPagoIndirectoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatPagoIndirecto)
    );
  }

  /**
   * Desactivar registro de catPagoIndirecto
   * @param IdCatPagoIndirecto Identificador de regustro de catPagoIndirecto
   * @return OK
   */
  catPagoIndirectoDesactivarResponse(IdCatPagoIndirecto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (IdCatPagoIndirecto != null) __params = __params.set('IdCatPagoIndirecto', IdCatPagoIndirecto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catPagoIndirecto`,
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
   * Desactivar registro de catPagoIndirecto
   * @param IdCatPagoIndirecto Identificador de regustro de catPagoIndirecto
   * @return OK
   */
  catPagoIndirectoDesactivar(IdCatPagoIndirecto: string): __Observable<string> {
    return this.catPagoIndirectoDesactivarResponse(IdCatPagoIndirecto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catPais
   * @param idcatPais Identificador de catPais
   * @return OK
   */
  catPaisObtenerResponse(idcatPais: string): __Observable<__StrictHttpResponse<CatPais>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatPais != null) __params = __params.set('idcatPais', idcatPais.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catPais`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatPais>;
      })
    );
  }
  /**
   * Consultar registro de catPais
   * @param idcatPais Identificador de catPais
   * @return OK
   */
  catPaisObtener(idcatPais: string): __Observable<CatPais> {
    return this.catPaisObtenerResponse(idcatPais).pipe(
      __map(_r => _r.body as CatPais)
    );
  }

  /**
   * Guardar o actualizar catPais
   * @param catPais catPais
   * @return OK
   */
  catPaisGuardarOActualizarResponse(catPais: CatPais): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catPais;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catPais`,
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
   * Guardar o actualizar catPais
   * @param catPais catPais
   * @return OK
   */
  catPaisGuardarOActualizar(catPais: CatPais): __Observable<string> {
    return this.catPaisGuardarOActualizarResponse(catPais).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catPais
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catPaisQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatPais>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catPais`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatPais>;
      })
    );
  }
  /**
   * Consultar lista paginada de catPais
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catPaisQueryResult(info: QueryInfo): __Observable<QueryResultCatPais> {
    return this.catPaisQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatPais)
    );
  }

  /**
   * Desactivar registro de catPais
   * @param idcatPais Identificador de registro de catPais
   * @return OK
   */
  catPaisDesactivarResponse(idcatPais: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatPais != null) __params = __params.set('idcatPais', idcatPais.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catPais`,
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
   * Desactivar registro de catPais
   * @param idcatPais Identificador de registro de catPais
   * @return OK
   */
  catPaisDesactivar(idcatPais: string): __Observable<string> {
    return this.catPaisDesactivarResponse(idcatPais).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catPrioridad
   * @param idcatPrioridad Identificador de catPrioridad
   * @return OK
   */
  catPrioridadObtenerResponse(idcatPrioridad: string): __Observable<__StrictHttpResponse<CatPrioridad>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatPrioridad != null) __params = __params.set('idcatPrioridad', idcatPrioridad.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catPrioridad`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatPrioridad>;
      })
    );
  }
  /**
   * Consultar registro de catPrioridad
   * @param idcatPrioridad Identificador de catPrioridad
   * @return OK
   */
  catPrioridadObtener(idcatPrioridad: string): __Observable<CatPrioridad> {
    return this.catPrioridadObtenerResponse(idcatPrioridad).pipe(
      __map(_r => _r.body as CatPrioridad)
    );
  }

  /**
   * Guardar o actualizar catPrioridad
   * @param catPrioridad catPrioridad
   * @return OK
   */
  catPrioridadGuardarOActualizarResponse(catPrioridad: CatPrioridad): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catPrioridad;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catPrioridad`,
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
   * Guardar o actualizar catPrioridad
   * @param catPrioridad catPrioridad
   * @return OK
   */
  catPrioridadGuardarOActualizar(catPrioridad: CatPrioridad): __Observable<string> {
    return this.catPrioridadGuardarOActualizarResponse(catPrioridad).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catPrioridad
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catPrioridadQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatPrioridad>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catPrioridad`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatPrioridad>;
      })
    );
  }
  /**
   * Consultar lista paginada de catPrioridad
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catPrioridadQueryResult(info: QueryInfo): __Observable<QueryResultCatPrioridad> {
    return this.catPrioridadQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatPrioridad)
    );
  }

  /**
   * Desactivar registro de catPrioridad
   * @param idcatPrioridad Identificador de registro de catPrioridad
   * @return OK
   */
  catPrioridadDesactivarResponse(idcatPrioridad: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatPrioridad != null) __params = __params.set('idcatPrioridad', idcatPrioridad.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catPrioridad`,
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
   * Desactivar registro de catPrioridad
   * @param idcatPrioridad Identificador de registro de catPrioridad
   * @return OK
   */
  catPrioridadDesactivar(idcatPrioridad: string): __Observable<string> {
    return this.catPrioridadDesactivarResponse(idcatPrioridad).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catProceso
   * @param idCatProceso undefined
   * @return OK
   */
  catProcesoObtenerResponse(idCatProceso: string): __Observable<__StrictHttpResponse<CatProceso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatProceso != null) __params = __params.set('idCatProceso', idCatProceso.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catProceso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatProceso>;
      })
    );
  }
  /**
   * Obtener catProceso
   * @param idCatProceso undefined
   * @return OK
   */
  catProcesoObtener(idCatProceso: string): __Observable<CatProceso> {
    return this.catProcesoObtenerResponse(idCatProceso).pipe(
      __map(_r => _r.body as CatProceso)
    );
  }

  /**
   * GuardarOActualizar catProceso
   * @param catProceso undefined
   * @return OK
   */
  catProcesoGuardarOActualizarResponse(catProceso: CatProceso): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catProceso;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catProceso`,
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
   * GuardarOActualizar catProceso
   * @param catProceso undefined
   * @return OK
   */
  catProcesoGuardarOActualizar(catProceso: CatProceso): __Observable<string> {
    return this.catProcesoGuardarOActualizarResponse(catProceso).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult catProceso
   * @param info undefined
   * @return OK
   */
  catProcesoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatProceso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catProceso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatProceso>;
      })
    );
  }
  /**
   * QueryResult catProceso
   * @param info undefined
   * @return OK
   */
  catProcesoQueryResult(info: QueryInfo): __Observable<QueryResultCatProceso> {
    return this.catProcesoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatProceso)
    );
  }

  /**
   * Desactivar catProceso
   * @param idCatProceso undefined
   * @return OK
   */
  catProcesoDesactivarResponse(idCatProceso: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatProceso != null) __params = __params.set('idCatProceso', idCatProceso.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catProceso`,
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
   * Desactivar catProceso
   * @param idCatProceso undefined
   * @return OK
   */
  catProcesoDesactivar(idCatProceso: string): __Observable<string> {
    return this.catProcesoDesactivarResponse(idCatProceso).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catProcesoSistema
   * @param idCatProcesoSistema undefined
   * @return OK
   */
  catProcesoSistemaObtenerResponse(idCatProcesoSistema: string): __Observable<__StrictHttpResponse<CatProcesoSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatProcesoSistema != null) __params = __params.set('idCatProcesoSistema', idCatProcesoSistema.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catProcesoSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatProcesoSistema>;
      })
    );
  }
  /**
   * Obtener catProcesoSistema
   * @param idCatProcesoSistema undefined
   * @return OK
   */
  catProcesoSistemaObtener(idCatProcesoSistema: string): __Observable<CatProcesoSistema> {
    return this.catProcesoSistemaObtenerResponse(idCatProcesoSistema).pipe(
      __map(_r => _r.body as CatProcesoSistema)
    );
  }

  /**
   * GuardarOActualizar catProcesoSistema
   * @param catProcesoSistema undefined
   * @return OK
   */
  catProcesoSistemaGuardarOActualizarResponse(catProcesoSistema: CatProcesoSistema): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catProcesoSistema;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catProcesoSistema`,
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
   * GuardarOActualizar catProcesoSistema
   * @param catProcesoSistema undefined
   * @return OK
   */
  catProcesoSistemaGuardarOActualizar(catProcesoSistema: CatProcesoSistema): __Observable<string> {
    return this.catProcesoSistemaGuardarOActualizarResponse(catProcesoSistema).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult catProcesoSistema
   * @param info undefined
   * @return OK
   */
  catProcesoSistemaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatProcesoSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catProcesoSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatProcesoSistema>;
      })
    );
  }
  /**
   * QueryResult catProcesoSistema
   * @param info undefined
   * @return OK
   */
  catProcesoSistemaQueryResult(info: QueryInfo): __Observable<QueryResultCatProcesoSistema> {
    return this.catProcesoSistemaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatProcesoSistema)
    );
  }

  /**
   * Desactivar catProcesoSistema
   * @param idCatProcesoSistema undefined
   * @return OK
   */
  catProcesoSistemaDesactivarResponse(idCatProcesoSistema: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatProcesoSistema != null) __params = __params.set('idCatProcesoSistema', idCatProcesoSistema.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catProcesoSistema`,
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
   * Desactivar catProcesoSistema
   * @param idCatProcesoSistema undefined
   * @return OK
   */
  catProcesoSistemaDesactivar(idCatProcesoSistema: string): __Observable<string> {
    return this.catProcesoSistemaDesactivarResponse(idCatProcesoSistema).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catProductoInvestigacionSeguimiento
   * @param idcatProductoInvestigacionSeguimiento Identificador de Seguimiento de Producto en Investigacion
   * @return OK
   */
  catProductoInvestigacionSeguimientoObtenerResponse(idcatProductoInvestigacionSeguimiento: string): __Observable<__StrictHttpResponse<CatProductoInvestigacionSeguimiento>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatProductoInvestigacionSeguimiento != null) __params = __params.set('idcatProductoInvestigacionSeguimiento', idcatProductoInvestigacionSeguimiento.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catProductoInvestigacionSeguimiento`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatProductoInvestigacionSeguimiento>;
      })
    );
  }
  /**
   * Consultar registro de catProductoInvestigacionSeguimiento
   * @param idcatProductoInvestigacionSeguimiento Identificador de Seguimiento de Producto en Investigacion
   * @return OK
   */
  catProductoInvestigacionSeguimientoObtener(idcatProductoInvestigacionSeguimiento: string): __Observable<CatProductoInvestigacionSeguimiento> {
    return this.catProductoInvestigacionSeguimientoObtenerResponse(idcatProductoInvestigacionSeguimiento).pipe(
      __map(_r => _r.body as CatProductoInvestigacionSeguimiento)
    );
  }

  /**
   * Guardar o actualizar catProductoInvestigacionSeguimiento
   * @param catProductoInvestigacionSeguimiento catProductoInvestigacionSeguimiento
   * @return OK
   */
  catProductoInvestigacionSeguimientoGuardarOActualizarResponse(catProductoInvestigacionSeguimiento: CatProductoInvestigacionSeguimiento): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catProductoInvestigacionSeguimiento;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catProductoInvestigacionSeguimiento`,
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
   * Guardar o actualizar catProductoInvestigacionSeguimiento
   * @param catProductoInvestigacionSeguimiento catProductoInvestigacionSeguimiento
   * @return OK
   */
  catProductoInvestigacionSeguimientoGuardarOActualizar(catProductoInvestigacionSeguimiento: CatProductoInvestigacionSeguimiento): __Observable<string> {
    return this.catProductoInvestigacionSeguimientoGuardarOActualizarResponse(catProductoInvestigacionSeguimiento).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catProductoInvestigacionSeguimiento
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catProductoInvestigacionSeguimientoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatProductoInvestigacionSeguimiento>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catProductoInvestigacionSeguimiento`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatProductoInvestigacionSeguimiento>;
      })
    );
  }
  /**
   * Consultar lista paginada de catProductoInvestigacionSeguimiento
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catProductoInvestigacionSeguimientoQueryResult(info: QueryInfo): __Observable<QueryResultCatProductoInvestigacionSeguimiento> {
    return this.catProductoInvestigacionSeguimientoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatProductoInvestigacionSeguimiento)
    );
  }

  /**
   * Desactivar registro de catProductoInvestigacionSeguimiento
   * @param idcatProductoInvestigacionSeguimiento Identificador de registro de catProductoInvestigacionSeguimiento
   * @return OK
   */
  catProductoInvestigacionSeguimientoDesactivarResponse(idcatProductoInvestigacionSeguimiento: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatProductoInvestigacionSeguimiento != null) __params = __params.set('idcatProductoInvestigacionSeguimiento', idcatProductoInvestigacionSeguimiento.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catProductoInvestigacionSeguimiento`,
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
   * Desactivar registro de catProductoInvestigacionSeguimiento
   * @param idcatProductoInvestigacionSeguimiento Identificador de registro de catProductoInvestigacionSeguimiento
   * @return OK
   */
  catProductoInvestigacionSeguimientoDesactivar(idcatProductoInvestigacionSeguimiento: string): __Observable<string> {
    return this.catProductoInvestigacionSeguimientoDesactivarResponse(idcatProductoInvestigacionSeguimiento).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catPuesto
   * @param idcatPuesto Identificador de catPuesto
   * @return OK
   */
  catPuestoObtenerResponse(idcatPuesto: string): __Observable<__StrictHttpResponse<CatPuesto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatPuesto != null) __params = __params.set('idcatPuesto', idcatPuesto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catPuesto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatPuesto>;
      })
    );
  }
  /**
   * Consultar registro de catPuesto
   * @param idcatPuesto Identificador de catPuesto
   * @return OK
   */
  catPuestoObtener(idcatPuesto: string): __Observable<CatPuesto> {
    return this.catPuestoObtenerResponse(idcatPuesto).pipe(
      __map(_r => _r.body as CatPuesto)
    );
  }

  /**
   * Guardar o actualizar catPuesto
   * @param catPuesto catPuesto
   * @return OK
   */
  catPuestoGuardarOActualizarResponse(catPuesto: CatPuesto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catPuesto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catPuesto`,
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
   * Guardar o actualizar catPuesto
   * @param catPuesto catPuesto
   * @return OK
   */
  catPuestoGuardarOActualizar(catPuesto: CatPuesto): __Observable<string> {
    return this.catPuestoGuardarOActualizarResponse(catPuesto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catPuesto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catPuestoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatPuesto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catPuesto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatPuesto>;
      })
    );
  }
  /**
   * Consultar lista paginada de catPuesto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catPuestoQueryResult(info: QueryInfo): __Observable<QueryResultCatPuesto> {
    return this.catPuestoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatPuesto)
    );
  }

  /**
   * Desactivar registro de catPuesto
   * @param idcatPuesto Identificador de registro de catPuesto
   * @return OK
   */
  catPuestoDesactivarResponse(idcatPuesto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatPuesto != null) __params = __params.set('idcatPuesto', idcatPuesto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catPuesto`,
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
   * Desactivar registro de catPuesto
   * @param idcatPuesto Identificador de registro de catPuesto
   * @return OK
   */
  catPuestoDesactivar(idcatPuesto: string): __Observable<string> {
    return this.catPuestoDesactivarResponse(idcatPuesto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catRegimenFiscal
   * @param idcatRegimenFiscal Identificador de catRegimenFiscal
   * @return OK
   */
  catRegimenFiscalObtenerResponse(idcatRegimenFiscal: string): __Observable<__StrictHttpResponse<CatRegimenFiscal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatRegimenFiscal != null) __params = __params.set('idcatRegimenFiscal', idcatRegimenFiscal.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catRegimenFiscal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatRegimenFiscal>;
      })
    );
  }
  /**
   * Consultar registro de catRegimenFiscal
   * @param idcatRegimenFiscal Identificador de catRegimenFiscal
   * @return OK
   */
  catRegimenFiscalObtener(idcatRegimenFiscal: string): __Observable<CatRegimenFiscal> {
    return this.catRegimenFiscalObtenerResponse(idcatRegimenFiscal).pipe(
      __map(_r => _r.body as CatRegimenFiscal)
    );
  }

  /**
   * Guardar o actualizar catRegimenFiscal
   * @param catRegimenFiscal catRegimenFiscal
   * @return OK
   */
  catRegimenFiscalGuardarOActualizarResponse(catRegimenFiscal: CatRegimenFiscal): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catRegimenFiscal;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catRegimenFiscal`,
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
   * Guardar o actualizar catRegimenFiscal
   * @param catRegimenFiscal catRegimenFiscal
   * @return OK
   */
  catRegimenFiscalGuardarOActualizar(catRegimenFiscal: CatRegimenFiscal): __Observable<string> {
    return this.catRegimenFiscalGuardarOActualizarResponse(catRegimenFiscal).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catRegimenFiscal
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRegimenFiscalQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatRegimenFiscal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catRegimenFiscal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatRegimenFiscal>;
      })
    );
  }
  /**
   * Consultar lista paginada de catRegimenFiscal
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRegimenFiscalQueryResult(info: QueryInfo): __Observable<QueryResultCatRegimenFiscal> {
    return this.catRegimenFiscalQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatRegimenFiscal)
    );
  }

  /**
   * Desactivar registro de catRegimenFiscal
   * @param idcatRegimenFiscal Identificador de registro de catRegimenFiscal
   * @return OK
   */
  catRegimenFiscalDesactivarResponse(idcatRegimenFiscal: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatRegimenFiscal != null) __params = __params.set('idcatRegimenFiscal', idcatRegimenFiscal.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catRegimenFiscal`,
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
   * Desactivar registro de catRegimenFiscal
   * @param idcatRegimenFiscal Identificador de registro de catRegimenFiscal
   * @return OK
   */
  catRegimenFiscalDesactivar(idcatRegimenFiscal: string): __Observable<string> {
    return this.catRegimenFiscalDesactivarResponse(idcatRegimenFiscal).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catRestriccionDeCompra
   * @param idcatRestriccionDeCompra Identificador de catRestriccionDeCompra
   * @return OK
   */
  catRestriccionDeCompraObtenerResponse(idcatRestriccionDeCompra: string): __Observable<__StrictHttpResponse<CatRestriccionDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatRestriccionDeCompra != null) __params = __params.set('idcatRestriccionDeCompra', idcatRestriccionDeCompra.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catRestriccionDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatRestriccionDeCompra>;
      })
    );
  }
  /**
   * Consultar registro de catRestriccionDeCompra
   * @param idcatRestriccionDeCompra Identificador de catRestriccionDeCompra
   * @return OK
   */
  catRestriccionDeCompraObtener(idcatRestriccionDeCompra: string): __Observable<CatRestriccionDeCompra> {
    return this.catRestriccionDeCompraObtenerResponse(idcatRestriccionDeCompra).pipe(
      __map(_r => _r.body as CatRestriccionDeCompra)
    );
  }

  /**
   * Guardar o actualizar catRestriccionDeCompra
   * @param catRestriccionDeCompra catRestriccionDeCompra
   * @return OK
   */
  catRestriccionDeCompraGuardarOActualizarResponse(catRestriccionDeCompra: CatRestriccionDeCompra): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catRestriccionDeCompra;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catRestriccionDeCompra`,
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
   * Guardar o actualizar catRestriccionDeCompra
   * @param catRestriccionDeCompra catRestriccionDeCompra
   * @return OK
   */
  catRestriccionDeCompraGuardarOActualizar(catRestriccionDeCompra: CatRestriccionDeCompra): __Observable<string> {
    return this.catRestriccionDeCompraGuardarOActualizarResponse(catRestriccionDeCompra).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catRestriccionDeCompra
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRestriccionDeCompraQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatRestriccionDeCompra>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catRestriccionDeCompra`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatRestriccionDeCompra>;
      })
    );
  }
  /**
   * Consultar lista paginada de catRestriccionDeCompra
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRestriccionDeCompraQueryResult(info: QueryInfo): __Observable<QueryResultCatRestriccionDeCompra> {
    return this.catRestriccionDeCompraQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatRestriccionDeCompra)
    );
  }

  /**
   * Desactivar registro de catRestriccionDeCompra
   * @param idcatRestriccionDeCompra Identificador de registro de catRestriccionDeCompra
   * @return OK
   */
  catRestriccionDeCompraDesactivarResponse(idcatRestriccionDeCompra: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatRestriccionDeCompra != null) __params = __params.set('idcatRestriccionDeCompra', idcatRestriccionDeCompra.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catRestriccionDeCompra`,
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
   * Desactivar registro de catRestriccionDeCompra
   * @param idcatRestriccionDeCompra Identificador de registro de catRestriccionDeCompra
   * @return OK
   */
  catRestriccionDeCompraDesactivar(idcatRestriccionDeCompra: string): __Observable<string> {
    return this.catRestriccionDeCompraDesactivarResponse(idcatRestriccionDeCompra).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catRestriccionFlete
   * @param idcatRestriccionFlete Identificador de catRestriccionFlete
   * @return OK
   */
  catRestriccionFleteObtenerResponse(idcatRestriccionFlete: string): __Observable<__StrictHttpResponse<CatRestriccionFlete>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatRestriccionFlete != null) __params = __params.set('idcatRestriccionFlete', idcatRestriccionFlete.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catRestriccionFlete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatRestriccionFlete>;
      })
    );
  }
  /**
   * Consultar registro de catRestriccionFlete
   * @param idcatRestriccionFlete Identificador de catRestriccionFlete
   * @return OK
   */
  catRestriccionFleteObtener(idcatRestriccionFlete: string): __Observable<CatRestriccionFlete> {
    return this.catRestriccionFleteObtenerResponse(idcatRestriccionFlete).pipe(
      __map(_r => _r.body as CatRestriccionFlete)
    );
  }

  /**
   * Guardar o actualizar catRestriccionFlete
   * @param catRestriccionFlete catRestriccionFlete
   * @return OK
   */
  catRestriccionFleteGuardarOActualizarResponse(catRestriccionFlete: CatRestriccionFlete): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catRestriccionFlete;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catRestriccionFlete`,
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
   * Guardar o actualizar catRestriccionFlete
   * @param catRestriccionFlete catRestriccionFlete
   * @return OK
   */
  catRestriccionFleteGuardarOActualizar(catRestriccionFlete: CatRestriccionFlete): __Observable<string> {
    return this.catRestriccionFleteGuardarOActualizarResponse(catRestriccionFlete).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catRestriccionFlete
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRestriccionFleteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatRestriccionFlete>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catRestriccionFlete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatRestriccionFlete>;
      })
    );
  }
  /**
   * Consultar lista paginada de catRestriccionFlete
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRestriccionFleteQueryResult(info: QueryInfo): __Observable<QueryResultCatRestriccionFlete> {
    return this.catRestriccionFleteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatRestriccionFlete)
    );
  }

  /**
   * Desactivar registro de catRestriccionFlete
   * @param idcatRestriccionFlete Identificador de registro de catRestriccionFlete
   * @return OK
   */
  catRestriccionFleteDesactivarResponse(idcatRestriccionFlete: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatRestriccionFlete != null) __params = __params.set('idcatRestriccionFlete', idcatRestriccionFlete.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catRestriccionFlete`,
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
   * Desactivar registro de catRestriccionFlete
   * @param idcatRestriccionFlete Identificador de registro de catRestriccionFlete
   * @return OK
   */
  catRestriccionFleteDesactivar(idcatRestriccionFlete: string): __Observable<string> {
    return this.catRestriccionFleteDesactivarResponse(idcatRestriccionFlete).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catRevision
   * @param idCatRevision Identificador de catRevision
   * @return OK
   */
  catRevisionObtenerResponse(idCatRevision: string): __Observable<__StrictHttpResponse<CatRevision>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatRevision != null) __params = __params.set('idCatRevision', idCatRevision.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catRevision`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatRevision>;
      })
    );
  }
  /**
   * Consultar registro de catRevision
   * @param idCatRevision Identificador de catRevision
   * @return OK
   */
  catRevisionObtener(idCatRevision: string): __Observable<CatRevision> {
    return this.catRevisionObtenerResponse(idCatRevision).pipe(
      __map(_r => _r.body as CatRevision)
    );
  }

  /**
   * Guardar o actualizar catRevision
   * @param catRevision catRevision
   * @return OK
   */
  catRevisionGuardarOActualizarResponse(catRevision: CatRevision): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catRevision;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catRevision`,
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
   * Guardar o actualizar catRevision
   * @param catRevision catRevision
   * @return OK
   */
  catRevisionGuardarOActualizar(catRevision: CatRevision): __Observable<string> {
    return this.catRevisionGuardarOActualizarResponse(catRevision).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catRevision
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRevisionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatRevision>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catRevision`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatRevision>;
      })
    );
  }
  /**
   * Consultar lista paginada de catRevision
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRevisionQueryResult(info: QueryInfo): __Observable<QueryResultCatRevision> {
    return this.catRevisionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatRevision)
    );
  }

  /**
   * Desactivar registro de catRevision
   * @param idCatRevision Identificador de registro de catRevision
   * @return OK
   */
  catRevisionDesactivarResponse(idCatRevision: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatRevision != null) __params = __params.set('idCatRevision', idCatRevision.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catRevision`,
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
   * Desactivar registro de catRevision
   * @param idCatRevision Identificador de registro de catRevision
   * @return OK
   */
  catRevisionDesactivar(idCatRevision: string): __Observable<string> {
    return this.catRevisionDesactivarResponse(idCatRevision).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catRolCliente
   * @param idcatRolCliente Identificador de catRolCliente
   * @return OK
   */
  catRolClienteObtenerResponse(idcatRolCliente: string): __Observable<__StrictHttpResponse<CatRolCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatRolCliente != null) __params = __params.set('idcatRolCliente', idcatRolCliente.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catRolCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatRolCliente>;
      })
    );
  }
  /**
   * Consultar registro de catRolCliente
   * @param idcatRolCliente Identificador de catRolCliente
   * @return OK
   */
  catRolClienteObtener(idcatRolCliente: string): __Observable<CatRolCliente> {
    return this.catRolClienteObtenerResponse(idcatRolCliente).pipe(
      __map(_r => _r.body as CatRolCliente)
    );
  }

  /**
   * Guardar o actualizar catRolCliente
   * @param catRolCliente catRolCliente
   * @return OK
   */
  catRolClienteGuardarOActualizarResponse(catRolCliente: CatRolCliente): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catRolCliente;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catRolCliente`,
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
   * Guardar o actualizar catRolCliente
   * @param catRolCliente catRolCliente
   * @return OK
   */
  catRolClienteGuardarOActualizar(catRolCliente: CatRolCliente): __Observable<string> {
    return this.catRolClienteGuardarOActualizarResponse(catRolCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catRolCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRolClienteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatRolCliente>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catRolCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatRolCliente>;
      })
    );
  }
  /**
   * Consultar lista paginada de catRolCliente
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRolClienteQueryResult(info: QueryInfo): __Observable<QueryResultCatRolCliente> {
    return this.catRolClienteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatRolCliente)
    );
  }

  /**
   * Desactivar registro de catRolCliente
   * @param idcatRolCliente Identificador de registro de catRolCliente
   * @return OK
   */
  catRolClienteDesactivarResponse(idcatRolCliente: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatRolCliente != null) __params = __params.set('idcatRolCliente', idcatRolCliente.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catRolCliente`,
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
   * Desactivar registro de catRolCliente
   * @param idcatRolCliente Identificador de registro de catRolCliente
   * @return OK
   */
  catRolClienteDesactivar(idcatRolCliente: string): __Observable<string> {
    return this.catRolClienteDesactivarResponse(idcatRolCliente).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catRolProveedor
   * @param idcatRolProveedor Identificador de catRolProveedor
   * @return OK
   */
  catRolProveedorObtenerResponse(idcatRolProveedor: string): __Observable<__StrictHttpResponse<CatRolProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatRolProveedor != null) __params = __params.set('idcatRolProveedor', idcatRolProveedor.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catRolProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatRolProveedor>;
      })
    );
  }
  /**
   * Consultar registro de catRolProveedor
   * @param idcatRolProveedor Identificador de catRolProveedor
   * @return OK
   */
  catRolProveedorObtener(idcatRolProveedor: string): __Observable<CatRolProveedor> {
    return this.catRolProveedorObtenerResponse(idcatRolProveedor).pipe(
      __map(_r => _r.body as CatRolProveedor)
    );
  }

  /**
   * Guardar o actualizar catRolProveedor
   * @param catRolProveedor catRolProveedor
   * @return OK
   */
  catRolProveedorGuardarOActualizarResponse(catRolProveedor: CatRolProveedor): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catRolProveedor;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catRolProveedor`,
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
   * Guardar o actualizar catRolProveedor
   * @param catRolProveedor catRolProveedor
   * @return OK
   */
  catRolProveedorGuardarOActualizar(catRolProveedor: CatRolProveedor): __Observable<string> {
    return this.catRolProveedorGuardarOActualizarResponse(catRolProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catRolProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRolProveedorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatRolProveedor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catRolProveedor`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatRolProveedor>;
      })
    );
  }
  /**
   * Consultar lista paginada de catRolProveedor
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRolProveedorQueryResult(info: QueryInfo): __Observable<QueryResultCatRolProveedor> {
    return this.catRolProveedorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatRolProveedor)
    );
  }

  /**
   * Desactivar registro de catRolProveedor
   * @param idcatRolProveedor Identificador de registro de catRolProveedor
   * @return OK
   */
  catRolProveedorDesactivarResponse(idcatRolProveedor: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatRolProveedor != null) __params = __params.set('idcatRolProveedor', idcatRolProveedor.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catRolProveedor`,
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
   * Desactivar registro de catRolProveedor
   * @param idcatRolProveedor Identificador de registro de catRolProveedor
   * @return OK
   */
  catRolProveedorDesactivar(idcatRolProveedor: string): __Observable<string> {
    return this.catRolProveedorDesactivarResponse(idcatRolProveedor).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catRutaEntrega
   * @param idcatRutaEntrega Identificador de catRutaEntrega
   * @return OK
   */
  catRutaEntregaObtenerResponse(idcatRutaEntrega: string): __Observable<__StrictHttpResponse<CatRutaEntrega>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatRutaEntrega != null) __params = __params.set('idcatRutaEntrega', idcatRutaEntrega.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catRutaEntrega`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatRutaEntrega>;
      })
    );
  }
  /**
   * Consultar registro de catRutaEntrega
   * @param idcatRutaEntrega Identificador de catRutaEntrega
   * @return OK
   */
  catRutaEntregaObtener(idcatRutaEntrega: string): __Observable<CatRutaEntrega> {
    return this.catRutaEntregaObtenerResponse(idcatRutaEntrega).pipe(
      __map(_r => _r.body as CatRutaEntrega)
    );
  }

  /**
   * Guardar o actualizar catRutaEntrega
   * @param catRutaEntrega catRutaEntrega
   * @return OK
   */
  catRutaEntregaGuardarOActualizarResponse(catRutaEntrega: CatRutaEntrega): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catRutaEntrega;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catRutaEntrega`,
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
   * Guardar o actualizar catRutaEntrega
   * @param catRutaEntrega catRutaEntrega
   * @return OK
   */
  catRutaEntregaGuardarOActualizar(catRutaEntrega: CatRutaEntrega): __Observable<string> {
    return this.catRutaEntregaGuardarOActualizarResponse(catRutaEntrega).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catRutaEntrega
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRutaEntregaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatRutaEntrega>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catRutaEntrega`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatRutaEntrega>;
      })
    );
  }
  /**
   * Consultar lista paginada de catRutaEntrega
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catRutaEntregaQueryResult(info: QueryInfo): __Observable<QueryResultCatRutaEntrega> {
    return this.catRutaEntregaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatRutaEntrega)
    );
  }

  /**
   * Desactivar registro de catRutaEntrega
   * @param idcatRutaEntrega Identificador de registro de catRutaEntrega
   * @return OK
   */
  catRutaEntregaDesactivarResponse(idcatRutaEntrega: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatRutaEntrega != null) __params = __params.set('idcatRutaEntrega', idcatRutaEntrega.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catRutaEntrega`,
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
   * Desactivar registro de catRutaEntrega
   * @param idcatRutaEntrega Identificador de registro de catRutaEntrega
   * @return OK
   */
  catRutaEntregaDesactivar(idcatRutaEntrega: string): __Observable<string> {
    return this.catRutaEntregaDesactivarResponse(idcatRutaEntrega).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catSector
   * @param idcatSector Identificador de catSector
   * @return OK
   */
  catSectorObtenerResponse(idcatSector: string): __Observable<__StrictHttpResponse<CatSector>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatSector != null) __params = __params.set('idcatSector', idcatSector.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catSector`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatSector>;
      })
    );
  }
  /**
   * Consultar registro de catSector
   * @param idcatSector Identificador de catSector
   * @return OK
   */
  catSectorObtener(idcatSector: string): __Observable<CatSector> {
    return this.catSectorObtenerResponse(idcatSector).pipe(
      __map(_r => _r.body as CatSector)
    );
  }

  /**
   * Guardar o actualizar catSector
   * @param catSector catSector
   * @return OK
   */
  catSectorGuardarOActualizarResponse(catSector: CatSector): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catSector;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catSector`,
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
   * Guardar o actualizar catSector
   * @param catSector catSector
   * @return OK
   */
  catSectorGuardarOActualizar(catSector: CatSector): __Observable<string> {
    return this.catSectorGuardarOActualizarResponse(catSector).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catSector
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catSectorQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatSector>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catSector`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatSector>;
      })
    );
  }
  /**
   * Consultar lista paginada de catSector
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catSectorQueryResult(info: QueryInfo): __Observable<QueryResultCatSector> {
    return this.catSectorQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatSector)
    );
  }

  /**
   * Desactivar registro de catSector
   * @param idcatSector Identificador de registro de catSector
   * @return OK
   */
  catSectorDesactivarResponse(idcatSector: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatSector != null) __params = __params.set('idcatSector', idcatSector.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catSector`,
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
   * Desactivar registro de catSector
   * @param idcatSector Identificador de registro de catSector
   * @return OK
   */
  catSectorDesactivar(idcatSector: string): __Observable<string> {
    return this.catSectorDesactivarResponse(idcatSector).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Desactivar catServicioSistema
   * @param idcatServicioSistema undefined
   * @return OK
   */
  catServicioSistemaDesactivarResponse(idcatServicioSistema: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatServicioSistema != null) __params = __params.set('idcatServicioSistema', idcatServicioSistema.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/GrupoListacatServicioSistema`,
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
   * Desactivar catServicioSistema
   * @param idcatServicioSistema undefined
   * @return OK
   */
  catServicioSistemaDesactivar(idcatServicioSistema: string): __Observable<string> {
    return this.catServicioSistemaDesactivarResponse(idcatServicioSistema).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catServicioSistema
   * @param idcatServicioSistema undefined
   * @return OK
   */
  catServicioSistemaObtenerResponse(idcatServicioSistema: string): __Observable<__StrictHttpResponse<CatServicioSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatServicioSistema != null) __params = __params.set('idcatServicioSistema', idcatServicioSistema.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catServicioSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatServicioSistema>;
      })
    );
  }
  /**
   * Obtener catServicioSistema
   * @param idcatServicioSistema undefined
   * @return OK
   */
  catServicioSistemaObtener(idcatServicioSistema: string): __Observable<CatServicioSistema> {
    return this.catServicioSistemaObtenerResponse(idcatServicioSistema).pipe(
      __map(_r => _r.body as CatServicioSistema)
    );
  }

  /**
   * GuardarOActualizar catServicioSistema
   * @param GuardarOActualizar undefined
   * @return OK
   */
  catServicioSistemaGuardarOActualizarResponse(GuardarOActualizar: CatServicioSistema): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = GuardarOActualizar;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catServicioSistema`,
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
   * GuardarOActualizar catServicioSistema
   * @param GuardarOActualizar undefined
   * @return OK
   */
  catServicioSistemaGuardarOActualizar(GuardarOActualizar: CatServicioSistema): __Observable<string> {
    return this.catServicioSistemaGuardarOActualizarResponse(GuardarOActualizar).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult catServicioSistema
   * @param info undefined
   * @return OK
   */
  catServicioSistemaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatServicioSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catServicioSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatServicioSistema>;
      })
    );
  }
  /**
   * QueryResult catServicioSistema
   * @param info undefined
   * @return OK
   */
  catServicioSistemaQueryResult(info: QueryInfo): __Observable<QueryResultCatServicioSistema> {
    return this.catServicioSistemaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatServicioSistema)
    );
  }

  /**
   * Consultar registro de catSubtipoProducto
   * @param idcatSubtipoProducto Identificador de catSubtipoProducto
   * @return OK
   */
  catSubtipoProductoObtenerResponse(idcatSubtipoProducto: string): __Observable<__StrictHttpResponse<CatSubtipoProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatSubtipoProducto != null) __params = __params.set('idcatSubtipoProducto', idcatSubtipoProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catSubtipoProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatSubtipoProducto>;
      })
    );
  }
  /**
   * Consultar registro de catSubtipoProducto
   * @param idcatSubtipoProducto Identificador de catSubtipoProducto
   * @return OK
   */
  catSubtipoProductoObtener(idcatSubtipoProducto: string): __Observable<CatSubtipoProducto> {
    return this.catSubtipoProductoObtenerResponse(idcatSubtipoProducto).pipe(
      __map(_r => _r.body as CatSubtipoProducto)
    );
  }

  /**
   * Guardar o actualizar catSubtipoProducto
   * @param catSubtipoProducto catSubtipoProducto
   * @return OK
   */
  catSubtipoProductoGuardarOActualizarResponse(catSubtipoProducto: CatSubtipoProducto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catSubtipoProducto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catSubtipoProducto`,
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
   * Guardar o actualizar catSubtipoProducto
   * @param catSubtipoProducto catSubtipoProducto
   * @return OK
   */
  catSubtipoProductoGuardarOActualizar(catSubtipoProducto: CatSubtipoProducto): __Observable<string> {
    return this.catSubtipoProductoGuardarOActualizarResponse(catSubtipoProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catSubtipoProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catSubtipoProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatSubtipoProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catSubtipoProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatSubtipoProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de catSubtipoProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catSubtipoProductoQueryResult(info: QueryInfo): __Observable<QueryResultCatSubtipoProducto> {
    return this.catSubtipoProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatSubtipoProducto)
    );
  }

  /**
   * Desactivar registro de catSubtipoProducto
   * @param idcatSubtipoProducto Identificador de registro de catSubtipoProducto
   * @return OK
   */
  catSubtipoProductoDesactivarResponse(idcatSubtipoProducto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatSubtipoProducto != null) __params = __params.set('idcatSubtipoProducto', idcatSubtipoProducto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catSubtipoProducto`,
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
   * Desactivar registro de catSubtipoProducto
   * @param idcatSubtipoProducto Identificador de registro de catSubtipoProducto
   * @return OK
   */
  catSubtipoProductoDesactivar(idcatSubtipoProducto: string): __Observable<string> {
    return this.catSubtipoProductoDesactivarResponse(idcatSubtipoProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTemaComentario
   * @param idcatTemaComentario Identificador de catTemaComentario
   * @return OK
   */
  catTemaComentarioObtenerResponse(idcatTemaComentario: string): __Observable<__StrictHttpResponse<CatTemaComentario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTemaComentario != null) __params = __params.set('idcatTemaComentario', idcatTemaComentario.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTemaComentario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTemaComentario>;
      })
    );
  }
  /**
   * Consultar registro de catTemaComentario
   * @param idcatTemaComentario Identificador de catTemaComentario
   * @return OK
   */
  catTemaComentarioObtener(idcatTemaComentario: string): __Observable<CatTemaComentario> {
    return this.catTemaComentarioObtenerResponse(idcatTemaComentario).pipe(
      __map(_r => _r.body as CatTemaComentario)
    );
  }

  /**
   * Guardar o actualizar catTemaComentario
   * @param catTemaComentario catTemaComentario
   * @return OK
   */
  catTemaComentarioGuardarOActualizarResponse(catTemaComentario: CatTemaComentario): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTemaComentario;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTemaComentario`,
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
   * Guardar o actualizar catTemaComentario
   * @param catTemaComentario catTemaComentario
   * @return OK
   */
  catTemaComentarioGuardarOActualizar(catTemaComentario: CatTemaComentario): __Observable<string> {
    return this.catTemaComentarioGuardarOActualizarResponse(catTemaComentario).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTemaComentario
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTemaComentarioQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTemaComentario>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTemaComentario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTemaComentario>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTemaComentario
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTemaComentarioQueryResult(info: QueryInfo): __Observable<QueryResultCatTemaComentario> {
    return this.catTemaComentarioQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTemaComentario)
    );
  }

  /**
   * Desactivar registro de catTemaComentario
   * @param idcatTemaComentario Identificador de registro de catTemaComentario
   * @return OK
   */
  catTemaComentarioDesactivarResponse(idcatTemaComentario: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTemaComentario != null) __params = __params.set('idcatTemaComentario', idcatTemaComentario.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTemaComentario`,
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
   * Desactivar registro de catTemaComentario
   * @param idcatTemaComentario Identificador de registro de catTemaComentario
   * @return OK
   */
  catTemaComentarioDesactivar(idcatTemaComentario: string): __Observable<string> {
    return this.catTemaComentarioDesactivarResponse(idcatTemaComentario).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoAutorizacion
   * @param idcatTipoAutorizacion Identificador de catTipoAutorizacion
   * @return OK
   */
  catTipoAutorizacionObtenerResponse(idcatTipoAutorizacion: string): __Observable<__StrictHttpResponse<CatTipoAutorizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoAutorizacion != null) __params = __params.set('idcatTipoAutorizacion', idcatTipoAutorizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoAutorizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoAutorizacion>;
      })
    );
  }
  /**
   * Consultar registro de catTipoAutorizacion
   * @param idcatTipoAutorizacion Identificador de catTipoAutorizacion
   * @return OK
   */
  catTipoAutorizacionObtener(idcatTipoAutorizacion: string): __Observable<CatTipoAutorizacion> {
    return this.catTipoAutorizacionObtenerResponse(idcatTipoAutorizacion).pipe(
      __map(_r => _r.body as CatTipoAutorizacion)
    );
  }

  /**
   * Guardar o actualizar catTipoAutorizacion
   * @param catTipoAutorizacion catTipoAutorizacion
   * @return OK
   */
  catTipoAutorizacionGuardarOActualizarResponse(catTipoAutorizacion: CatTipoAutorizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoAutorizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoAutorizacion`,
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
   * Guardar o actualizar catTipoAutorizacion
   * @param catTipoAutorizacion catTipoAutorizacion
   * @return OK
   */
  catTipoAutorizacionGuardarOActualizar(catTipoAutorizacion: CatTipoAutorizacion): __Observable<string> {
    return this.catTipoAutorizacionGuardarOActualizarResponse(catTipoAutorizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoAutorizacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoAutorizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoAutorizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoAutorizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoAutorizacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoAutorizacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoAutorizacionQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoAutorizacion> {
    return this.catTipoAutorizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoAutorizacion)
    );
  }

  /**
   * Desactivar registro de catTipoAutorizacion
   * @param idcatTipoAutorizacion Identificador de registro de catTipoAutorizacion
   * @return OK
   */
  catTipoAutorizacionDesactivarResponse(idcatTipoAutorizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoAutorizacion != null) __params = __params.set('idcatTipoAutorizacion', idcatTipoAutorizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoAutorizacion`,
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
   * Desactivar registro de catTipoAutorizacion
   * @param idcatTipoAutorizacion Identificador de registro de catTipoAutorizacion
   * @return OK
   */
  catTipoAutorizacionDesactivar(idcatTipoAutorizacion: string): __Observable<string> {
    return this.catTipoAutorizacionDesactivarResponse(idcatTipoAutorizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoCampana
   * @param idcatTipoCampana Identificador de catTipoCampana
   * @return OK
   */
  catTipoCampanaObtenerResponse(idcatTipoCampana: string): __Observable<__StrictHttpResponse<CatTipoCampana>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoCampana != null) __params = __params.set('idcatTipoCampana', idcatTipoCampana.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoCampana`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoCampana>;
      })
    );
  }
  /**
   * Consultar registro de catTipoCampana
   * @param idcatTipoCampana Identificador de catTipoCampana
   * @return OK
   */
  catTipoCampanaObtener(idcatTipoCampana: string): __Observable<CatTipoCampana> {
    return this.catTipoCampanaObtenerResponse(idcatTipoCampana).pipe(
      __map(_r => _r.body as CatTipoCampana)
    );
  }

  /**
   * Guardar o actualizar catTipoCampana
   * @param catTipoCampana catTipoCampana
   * @return OK
   */
  catTipoCampanaGuardarOActualizarResponse(catTipoCampana: CatTipoCampana): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoCampana;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoCampana`,
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
   * Guardar o actualizar catTipoCampana
   * @param catTipoCampana catTipoCampana
   * @return OK
   */
  catTipoCampanaGuardarOActualizar(catTipoCampana: CatTipoCampana): __Observable<string> {
    return this.catTipoCampanaGuardarOActualizarResponse(catTipoCampana).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoCampana
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoCampanaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoCampana>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoCampana`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoCampana>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoCampana
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoCampanaQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoCampana> {
    return this.catTipoCampanaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoCampana)
    );
  }

  /**
   * Desactivar registro de catTipoCampana
   * @param idcatTipoCampana Identificador de registro de catTipoCampana
   * @return OK
   */
  catTipoCampanaDesactivarResponse(idcatTipoCampana: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoCampana != null) __params = __params.set('idcatTipoCampana', idcatTipoCampana.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoCampana`,
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
   * Desactivar registro de catTipoCampana
   * @param idcatTipoCampana Identificador de registro de catTipoCampana
   * @return OK
   */
  catTipoCampanaDesactivar(idcatTipoCampana: string): __Observable<string> {
    return this.catTipoCampanaDesactivarResponse(idcatTipoCampana).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoControl
   * @param idcatTipoControl Identificador de catTipoControl
   * @return OK
   */
  catTipoControlObtenerResponse(idcatTipoControl: string): __Observable<__StrictHttpResponse<CatTipoControl>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoControl != null) __params = __params.set('idcatTipoControl', idcatTipoControl.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoControl`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoControl>;
      })
    );
  }
  /**
   * Consultar registro de catTipoControl
   * @param idcatTipoControl Identificador de catTipoControl
   * @return OK
   */
  catTipoControlObtener(idcatTipoControl: string): __Observable<CatTipoControl> {
    return this.catTipoControlObtenerResponse(idcatTipoControl).pipe(
      __map(_r => _r.body as CatTipoControl)
    );
  }

  /**
   * Guardar o actualizar catTipoControl
   * @param catTipoControl catTipoControl
   * @return OK
   */
  catTipoControlGuardarOActualizarResponse(catTipoControl: CatTipoControl): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoControl;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoControl`,
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
   * Guardar o actualizar catTipoControl
   * @param catTipoControl catTipoControl
   * @return OK
   */
  catTipoControlGuardarOActualizar(catTipoControl: CatTipoControl): __Observable<string> {
    return this.catTipoControlGuardarOActualizarResponse(catTipoControl).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoControl
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoControlQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoControl>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoControl`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoControl>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoControl
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoControlQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoControl> {
    return this.catTipoControlQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoControl)
    );
  }

  /**
   * Desactivar registro de catTipoControl
   * @param idcatTipoControl Identificador de registro de catTipoControl
   * @return OK
   */
  catTipoControlDesactivarResponse(idcatTipoControl: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoControl != null) __params = __params.set('idcatTipoControl', idcatTipoControl.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoControl`,
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
   * Desactivar registro de catTipoControl
   * @param idcatTipoControl Identificador de registro de catTipoControl
   * @return OK
   */
  catTipoControlDesactivar(idcatTipoControl: string): __Observable<string> {
    return this.catTipoControlDesactivarResponse(idcatTipoControl).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoCotizacion
   * @param idcatTipoCotizacion Identificador de catTipoCotizacion
   * @return OK
   */
  catTipoCotizacionObtenerResponse(idcatTipoCotizacion: string): __Observable<__StrictHttpResponse<CatTipoCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoCotizacion != null) __params = __params.set('idcatTipoCotizacion', idcatTipoCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoCotizacion>;
      })
    );
  }
  /**
   * Consultar registro de catTipoCotizacion
   * @param idcatTipoCotizacion Identificador de catTipoCotizacion
   * @return OK
   */
  catTipoCotizacionObtener(idcatTipoCotizacion: string): __Observable<CatTipoCotizacion> {
    return this.catTipoCotizacionObtenerResponse(idcatTipoCotizacion).pipe(
      __map(_r => _r.body as CatTipoCotizacion)
    );
  }

  /**
   * Guardar o actualizar catTipoCotizacion
   * @param catTipoCotizacion catTipoCotizacion
   * @return OK
   */
  catTipoCotizacionGuardarOActualizarResponse(catTipoCotizacion: CatTipoCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoCotizacion`,
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
   * Guardar o actualizar catTipoCotizacion
   * @param catTipoCotizacion catTipoCotizacion
   * @return OK
   */
  catTipoCotizacionGuardarOActualizar(catTipoCotizacion: CatTipoCotizacion): __Observable<string> {
    return this.catTipoCotizacionGuardarOActualizarResponse(catTipoCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoCotizacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoCotizacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoCotizacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoCotizacion> {
    return this.catTipoCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoCotizacion)
    );
  }

  /**
   * Desactivar registro de catTipoCotizacion
   * @param idcatTipoCotizacion Identificador de registro de catTipoCotizacion
   * @return OK
   */
  catTipoCotizacionDesactivarResponse(idcatTipoCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoCotizacion != null) __params = __params.set('idcatTipoCotizacion', idcatTipoCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoCotizacion`,
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
   * Desactivar registro de catTipoCotizacion
   * @param idcatTipoCotizacion Identificador de registro de catTipoCotizacion
   * @return OK
   */
  catTipoCotizacionDesactivar(idcatTipoCotizacion: string): __Observable<string> {
    return this.catTipoCotizacionDesactivarResponse(idcatTipoCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoCuenta
   * @param idcatTipoCuenta Identificador de catTipoCuenta
   * @return OK
   */
  catTipoCuentaObtenerResponse(idcatTipoCuenta: string): __Observable<__StrictHttpResponse<CatTipoCuenta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoCuenta != null) __params = __params.set('idcatTipoCuenta', idcatTipoCuenta.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoCuenta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoCuenta>;
      })
    );
  }
  /**
   * Consultar registro de catTipoCuenta
   * @param idcatTipoCuenta Identificador de catTipoCuenta
   * @return OK
   */
  catTipoCuentaObtener(idcatTipoCuenta: string): __Observable<CatTipoCuenta> {
    return this.catTipoCuentaObtenerResponse(idcatTipoCuenta).pipe(
      __map(_r => _r.body as CatTipoCuenta)
    );
  }

  /**
   * Guardar o actualizar catTipoCuenta
   * @param catTipoCuenta catTipoCuenta
   * @return OK
   */
  catTipoCuentaGuardarOActualizarResponse(catTipoCuenta: CatTipoCuenta): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoCuenta;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoCuenta`,
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
   * Guardar o actualizar catTipoCuenta
   * @param catTipoCuenta catTipoCuenta
   * @return OK
   */
  catTipoCuentaGuardarOActualizar(catTipoCuenta: CatTipoCuenta): __Observable<string> {
    return this.catTipoCuentaGuardarOActualizarResponse(catTipoCuenta).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoCuenta
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoCuentaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoCuenta>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoCuenta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoCuenta>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoCuenta
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoCuentaQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoCuenta> {
    return this.catTipoCuentaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoCuenta)
    );
  }

  /**
   * Desactivar registro de catTipoCuenta
   * @param idcatTipoCuenta Identificador de registro de catTipoCuenta
   * @return OK
   */
  catTipoCuentaDesactivarResponse(idcatTipoCuenta: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoCuenta != null) __params = __params.set('idcatTipoCuenta', idcatTipoCuenta.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoCuenta`,
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
   * Desactivar registro de catTipoCuenta
   * @param idcatTipoCuenta Identificador de registro de catTipoCuenta
   * @return OK
   */
  catTipoCuentaDesactivar(idcatTipoCuenta: string): __Observable<string> {
    return this.catTipoCuentaDesactivarResponse(idcatTipoCuenta).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoCuentaContable
   * @param idcatTipoCuentaContable Identificador de catTipoCuentaContable
   * @return OK
   */
  catTipoCuentaContableObtenerResponse(idcatTipoCuentaContable: string): __Observable<__StrictHttpResponse<CatTipoCuentaContable>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoCuentaContable != null) __params = __params.set('idcatTipoCuentaContable', idcatTipoCuentaContable.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoCuentaContable`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoCuentaContable>;
      })
    );
  }
  /**
   * Consultar registro de catTipoCuentaContable
   * @param idcatTipoCuentaContable Identificador de catTipoCuentaContable
   * @return OK
   */
  catTipoCuentaContableObtener(idcatTipoCuentaContable: string): __Observable<CatTipoCuentaContable> {
    return this.catTipoCuentaContableObtenerResponse(idcatTipoCuentaContable).pipe(
      __map(_r => _r.body as CatTipoCuentaContable)
    );
  }

  /**
   * Guardar o actualizar catTipoCuentaContable
   * @param catTipoCuentaContable catTipoCuentaContable
   * @return OK
   */
  catTipoCuentaContableGuardarOActualizarResponse(catTipoCuentaContable: CatTipoCuentaContable): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoCuentaContable;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoCuentaContable`,
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
   * Guardar o actualizar catTipoCuentaContable
   * @param catTipoCuentaContable catTipoCuentaContable
   * @return OK
   */
  catTipoCuentaContableGuardarOActualizar(catTipoCuentaContable: CatTipoCuentaContable): __Observable<string> {
    return this.catTipoCuentaContableGuardarOActualizarResponse(catTipoCuentaContable).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoCuentaContable
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoCuentaContableQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoCuentaContable>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoCuentaContable`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoCuentaContable>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoCuentaContable
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoCuentaContableQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoCuentaContable> {
    return this.catTipoCuentaContableQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoCuentaContable)
    );
  }

  /**
   * Desactivar registro de catTipoCuentaContable
   * @param idcatTipoCuentaContable Identificador de registro de catTipoCuentaContable
   * @return OK
   */
  catTipoCuentaContableDesactivarResponse(idcatTipoCuentaContable: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoCuentaContable != null) __params = __params.set('idcatTipoCuentaContable', idcatTipoCuentaContable.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoCuentaContable`,
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
   * Desactivar registro de catTipoCuentaContable
   * @param idcatTipoCuentaContable Identificador de registro de catTipoCuentaContable
   * @return OK
   */
  catTipoCuentaContableDesactivar(idcatTipoCuentaContable: string): __Observable<string> {
    return this.catTipoCuentaContableDesactivarResponse(idcatTipoCuentaContable).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoDireccion
   * @param idcatTipoDireccion Identificador de catTipoDireccion
   * @return OK
   */
  catTipoDireccionObtenerResponse(idcatTipoDireccion: string): __Observable<__StrictHttpResponse<CatTipoDireccion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoDireccion != null) __params = __params.set('idcatTipoDireccion', idcatTipoDireccion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoDireccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoDireccion>;
      })
    );
  }
  /**
   * Consultar registro de catTipoDireccion
   * @param idcatTipoDireccion Identificador de catTipoDireccion
   * @return OK
   */
  catTipoDireccionObtener(idcatTipoDireccion: string): __Observable<CatTipoDireccion> {
    return this.catTipoDireccionObtenerResponse(idcatTipoDireccion).pipe(
      __map(_r => _r.body as CatTipoDireccion)
    );
  }

  /**
   * Guardar o actualizar catTipoDireccion
   * @param catTipoDireccion catTipoDireccion
   * @return OK
   */
  catTipoDireccionGuardarOActualizarResponse(catTipoDireccion: CatTipoDireccion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoDireccion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoDireccion`,
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
   * Guardar o actualizar catTipoDireccion
   * @param catTipoDireccion catTipoDireccion
   * @return OK
   */
  catTipoDireccionGuardarOActualizar(catTipoDireccion: CatTipoDireccion): __Observable<string> {
    return this.catTipoDireccionGuardarOActualizarResponse(catTipoDireccion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoDireccion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoDireccionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoDireccion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoDireccion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoDireccion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoDireccion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoDireccionQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoDireccion> {
    return this.catTipoDireccionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoDireccion)
    );
  }

  /**
   * Desactivar registro de catTipoDireccion
   * @param idcatTipoDireccion Identificador de registro de catTipoDireccion
   * @return OK
   */
  catTipoDireccionDesactivarResponse(idcatTipoDireccion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoDireccion != null) __params = __params.set('idcatTipoDireccion', idcatTipoDireccion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoDireccion`,
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
   * Desactivar registro de catTipoDireccion
   * @param idcatTipoDireccion Identificador de registro de catTipoDireccion
   * @return OK
   */
  catTipoDireccionDesactivar(idcatTipoDireccion: string): __Observable<string> {
    return this.catTipoDireccionDesactivarResponse(idcatTipoDireccion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoDocumento
   * @param idcatTipoDocumento Identificador de catTipoDocumento
   * @return OK
   */
  catTipoDocumentoObtenerResponse(idcatTipoDocumento: string): __Observable<__StrictHttpResponse<CatTipoDocumento>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoDocumento != null) __params = __params.set('idcatTipoDocumento', idcatTipoDocumento.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoDocumento`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoDocumento>;
      })
    );
  }
  /**
   * Consultar registro de catTipoDocumento
   * @param idcatTipoDocumento Identificador de catTipoDocumento
   * @return OK
   */
  catTipoDocumentoObtener(idcatTipoDocumento: string): __Observable<CatTipoDocumento> {
    return this.catTipoDocumentoObtenerResponse(idcatTipoDocumento).pipe(
      __map(_r => _r.body as CatTipoDocumento)
    );
  }

  /**
   * Guardar o actualizar catTipoDocumento
   * @param catTipoDocumento catTipoDocumento
   * @return OK
   */
  catTipoDocumentoGuardarOActualizarResponse(catTipoDocumento: CatTipoDocumento): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoDocumento;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoDocumento`,
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
   * Guardar o actualizar catTipoDocumento
   * @param catTipoDocumento catTipoDocumento
   * @return OK
   */
  catTipoDocumentoGuardarOActualizar(catTipoDocumento: CatTipoDocumento): __Observable<string> {
    return this.catTipoDocumentoGuardarOActualizarResponse(catTipoDocumento).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoDocumento
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoDocumentoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoDocumento>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoDocumento`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoDocumento>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoDocumento
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoDocumentoQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoDocumento> {
    return this.catTipoDocumentoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoDocumento)
    );
  }

  /**
   * Desactivar registro de catTipoDocumento
   * @param idcatTipoDocumento Identificador de registro de catTipoDocumento
   * @return OK
   */
  catTipoDocumentoDesactivarResponse(idcatTipoDocumento: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoDocumento != null) __params = __params.set('idcatTipoDocumento', idcatTipoDocumento.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoDocumento`,
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
   * Desactivar registro de catTipoDocumento
   * @param idcatTipoDocumento Identificador de registro de catTipoDocumento
   * @return OK
   */
  catTipoDocumentoDesactivar(idcatTipoDocumento: string): __Observable<string> {
    return this.catTipoDocumentoDesactivarResponse(idcatTipoDocumento).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoNumeroTelefonico
   * @param idcatTipoNumeroTelefonico Identificador de catTipoNumeroTelefonico
   * @return OK
   */
  catTipoNumeroTelefonicoObtenerResponse(idcatTipoNumeroTelefonico: string): __Observable<__StrictHttpResponse<CatTipoNumeroTelefonico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoNumeroTelefonico != null) __params = __params.set('idcatTipoNumeroTelefonico', idcatTipoNumeroTelefonico.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoNumeroTelefonico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoNumeroTelefonico>;
      })
    );
  }
  /**
   * Consultar registro de catTipoNumeroTelefonico
   * @param idcatTipoNumeroTelefonico Identificador de catTipoNumeroTelefonico
   * @return OK
   */
  catTipoNumeroTelefonicoObtener(idcatTipoNumeroTelefonico: string): __Observable<CatTipoNumeroTelefonico> {
    return this.catTipoNumeroTelefonicoObtenerResponse(idcatTipoNumeroTelefonico).pipe(
      __map(_r => _r.body as CatTipoNumeroTelefonico)
    );
  }

  /**
   * Guardar o actualizar catTipoNumeroTelefonico
   * @param catTipoNumeroTelefonico catTipoNumeroTelefonico
   * @return OK
   */
  catTipoNumeroTelefonicoGuardarOActualizarResponse(catTipoNumeroTelefonico: CatTipoNumeroTelefonico): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoNumeroTelefonico;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoNumeroTelefonico`,
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
   * Guardar o actualizar catTipoNumeroTelefonico
   * @param catTipoNumeroTelefonico catTipoNumeroTelefonico
   * @return OK
   */
  catTipoNumeroTelefonicoGuardarOActualizar(catTipoNumeroTelefonico: CatTipoNumeroTelefonico): __Observable<string> {
    return this.catTipoNumeroTelefonicoGuardarOActualizarResponse(catTipoNumeroTelefonico).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoNumeroTelefonico
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoNumeroTelefonicoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoNumeroTelefonico>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoNumeroTelefonico`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoNumeroTelefonico>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoNumeroTelefonico
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoNumeroTelefonicoQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoNumeroTelefonico> {
    return this.catTipoNumeroTelefonicoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoNumeroTelefonico)
    );
  }

  /**
   * Desactivar registro de catTipoNumeroTelefonico
   * @param idcatTipoNumeroTelefonico Identificador de registro de catTipoNumeroTelefonico
   * @return OK
   */
  catTipoNumeroTelefonicoDesactivarResponse(idcatTipoNumeroTelefonico: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoNumeroTelefonico != null) __params = __params.set('idcatTipoNumeroTelefonico', idcatTipoNumeroTelefonico.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoNumeroTelefonico`,
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
   * Desactivar registro de catTipoNumeroTelefonico
   * @param idcatTipoNumeroTelefonico Identificador de registro de catTipoNumeroTelefonico
   * @return OK
   */
  catTipoNumeroTelefonicoDesactivar(idcatTipoNumeroTelefonico: string): __Observable<string> {
    return this.catTipoNumeroTelefonicoDesactivarResponse(idcatTipoNumeroTelefonico).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener catTipoPartidaCotizacion
   * @param idCatTipoPartidaCotizacion undefined
   * @return OK
   */
  catTipoPartidaCotizacionObtenerResponse(idCatTipoPartidaCotizacion: string): __Observable<__StrictHttpResponse<CatTipoPartidaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatTipoPartidaCotizacion != null) __params = __params.set('idCatTipoPartidaCotizacion', idCatTipoPartidaCotizacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoPartidaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoPartidaCotizacion>;
      })
    );
  }
  /**
   * Obtener catTipoPartidaCotizacion
   * @param idCatTipoPartidaCotizacion undefined
   * @return OK
   */
  catTipoPartidaCotizacionObtener(idCatTipoPartidaCotizacion: string): __Observable<CatTipoPartidaCotizacion> {
    return this.catTipoPartidaCotizacionObtenerResponse(idCatTipoPartidaCotizacion).pipe(
      __map(_r => _r.body as CatTipoPartidaCotizacion)
    );
  }

  /**
   * GuardarOActualizar catTipoPartidaCotizacion
   * @param catTipoPartidaCotizacion undefined
   * @return OK
   */
  catTipoPartidaCotizacionGuardarOActualizarResponse(catTipoPartidaCotizacion: CatTipoPartidaCotizacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoPartidaCotizacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoPartidaCotizacion`,
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
   * GuardarOActualizar catTipoPartidaCotizacion
   * @param catTipoPartidaCotizacion undefined
   * @return OK
   */
  catTipoPartidaCotizacionGuardarOActualizar(catTipoPartidaCotizacion: CatTipoPartidaCotizacion): __Observable<string> {
    return this.catTipoPartidaCotizacionGuardarOActualizarResponse(catTipoPartidaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult catTipoPartidaCotizacion
   * @param info undefined
   * @return OK
   */
  catTipoPartidaCotizacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoPartidaCotizacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoPartidaCotizacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoPartidaCotizacion>;
      })
    );
  }
  /**
   * QueryResult catTipoPartidaCotizacion
   * @param info undefined
   * @return OK
   */
  catTipoPartidaCotizacionQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoPartidaCotizacion> {
    return this.catTipoPartidaCotizacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoPartidaCotizacion)
    );
  }

  /**
   * Desactivar catTipoPartidaCotizacion
   * @param idCatTipoPartidaCotizacion undefined
   * @return OK
   */
  catTipoPartidaCotizacionDesactivarResponse(idCatTipoPartidaCotizacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCatTipoPartidaCotizacion != null) __params = __params.set('idCatTipoPartidaCotizacion', idCatTipoPartidaCotizacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoPartidaCotizacion`,
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
   * Desactivar catTipoPartidaCotizacion
   * @param idCatTipoPartidaCotizacion undefined
   * @return OK
   */
  catTipoPartidaCotizacionDesactivar(idCatTipoPartidaCotizacion: string): __Observable<string> {
    return this.catTipoPartidaCotizacionDesactivarResponse(idCatTipoPartidaCotizacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoPermiso
   * @param idcatTipoPermiso Identificador de catTipoPermiso
   * @return OK
   */
  catTipoPermisoObtenerResponse(idcatTipoPermiso: string): __Observable<__StrictHttpResponse<CatTipoPermiso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoPermiso != null) __params = __params.set('idcatTipoPermiso', idcatTipoPermiso.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoPermiso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoPermiso>;
      })
    );
  }
  /**
   * Consultar registro de catTipoPermiso
   * @param idcatTipoPermiso Identificador de catTipoPermiso
   * @return OK
   */
  catTipoPermisoObtener(idcatTipoPermiso: string): __Observable<CatTipoPermiso> {
    return this.catTipoPermisoObtenerResponse(idcatTipoPermiso).pipe(
      __map(_r => _r.body as CatTipoPermiso)
    );
  }

  /**
   * Guardar o actualizar catTipoPermiso
   * @param catTipoPermiso catTipoPermiso
   * @return OK
   */
  catTipoPermisoGuardarOActualizarResponse(catTipoPermiso: CatTipoPermiso): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoPermiso;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoPermiso`,
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
   * Guardar o actualizar catTipoPermiso
   * @param catTipoPermiso catTipoPermiso
   * @return OK
   */
  catTipoPermisoGuardarOActualizar(catTipoPermiso: CatTipoPermiso): __Observable<string> {
    return this.catTipoPermisoGuardarOActualizarResponse(catTipoPermiso).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoPermiso
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoPermisoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoPermiso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoPermiso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoPermiso>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoPermiso
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoPermisoQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoPermiso> {
    return this.catTipoPermisoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoPermiso)
    );
  }

  /**
   * Desactivar registro de catTipoPermiso
   * @param idcatTipoPermiso Identificador de registro de catTipoPermiso
   * @return OK
   */
  catTipoPermisoDesactivarResponse(idcatTipoPermiso: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoPermiso != null) __params = __params.set('idcatTipoPermiso', idcatTipoPermiso.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoPermiso`,
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
   * Desactivar registro de catTipoPermiso
   * @param idcatTipoPermiso Identificador de registro de catTipoPermiso
   * @return OK
   */
  catTipoPermisoDesactivar(idcatTipoPermiso: string): __Observable<string> {
    return this.catTipoPermisoDesactivarResponse(idcatTipoPermiso).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoPresentacion
   * @param idcatTipoPresentacion Identificador de catTipoPresentacion
   * @return OK
   */
  catTipoPresentacionObtenerResponse(idcatTipoPresentacion: string): __Observable<__StrictHttpResponse<CatTipoPresentacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoPresentacion != null) __params = __params.set('idcatTipoPresentacion', idcatTipoPresentacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoPresentacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoPresentacion>;
      })
    );
  }
  /**
   * Consultar registro de catTipoPresentacion
   * @param idcatTipoPresentacion Identificador de catTipoPresentacion
   * @return OK
   */
  catTipoPresentacionObtener(idcatTipoPresentacion: string): __Observable<CatTipoPresentacion> {
    return this.catTipoPresentacionObtenerResponse(idcatTipoPresentacion).pipe(
      __map(_r => _r.body as CatTipoPresentacion)
    );
  }

  /**
   * Guardar o actualizar catTipoPresentacion
   * @param catTipoPresentacion catTipoPresentacion
   * @return OK
   */
  catTipoPresentacionGuardarOActualizarResponse(catTipoPresentacion: CatTipoPresentacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoPresentacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoPresentacion`,
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
   * Guardar o actualizar catTipoPresentacion
   * @param catTipoPresentacion catTipoPresentacion
   * @return OK
   */
  catTipoPresentacionGuardarOActualizar(catTipoPresentacion: CatTipoPresentacion): __Observable<string> {
    return this.catTipoPresentacionGuardarOActualizarResponse(catTipoPresentacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoPresentacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoPresentacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoPresentacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoPresentacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoPresentacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoPresentacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoPresentacionQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoPresentacion> {
    return this.catTipoPresentacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoPresentacion)
    );
  }

  /**
   * Desactivar registro de catTipoPresentacion
   * @param idcatTipoPresentacion Identificador de registro de catTipoPresentacion
   * @return OK
   */
  catTipoPresentacionDesactivarResponse(idcatTipoPresentacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoPresentacion != null) __params = __params.set('idcatTipoPresentacion', idcatTipoPresentacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoPresentacion`,
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
   * Desactivar registro de catTipoPresentacion
   * @param idcatTipoPresentacion Identificador de registro de catTipoPresentacion
   * @return OK
   */
  catTipoPresentacionDesactivar(idcatTipoPresentacion: string): __Observable<string> {
    return this.catTipoPresentacionDesactivarResponse(idcatTipoPresentacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoProducto
   * @param idcatTipoProducto Identificador de catTipoProducto
   * @return OK
   */
  catTipoProductoObtenerResponse(idcatTipoProducto: string): __Observable<__StrictHttpResponse<CatTipoProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoProducto != null) __params = __params.set('idcatTipoProducto', idcatTipoProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoProducto>;
      })
    );
  }
  /**
   * Consultar registro de catTipoProducto
   * @param idcatTipoProducto Identificador de catTipoProducto
   * @return OK
   */
  catTipoProductoObtener(idcatTipoProducto: string): __Observable<CatTipoProducto> {
    return this.catTipoProductoObtenerResponse(idcatTipoProducto).pipe(
      __map(_r => _r.body as CatTipoProducto)
    );
  }

  /**
   * Guardar o actualizar catTipoProducto
   * @param catTipoProducto catTipoProducto
   * @return OK
   */
  catTipoProductoGuardarOActualizarResponse(catTipoProducto: CatTipoProducto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoProducto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoProducto`,
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
   * Guardar o actualizar catTipoProducto
   * @param catTipoProducto catTipoProducto
   * @return OK
   */
  catTipoProductoGuardarOActualizar(catTipoProducto: CatTipoProducto): __Observable<string> {
    return this.catTipoProductoGuardarOActualizarResponse(catTipoProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoProductoQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoProducto> {
    return this.catTipoProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoProducto)
    );
  }

  /**
   * Desactivar registro de catTipoProducto
   * @param idcatTipoProducto Identificador de registro de catTipoProducto
   * @return OK
   */
  catTipoProductoDesactivarResponse(idcatTipoProducto: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoProducto != null) __params = __params.set('idcatTipoProducto', idcatTipoProducto.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoProducto`,
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
   * Desactivar registro de catTipoProducto
   * @param idcatTipoProducto Identificador de registro de catTipoProducto
   * @return OK
   */
  catTipoProductoDesactivar(idcatTipoProducto: string): __Observable<string> {
    return this.catTipoProductoDesactivarResponse(idcatTipoProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoSociedadMercantil
   * @param idcatTipoSociedadMercantil Identificador de catTipoSociedadMercantil
   * @return OK
   */
  catTipoSociedadMercantilObtenerResponse(idcatTipoSociedadMercantil: string): __Observable<__StrictHttpResponse<CatTipoSociedadMercantil>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoSociedadMercantil != null) __params = __params.set('idcatTipoSociedadMercantil', idcatTipoSociedadMercantil.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoSociedadMercantil`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoSociedadMercantil>;
      })
    );
  }
  /**
   * Consultar registro de catTipoSociedadMercantil
   * @param idcatTipoSociedadMercantil Identificador de catTipoSociedadMercantil
   * @return OK
   */
  catTipoSociedadMercantilObtener(idcatTipoSociedadMercantil: string): __Observable<CatTipoSociedadMercantil> {
    return this.catTipoSociedadMercantilObtenerResponse(idcatTipoSociedadMercantil).pipe(
      __map(_r => _r.body as CatTipoSociedadMercantil)
    );
  }

  /**
   * Guardar o actualizar catTipoSociedadMercantil
   * @param catTipoSociedadMercantil catTipoSociedadMercantil
   * @return OK
   */
  catTipoSociedadMercantilGuardarOActualizarResponse(catTipoSociedadMercantil: CatTipoSociedadMercantil): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoSociedadMercantil;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoSociedadMercantil`,
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
   * Guardar o actualizar catTipoSociedadMercantil
   * @param catTipoSociedadMercantil catTipoSociedadMercantil
   * @return OK
   */
  catTipoSociedadMercantilGuardarOActualizar(catTipoSociedadMercantil: CatTipoSociedadMercantil): __Observable<string> {
    return this.catTipoSociedadMercantilGuardarOActualizarResponse(catTipoSociedadMercantil).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoSociedadMercantil
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoSociedadMercantilQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoSociedadMercantil>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoSociedadMercantil`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoSociedadMercantil>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoSociedadMercantil
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoSociedadMercantilQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoSociedadMercantil> {
    return this.catTipoSociedadMercantilQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoSociedadMercantil)
    );
  }

  /**
   * Desactivar registro de catTipoSociedadMercantil
   * @param idcatTipoSociedadMercantil Identificador de registro de catTipoSociedadMercantil
   * @return OK
   */
  catTipoSociedadMercantilDesactivarResponse(idcatTipoSociedadMercantil: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoSociedadMercantil != null) __params = __params.set('idcatTipoSociedadMercantil', idcatTipoSociedadMercantil.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoSociedadMercantil`,
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
   * Desactivar registro de catTipoSociedadMercantil
   * @param idcatTipoSociedadMercantil Identificador de registro de catTipoSociedadMercantil
   * @return OK
   */
  catTipoSociedadMercantilDesactivar(idcatTipoSociedadMercantil: string): __Observable<string> {
    return this.catTipoSociedadMercantilDesactivarResponse(idcatTipoSociedadMercantil).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoValidacion
   * @param idcatTipoValidacion Identificador de catTipoValidacion
   * @return OK
   */
  catTipoValidacionObtenerResponse(idcatTipoValidacion: string): __Observable<__StrictHttpResponse<CatTipoValidacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoValidacion != null) __params = __params.set('idcatTipoValidacion', idcatTipoValidacion.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoValidacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoValidacion>;
      })
    );
  }
  /**
   * Consultar registro de catTipoValidacion
   * @param idcatTipoValidacion Identificador de catTipoValidacion
   * @return OK
   */
  catTipoValidacionObtener(idcatTipoValidacion: string): __Observable<CatTipoValidacion> {
    return this.catTipoValidacionObtenerResponse(idcatTipoValidacion).pipe(
      __map(_r => _r.body as CatTipoValidacion)
    );
  }

  /**
   * Guardar o actualizar catTipoValidacion
   * @param catTipoValidacion catTipoValidacion
   * @return OK
   */
  catTipoValidacionGuardarOActualizarResponse(catTipoValidacion: CatTipoValidacion): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoValidacion;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoValidacion`,
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
   * Guardar o actualizar catTipoValidacion
   * @param catTipoValidacion catTipoValidacion
   * @return OK
   */
  catTipoValidacionGuardarOActualizar(catTipoValidacion: CatTipoValidacion): __Observable<string> {
    return this.catTipoValidacionGuardarOActualizarResponse(catTipoValidacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoValidacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoValidacionQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoValidacion>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoValidacion`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoValidacion>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoValidacion
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoValidacionQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoValidacion> {
    return this.catTipoValidacionQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoValidacion)
    );
  }

  /**
   * Desactivar registro de catTipoValidacion
   * @param idcatTipoValidacion Identificador de registro de catTipoValidacion
   * @return OK
   */
  catTipoValidacionDesactivarResponse(idcatTipoValidacion: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoValidacion != null) __params = __params.set('idcatTipoValidacion', idcatTipoValidacion.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoValidacion`,
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
   * Desactivar registro de catTipoValidacion
   * @param idcatTipoValidacion Identificador de registro de catTipoValidacion
   * @return OK
   */
  catTipoValidacionDesactivar(idcatTipoValidacion: string): __Observable<string> {
    return this.catTipoValidacionDesactivarResponse(idcatTipoValidacion).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catTipoVehiculo
   * @param idcatTipoVehiculo Identificador de catTipoVehiculo
   * @return OK
   */
  catTipoVehiculoObtenerResponse(idcatTipoVehiculo: string): __Observable<__StrictHttpResponse<CatTipoVehiculo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoVehiculo != null) __params = __params.set('idcatTipoVehiculo', idcatTipoVehiculo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catTipoVehiculo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatTipoVehiculo>;
      })
    );
  }
  /**
   * Consultar registro de catTipoVehiculo
   * @param idcatTipoVehiculo Identificador de catTipoVehiculo
   * @return OK
   */
  catTipoVehiculoObtener(idcatTipoVehiculo: string): __Observable<CatTipoVehiculo> {
    return this.catTipoVehiculoObtenerResponse(idcatTipoVehiculo).pipe(
      __map(_r => _r.body as CatTipoVehiculo)
    );
  }

  /**
   * Guardar o actualizar catTipoVehiculo
   * @param catTipoVehiculo catTipoVehiculo
   * @return OK
   */
  catTipoVehiculoGuardarOActualizarResponse(catTipoVehiculo: CatTipoVehiculo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catTipoVehiculo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catTipoVehiculo`,
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
   * Guardar o actualizar catTipoVehiculo
   * @param catTipoVehiculo catTipoVehiculo
   * @return OK
   */
  catTipoVehiculoGuardarOActualizar(catTipoVehiculo: CatTipoVehiculo): __Observable<string> {
    return this.catTipoVehiculoGuardarOActualizarResponse(catTipoVehiculo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catTipoVehiculo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoVehiculoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatTipoVehiculo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catTipoVehiculo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatTipoVehiculo>;
      })
    );
  }
  /**
   * Consultar lista paginada de catTipoVehiculo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catTipoVehiculoQueryResult(info: QueryInfo): __Observable<QueryResultCatTipoVehiculo> {
    return this.catTipoVehiculoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatTipoVehiculo)
    );
  }

  /**
   * Desactivar registro de catTipoVehiculo
   * @param idcatTipoVehiculo Identificador de registro de catTipoVehiculo
   * @return OK
   */
  catTipoVehiculoDesactivarResponse(idcatTipoVehiculo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatTipoVehiculo != null) __params = __params.set('idcatTipoVehiculo', idcatTipoVehiculo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catTipoVehiculo`,
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
   * Desactivar registro de catTipoVehiculo
   * @param idcatTipoVehiculo Identificador de registro de catTipoVehiculo
   * @return OK
   */
  catTipoVehiculoDesactivar(idcatTipoVehiculo: string): __Observable<string> {
    return this.catTipoVehiculoDesactivarResponse(idcatTipoVehiculo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catUnidad
   * @param idcatUnidad Identificador de catUnidad
   * @return OK
   */
  catUnidadObtenerResponse(idcatUnidad: string): __Observable<__StrictHttpResponse<CatUnidad>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatUnidad != null) __params = __params.set('idcatUnidad', idcatUnidad.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catUnidad`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatUnidad>;
      })
    );
  }
  /**
   * Consultar registro de catUnidad
   * @param idcatUnidad Identificador de catUnidad
   * @return OK
   */
  catUnidadObtener(idcatUnidad: string): __Observable<CatUnidad> {
    return this.catUnidadObtenerResponse(idcatUnidad).pipe(
      __map(_r => _r.body as CatUnidad)
    );
  }

  /**
   * Guardar o actualizar catUnidad
   * @param catUnidad catUnidad
   * @return OK
   */
  catUnidadGuardarOActualizarResponse(catUnidad: CatUnidad): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catUnidad;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catUnidad`,
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
   * Guardar o actualizar catUnidad
   * @param catUnidad catUnidad
   * @return OK
   */
  catUnidadGuardarOActualizar(catUnidad: CatUnidad): __Observable<string> {
    return this.catUnidadGuardarOActualizarResponse(catUnidad).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catUnidad
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catUnidadQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatUnidad>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catUnidad`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatUnidad>;
      })
    );
  }
  /**
   * Consultar lista paginada de catUnidad
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catUnidadQueryResult(info: QueryInfo): __Observable<QueryResultCatUnidad> {
    return this.catUnidadQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatUnidad)
    );
  }

  /**
   * Desactivar registro de catUnidad
   * @param idcatUnidad Identificador de registro de catUnidad
   * @return OK
   */
  catUnidadDesactivarResponse(idcatUnidad: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatUnidad != null) __params = __params.set('idcatUnidad', idcatUnidad.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catUnidad`,
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
   * Desactivar registro de catUnidad
   * @param idcatUnidad Identificador de registro de catUnidad
   * @return OK
   */
  catUnidadDesactivar(idcatUnidad: string): __Observable<string> {
    return this.catUnidadDesactivarResponse(idcatUnidad).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catUnidadFlete
   * @param idcatUnidadFlete Identificador de catUnidadFlete
   * @return OK
   */
  catUnidadFleteObtenerResponse(idcatUnidadFlete: string): __Observable<__StrictHttpResponse<CatUnidadFlete>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatUnidadFlete != null) __params = __params.set('idcatUnidadFlete', idcatUnidadFlete.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catUnidadFlete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatUnidadFlete>;
      })
    );
  }
  /**
   * Consultar registro de catUnidadFlete
   * @param idcatUnidadFlete Identificador de catUnidadFlete
   * @return OK
   */
  catUnidadFleteObtener(idcatUnidadFlete: string): __Observable<CatUnidadFlete> {
    return this.catUnidadFleteObtenerResponse(idcatUnidadFlete).pipe(
      __map(_r => _r.body as CatUnidadFlete)
    );
  }

  /**
   * Guardar o actualizar catUnidadFlete
   * @param catUnidadFlete catUnidadFlete
   * @return OK
   */
  catUnidadFleteGuardarOActualizarResponse(catUnidadFlete: CatUnidadFlete): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catUnidadFlete;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catUnidadFlete`,
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
   * Guardar o actualizar catUnidadFlete
   * @param catUnidadFlete catUnidadFlete
   * @return OK
   */
  catUnidadFleteGuardarOActualizar(catUnidadFlete: CatUnidadFlete): __Observable<string> {
    return this.catUnidadFleteGuardarOActualizarResponse(catUnidadFlete).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catUnidadFlete
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catUnidadFleteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatUnidadFlete>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catUnidadFlete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatUnidadFlete>;
      })
    );
  }
  /**
   * Consultar lista paginada de catUnidadFlete
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catUnidadFleteQueryResult(info: QueryInfo): __Observable<QueryResultCatUnidadFlete> {
    return this.catUnidadFleteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatUnidadFlete)
    );
  }

  /**
   * Desactivar registro de catUnidadFlete
   * @param idcatUnidadFlete Identificador de registro de catUnidadFlete
   * @return OK
   */
  catUnidadFleteDesactivarResponse(idcatUnidadFlete: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatUnidadFlete != null) __params = __params.set('idcatUnidadFlete', idcatUnidadFlete.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catUnidadFlete`,
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
   * Desactivar registro de catUnidadFlete
   * @param idcatUnidadFlete Identificador de registro de catUnidadFlete
   * @return OK
   */
  catUnidadFleteDesactivar(idcatUnidadFlete: string): __Observable<string> {
    return this.catUnidadFleteDesactivarResponse(idcatUnidadFlete).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catUnidadTiempo
   * @param idcatUnidadTiempo Identificador de catUnidadTiempo
   * @return OK
   */
  catUnidadTiempoObtenerResponse(idcatUnidadTiempo: string): __Observable<__StrictHttpResponse<CatUnidadTiempo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatUnidadTiempo != null) __params = __params.set('idcatUnidadTiempo', idcatUnidadTiempo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catUnidadTiempo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatUnidadTiempo>;
      })
    );
  }
  /**
   * Consultar registro de catUnidadTiempo
   * @param idcatUnidadTiempo Identificador de catUnidadTiempo
   * @return OK
   */
  catUnidadTiempoObtener(idcatUnidadTiempo: string): __Observable<CatUnidadTiempo> {
    return this.catUnidadTiempoObtenerResponse(idcatUnidadTiempo).pipe(
      __map(_r => _r.body as CatUnidadTiempo)
    );
  }

  /**
   * Guardar o actualizar catUnidadTiempo
   * @param catUnidadTiempo catUnidadTiempo
   * @return OK
   */
  catUnidadTiempoGuardarOActualizarResponse(catUnidadTiempo: CatUnidadTiempo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catUnidadTiempo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catUnidadTiempo`,
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
   * Guardar o actualizar catUnidadTiempo
   * @param catUnidadTiempo catUnidadTiempo
   * @return OK
   */
  catUnidadTiempoGuardarOActualizar(catUnidadTiempo: CatUnidadTiempo): __Observable<string> {
    return this.catUnidadTiempoGuardarOActualizarResponse(catUnidadTiempo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catUnidadTiempo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catUnidadTiempoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatUnidadTiempo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catUnidadTiempo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatUnidadTiempo>;
      })
    );
  }
  /**
   * Consultar lista paginada de catUnidadTiempo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catUnidadTiempoQueryResult(info: QueryInfo): __Observable<QueryResultCatUnidadTiempo> {
    return this.catUnidadTiempoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatUnidadTiempo)
    );
  }

  /**
   * Desactivar registro de catUnidadTiempo
   * @param idcatUnidadTiempo Identificador de registro de catUnidadTiempo
   * @return OK
   */
  catUnidadTiempoDesactivarResponse(idcatUnidadTiempo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatUnidadTiempo != null) __params = __params.set('idcatUnidadTiempo', idcatUnidadTiempo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catUnidadTiempo`,
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
   * Desactivar registro de catUnidadTiempo
   * @param idcatUnidadTiempo Identificador de registro de catUnidadTiempo
   * @return OK
   */
  catUnidadTiempoDesactivar(idcatUnidadTiempo: string): __Observable<string> {
    return this.catUnidadTiempoDesactivarResponse(idcatUnidadTiempo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catUso
   * @param idcatUso Identificador de catUso
   * @return OK
   */
  catUsoObtenerResponse(idcatUso: string): __Observable<__StrictHttpResponse<CatUso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatUso != null) __params = __params.set('idcatUso', idcatUso.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catUso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatUso>;
      })
    );
  }
  /**
   * Consultar registro de catUso
   * @param idcatUso Identificador de catUso
   * @return OK
   */
  catUsoObtener(idcatUso: string): __Observable<CatUso> {
    return this.catUsoObtenerResponse(idcatUso).pipe(
      __map(_r => _r.body as CatUso)
    );
  }

  /**
   * Guardar o actualizar catUso
   * @param catUso catUso
   * @return OK
   */
  catUsoGuardarOActualizarResponse(catUso: CatUso): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catUso;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catUso`,
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
   * Guardar o actualizar catUso
   * @param catUso catUso
   * @return OK
   */
  catUsoGuardarOActualizar(catUso: CatUso): __Observable<string> {
    return this.catUsoGuardarOActualizarResponse(catUso).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catUso
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catUsoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatUso>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catUso`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatUso>;
      })
    );
  }
  /**
   * Consultar lista paginada de catUso
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catUsoQueryResult(info: QueryInfo): __Observable<QueryResultCatUso> {
    return this.catUsoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatUso)
    );
  }

  /**
   * Desactivar registro de catUso
   * @param idcatUso Identificador de registro de catUso
   * @return OK
   */
  catUsoDesactivarResponse(idcatUso: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatUso != null) __params = __params.set('idcatUso', idcatUso.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catUso`,
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
   * Desactivar registro de catUso
   * @param idcatUso Identificador de registro de catUso
   * @return OK
   */
  catUsoDesactivar(idcatUso: string): __Observable<string> {
    return this.catUsoDesactivarResponse(idcatUso).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catUsoArchivoSistema
   * @param idcatUsoArchivoSistema Identificador de catUsoArchivoSistema
   * @return OK
   */
  catUsoArchivoSistemaObtenerResponse(idcatUsoArchivoSistema: string): __Observable<__StrictHttpResponse<CatUsoArchivoSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatUsoArchivoSistema != null) __params = __params.set('idcatUsoArchivoSistema', idcatUsoArchivoSistema.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catUsoArchivoSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatUsoArchivoSistema>;
      })
    );
  }
  /**
   * Consultar registro de catUsoArchivoSistema
   * @param idcatUsoArchivoSistema Identificador de catUsoArchivoSistema
   * @return OK
   */
  catUsoArchivoSistemaObtener(idcatUsoArchivoSistema: string): __Observable<CatUsoArchivoSistema> {
    return this.catUsoArchivoSistemaObtenerResponse(idcatUsoArchivoSistema).pipe(
      __map(_r => _r.body as CatUsoArchivoSistema)
    );
  }

  /**
   * Guardar o actualizar catUsoArchivoSistema
   * @param catUsoArchivoSistema catUsoArchivoSistema
   * @return OK
   */
  catUsoArchivoSistemaGuardarOActualizarResponse(catUsoArchivoSistema: CatUsoArchivoSistema): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catUsoArchivoSistema;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catUsoArchivoSistema`,
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
   * Guardar o actualizar catUsoArchivoSistema
   * @param catUsoArchivoSistema catUsoArchivoSistema
   * @return OK
   */
  catUsoArchivoSistemaGuardarOActualizar(catUsoArchivoSistema: CatUsoArchivoSistema): __Observable<string> {
    return this.catUsoArchivoSistemaGuardarOActualizarResponse(catUsoArchivoSistema).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catUsoArchivoSistema
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catUsoArchivoSistemaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatUsoArchivoSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catUsoArchivoSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatUsoArchivoSistema>;
      })
    );
  }
  /**
   * Consultar lista paginada de catUsoArchivoSistema
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catUsoArchivoSistemaQueryResult(info: QueryInfo): __Observable<QueryResultCatUsoArchivoSistema> {
    return this.catUsoArchivoSistemaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatUsoArchivoSistema)
    );
  }

  /**
   * Desactivar registro de catUsoArchivoSistema
   * @param idcatUsoArchivoSistema Identificador de registro de catUsoArchivoSistema
   * @return OK
   */
  catUsoArchivoSistemaDesactivarResponse(idcatUsoArchivoSistema: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatUsoArchivoSistema != null) __params = __params.set('idcatUsoArchivoSistema', idcatUsoArchivoSistema.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catUsoArchivoSistema`,
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
   * Desactivar registro de catUsoArchivoSistema
   * @param idcatUsoArchivoSistema Identificador de registro de catUsoArchivoSistema
   * @return OK
   */
  catUsoArchivoSistemaDesactivar(idcatUsoArchivoSistema: string): __Observable<string> {
    return this.catUsoArchivoSistemaDesactivarResponse(idcatUsoArchivoSistema).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catUsoCFDI
   * @param idcatUsoCFDI Identificador de catUsoCFDI
   * @return OK
   */
  catUsoCFDIObtenerResponse(idcatUsoCFDI: string): __Observable<__StrictHttpResponse<CatUsoCFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatUsoCFDI != null) __params = __params.set('idcatUsoCFDI', idcatUsoCFDI.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catUsoCFDI`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatUsoCFDI>;
      })
    );
  }
  /**
   * Consultar registro de catUsoCFDI
   * @param idcatUsoCFDI Identificador de catUsoCFDI
   * @return OK
   */
  catUsoCFDIObtener(idcatUsoCFDI: string): __Observable<CatUsoCFDI> {
    return this.catUsoCFDIObtenerResponse(idcatUsoCFDI).pipe(
      __map(_r => _r.body as CatUsoCFDI)
    );
  }

  /**
   * Guardar o actualizar catUsoCFDI
   * @param catUsoCFDI catUsoCFDI
   * @return OK
   */
  catUsoCFDIGuardarOActualizarResponse(catUsoCFDI: CatUsoCFDI): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catUsoCFDI;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catUsoCFDI`,
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
   * Guardar o actualizar catUsoCFDI
   * @param catUsoCFDI catUsoCFDI
   * @return OK
   */
  catUsoCFDIGuardarOActualizar(catUsoCFDI: CatUsoCFDI): __Observable<string> {
    return this.catUsoCFDIGuardarOActualizarResponse(catUsoCFDI).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catUsoCFDI
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catUsoCFDIQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatUsoCFDI>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catUsoCFDI`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatUsoCFDI>;
      })
    );
  }
  /**
   * Consultar lista paginada de catUsoCFDI
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catUsoCFDIQueryResult(info: QueryInfo): __Observable<QueryResultCatUsoCFDI> {
    return this.catUsoCFDIQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatUsoCFDI)
    );
  }

  /**
   * Desactivar registro de catUsoCFDI
   * @param idcatUsoCFDI Identificador de registro de catUsoCFDI
   * @return OK
   */
  catUsoCFDIDesactivarResponse(idcatUsoCFDI: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatUsoCFDI != null) __params = __params.set('idcatUsoCFDI', idcatUsoCFDI.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catUsoCFDI`,
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
   * Desactivar registro de catUsoCFDI
   * @param idcatUsoCFDI Identificador de registro de catUsoCFDI
   * @return OK
   */
  catUsoCFDIDesactivar(idcatUsoCFDI: string): __Observable<string> {
    return this.catUsoCFDIDesactivarResponse(idcatUsoCFDI).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catVariableSistema
   * @param idcatVariableSistema Identificador de catVariableSistema
   * @return OK
   */
  catVariableSistemaObtenerResponse(idcatVariableSistema: string): __Observable<__StrictHttpResponse<CatVariableSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatVariableSistema != null) __params = __params.set('idcatVariableSistema', idcatVariableSistema.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catVariableSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatVariableSistema>;
      })
    );
  }
  /**
   * Consultar registro de catVariableSistema
   * @param idcatVariableSistema Identificador de catVariableSistema
   * @return OK
   */
  catVariableSistemaObtener(idcatVariableSistema: string): __Observable<CatVariableSistema> {
    return this.catVariableSistemaObtenerResponse(idcatVariableSistema).pipe(
      __map(_r => _r.body as CatVariableSistema)
    );
  }

  /**
   * Guardar o actualizar catVariableSistema
   * @param catVariableSistema catVariableSistema
   * @return OK
   */
  catVariableSistemaGuardarOActualizarResponse(catVariableSistema: CatVariableSistema): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catVariableSistema;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catVariableSistema`,
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
   * Guardar o actualizar catVariableSistema
   * @param catVariableSistema catVariableSistema
   * @return OK
   */
  catVariableSistemaGuardarOActualizar(catVariableSistema: CatVariableSistema): __Observable<string> {
    return this.catVariableSistemaGuardarOActualizarResponse(catVariableSistema).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catVariableSistema
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catVariableSistemaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatVariableSistema>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catVariableSistema`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatVariableSistema>;
      })
    );
  }
  /**
   * Consultar lista paginada de catVariableSistema
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catVariableSistemaQueryResult(info: QueryInfo): __Observable<QueryResultCatVariableSistema> {
    return this.catVariableSistemaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatVariableSistema)
    );
  }

  /**
   * Desactivar registro de catVariableSistema
   * @param idcatVariableSistema Identificador de registro de catVariableSistema
   * @return OK
   */
  catVariableSistemaDesactivarResponse(idcatVariableSistema: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatVariableSistema != null) __params = __params.set('idcatVariableSistema', idcatVariableSistema.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catVariableSistema`,
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
   * Desactivar registro de catVariableSistema
   * @param idcatVariableSistema Identificador de registro de catVariableSistema
   * @return OK
   */
  catVariableSistemaDesactivar(idcatVariableSistema: string): __Observable<string> {
    return this.catVariableSistemaDesactivarResponse(idcatVariableSistema).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de catZona
   * @param idcatZona Identificador de catZona
   * @return OK
   */
  catZonaObtenerResponse(idcatZona: string): __Observable<__StrictHttpResponse<CatZona>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatZona != null) __params = __params.set('idcatZona', idcatZona.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/catZona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CatZona>;
      })
    );
  }
  /**
   * Consultar registro de catZona
   * @param idcatZona Identificador de catZona
   * @return OK
   */
  catZonaObtener(idcatZona: string): __Observable<CatZona> {
    return this.catZonaObtenerResponse(idcatZona).pipe(
      __map(_r => _r.body as CatZona)
    );
  }

  /**
   * Guardar o actualizar catZona
   * @param catZona catZona
   * @return OK
   */
  catZonaGuardarOActualizarResponse(catZona: CatZona): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = catZona;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/catZona`,
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
   * Guardar o actualizar catZona
   * @param catZona catZona
   * @return OK
   */
  catZonaGuardarOActualizar(catZona: CatZona): __Observable<string> {
    return this.catZonaGuardarOActualizarResponse(catZona).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de catZona
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catZonaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultCatZona>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/catZona`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultCatZona>;
      })
    );
  }
  /**
   * Consultar lista paginada de catZona
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  catZonaQueryResult(info: QueryInfo): __Observable<QueryResultCatZona> {
    return this.catZonaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultCatZona)
    );
  }

  /**
   * Desactivar registro de catZona
   * @param idcatZona Identificador de registro de catZona
   * @return OK
   */
  catZonaDesactivarResponse(idcatZona: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idcatZona != null) __params = __params.set('idcatZona', idcatZona.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/catZona`,
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
   * Desactivar registro de catZona
   * @param idcatZona Identificador de registro de catZona
   * @return OK
   */
  catZonaDesactivar(idcatZona: string): __Observable<string> {
    return this.catZonaDesactivarResponse(idcatZona).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module CatalogosService {
}

export { CatalogosService }
