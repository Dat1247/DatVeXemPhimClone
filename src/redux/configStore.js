import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { QuanLyDatVeReducer } from "./reducers/QuanLyDatVeReducer";
import { QuanLyNguoiDungReducer } from "./reducers/QuanLyNguoiDungReducer";
import { QuanLyPhimReducer } from "./reducers/QuanLyPhimReducer";
import { QuanLyRapReducer } from "./reducers/QuanLyRapReducer";
import { ShowVideoReducer } from "./reducers/ShowVideoReducer";

const rootReduxer = combineReducers({
	CarouselReducer,
	QuanLyPhimReducer,
	QuanLyRapReducer,
	QuanLyNguoiDungReducer,
	QuanLyDatVeReducer,
	LoadingReducer,
	ShowVideoReducer,
});

export const store = createStore(rootReduxer, applyMiddleware(thunk));
