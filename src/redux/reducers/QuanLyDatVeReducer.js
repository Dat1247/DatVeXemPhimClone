import { ThongTinPhongVe } from "../../_core/models/ThongTinPhongVe";
import {
	CHANGE_TAB_ACTIVE,
	CHUYEN_TAB,
	DAT_GHE,
	DAT_VE_HOAN_TAT,
	LAY_DANH_SACH_GHE_KHACH_DANG_DAT,
	LAY_THONG_TIN_PHONG_VE,
} from "../types/QuanLyDatVeType";

const initialState = {
	thongTinPhongVe: new ThongTinPhongVe(),
	danhSachGheDangDat: [],
	tabActive: 1,
	danhSachGheKhachDat: [],
};

export const QuanLyDatVeReducer = (state = initialState, action) => {
	switch (action.type) {
		case LAY_THONG_TIN_PHONG_VE: {
			return { ...state, thongTinPhongVe: action.thongTinPhongVe };
		}
		case DAT_GHE: {
			const { ghe } = action;
			const danhSachGheDangDatUpdate = state.danhSachGheDangDat;
			let index = danhSachGheDangDatUpdate.findIndex(
				(item) => item.maGhe === ghe.maGhe
			);
			if (index !== -1) {
				danhSachGheDangDatUpdate.splice(index, 1);
			} else {
				danhSachGheDangDatUpdate.push(ghe);
			}
			state.danhSachGheDangDat = danhSachGheDangDatUpdate;
			return { ...state };
		}

		case DAT_VE_HOAN_TAT: {
			return { ...state, danhSachGheDangDat: [] };
		}

		case CHUYEN_TAB: {
			return { ...state, tabActive: 2 };
		}

		case CHANGE_TAB_ACTIVE: {
			state.tabActive = action.number;
			return { ...state };
		}
		case LAY_DANH_SACH_GHE_KHACH_DANG_DAT: {
			state.danhSachGheKhachDat = action.arrGheKhachDat;
			return { ...state };
		}

		default:
			return state;
	}
};
