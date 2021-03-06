const initialState = {
    list: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            let newList = [...state.list];
            const newItem = action.payload;
            let existedItem = newList.filter(
                (x) => x.name === newItem.name && x.size == newItem.size
            );

            if (existedItem.length !== 0) {
                existedItem[0].quantity += newItem.quantity;
            } else {
                newList.push(newItem);
            }

            localStorage.setItem("data", JSON.stringify(newList));
            return {
                ...state,
                list: newList,
            };
        }

        case "REMOVE_FROM_CART": {
            const currentRemoveItem = action.payload;
            let storeList = [...state.list];
            const itemIndex = storeList.findIndex(
                (item) =>
                    item.name === currentRemoveItem.name &&
                    item.size === currentRemoveItem.size
            );
            storeList[itemIndex].quantity = storeList[itemIndex].quantity - 1;
            if (storeList[itemIndex].quantity === 0) {
                storeList.splice(itemIndex, 1);
            }
            localStorage.setItem("data", JSON.stringify(storeList));
            return {
                ...state,
                list: storeList,
            };
        }

        case "ADD_MULTIPLE_ITEM_FROM_LOCALSTORAGE": {
            const itemsFromLocalStorage = action.payload;
            return {
                ...state,
                list: itemsFromLocalStorage,
            };
        }
        case "REMOVE_ALL_ITEM": {
            localStorage.removeItem("data");
            return {
                ...state,
                list: [],
            };
        }
        default:
            return state;
    }
};
export default cartReducer;
