import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BrandsComponent} from './brands.component';
import {combineReducers, Store, StoreModule} from '@ngrx/store';
import {AppState, reducers} from '@appCore/core.state';
import {brandFormReducer} from '@appReducers/forms/brands-form/brands-form.reducer';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('BrandsComponent', () => {
  let component: BrandsComponent;
  let fixture: ComponentFixture<BrandsComponent>;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BrandsComponent],
        imports: [
          HeaderBarModule,
          RouterTestingModule.withRoutes([]),
          StoreModule.forRoot({
            ...reducers,
            lazyLoadedFeature: combineReducers(brandFormReducer),
          }),
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
