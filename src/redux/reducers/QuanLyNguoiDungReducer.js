import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { DANG_NHAP_ACTION } from "../types/QuanLyNguoiDungType";

let user = {};

if (localStorage.getItem(USER_LOGIN)) {
	user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
	thongTinDangNhap: user,
};

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
	switch (action.type) {
		case DANG_NHAP_ACTION: {
			const { thongTinDangNhap } = action;
			localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
			localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);

			state.thongTinDangNhap = action.thongTinDangNhap;
			return { ...state };
		}
		default:
			return state;
	}
};
