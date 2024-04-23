import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CommercialTechnicalResearchComponent} from './commercial-technical-research.component';

describe('CommercialTechnicalResearchComponent', () => {
  let component: CommercialTechnicalResearchComponent;
  let fixture: ComponentFixture<CommercialTechnicalResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommercialTechnicalResearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialTechnicalResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
