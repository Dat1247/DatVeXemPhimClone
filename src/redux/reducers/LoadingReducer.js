import { CLOSE_LOADING, OPEN_LOADING } from "../types/LoadingType";

const initialState = {
	isLoading: false,
};

export const LoadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_LOADING:
			return { ...state, isLoading: true };
		case CLOSE_LOADING: {
			return { ...state, isLoading: false };
		}
		default:
			return state;
	}
};
