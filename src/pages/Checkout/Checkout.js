import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	datVeAction,
	layThongTinPhongVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import { UserOutlined } from "@ant-design/icons";
import style from "./Checkout.module.css";
import "./Checkout.css";
import { CHANGE_TAB_ACTIVE, DAT_GHE } from "../../redux/types/QuanLyDatVeType";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { Tabs } from "antd";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";

const { TabPane } = Tabs;

function Checkout(props) {
	const dispatch = useDispatch();
	const { thongTinDangNhap } = useSelector(
		(state) => state.QuanLyNguoiDungReducer
	);
	const { thongTinPhongVe, danhSachGheDangDat } = useSelector(
		(state) => state.QuanLyDatVeReducer
	);

	useEffect(() => {
		let maLichChieu = props.match.params.id;
		dispatch(layThongTinPhongVeAction(maLichChieu));
	}, []);

	const { danhSachGhe, thongTinPhim } = thongTinPhongVe;

	const renderGhe = () => {
		return danhSachGhe.map((ghe, index) => {
			let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
			let classGheDaDat = ghe.daDat ? "gheDaDat" : "";
			let classGheDangDat = "";
			let classGheDaDuocDat = "";

			let indexGheDangDat = danhSachGheDangDat?.findIndex(
				(gheDD) => gheDD.maGhe === ghe.maGhe
			);
			if (indexGheDangDat !== -1) {
				classGheDangDat = "gheDangDat";
			}
			if (ghe.taiKhoanNguoiDat === thongTinDangNhap.taiKhoan) {
				classGheDaDuocDat = "gheDaDuocDat";
			}

			return (
				<Fragment key={index}>
					<button
						disabled={ghe.daDat}
						className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat}`}
						onClick={() => {
							dispatch({
								type: DAT_GHE,
								ghe,
							});
						}}>
						{ghe.daDat ? (
							<UserOutlined style={{ marginBottom: 7 }} />
						) : (
							<span>{ghe.stt}</span>
						)}
					</button>

					{(index + 1) % 16 === 0 ? <br /> : ""}
				</Fragment>
			);
		});
	};

	return (
		<div className=''>
			<div className='grid grid-cols-12'>
				<div className='col-span-9'>
					<div className='flex flex-col items-center mt-5'>
						<div className={`${style["manHinh"]}`}></div>
						<div className={`${style["trapezoid"]} text-center`}>
							<p className='mt-12'>Màn hình</p>
						</div>
						<div className='mt-5'>{renderGhe()}</div>
						<div className='mt-5 flex justify-center w-4/5'>
							<table className='divide-y divide-gray-200 w-2/3'>
								<thead className='bg-gray-50'>
									<tr>
										<th>Ghế chưa đặt</th>
										<th>Ghế đang đặt</th>
										<th>Ghế vip</th>
										<th>Ghế đã được đặt</th>
										<th>Ghế bạn đã đặt</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className='text-center'>
											<button className='ghe'>0</button>
										</td>
										<td className='text-center'>
											<button className='ghe gheDangDat'>0</button>
										</td>
										<td className='text-center'>
											<button className='ghe gheVip'>0</button>
										</td>
										<td className='text-center'>
											<button className='ghe gheDaDat'>
												<UserOutlined style={{ marginBottom: 7 }} />
											</button>
										</td>
										<td className='text-center'>
											<button className='ghe gheDaDuocDat'>
												<UserOutlined style={{ marginBottom: 7 }} />
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className='col-span-3'>
					<div
						className=' flex flex-col justify-between'
						style={{
							minHeight: "100%",
							boxShadow: "0 0 10px 4px rgba(0,0,0,0.2)",
						}}>
						<div className='px-5 pt-10'>
							<h3 className='text-center text-2xl text-green-500 font-bold'>
								{danhSachGheDangDat
									?.reduce((tongTien, ghe, index) => {
										return (tongTien += ghe.giaVe);
									}, 0)
									.toLocaleString()}{" "}
								đ
							</h3>
							<hr />
							<div className='my-5'>
								<h3 className='font-bold text-xl'>{thongTinPhim.tenPhim}</h3>
								<p>Địa điểm: {thongTinPhim.diaChi}</p>
								<p>
									Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}{" "}
									- {thongTinPhim.tenRap}
								</p>
							</div>
							<hr />
							<div className='flex justify-between my-5'>
								<div className='text-lg text-red-500 mb-0 flex flex-wrap w-2/3'>
									<span className='mr-2 font-semibold'>Ghế</span>
									{_.sortBy(danhSachGheDangDat, ["stt"]).map((item, index) => {
										return (
											<span key={index} className='mr-2 text-green-500 text-xl'>
												{item.tenGhe}
											</span>
										);
									})}
								</div>
								<span className='text-green-800 text-xl font-bold'>
									{danhSachGheDangDat
										?.reduce((tongTien, ghe, index) => {
											return (tongTien += ghe.giaVe);
										}, 0)
										.toLocaleString()}{" "}
									đ
								</span>
							</div>
							<hr />
							<div className='my-5'>
								<p className='italic text-gray-500 mb-0'>Email</p>
								<p>{thongTinDangNhap.email}</p>
							</div>
							<hr />
							<div className='my-5'>
								<p className='italic text-gray-500 mb-0'>Phone</p>
								<p>{thongTinDangNhap.soDT}</p>
							</div>
						</div>

						<div
							className='p-4 bg-red-500 text-white text-lg tracking-wider font-bold text-center cursor-pointer hover:bg-red-700 duration-900'
							onClick={() => {
								const thongTinDatVe = new ThongTinDatVe();
								thongTinDatVe.maLichChieu = props.match.params.id;
								thongTinDatVe.danhSachVe = danhSachGheDangDat;

								dispatch(datVeAction(thongTinDatVe));
							}}>
							ĐẶT VÉ
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Demo(props) {
	const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
	const dispatch = useDispatch();
	return (
		<div className='p-5'>
			<Tabs
				defaultActiveKey='1'
				activeKey={tabActive.toString()}
				onChange={(key) => {
					dispatch({
						type: CHANGE_TAB_ACTIVE,
						number: key,
					});
				}}>
				<TabPane tab='01 CHỌN GHẾ & THANH TOÁN' key='1'>
					<Checkout {...props} />
				</TabPane>
				<TabPane tab='02 KẾT QUẢ ĐẶT VÉ' key='2'>
					<KetQuaDatVe {...props} />
				</TabPane>
			</Tabs>
		</div>
	);
}

function KetQuaDatVe(props) {
	const { thongTinNguoiDung } = useSelector(
		(state) => state.QuanLyNguoiDungReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(layThongTinNguoiDungAction());
	}, []);
	console.log(thongTinNguoiDung);

	const renderDanhSachVeDaDat = () => {
		return thongTinNguoiDung.thongTinDatVe?.map((item, index) => {
			const danhSachCacGhe = _.first(item.danhSachGhe);
			return (
				<div className='p-2 lg:w-1/3 md:w-1/2 w-full' key={index}>
					<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
						<img
							alt='team'
							className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
							src={item.hinhAnh}
						/>
						<div className='flex-grow'>
							<h2 className='text-gray-900 title-font font-medium'>
								{item.tenPhim}
							</h2>

							<p>{moment(item.ngayDat).format("hh:mm A - DD/MM/YYYY")}</p>
							<p>Địa điểm: {danhSachCacGhe.tenHeThongRap}</p>
							<p>
								Tên rạp: {danhSachCacGhe.tenCumRap} - Ghế:{" "}
								{item.danhSachGhe.map((ghe, index) => {
									return (
										<span key={index} className='mr-2'>
											{ghe.tenGhe}
										</span>
									);
								})}
							</p>
						</div>
					</div>
				</div>
			);
		});
	};

	return (
		<div className='container'>
			<section className='text-gray-600 body-font'>
				<div className='container px-5 py-24 mx-auto'>
					<div className='flex flex-col text-center w-full mb-20'>
						<h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
							Kết quả đặt vé
						</h1>
					</div>
					<div className='flex flex-wrap -m-2'>{renderDanhSachVeDaDat()}</div>
				</div>
			</section>
		</div>
	);
}
