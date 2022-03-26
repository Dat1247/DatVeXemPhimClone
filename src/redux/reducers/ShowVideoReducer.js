import { CLOSE_VIDEO, SHOW_VIDEO } from "../types/ShowVideoType";

const initialState = {
	isShow: false,
	link: "",
};

export const ShowVideoReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_VIDEO: {
			return { ...state, isShow: true, link: action.link };
		}
		case CLOSE_VIDEO: {
			return { ...state, isShow: false };
		}
		default:
			return state;
	}
};
