import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProviderPriceListComponent} from './provider-price-list.component';

describe('ProviderPriceListComponent', () => {
  let component: ProviderPriceListComponent;
  let fixture: ComponentFixture<ProviderPriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderPriceListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
