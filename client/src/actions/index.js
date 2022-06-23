export const getUser = (data) => {
    return {
        type: "userdata",
        payload: data
    }
}

export const logoutUser = () => {
    return {
        type: "log"
    }
}

export const myCart = (data) => {
    return {
        type: "addToCart",
        payload: data
    }
}