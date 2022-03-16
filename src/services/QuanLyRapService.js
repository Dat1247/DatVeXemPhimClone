import { GROUP_ID } from "../utils/settings/config";
import { BaseService } from "./baseService";

export const QuanLyRapService = {
	layThongTinHeThongRap: () => {
		return BaseService.get(
			`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`
		);
	},
};
