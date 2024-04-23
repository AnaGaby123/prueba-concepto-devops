import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ClientContractFamiliesComponent} from './client-contract-families.component';

describe('ClientContractFamiliesComponent', () => {
  let component: ClientContractFamiliesComponent;
  let fixture: ComponentFixture<ClientContractFamiliesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientContractFamiliesComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientContractFamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
