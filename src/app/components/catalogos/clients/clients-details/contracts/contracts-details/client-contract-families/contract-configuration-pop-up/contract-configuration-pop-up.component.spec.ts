import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContractConfigurationPopUpComponent} from './contract-configuration-pop-up.component';

describe('ContractConfigurationPopUpComponent', () => {
  let component: ContractConfigurationPopUpComponent;
  let fixture: ComponentFixture<ContractConfigurationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractConfigurationPopUpComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractConfigurationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
