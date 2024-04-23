import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// Models
import {
  CatNivelIngreso,
  ConfiguracionPrecioUtilidadCategoriaProveedorObj,
  VMarcaFamiliaIndustriaObj,
} from 'api-catalogos';
import {
  IProviderCategoryUtilityPriceConfiguration,
  OfferFields,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// Actions
import {offerActions} from '@appActions/forms/providers';
// Utils
import {deburr, find, toLower} from 'lodash-es';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilityComponent implements AfterContentChecked {
  readonly inputValidators = InputValidators;
  @Input() enableEdit: boolean;
  @Input() providerUtilities: VMarcaFamiliaIndustriaObj;
  @Input() viewType: string;

  readonly fields = OfferFields;
  catNivelIngreso: CatNivelIngreso[] = [];

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  // TODO funcionamiento
  getUtility(utilityName: string): number {
    const utility: IProviderCategoryUtilityPriceConfiguration = find(
      this.providerUtilities.ConfiguracionPrecioUtilidadCategoriaProveedor,
      (o: ConfiguracionPrecioUtilidadCategoriaProveedorObj) =>
        toLower(deburr(o?.catNivelIngreso?.NivelIngreso)) === toLower(utilityName),
    );
    return utility?.UtilidadNivelIngreso ?? null;
  }

  setUtility(value: string, field: string, itemId: string): void {
    this.store.dispatch(
      offerActions.SET_PROVIDER_UTILITIES_CONFIGURATION_VALUE({
        value: Number(value),
        field,
        idCatIndustryBrandFamily: itemId,
      }),
    );
  }
}
