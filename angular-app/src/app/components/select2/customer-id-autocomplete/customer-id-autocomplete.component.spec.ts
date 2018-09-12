import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIdAutocompleteComponent } from './customer-id-autocomplete.component';

describe('CustomerIdAutocompleteComponent', () => {
  let component: CustomerIdAutocompleteComponent;
  let fixture: ComponentFixture<CustomerIdAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerIdAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerIdAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
