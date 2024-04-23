import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoadMissingListComponent} from './load-missing-list.component';

describe('LoadMissingListComponent', () => {
  let component: LoadMissingListComponent;
  let fixture: ComponentFixture<LoadMissingListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadMissingListComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMissingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
