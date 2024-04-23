import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProviderListPriceComponent} from './provider-list-price.component';

describe('ProviderListPriceComponent', () => {
  let component: ProviderListPriceComponent;
  let fixture: ComponentFixture<ProviderListPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderListPriceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderListPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
