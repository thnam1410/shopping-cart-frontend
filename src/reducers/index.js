import cartReducer from "./cart";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    cart: cartReducer,
});

export default rootReducer;
