import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Input()
  displayCode: boolean;
  @Input()
  selectedProduct: Product;
  @Input()
  products: Product[];
  @Input()
  errorMessage: string;

  @Output()
  checked = new EventEmitter<boolean>();
  @Output()
  selected = new EventEmitter<Product>();
  @Output()
  newProductAdded = new EventEmitter<void>();

  pageTitle = 'Products';

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  newProduct(): void {
    this.newProductAdded.emit();
  }

  productSelected(product: Product): void {
    this.selected.emit(product);
  }
}
