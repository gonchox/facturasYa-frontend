import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationresultComponent } from './operationresult.component';

describe('OperationresultComponent', () => {
  let component: OperationresultComponent;
  let fixture: ComponentFixture<OperationresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
