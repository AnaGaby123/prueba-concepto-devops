/* tslint:disable */
import { AjusteAutorizado } from './ajuste-autorizado';
import { AjusteParcialmenteAutorizado } from './ajuste-parcialmente-autorizado';
import { AjusteRechazado } from './ajuste-rechazado';
export interface TipoAjusteTEntregaFleteExpressObj {
  AjusteAutorizado?: AjusteAutorizado;
  AjusteParcialmenteAutorizado?: AjusteParcialmenteAutorizado;
  AjusteRechazado?: AjusteRechazado;
  IdMarca?: string;
  Marca?: string;
  NombreImagenMarca?: string;
  Partidas?: number;
  PartidasAhorro?: number;
  PartidasAlternativa?: number;
  PartidasComplementaria?: number;
  PartidasOriginal?: number;
  PartidasPromocion?: number;
}
