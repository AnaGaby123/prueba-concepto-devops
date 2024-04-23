import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';

// Actions
import {generalDataProviderActions} from '@appActions/forms/providers';

// Selectors
import {selectvCatRolProviderForDropDownList} from '@appSelectors/catalogs/catalogs.selectors';
import {generalDataProviderSelectors, providerSelectors} from '@appSelectors/forms/providers';

// Utils
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {IVProveedor} from '@appModels/store/forms/providers/providers-list/providers-list.models';
import {selectedCatRolProvider} from '@appSelectors/forms/providers/providers-details/provider-form-step-1-general-data.selectors';

@Component({
  selector: 'app-provider-general-data',
  templateUrl: './provider-general-data.component.html',
  styleUrls: ['./provider-general-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderGeneralDataComponent implements AfterViewInit {
  @ViewChild('imageElement') imageElement: ElementRef;

  providerData$: Observable<IVProveedor> = this.store.select(
    generalDataProviderSelectors.selectGeneralDataProviderObject,
  );
  enableEdit$: Observable<boolean> = this.store.select(providerSelectors.selectEnableEdit);
  modeEdit$: Observable<boolean> = this.store.select(providerSelectors.selectModeEdit);
  rfcValidation$: Observable<boolean> = this.store.select(
    generalDataProviderSelectors.selectRfcValidation,
  );
  itemCatRolProvider$: Observable<Array<DropListOption>> = this.store.select(
    selectvCatRolProviderForDropDownList,
  );
  selectedCatRolProvider$: Observable<DropListOption> = this.store.select(selectedCatRolProvider);
  viewType$: Observable<string> = this.store.select(selectViewType);

  readonly FIELD_INPUT = 'input';
  readonly FIELD_DROP_LIST = 'dropList';
  readonly FIELD_NAME = 'Nombre';
  readonly FIELD_BUSINESSNAME = 'RazonSocial';
  readonly FIELD_RFC_TAX = 'TaxId';
  readonly FIELD_ROL = 'IdCatRolProveedor';
  readonly FIELD_EXTENDED_DESCRIPTION = 'DescripcionAmplia';
  readonly FIELD_OBSERVATIONS = 'Observaciones';
  readonly DATA_MODEL_TYPE_PROVIDER = 'provider';
  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;

  defaultImageSource = 'assets/Images/cargar_foto.svg';
  defaultDisableImageSource = 'assets/Images/cargar_foto_disabled.svg';
  imageNativeElement;
  errorImageNativeElement = false;

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  activeProviderHandler(fieldValue: boolean): void {
    this.store.dispatch(
      generalDataProviderActions.SET_FORM_DATA_BY_FIELD_NAME({
        fieldName: 'Activo',
        fieldValue,
        dataModelType: 'provider',
      }),
    );
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }

  setImage(providerActive?: boolean, src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        if (providerActive === true) {
          return this.defaultImageSource;
        } else if (providerActive === false) {
          return this.defaultDisableImageSource;
        }
      }
    }
    return this.defaultImageSource;
  }

  generalDataHandler(
    fieldValueData,
    fieldName: string,
    typeField: string,
    dataModelType: string,
  ): void {
    const fieldValue = typeField === this.FIELD_DROP_LIST ? fieldValueData.value : fieldValueData;
    this.store.dispatch(
      generalDataProviderActions.SET_FORM_DATA_BY_FIELD_NAME({
        fieldName,
        fieldValue,
        dataModelType,
      }),
    );
  }
}
