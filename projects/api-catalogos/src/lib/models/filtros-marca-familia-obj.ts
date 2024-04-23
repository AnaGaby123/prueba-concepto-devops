/* tslint:disable */
import { CatControlObj } from './cat-control-obj';
import { CatIndustriaObj } from './cat-industria-obj';
import { CatSectorObj } from './cat-sector-obj';
import { CatSubTipoObj } from './cat-sub-tipo-obj';
import { CatTipoObj } from './cat-tipo-obj';
export interface FiltrosMarcaFamiliaObj {
  listaControl?: Array<CatControlObj>;
  listaIndustria?: Array<CatIndustriaObj>;
  listaSector?: Array<CatSectorObj>;
  listaSubtipo?: Array<CatSubTipoObj>;
  listaTipo?: Array<CatTipoObj>;
}
