import thunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {mainReducer} from './mainReducer';


let reducers = combineReducers({
	main: mainReducer,
	form: formReducer,
});
let store = createStore(reducers,applyMiddleware(thunk));
window.store = store;
export default store;