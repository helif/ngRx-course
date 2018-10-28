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
  // errorMessage: string;

  displayCode: boolean;

  // products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  componentActive: boolean = true;
  // sub: Subscription;

  constructor(private productService: ProductService, private store:Store<fromProduct.State>) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   selectedProduct => this.selectedProduct = selectedProduct
    // );

    this.store.pipe(
        select(fromProduct.getCurrentProduct),
        takeWhile(() => this.componentActive))
      .subscribe(
        currentProduct => this.selectedProduct = currentProduct
    );

    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );

    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    // .subscribe(
    //   (products: Product[]) => this.products = products
    // )

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
    // this.sub.unsubscribe();
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    // this.displayCode = value;
    // this.store.dispatch({
    //   type: '[Product][Toggle][ProductCode]',
    //   payload: value
    // })

    this.store.dispatch(new fromActions.ToggleProductCode(value));
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new fromActions.InitCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(new fromActions.SetCurrentProduct(product));
  }

}
