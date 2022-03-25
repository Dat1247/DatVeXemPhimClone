import { GROUP_ID } from "../utils/settings/config";
import { BaseService } from "./baseService";

export const QuanLyNguoiDungService = {
	dangNhap: (nguoiDung) => {
		return BaseService.post(`api/QuanLyNguoiDung/DangNhap`, nguoiDung);
	},

	layThongTinTaiKhoan: () => {
		return BaseService.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`);
	},

	dangKy: (nguoiDung) => {
		return BaseService.post(`api/QuanLyNguoiDung/DangKy`, nguoiDung);
	},

	layDanhSachNguoiDung: () => {
		return BaseService.get(
			`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`
		);
	},

	xoaNguoiDung: (taiKhoan) => {
		return BaseService.delete(
			`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
		);
	},

	timKiemNguoiDung: (tuKhoa) => {
		return BaseService.get(
			`api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`
		);
	},
};
