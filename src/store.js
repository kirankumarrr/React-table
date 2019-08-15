import { createStore, applyMiddleware, compose } from "redux";
//creatStore : creates  and initilizes the store
//applyMiddleware
//compse : which basically allows us to do more than 1 thing.. readmore..
import thunk from "redux-thunk";
//thunk :
import rootReducer from "./reducers";
//rootReducer :
const initialState = {};
//initialState : the reason of this initial state is that when store is created it takes initial state as argument
const Middleware = [thunk];
//Middleware :
const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...Middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
//store :
//rootReducer :
//initialState : right now which is an empty obj
//compose : Since we are using redux dev tools we need to
//read more about this..
export default store;