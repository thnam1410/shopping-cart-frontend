const initialState = {
    list: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const newList = [...state.list];
            newList.push(action.payload);

            return {
                ...state,
                list: newList,
            };
        }

        case "REMOVE_FROM_CART": {
            const currentRemoveItem = action.payload;

            const newList = [...state.list].filter(
                (x) => x.name !== currentRemoveItem.name
            );

            return {
                ...state,
                list: newList,
            };
        }
        default:
            return state;
    }
};
export default cartReducer;
