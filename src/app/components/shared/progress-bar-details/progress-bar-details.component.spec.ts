import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgressBarDetailsComponent} from './progress-bar-details.component';

describe('ProgressBarDetailsComponent', () => {
  let component: ProgressBarDetailsComponent;
  let fixture: ComponentFixture<ProgressBarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressBarDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
