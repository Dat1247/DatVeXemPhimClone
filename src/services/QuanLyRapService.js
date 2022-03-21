import { GROUP_ID } from "../utils/settings/config";
import { BaseService } from "./baseService";

export const QuanLyRapService = {
	layThongTinHeThongRap: () => {
		return BaseService.get(
			`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`
		);
	},

	layThongTinHeThongRapFooter: (keyWord) => {
		return BaseService.get(
			`api/QuanLyRap/LayThongTinHeThongRap?maHeThongRap=${keyWord}`
		);
	},

	layThongTinLichChieuPhim: (maPhim) => {
		return BaseService.get(
			`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
		);
	},
};
