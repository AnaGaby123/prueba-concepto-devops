import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PqfTabOptionsComponent} from './pqf-tab-options.component';

describe('PqfTabOptionsComponent', () => {
  let component: PqfTabOptionsComponent;
  let fixture: ComponentFixture<PqfTabOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PqfTabOptionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqfTabOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
