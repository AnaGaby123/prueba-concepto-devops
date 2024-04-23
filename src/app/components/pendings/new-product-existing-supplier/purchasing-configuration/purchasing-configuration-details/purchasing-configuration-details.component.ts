import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Observable} from 'rxjs';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {Store} from '@ngrx/store';
import {purchasingConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/purchasing-configuration';
import {debounce, isEmpty} from 'lodash-es';

import {purchasingConfigurationActions} from '@appActions/pendings/new-product-existing-supplier/purchasing-configuration';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {IFamily} from '@appModels/store/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.model';
import {IPopUp} from '@appModels/shared-components/pqf-pop-up';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-purchasing-configuration-dashboard',
  templateUrl: './purchasing-configuration-details.component.html',
  styleUrls: ['./purchasing-configuration-details.component.scss'],
})
export class PurchasingConfigurationDetailsComponent implements OnInit, AfterContentChecked {
  @ViewChild('imageElement') imageElement: ElementRef;
  searchTerm$: Observable<string> = this.store.select(
    purchasingConfigurationDetailsSelectors.selectSearchTerm,
  );
  filterOptions$: Observable<Array<FilterOptionPqf>> = this.store.select(
    purchasingConfigurationDetailsSelectors.selectFilterList,
  );
  familiesList$: Observable<Array<IFamily>> = this.store.select(
    purchasingConfigurationDetailsSelectors.selectFamiliesList,
  );
  familiesListStatus$: Observable<number> = this.store.select(
    purchasingConfigurationDetailsSelectors.selectListFamiliesStatus,
  );
  detailsFamilyStatus$: Observable<number> = this.store.select(
    purchasingConfigurationDetailsSelectors.selectDetailsFamilyStatus,
  );
  familySelected: Observable<IFamily> = this.store.select(
    purchasingConfigurationDetailsSelectors.selectFamilySelected,
  );
  saveValidation$: Observable<boolean> = this.store.select(
    purchasingConfigurationDetailsSelectors.saveValidation,
  );
  finishValidation$: Observable<boolean> = this.store.select(
    purchasingConfigurationDetailsSelectors.finishValidation,
  );
  hasChanges: Observable<boolean> = this.store.select(
    purchasingConfigurationDetailsSelectors.selectHasChangesFamilySelected,
  );
  isActivePop: Observable<boolean> = this.store.select(
    purchasingConfigurationDetailsSelectors.selectIsActivePop,
  );
  handleKeySearch = debounce(this.changeSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  readonly inputTypes = InputValidators;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  errorImageNativeElement = false;
  imageNativeElement;
  lodashIsEmpty = isEmpty;

  constructor(private cdr: ChangeDetectorRef, private store: Store, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.store.dispatch(purchasingConfigurationActions.FETCH_FAMILIES_LIST_LOAD());
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
    if (!!this.imageElement) {
      this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
    }
  }

  /*  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    if (this.imageElement) {
      this.imageNativeElement = this.renderer.selectRootElement(this?.imageElement).nativeElement;
    }
  }*/

  /*ngOnChanges(changes: SimpleChanges): void {
    this.cdr.detectChanges();

    if (changes) {
      this.imageNativeElement = this.renderer.selectRootElement(this?.imageElement).nativeElement;
    }
  }*/
  changeSearchTerm(searchTerm: string) {
    this.store.dispatch(purchasingConfigurationActions.SET_SEARCH_TERM({searchTerm}));
  }

  setFilterSelected(filterOptions: Array<FilterOptionPqf>) {
    this.store.dispatch(purchasingConfigurationActions.SET_FILTER_OPTIONS({filterOptions}));
  }

  setFamily(family: IFamily) {
    this.store.dispatch(purchasingConfigurationActions.SET_FAMILY_ITEM_METHODS({family}));
  }

  familyItemQuotation = (Index: number, family: IFamily) =>
    family.IdCotPartidaCotizacionInvestigacion;

  saveConfiguration(finishConfiguration: boolean = false) {
    this.store.dispatch(
      purchasingConfigurationActions.SAVE_CONFIGURATION_LOAD({finishConfiguration}),
    );
  }

  cancelConfiguration() {
    this.store.dispatch(purchasingConfigurationActions.ACTIVE_POP({value: true}));
  }

  eventEmitterPopUp(event: IPopUp) {
    this.store.dispatch(
      purchasingConfigurationActions.SET_EVENT_EMITTER_POP_UP_METHODS({popUp: event}),
    );
  }

  setImage(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    this.errorImageNativeElement = false;
    return this.defaultImageSource;
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }
}
