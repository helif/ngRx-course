import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product-state";
import * as fromRoot from "../../state/app.state";
import { ProductActionTypes, ProductActions } from "./product.actions";

export interface State extends fromRoot.State {
    products: ProductState;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productCode: 'New',
                productName: '',
                description: '',
                starRating: 0
            };
        } else {
            return currentProductId? state.products.find(p => p.id === currentProductId) : null
        }
    });

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);

export function reducer(state = initialState, action:ProductActions): ProductState {

    switch(action.type) {
        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload
            }

        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProductId: action.payload.id
            }
        
        case ProductActionTypes.AddNewProduct:
            const newProductList = state.products.slice();
            newProductList.push(action.payload);
            return {
                ...state,
                currentProductId: action.payload.id,
                products: newProductList,
            }
        
        case ProductActionTypes.InitCurrentProduct:
            return {
                ...state,
                currentProductId: 0
            };

        case ProductActionTypes.ClearCurrentProduct:
            const cleanedProducts = state.products.filter(product => product.id !== state.currentProductId);
            return {
                ...state,
                currentProductId: null,
                products: cleanedProducts
            };

        case ProductActionTypes.LoadProductsSuccess:
            return {
                ...state,
                products: action.payload,
                error: ''
            }

        case ProductActionTypes.LoadProductsFailure:
            return {
                ...state,
                products: [],
                error: action.payload
            }
        
        case ProductActionTypes.UpdateProductSuccess:
            const updatedProducts = state.products.map(product => product.id === action.payload.id ? action.payload : product);
            return {
                ...state,
                currentProductId: action.payload.id,
                products: updatedProducts,
                error: ''
            }
        
        case ProductActionTypes.UpdateProductFailure:
            return {
                ...state,
                error: action.payload
            }

        case ProductActionTypes.LoadProductsFailure:
            return {
                ...state,
                products: [],
                error: action.payload
            }

        default:
            return state;
    }
}