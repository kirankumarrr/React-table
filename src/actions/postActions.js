import axios from "axios"

export const getPosts = () => async dispatch => {
    dispatch({
        type: "LOADERENABLE",
    });
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    dispatch({
        type: "GET_POSTS",
        payload: res.data
    });
    dispatch({
        type: "LOADERDISABLE",
    });
};