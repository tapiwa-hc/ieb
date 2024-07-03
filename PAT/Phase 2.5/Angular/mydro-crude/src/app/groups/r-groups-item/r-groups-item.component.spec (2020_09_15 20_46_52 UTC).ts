import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RGroupsItemComponent } from './r-groups-item.component';

describe('RGroupsItemComponent', () => {
  let component: RGroupsItemComponent;
  let fixture: ComponentFixture<RGroupsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RGroupsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RGroupsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
