import { SET_BANNER } from "../types/CarouselType";

const initialState = {
	arrBanner: [
		{
			maBanner: 1,
			maPhim: 1282,
			hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
		},
	],
};

export const CarouselReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_BANNER: {
			return { ...state, arrBanner: action.arrBanner };
		}
		default:
			return state;
	}
};
