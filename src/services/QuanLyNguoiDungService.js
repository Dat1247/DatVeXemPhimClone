import { BaseService } from "./baseService";

export const QuanLyNguoiDungService = {
	dangNhap: (nguoiDung) => {
		return BaseService.post(`api/QuanLyNguoiDung/DangNhap`, nguoiDung);
	},
};
