import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AlphabetFilterComponent} from '@appComponents/shared/alphabet-filter/alphabet-filter.component';

describe('AlphabetFilterComponent', () => {
  let component: AlphabetFilterComponent;
  let fixture: ComponentFixture<AlphabetFilterComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AlphabetFilterComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
