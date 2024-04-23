import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardWithToggleComponent} from './card-with-toggle.component';

describe('CardWithToggleComponent', () => {
  let component: CardWithToggleComponent;
  let fixture: ComponentFixture<CardWithToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardWithToggleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardWithToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
