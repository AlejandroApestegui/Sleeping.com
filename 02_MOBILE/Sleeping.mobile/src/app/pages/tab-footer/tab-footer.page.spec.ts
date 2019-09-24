import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabFooterPage } from './tab-footer.page';

describe('TabFooterPage', () => {
  let component: TabFooterPage;
  let fixture: ComponentFixture<TabFooterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabFooterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabFooterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
