const initialState = {
    productName: "",
    productPrice: null,
    sizes:[],
    files:[],
};

const adminProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PRODUCT": {
            const newProductObj = { ...state };
            return {
                ...newProductObj,
                ...action.payload,
            };
        }
        default:
            return state;
    }
};
export default adminProductReducer;
