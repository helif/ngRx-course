import { Action } from "@ngrx/store";
import { Product } from "../product";

export enum ProductActionTypes {
    ToggleProductCode = "[Product][Toggle][ProductCode]",
    AddNewProduct = "[Product][Add][NewProduct]",
    SetCurrentProduct = "[Product][Set][CurrentProduct]",
    ClearCurrentProduct = "[Product][Clear][CurrentProduct]",
    InitCurrentProduct = "[Product][Init][CurrentProduct]",
    LoadProducts = "[Product][Load]",
    LoadProductsSuccess = "[Product][Load][Success]",
    LoadProductsFailure = "[Product][Load][Failure]",
    UpdateProduct = "[Product][Update]",
    UpdateProductSuccess = "[Product][Update][Success]",
    UpdateProductFailure = "[Product][Update][Failure]",
    CreateProduct = "[Product][Create]",
    CreateProductSuccess = "[Product][Create][Success]",
    CreateProductFailure = "[Product][Create][Failure]",
}

export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;

    constructor(public payload:boolean) {}
}
export class AddNewProduct implements Action {
    readonly type = ProductActionTypes.AddNewProduct;

    constructor(public payload:Product) {}
}

export class SetCurrentProduct implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;

    constructor(public payload:Product) {}
}

export class ClearCurrentProduct implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitCurrentProduct implements Action {
    readonly type = ProductActionTypes.InitCurrentProduct;
}

export class LoadProducts implements Action {
    readonly type = ProductActionTypes.LoadProducts;
}

export class LoadProductsSuccess implements Action {
    readonly type = ProductActionTypes.LoadProductsSuccess;

    constructor(public payload:Product[]){}
}

export class LoadProductsFailure implements Action {
    readonly type = ProductActionTypes.LoadProductsFailure;

    constructor(public payload:string){}
}

export class UpdateProduct implements Action {
    readonly type = ProductActionTypes.UpdateProduct;

    constructor(public payload:Product){}
}

export class UpdateProductSuccess implements Action {
    readonly type = ProductActionTypes.UpdateProductSuccess;

    constructor(public payload:Product){}
}

export class UpdateProductFailure implements Action {
    readonly type = ProductActionTypes.UpdateProductFailure;

    constructor(public payload:string){}
}

export class CreateProduct implements Action {
    readonly type = ProductActionTypes.CreateProduct;

    constructor(public payload:Product){}
}

export class CreateProductSuccess implements Action {
    readonly type = ProductActionTypes.CreateProductSuccess;

    constructor(public payload:Product){}
}

export class CreateProductFailure implements Action {
    readonly type = ProductActionTypes.CreateProductFailure;

    constructor(public payload:string){}
}

export type ProductActions = ToggleProductCode 
    | SetCurrentProduct
    | AddNewProduct
    | ClearCurrentProduct 
    | InitCurrentProduct
    | LoadProducts
    | LoadProductsSuccess
    | LoadProductsFailure
    | UpdateProduct
    | UpdateProductSuccess
    | UpdateProductFailure
    | CreateProduct
    | CreateProductSuccess
    | CreateProductFailure;