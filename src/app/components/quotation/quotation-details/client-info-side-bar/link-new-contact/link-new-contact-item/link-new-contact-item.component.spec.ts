import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LinkNewContactItemComponent} from './link-new-contact-item.component';

describe('LinkNewContactItemComponent', () => {
  let component: LinkNewContactItemComponent;
  let fixture: ComponentFixture<LinkNewContactItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkNewContactItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkNewContactItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
