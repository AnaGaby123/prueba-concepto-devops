import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GeneralsComponent} from './generals.component';

describe('GeneralsComponent', () => {
  let component: GeneralsComponent;
  let fixture: ComponentFixture<GeneralsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GeneralsComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
