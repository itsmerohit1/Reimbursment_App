import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineAComponent } from './decline-a.component';

describe('DeclineAComponent', () => {
  let component: DeclineAComponent;
  let fixture: ComponentFixture<DeclineAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclineAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclineAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
