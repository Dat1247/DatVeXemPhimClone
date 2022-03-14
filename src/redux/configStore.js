import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

const rootReduxer = combineReducers({});

export const store = createStore(rootReduxer, applyMiddleware(thunk));
