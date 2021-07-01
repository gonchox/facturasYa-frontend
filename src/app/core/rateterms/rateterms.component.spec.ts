import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatetermsComponent } from './rateterms.component';

describe('RatetermsComponent', () => {
  let component: RatetermsComponent;
  let fixture: ComponentFixture<RatetermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatetermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatetermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
