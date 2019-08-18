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
export const Middleware = [thunk];
//Middleware :
// const store = createStore(
//     rootReducer,
//     initialState,
//     compose(
//         applyMiddleware(...Middleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

// export const createStoreWithMiddleware = applyMiddleware(...Middleware)(createStore)

// export const store = createStoreWithMiddleware(rootReducer,
//     initialState,
//     compose(
//         applyMiddleware(...Middleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ))
//store :
//rootReducer :
//initialState : right now which is an empty obj
//compose : Since we are using redux dev tools we need to
//read more about this..

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...Middleware),
    // other store enhancers if any
);

export const createStoreWithMiddleware = applyMiddleware(...Middleware)(createStore)

// export const store = createStoreWithMiddleware(rootReducer, initialState)
const store = createStore(rootReducer, initialState, enhancer);

export default store;

