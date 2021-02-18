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
