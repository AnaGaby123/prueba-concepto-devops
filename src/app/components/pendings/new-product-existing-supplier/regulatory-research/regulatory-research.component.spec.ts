import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegulatoryResearchComponent} from './regulatory-research.component';

describe('RegulatoryResearchComponent', () => {
  let component: RegulatoryResearchComponent;
  let fixture: ComponentFixture<RegulatoryResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegulatoryResearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulatoryResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
