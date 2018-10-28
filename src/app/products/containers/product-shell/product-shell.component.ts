import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromActions from '../../state/product.actions';
import * as fromProduct from "../../state/product.reducer";

import { Product } from '../../product';
import { Observable } from 'rxjs';
import { ProductService } from '../../product.service';

@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {

    displayCode$: Observable<boolean>;
    selectedProduct$: Observable<Product>;
    products$: Observable<Product[]>;
    errorMessage$: Observable<string>;

    currentProduct$: Observable<Product>;
  
    constructor(private store:Store<fromProduct.State>, private productService: ProductService) { }
  
    ngOnInit(): void {

        this.products$ = this.store.pipe(select(fromProduct.getProducts));
        this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
        this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
        this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
    
        this.store.dispatch(new fromActions.LoadProducts());
    }

    checkChanged(value: boolean): void {
      this.store.dispatch(new fromActions.ToggleProductCode(value));
    }
  
    newProduct(): void {
      this.store.dispatch(new fromActions.InitCurrentProduct());
    }
  
    productSelected(product: Product): void {
      this.store.dispatch(new fromActions.SetCurrentProduct(product));
    }

    saveProduct(p:Product): void {
        if (p.id === 0) {
          this.productService.createProduct(p).subscribe(
            product => this.store.dispatch(new fromActions.AddNewProduct(product))
          );
        } else {
          this.store.dispatch(new fromActions.UpdateProduct(p));
        }
    }

    deleteProduct(p:Product): void {
        if (p && p.id) {
          if (confirm(`Really delete the product: ${p.productName}?`)) {
            this.productService.deleteProduct(p.id).subscribe(
              () => this.store.dispatch(new fromActions.ClearCurrentProduct())
            );
          }
        } else {
          // No need to delete, it was never saved
          this.store.dispatch(new fromActions.ClearCurrentProduct());
        }
    } 
}
