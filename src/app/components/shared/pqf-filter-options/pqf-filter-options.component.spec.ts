import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfFilterOptionsComponent} from './pqf-filter-options.component';

describe('FilterOptionsPqfComponent', () => {
  let component: PqfFilterOptionsComponent;
  let fixture: ComponentFixture<PqfFilterOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfFilterOptionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfFilterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
