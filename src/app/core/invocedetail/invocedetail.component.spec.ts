import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvocedetailComponent } from './invocedetail.component';

describe('InvocedetailComponent', () => {
  let component: InvocedetailComponent;
  let fixture: ComponentFixture<InvocedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvocedetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvocedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
