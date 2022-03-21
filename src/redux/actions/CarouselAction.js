import { QuanLyPhimService } from "../../services/QuanLyPhimService";
import { SET_BANNER } from "../types/CarouselType";

export const layDanhSachBannerAction = () => {
	return async (dispatch) => {
		try {
			const result = await QuanLyPhimService.layDanhSachBanner();

			dispatch({
				type: SET_BANNER,
				arrBanner: result.data.content,
			});
		} catch (err) {
			console.log(err);
		}
	};
};
