import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacteristicGrouperComponent} from './characteristic-grouper.component';

describe('ClassificationComponent', () => {
  let component: CharacteristicGrouperComponent;
  let fixture: ComponentFixture<CharacteristicGrouperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacteristicGrouperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacteristicGrouperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
