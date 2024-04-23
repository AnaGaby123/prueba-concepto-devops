import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {GenerateOrderComponent} from './generate-order.component';

describe('GenerateOrderComponent', () => {
  let component: GenerateOrderComponent;
  let fixture: ComponentFixture<GenerateOrderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GenerateOrderComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
