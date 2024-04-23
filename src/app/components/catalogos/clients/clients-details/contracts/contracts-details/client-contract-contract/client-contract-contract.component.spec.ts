import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ClientContractContractComponent} from './client-contract-contract.component';

describe('ClientContractContractComponent', () => {
  let component: ClientContractContractComponent;
  let fixture: ComponentFixture<ClientContractContractComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientContractContractComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientContractContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
