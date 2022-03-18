import {
	LAY_THONG_TIN_HE_THONG_RAP,
	LAY_THONG_TIN_HE_THONG_RAP_FOOTER,
	LAY_THONG_TIN_LICH_CHIEU_PHIM,
} from "../types/QuanLyRapType";

const initialState = {
	heThongRapChieu: [],
	heThongRapFooter: [],
	phimDetail: {},
};

export const QuanLyRapReducer = (state = initialState, action) => {
	switch (action.type) {
		case LAY_THONG_TIN_HE_THONG_RAP: {
			return { ...state, heThongRapChieu: action.heThongRapChieu };
		}
		case LAY_THONG_TIN_HE_THONG_RAP_FOOTER: {
			return { ...state, heThongRapFooter: action.heThongRapFooter };
		}
		case LAY_THONG_TIN_LICH_CHIEU_PHIM: {
			return { ...state, phimDetail: action.phimDetail };
		}
		default:
			return state;
	}
};
