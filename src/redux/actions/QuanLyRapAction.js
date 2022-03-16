import { QuanLyRapService } from "../../services/QuanLyRapService";
import { LAY_THONG_TIN_HE_THONG_RAP } from "../types/QuanLyRapType";

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
