import { connection } from "../../index";
import { QuanLyDatVeService } from "../../services/QuanLyDatVeService";
import { STATUS_CODE } from "../../utils/settings/config";
import {
    CHUYEN_TAB,
    DAT_GHE,
    DAT_VE_HOAN_TAT,
    LAY_THONG_TIN_PHONG_VE,
} from "../types/QuanLyDatVeType";
import { closeLoadingAction, openLoadingAction } from "./LoadingAction";

export const layThongTinPhongVeAction = (maLichChieu) => {
    return async(dispatch) => {
        try {
            const { data, status } = await QuanLyDatVeService.layThongTinPhongVe(
                maLichChieu
            );

            dispatch({
                type: LAY_THONG_TIN_PHONG_VE,
                thongTinPhongVe: data.content,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const datVeAction = (thongTinDatVe) => {
    return async(dispatch, getState) => {
        dispatch(openLoadingAction);
        try {
            const { data, status } = await QuanLyDatVeService.datVe(thongTinDatVe);

            if (status === STATUS_CODE.SUCCESS) {
                await dispatch(layThongTinPhongVeAction(thongTinDatVe.maLichChieu));
                await dispatch({
                    type: DAT_VE_HOAN_TAT,
                });
                await dispatch(closeLoadingAction);

                let taiKhoan = getState().QuanLyNguoiDungReducer.thongTinDangNhap.taiKhoan
                await connection.invoke('datGheThanhCong', taiKhoan, thongTinDatVe.maLichChieu)
                await dispatch({
                    type: CHUYEN_TAB,
                });
            }
        } catch (err) {
            dispatch(closeLoadingAction);
            console.log(err);
        }
    };
};

export const datGheAction = (ghe, maLichChieu) => {
    return async(dispatch, getState) => {
        await dispatch({
            type: DAT_GHE,
            ghe,
        })

        let danhSachGheDangDat = await getState().QuanLyDatVeReducer.danhSachGheKhachDangDat;
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)
        let taiKhoan = getState().QuanLyNguoiDungReducer.thongTinDangNhap.taiKhoan
        maLichChieu = Number(maLichChieu)


        await connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu)

    }
}