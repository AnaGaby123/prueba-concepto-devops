// Core imports
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {lastValueFrom, Observable} from 'rxjs';
// Selectors
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {selectCountryListForDropListPqf} from '@appSelectors/catalogs/catalogs.selectors';
import {brandFormSelectorsDetails} from '@appSelectors/forms/brand-form';
// Models
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {VMarca} from 'api-catalogos';
import {brandItem} from '@appModels/store/forms/brand-form/brand-form-details/brand-form-details.models';
import {
  DropListOptionPqf,
  DropListOptionsPqf,
} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
// Actions
import {brandFormDetailsAction} from '@appActions/forms/brand-form';
// Dev tools
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {DEFAULT_UUID, ENUM_TYPE_POP} from '@appUtil/common.protocols';
import {IPopUp} from '@appModels/shared-components/pqf-pop-up';
import {AppState} from '@appCore/core.state';
import {MatDialog} from '@angular/material/dialog';
import {PqfPopUpDialogComponent} from '@appComponents/shared/pqf-pop-up-dialog/pqf-pop-up-dialog.component';
import {buildDialogConfig} from '@appHelpers/dialogs/buildDialogConfig.helpers';
import {TranslateService} from '@ngx-translate/core';
import {Location} from '@angular/common';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-brands-details',
  templateUrl: './brands-details.component.html',
  styleUrls: ['./brands-details.component.scss'],
})
export class BrandsDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('imageElement') imageElement: ElementRef;
  readonly validators = InputValidators;
  readonly appViewTypes = AppViewTypes;
  readonly popTypes = ENUM_TYPE_POP;
  $brand: Observable<VMarca> = this.store.select(brandFormSelectorsDetails.selectBrandInfo);
  $listCountry: Observable<DropListOptionsPqf> = this.store.select(selectCountryListForDropListPqf);
  $cancelValidation: Observable<boolean> = this.store.select(
    brandFormSelectorsDetails.cancelValidation,
  );
  $forceErrors: Observable<boolean> = this.store.select(
    brandFormSelectorsDetails.selectForceErrors,
  );
  $saveValidation: Observable<boolean> = this.store.select(
    brandFormSelectorsDetails.saveValidation,
  );
  $sections: Observable<Array<brandItem>> = this.store.select(
    brandFormSelectorsDetails.selectSections,
  );
  $selectedCountry: Observable<DropListOptionPqf> = this.store.select(
    brandFormSelectorsDetails.selectedCountry,
  );
  $showMessage: Observable<boolean> = this.store.select(brandFormSelectorsDetails.showMessage);
  viewType$: Observable<string> = this.store.select(selectViewType);
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  imageNativeElement;
  errorImageNativeElement = false;

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private translate: TranslateService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(brandFormDetailsAction.INIT_BRAND_DETAILS_EFFECT());
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  ngOnDestroy(): void {
    this.store.dispatch(brandFormDetailsAction.CLEAN_DETAILS_STATE());
  }

  handleBrandData(node: string, value) {
    if (node !== 'Nombre') {
      value = value.id;
    }
    value = value?.trim();
    this.store.dispatch(
      brandFormDetailsAction.HANDLE_SET_BRAND_DATA({
        node,
        value: value === '' ? null : value,
      }),
    );
  }

  handleSaveBrand(): void {
    const dialogRef = this.dialog.open(
      PqfPopUpDialogComponent,
      buildDialogConfig({
        activeButtons: true,
        text: this.translate.instant('common.saveMessage'),
        textPrimaryButton: this.translate.instant('common.save'),
        textSecondaryButton: this.translate.instant('common.cancel'),
        typePop: this.popTypes.warning,
      }),
    );

    dialogRef.afterClosed().subscribe((data: IPopUp) => {
      if (data?.value) {
        this.store.dispatch(brandFormDetailsAction.HANDLE_SAVE_BRAND_LOAD());
      }
    });
  }

  async handleCancel(): Promise<void> {
    const brand = await lastValueFrom(
      this.store.pipe(select(brandFormSelectorsDetails.selectBrandInfo), take(1)),
    );

    const dialogRef = this.dialog.open(
      PqfPopUpDialogComponent,
      buildDialogConfig({
        activeButtons: true,
        text: this.translate.instant('common.cancelMessage'),
        textPrimaryButton: this.translate.instant('formBrand.details.continueEditing'),
        textSecondaryButton: this.translate.instant('common.discardChanges'),
        typePop: this.popTypes.warning,
      }),
    );

    dialogRef.afterClosed().subscribe((data: IPopUp) => {
      if (!data?.value) {
        this.store.dispatch(brandFormDetailsAction.RESTORE_BACKUP());
        // DOCS: CHECK IF IT'S A NEW BRAND
        if (brand?.IdMarca === DEFAULT_UUID) {
          this.location.back();
        }
      }
    });
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }

  setImage(src?: string) {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }
}
