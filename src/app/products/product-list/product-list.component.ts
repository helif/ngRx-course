import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, from, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Product } from '../product';
import { ProductService } from '../product.service';
import * as fromProduct from "../state/product.reducer";
import { ProductState } from '../state/product-state';
import * as fromActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  displayCode: boolean;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  componentActive: boolean = true;

  constructor(private productService: ProductService, private store:Store<fromProduct.State>) { }

  ngOnInit(): void {

    this.store.pipe(
        select(fromProduct.getCurrentProduct),
        takeWhile(() => this.componentActive))
      .subscribe(
        currentProduct => this.selectedProduct = currentProduct
    );

    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.store.dispatch(new fromActions.LoadProducts());

    this.store.pipe(
        select(fromProduct.getShowProductCode),
        takeWhile(() => this.componentActive)
      ).subscribe(
        showProductCode => {
          this.displayCode = showProductCode
      })
  }

  ngOnDestroy(): void {
    this.componentActive = false;
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

}
