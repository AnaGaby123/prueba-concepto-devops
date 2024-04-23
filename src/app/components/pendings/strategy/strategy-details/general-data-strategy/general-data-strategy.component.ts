/*  Core Imports */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

/* Actions Imports */
/* Tools Imports */
import {toLower} from 'lodash-es';

/* Model Imports */
import {AppState} from '@appCore/core.state';
import {
  IBrandWithContract,
  IGeneralDataContactQuotationStrategy,
  IGeneralDataQuotationStrategy,
  IVClientStrategy,
} from '@appModels/store/pendings/strategy/strategy-details/strategy-details.model';

/* Selectors Imports */
import {strategyDetailsSelectors} from '@appSelectors/pendings';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {getIncomeLevelImage} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-general-data-strategy',
  templateUrl: './general-data-strategy.component.html',
  styleUrls: ['./general-data-strategy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralDataStrategyComponent implements OnInit, AfterViewInit {
  @Input() isOpen = true;
  @Output() handleIsOpen: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('imageElement') imageElement: ElementRef;

  clientData$: Observable<IGeneralDataQuotationStrategy> = this.store.select(
    strategyDetailsSelectors.selectedQuotationClientInfoMapped,
  );
  contactData$: Observable<IGeneralDataContactQuotationStrategy> = this.store.select(
    strategyDetailsSelectors.selectContactData,
  );
  isLoadingBrands$: Observable<boolean> = this.store.select(
    strategyDetailsSelectors.selectIsLoadingBrands,
  );
  listBrands$: Observable<Array<IBrandWithContract>> = this.store.select(
    strategyDetailsSelectors.selectListBrands,
  );
  selecteClientData$: Observable<IVClientStrategy> = this.store.select(
    strategyDetailsSelectors.selectClientDataGeneral,
  );
  totalQuoted$: Observable<number> = this.store.select(strategyDetailsSelectors.selectTotalQuotes);
  incomeLevelHelper = getIncomeLevelImage;
  currentPage = 0;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  errorImageNativeElement = false;
  imageNativeElement;
  isLoading = false;
  lodashToLower = toLower;
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  readonly viewTypes = AppViewTypes;

  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
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

  onClick(): void {
    this.handleIsOpen.emit();
  }
}
