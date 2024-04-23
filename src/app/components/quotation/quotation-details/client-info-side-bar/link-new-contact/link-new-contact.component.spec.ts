import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LinkNewContactComponent} from './link-new-contact.component';

describe('LinkNewContactComponent', () => {
  let component: LinkNewContactComponent;
  let fixture: ComponentFixture<LinkNewContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkNewContactComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkNewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
