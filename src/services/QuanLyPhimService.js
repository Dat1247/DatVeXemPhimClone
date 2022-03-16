import { GROUP_ID } from "../utils/settings/config";
import { BaseService } from "./baseService";

export const QuanLyPhimService = {
	layDanhSachBanner: () => {
		return BaseService.get(`api/QuanLyPhim/LayDanhSachBanner`);
	},

	layDanhSachPhim: () => {
		return BaseService.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
	},
};
