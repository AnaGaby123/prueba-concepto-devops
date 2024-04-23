import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QuotedItemComponent} from './quoted-item.component';

describe('QuotedItemsComponent', () => {
  let component: QuotedItemComponent;
  let fixture: ComponentFixture<QuotedItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuotedItemComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
