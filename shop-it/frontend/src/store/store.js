import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer } from '../reducers/productsReducers';

const reducer = combineReducers({
    products:productsReducer
});

let initialState = {};

const middleware = [thunk];
/*const store = () =>  {return(
        createStore(
            ()=>[], 
            {reducer, initialState},composeWithDevTools(applyMiddleware(...middleware))))
    };*/

/*const store = () =>  {
    const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)));
    return store;
    };*/

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;