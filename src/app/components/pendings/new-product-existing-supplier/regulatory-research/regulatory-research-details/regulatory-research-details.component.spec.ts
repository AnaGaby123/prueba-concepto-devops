import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegulatoryResearchDetailsComponent} from './regulatory-research-details.component';

describe('RegulatoryResearchDetailsComponent', () => {
  let component: RegulatoryResearchDetailsComponent;
  let fixture: ComponentFixture<RegulatoryResearchDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegulatoryResearchDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulatoryResearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
