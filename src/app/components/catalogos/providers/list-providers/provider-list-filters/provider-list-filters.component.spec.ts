import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ProviderListFiltersComponent} from './provider-list-filters.component';

describe('ProviderListFiltersComponent', () => {
  let component: ProviderListFiltersComponent;
  let fixture: ComponentFixture<ProviderListFiltersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProviderListFiltersComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
