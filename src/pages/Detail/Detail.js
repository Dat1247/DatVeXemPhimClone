import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Rate } from "antd";
import { NavLink } from "react-router-dom";

import "../../assets/circle/circle.css";
import { layThongTinLichChieuPhimAction } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";

const { TabPane } = Tabs;
const box2 = {
	margin: "0 auto",
	width: "100%",
	minHeight: "100vh",
	background: " rgba(16,18,27,0.8)",
	border: "1px solid rgba( 255, 255, 255, 0.18 )",
	color: "white",
	backdropFilter: "blur(10px)",
};
export default function Detail(props) {
	const { phimDetail } = useSelector((state) => state.QuanLyRapReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		let maPhim = props.match.params.id;
		dispatch(layThongTinLichChieuPhimAction(maPhim));
	}, []);

	const renderDanhGia = () => {
		let ratingStar = phimDetail.danhGia / 2;

		return (
			<div className='flex flex-col justify-center items-center'>
				<div className={`c100  p${(phimDetail.danhGia * 100) / 10} center`}>
					<span>{phimDetail.danhGia}/10</span>
					<div className='slice'>
						<div className='bar'></div>
						<div className='fill'></div>
					</div>
				</div>
				<div className='mt-2'>
					<Rate disabled allowHalf value={ratingStar} />
				</div>
			</div>
		);
	};

	const renderThongTinLichChieu = () => {
		return phimDetail.heThongRapChieu?.map((lichChieu, index) => {
			return (
				<TabPane
					tab={
						<div>
							<img
								src={lichChieu.logo}
								alt={lichChieu.maHeTHongRap}
								style={{ width: 50, height: 50 }}
							/>
						</div>
					}
					key={index}>
					{lichChieu.cumRapChieu?.map((rapChieu, index) => {
						return (
							<div key={index}>
								<div className='flex mb-3'>
									<img
										src={rapChieu.hinhAnh}
										alt={rapChieu.hinhAnh}
										style={{ width: "50px", height: "50px" }}
									/>
									<div className='ml-2'>
										<p className='mb-0 text-lg font-semibold'>
											{rapChieu.tenCumRap}
										</p>
										<p className='mb-0 text-gray-300 text-xs italic'>
											{rapChieu.diaChi}
										</p>
									</div>
								</div>
								<div className='grid grid-cols-4 gap-4 mb-4'>
									{rapChieu.lichChieuPhim?.map((item, index) => {
										return (
											<div key={index}>
												<NavLink
													to={`/checkout/${item.maLichChieu}`}
													className='px-4 py-2 border-2 border-white mt-3 inline-block text-white hover:text-black hover:bg-white font-bold'>
													{moment(item.ngayChieuGioChieu).format("hh:mm A")}
												</NavLink>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</TabPane>
			);
		});
	};

	const renderThongTinPhim = () => {
		let ratingStar = phimDetail.danhGia / 2;

		return (
			<div>
				<h1 className='text-xl text-white'>
					T??n phim: <span className='font-bold'>{phimDetail.tenPhim}</span>{" "}
				</h1>
				<p className='text-lg mb-2'>
					Ng??y kh???i chi???u:{" "}
					<span>{moment(phimDetail.ngayKhoiChieu).format("DD/MM/YYYY")}</span>
				</p>
				<div className='text-base mb-2'>
					????nh gi??: <Rate disabled allowHalf value={ratingStar} />
				</div>
				<p className=''>
					M?? t???: <span style={{ letterSpacing: "1px" }}>{phimDetail.moTa}</span>
				</p>
			</div>
		);
	};

	return (
		<div
			style={{
				backgroundColor: "#000",
				backgroundImage: `url('${phimDetail.hinhAnh}')`,
				backgroundSize: "100%",
				backgroundRepeat: "no-repeat",
				minHeight: "100vh",
			}}>
			<div style={box2}>
				<div className='py-48 px-80'>
					<div className='grid grid-cols-3'>
						<div className='col-span-2'>
							<div className='grid grid-cols-2'>
								<div className=''>
									<img
										src={phimDetail.hinhAnh}
										alt='1'
										style={{
											width: "200px",
											height: "250px",
											margin: "0 auto",
										}}
									/>
								</div>
								<div className='ml-4 flex flex-col  justify-center'>
									<p className='mb-0'>
										Ng??y kh???i chi???u:{" "}
										{moment(phimDetail.ngayKhoiChieu).format("DD/MM/YYYY")}
									</p>
									<p className='text-2xl my-4 font-semibold'>
										{phimDetail.tenPhim}
									</p>
									<p className='mb-0'>
										{phimDetail.moTa?.slice(0, 150) + "..."}
									</p>
								</div>
							</div>
						</div>
						{renderDanhGia()}
					</div>
					<div className='mt-20 lichChieu'>
						<Tabs defaultActiveKey='1' centered>
							<TabPane tab='L???ch Chi???u' key='1' style={{ marginTop: "25px" }}>
								<Tabs tabPosition={"left"}>{renderThongTinLichChieu()}</Tabs>
							</TabPane>
							<TabPane tab='Th??ng Tin' key='2' style={{ marginTop: "25px" }}>
								{renderThongTinPhim()}
							</TabPane>
							<TabPane tab='????nh Gi??' key='3' style={{ marginTop: "25px" }}>
								????nh gi??
							</TabPane>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
}
