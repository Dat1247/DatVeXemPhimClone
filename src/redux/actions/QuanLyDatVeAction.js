import { Notification } from "../../components/Notification/Notification";
import { QuanLyDatVeService } from "../../services/QuanLyDatVeService";
import { STATUS_CODE } from "../../utils/settings/config";

import {
	CHUYEN_TAB,
	DAT_VE_HOAN_TAT,
	LAY_THONG_TIN_PHONG_VE,
} from "../types/QuanLyDatVeType";
import { closeLoadingAction, openLoadingAction } from "./LoadingAction";

export const layThongTinPhongVeAction = (maLichChieu) => {
	return async (dispatch) => {
		try {
			const { data, status } = await QuanLyDatVeService.layThongTinPhongVe(
				maLichChieu
			);

			dispatch({
				type: LAY_THONG_TIN_PHONG_VE,
				thongTinPhongVe: data.content,
			});
		} catch (err) {
			Notification(
				"error",
				"Lấy thông tin phòng vé thất bại! - Vui lòng reload lại trang!",
				err.response?.data.content
			);
		}
	};
};

export const datVeAction = (thongTinDatVe) => {
	return async (dispatch, getState) => {
		dispatch(openLoadingAction);
		try {
			const { data, status } = await QuanLyDatVeService.datVe(thongTinDatVe);

			if (status === STATUS_CODE.SUCCESS) {
				Notification("success", "Đặt vé thành công!");
				await dispatch(layThongTinPhongVeAction(thongTinDatVe.maLichChieu));
				await dispatch({
					type: DAT_VE_HOAN_TAT,
				});
				await dispatch(closeLoadingAction);
				await dispatch({
					type: CHUYEN_TAB,
				});
			}
		} catch (err) {
			dispatch(closeLoadingAction);
			Notification("error", "Đặt vé thất bại!", err.response?.data.content);
		}
	};
};
