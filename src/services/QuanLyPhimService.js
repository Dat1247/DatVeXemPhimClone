import { GROUP_ID } from "../utils/settings/config";
import { BaseService } from "./baseService";

export const QuanLyPhimService = {
	layDanhSachBanner: () => {
		return BaseService.get(`api/QuanLyPhim/LayDanhSachBanner`);
	},

	layDanhSachPhim: (tenPhim = "") => {
		if (tenPhim !== "") {
			return BaseService.get(
				`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${tenPhim}`
			);
		}
		return BaseService.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
	},

	themPhimUploadHinh: (formData) => {
		return BaseService.post(`api/QuanLyPhim/ThemPhimUploadHinh`, formData);
	},

	layThongTinPhimTheoMa: (maPhim) => {
		return BaseService.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
	},

	capNhatThongTinPhimUpload: (formDataUpload) => {
		return BaseService.post(`api/QuanLyPhim/CapNhatPhimUpload`, formDataUpload);
	},

	xoaPhim: (maPhim) => {
		return BaseService.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
	},
};
