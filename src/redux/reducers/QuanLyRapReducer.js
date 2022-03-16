import { LAY_THONG_TIN_HE_THONG_RAP } from "../types/QuanLyRapType";

const initialState = {
	heThongRapChieu: [],
};

export const QuanLyRapReducer = (state = initialState, action) => {
	switch (action.type) {
		case LAY_THONG_TIN_HE_THONG_RAP: {
			return { ...state, heThongRapChieu: action.heThongRapChieu };
		}
		default:
			return state;
	}
};
