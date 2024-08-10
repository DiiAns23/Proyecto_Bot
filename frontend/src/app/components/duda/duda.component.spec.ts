import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DudaComponent } from './duda.component';

describe('DudaComponent', () => {
  let component: DudaComponent;
  let fixture: ComponentFixture<DudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DudaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
