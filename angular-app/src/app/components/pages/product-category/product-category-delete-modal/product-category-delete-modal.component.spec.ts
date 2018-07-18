import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryDeleteModalComponent } from './product-category-delete-modal.component';

describe('ProductCategoryDeleteModalComponent', () => {
  let component: ProductCategoryDeleteModalComponent;
  let fixture: ComponentFixture<ProductCategoryDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoryDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
