const initialState = {
    userdata: {}
}

const getUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "userdata":
            return { userdata: action.payload };
        case "log":
            return { userdata: "" };
        default:
            return state;
    }
}


export default getUserReducer;