import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { ThongTinNguoiDung } from "../../_core/models/ThongTinNguoiDung";
import {
	DANG_NHAP_ACTION,
	LAY_DANH_SACH_LOAI_NGUOI_DUNG,
	LAY_DANH_SACH_NGUOI_DUNG,
	LAY_THONG_TIN_NGUOI_DUNG,
	LAY_THONG_TIN_NGUOI_DUNG_CAP_NHAT,
} from "../types/QuanLyNguoiDungType";

let user = {};

if (localStorage.getItem(USER_LOGIN)) {
	user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
	thongTinDangNhap: user,
	thongTinNguoiDung: new ThongTinNguoiDung(),
	danhSachNguoiDung: [],
	danhSachLoaiNguoiDung: [],
	nguoiDungCapNhat: {},
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
		case LAY_DANH_SACH_NGUOI_DUNG: {
			return { ...state, danhSachNguoiDung: action.danhSachNguoiDung };
		}
		case LAY_DANH_SACH_LOAI_NGUOI_DUNG: {
			return { ...state, danhSachLoaiNguoiDung: action.danhSachLoaiNguoiDung };
		}
		case LAY_THONG_TIN_NGUOI_DUNG_CAP_NHAT: {
			let index = state.danhSachNguoiDung.findIndex(
				(nd) => nd.taiKhoan === action.taiKhoan
			);
			if (index !== -1) {
				state.nguoiDungCapNhat = state.danhSachNguoiDung[index];
			}
			return { ...state };
		}
		default:
			return state;
	}
};
