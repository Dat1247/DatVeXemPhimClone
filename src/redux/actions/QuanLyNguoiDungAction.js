import { history } from "../../App";
import { QuanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { STATUS_CODE } from "../../utils/settings/config";
import {
	DANG_NHAP_ACTION,
	LAY_THONG_TIN_NGUOI_DUNG,
} from "../types/QuanLyNguoiDungType";

export const dangNhapAction = (nguoiDung) => {
	return async (dispatch) => {
		try {
			const { data, status } = await QuanLyNguoiDungService.dangNhap(nguoiDung);

			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: DANG_NHAP_ACTION,
					thongTinDangNhap: data.content,
				});
				history.goBack();
			}
		} catch (err) {
			alert(err.response?.data.content);
		}
	};
};

export const layThongTinNguoiDungAction = () => {
	return async (dispatch) => {
		try {
			const { data, status } =
				await QuanLyNguoiDungService.layThongTinTaiKhoan();

			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: LAY_THONG_TIN_NGUOI_DUNG,
					thongTinNguoiDung: data.content,
				});
			}
		} catch (err) {
			console.log(err.response?.data);
		}
	};
};
