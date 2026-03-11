import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAndAddTrip } from './edit-and-add-trip';

describe('EditAndAddTrip', () => {
  let component: EditAndAddTrip;
  let fixture: ComponentFixture<EditAndAddTrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAndAddTrip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAndAddTrip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
