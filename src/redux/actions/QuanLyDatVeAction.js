import { QuanLyDatVeService } from "../../services/QuanLyDatVeService";
import { STATUS_CODE } from "../../utils/settings/config";
import { CLOSE_LOADING, OPEN_LOADING } from "../types/LoadingType";
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
			console.log(err);
		}
	};
};

export const datVeAction = (thongTinDatVe) => {
	return async (dispatch) => {
		dispatch(openLoadingAction);
		try {
			const { data, status } = await QuanLyDatVeService.datVe(thongTinDatVe);

			if (status === STATUS_CODE.SUCCESS) {
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
			console.log(err);
		}
	};
};
