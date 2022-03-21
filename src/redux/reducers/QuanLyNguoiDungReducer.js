import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { ThongTinNguoiDung } from "../../_core/models/ThongTinNguoiDung";
import {
	DANG_NHAP_ACTION,
	LAY_THONG_TIN_NGUOI_DUNG,
} from "../types/QuanLyNguoiDungType";

let user = {};

if (localStorage.getItem(USER_LOGIN)) {
	user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
	thongTinDangNhap: user,
	thongTinNguoiDung: new ThongTinNguoiDung(),
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
		case LAY_THONG_TIN_NGUOI_DUNG: {
			return { ...state, thongTinNguoiDung: action.thongTinNguoiDung };
		}
		default:
			return state;
	}
};
