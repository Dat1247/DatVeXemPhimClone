import { QuanLyRapService } from "../../services/QuanLyRapService";
import {
	LAY_THONG_TIN_HE_THONG_RAP,
	LAY_THONG_TIN_HE_THONG_RAP_FOOTER,
	LAY_THONG_TIN_LICH_CHIEU_PHIM,
} from "../types/QuanLyRapType";
import { Notification } from "../../components/Notification/Notification";
import { history } from "../../App";

export const layThongTinHeThongRapAction = () => {
	return async (dispatch) => {
		try {
			const result = await QuanLyRapService.layThongTinHeThongRap();

			dispatch({
				type: LAY_THONG_TIN_HE_THONG_RAP,
				heThongRapChieu: result.data.content,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const layThongTinHeThongRapFooterAction = () => {
	return async (dispatch) => {
		try {
			const result = await QuanLyRapService.layThongTinHeThongRapFooter("");

			dispatch({
				type: LAY_THONG_TIN_HE_THONG_RAP_FOOTER,
				heThongRapFooter: result.data.content,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const layThongTinLichChieuPhimAction = (maPhim) => {
	return async (dispatch) => {
		try {
			const result = await QuanLyRapService.layThongTinLichChieuPhim(maPhim);

			dispatch({
				type: LAY_THONG_TIN_LICH_CHIEU_PHIM,
				phimDetail: result.data.content,
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const taoLichChieuAction = (lichChieu) => {
	return async (dispatch) => {
		try {
			const result = await QuanLyRapService.taoLichChieu(lichChieu);

			Notification("success", "Tạo lịch chiếu thành công!");

			history.push("/admin/films");
		} catch (err) {
			console.log(err);
			Notification(
				"error",
				"Tạo lịch chiếu thất bại!",
				err.response?.data.content
			);
		}
	};
};
