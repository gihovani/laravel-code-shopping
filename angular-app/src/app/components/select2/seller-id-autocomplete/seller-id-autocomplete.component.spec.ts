import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerIdAutocompleteComponent } from './seller-id-autocomplete.component';

describe('SellerIdAutocompleteComponent', () => {
  let component: SellerIdAutocompleteComponent;
  let fixture: ComponentFixture<SellerIdAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerIdAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerIdAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
