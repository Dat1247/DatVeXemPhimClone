import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { QuanLyNguoiDungReducer } from "./reducers/QuanLyNguoiDungReducer";
import { QuanLyPhimReducer } from "./reducers/QuanLyPhimReducer";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer";

const rootReduxer = combineReducers({
	CarouselReducer,
	QuanLyPhimReducer,
	QuanLyRapReducer,
	QuanLyNguoiDungReducer,
});

export const store = createStore(rootReduxer, applyMiddleware(thunk));
