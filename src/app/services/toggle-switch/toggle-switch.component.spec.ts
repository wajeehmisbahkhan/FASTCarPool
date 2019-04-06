import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSwitchPage } from './toggle-switch.page';

describe('ToggleSwitchPage', () => {
  let component: ToggleSwitchPage;
  let fixture: ComponentFixture<ToggleSwitchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleSwitchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleSwitchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
