import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfSearchComponent} from './pqf-search.component';

describe('PqfSearchComponent', () => {
  let component: PqfSearchComponent;
  let fixture: ComponentFixture<PqfSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
