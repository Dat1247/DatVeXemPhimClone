import { history } from "../../App";
import { Notification } from "../../components/Notification/Notification";
import { QuanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { STATUS_CODE } from "../../utils/settings/config";
import {
	DANG_NHAP_ACTION,
	LAY_DANH_SACH_LOAI_NGUOI_DUNG,
	LAY_DANH_SACH_NGUOI_DUNG,
	LAY_THONG_TIN_NGUOI_DUNG,
	LAY_THONG_TIN_NGUOI_DUNG_CAP_NHAT,
} from "../types/QuanLyNguoiDungType";

import { closeLoadingAction, openLoadingAction } from "./LoadingAction";

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

export const dangKyAction = (nguoiDung) => {
	return async (dispatch) => {
		try {
			const result = await QuanLyNguoiDungService.dangKy(nguoiDung);

			if (result.status === STATUS_CODE.SUCCESS) {
				Notification("success", "Đăng ký thành công!");
				history.push("/login");
			}
		} catch (err) {
			Notification("error", "Đăng ký thất bại", err.response?.data.content);
		}
	};
};

export const layDanhSachNguoiDungAction = () => {
	return async (dispatch) => {
		try {
			const result = await QuanLyNguoiDungService.layDanhSachNguoiDung();

			if (result.status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: LAY_DANH_SACH_NGUOI_DUNG,
					danhSachNguoiDung: result.data.content,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const xoaNguoiDungAction = (taiKhoan) => {
	return async (dispatch) => {
		try {
			const result = await QuanLyNguoiDungService.xoaNguoiDung(taiKhoan);

			console.log(result);
			if (result.status === STATUS_CODE.SUCCESS) {
				Notification("success", "Xóa người dùng thành công");
				dispatch(layDanhSachNguoiDungAction());
			}
		} catch (err) {
			Notification(
				"error",
				"Xóa người dùng thất bại",
				err.response?.data.content
			);
		}
	};
};

export const timKiemNguoiDungAction = (tuKhoa) => {
	return async (dispatch) => {
		try {
			const result = await QuanLyNguoiDungService.timKiemNguoiDung(tuKhoa);

			if (result.status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: LAY_DANH_SACH_NGUOI_DUNG,
					danhSachNguoiDung: result.data.content,
				});
			}
		} catch (err) {
			alert(err.response?.data.content);
		}
	};
};

export const layDanhSachLoaiNguoiDungAction = () => {
	return async (dispatch) => {
		try {
			const result = await QuanLyNguoiDungService.layDanhSachLoaiNguoiDung();

			if (result.status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: LAY_DANH_SACH_LOAI_NGUOI_DUNG,
					danhSachLoaiNguoiDung: result.data.content,
				});
			}
		} catch (err) {
			alert(err.response?.data.content);
		}
	};
};

export const themNguoiDungAction = (nguoiDung) => {
	return async (dispatch) => {
		try {
			const result = await QuanLyNguoiDungService.themNguoiDung(nguoiDung);

			if (result.status === STATUS_CODE.SUCCESS) {
				Notification("success", "Thêm người dùng thành công!");
				dispatch(layDanhSachNguoiDungAction());
				history.push("/admin/users");
			}
		} catch (err) {
			Notification(
				"error",
				"Thêm người dùng thất bại!",
				err.response?.data.content
			);
		}
	};
};

export const capNhatNguoiDungAction = (nguoiDungCapNhat) => {
	return async (dispatch) => {
		dispatch(openLoadingAction);
		try {
			const result = await QuanLyNguoiDungService.capNhatNguoiDung(
				nguoiDungCapNhat
			);

			if (result.status === STATUS_CODE.SUCCESS) {
				Notification("success", "Cập nhật người dùng thành công!");
				await dispatch(closeLoadingAction);
				dispatch(layDanhSachNguoiDungAction());
				// history.push("/admin/users");
			}
		} catch (err) {
			Notification(
				"error",
				"Cập nhật người dùng thất bại!",
				err.response?.data.content
			);
			await dispatch(closeLoadingAction);
		}
	};
};

export const timNguoiDungCapNhat = (taiKhoan) => {
	return async (dispatch) => {
		await dispatch(layDanhSachNguoiDungAction());
		await dispatch({
			type: LAY_THONG_TIN_NGUOI_DUNG_CAP_NHAT,
			taiKhoan,
		});
	};
};
