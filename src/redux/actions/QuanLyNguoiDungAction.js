import { QuanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { STATUS_CODE } from "../../utils/settings/config";
import { DANG_NHAP_ACTION } from "../types/QuanLyNguoiDungType";

export const dangNhapAction = (nguoiDung) => {
	return async (dispatch) => {
		try {
			const { data, status } = await QuanLyNguoiDungService.dangNhap(nguoiDung);

			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: DANG_NHAP_ACTION,
					thongTinDangNhap: data.content,
				});
			}
		} catch (err) {
			alert(err.response?.data.content);
		}
	};
};
