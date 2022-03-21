import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { BaseService } from "./baseService";

export const QuanLyDatVeService = {
	layThongTinPhongVe: (maLichChieu) => {
		return BaseService.get(
			`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
		);
	},

	datVe: (thongTinDatVe = new ThongTinDatVe()) => {
		return BaseService.post(`api/QuanLyDatVe/DatVe`, thongTinDatVe);
	},
};
