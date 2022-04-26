import { history } from "../../App";
import { Notification } from "../../components/Notification/Notification";
import { QuanLyPhimService } from "../../services/QuanLyPhimService";
import { STATUS_CODE } from "../../utils/settings/config";
import {
	LAY_THONG_TIN_PHIM_THEO_MA,
	SET_DANH_SACH_PHIM,
} from "../types/QuanLyPhimType";

export const layDanhSachPhimAction = (tenPhim = "") => {
	return async (dispatch) => {
		try {
			const result = await QuanLyPhimService.layDanhSachPhim(tenPhim);

			dispatch({
				type: SET_DANH_SACH_PHIM,
				arrPhim: result.data.content,
			});
		} catch (err) {
			alert(err.response?.data.content);
		}
	};
};

export const themPhimUploadHinhAction = (formData) => {
	return async (dispatch) => {
		try {
			let result = await QuanLyPhimService.themPhimUploadHinh(formData);

			if (result.status === STATUS_CODE.SUCCESS) {
				Notification("success", "Thêm phim thành công!");
				dispatch(layDanhSachPhimAction());
				history.push("/admin/films");
			}
		} catch (err) {
			Notification("error", "Thêm phim thất bại!", err.response?.data.content);
		}
	};
};

export const layThongTinPhimTheoMaAction = (maPhim) => {
	return async (dispatch) => {
		try {
			const { data, status } = await QuanLyPhimService.layThongTinPhimTheoMa(
				maPhim
			);

			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: LAY_THONG_TIN_PHIM_THEO_MA,
					thongTinPhim: data.content,
				});
			}
		} catch (err) {
			alert(err.response?.data.content);
		}
	};
};

export const capNhatThongTinPhimUploadAction = (formDataUpload) => {
	return async (dispatch) => {
		try {
			const result = await QuanLyPhimService.capNhatThongTinPhimUpload(
				formDataUpload
			);

			Notification("success", "Cập nhật phim thành công");

			dispatch(layDanhSachPhimAction());
			history.push("/admin/films");
		} catch (err) {
			Notification(
				"error",
				"Cập nhật phim thất bại",
				err.response?.data.message
			);
		}
	};
};

export const xoaPhimAction = (maPhim) => {
	return async (dispatch) => {
		try {
			const result = await QuanLyPhimService.xoaPhim(maPhim);

			Notification("success", "Xóa phim thành công");
			dispatch(layDanhSachPhimAction());
		} catch (err) {
			Notification("error", "Xóa phim thất bại", err.response?.data.content);
		}
	};
};
