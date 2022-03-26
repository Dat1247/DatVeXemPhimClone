import { SHOW_VIDEO, CLOSE_VIDEO } from "../types/ShowVideoType";

export const showVideoAction = (link) => {
	return async (dispatch) => {
		dispatch({
			type: SHOW_VIDEO,
			link,
		});
	};
};

export const closeVideoAction = {
	type: CLOSE_VIDEO,
};
