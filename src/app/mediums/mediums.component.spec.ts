import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumsComponent } from './mediums.component';

describe('MediumsComponent', () => {
  let component: MediumsComponent;
  let fixture: ComponentFixture<MediumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
