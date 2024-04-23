import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfLogoVersionComponent} from './pqf-logo-version.component';

describe('PqfLogoVersionComponent', () => {
  let component: PqfLogoVersionComponent;
  let fixture: ComponentFixture<PqfLogoVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfLogoVersionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfLogoVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
