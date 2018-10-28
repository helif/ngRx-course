import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Product } from "../product";
import { ProductService } from "../product.service";
import * as productActions from "./product.actions";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ProductEffects {
    constructor (private actions$:Actions,
        private productService: ProductService){
    }

    @Effect()
    LoadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.LoadProducts),
        mergeMap((action: productActions.LoadProducts) => this.productService.getProducts()
            .pipe(map((products:Product[]) => new productActions.LoadProductsSuccess(products)),
                catchError(err => of(new productActions.LoadProductsFailure(err)))))
    )

    @Effect()
    UpdateProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        mergeMap((action: productActions.UpdateProduct) => this.productService.updateProduct(action.payload)
            .pipe(map((updatedProduct:Product) => new productActions.UpdateProductSuccess(updatedProduct)),
                catchError(err => of(new productActions.UpdateProductFailure(err)))))
    )
}