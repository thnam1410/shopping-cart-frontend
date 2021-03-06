export const addNewItemToCart = (item) => {
    return {
        type: "ADD_TO_CART",
        payload: item,
    };
};
export const removeItemFromCart = (item) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: item,
    };
};
export const addMultipleItem = (items) => {
    return {
        type: "ADD_MULTIPLE_ITEM_FROM_LOCALSTORAGE",
        payload: items,
    };
};
export const removeAllItem = () => {
    return {
        type: "REMOVE_ALL_ITEM",
        payload: null,
    };
};
