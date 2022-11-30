import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRComponent } from './update-r.component';

describe('UpdateRComponent', () => {
  let component: UpdateRComponent;
  let fixture: ComponentFixture<UpdateRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
