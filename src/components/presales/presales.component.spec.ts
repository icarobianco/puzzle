import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresalesComponent } from './presales.component';

describe('PresalesComponent', () => {
  let component: PresalesComponent;
  let fixture: ComponentFixture<PresalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
