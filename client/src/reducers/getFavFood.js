const initialState = {
    cart: []
}

const getFoodCart = (state = [], action) => {
    switch (action.type) {
        case "addToCart":
            const cart = action.payload;
            return state = { ...state, cart };

        default:
            return state;
    }
}

export default getFoodCart;