import {  ProductState } from "../products/state/product-state";
import { UserState } from "../user/state/user.state";

export interface State {
    products: ProductState;
    users: UserState;
}