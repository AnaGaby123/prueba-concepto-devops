import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoadMissingComponent} from './load-missing.component';

describe('LoadMissingComponent', () => {
  let component: LoadMissingComponent;
  let fixture: ComponentFixture<LoadMissingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadMissingComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMissingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
