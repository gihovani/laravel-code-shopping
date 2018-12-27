import { Component } from '@angular/core';

/**
 * Generated class for the ProductListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'product-list',
  templateUrl: 'product-list.html'
})
export class ProductListComponent {

  text: string;

  constructor() {
    console.log('Hello ProductListComponent Component');
    this.text = 'Hello World';
  }

}
