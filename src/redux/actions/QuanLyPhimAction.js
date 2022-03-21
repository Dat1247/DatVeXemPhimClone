import { QuanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_ARR_PHIM, SET_DANH_SACH_PHIM } from "../types/QuanLyPhimType";

export const layDanhSachPhimAction = () => {
	return async (dispatch) => {
		try {
			const result = await QuanLyPhimService.layDanhSachPhim();

			dispatch({
				type: SET_DANH_SACH_PHIM,
				arrPhim: result.data.content,
			});
		} catch (err) {
			console.log(err);
		}
	};
};
