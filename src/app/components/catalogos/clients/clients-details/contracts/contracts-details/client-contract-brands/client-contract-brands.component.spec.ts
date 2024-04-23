import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ClientContractBrandsComponent} from './client-contract-brands.component';

describe('ClientContractBrandsComponent', () => {
  let component: ClientContractBrandsComponent;
  let fixture: ComponentFixture<ClientContractBrandsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientContractBrandsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientContractBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
