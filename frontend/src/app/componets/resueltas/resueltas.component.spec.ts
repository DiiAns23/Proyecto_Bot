import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResueltasComponent } from './resueltas.component';

describe('ResueltasComponent', () => {
  let component: ResueltasComponent;
  let fixture: ComponentFixture<ResueltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResueltasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResueltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
