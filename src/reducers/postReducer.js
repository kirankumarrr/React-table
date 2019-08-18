
export const initialState = {
    posts: [],
    loader: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "GET_POSTS":
            return { ...state, posts: action.payload };
        case "LOADERENABLE":
            return { ...state, loader: true };
        case "LOADERDISABLE":
            return { ...state, loader: false };
        default:
            return state;
    }
}