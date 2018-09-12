import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdAutocompleteComponent } from './user-id-autocomplete.component';

describe('UserIdAutocompleteComponent', () => {
  let component: UserIdAutocompleteComponent;
  let fixture: ComponentFixture<UserIdAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIdAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIdAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
