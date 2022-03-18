import React, { Fragment } from "react";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;

export default function HomeMenu(props) {
	const { heThongRapChieu } = props;

	const renderDanhSachPhim = (cumRap) => {
		return cumRap.danhSachPhim.map((phim, index) => {
			return (
				<Fragment key={index}>
					<div className='flex'>
						<img
							src={phim.hinhAnh}
							alt={phim.hinhAnh}
							style={{ width: "100px", height: "150px" }}
						/>
						<div className='ml-4'>
							<NavLink
								className='text-xl text-green-800 font-bold mb-0'
								to={`/detail/${phim.maPhim}`}>
								{phim.tenPhim}
							</NavLink>
							<p className='mt-2 my-4 text-sm italic text-gray-700'>
								{cumRap.diaChi}
							</p>
							<div className='grid grid-cols-6 gap-7'>
								{phim.lstLichChieuTheoPhim?.map((lichChieu, index) => {
									return (
										<NavLink
											to='/'
											className='bg-cyan-300 text-black px-4 py-3 font-semibold rounded-md hover:text-white hover:bg-cyan-600'
											key={index}>
											{moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
										</NavLink>
									);
								})}
							</div>
						</div>
					</div>
					<hr className='my-4' />
				</Fragment>
			);
		});
	};

	const renderCumRap = (lstCumRap) => {
		return lstCumRap.map((cumRap, index) => {
			return (
				<TabPane
					tab={
						<div className='flex'>
							<img
								src={cumRap.hinhAnh}
								className=' w-12'
								alt={cumRap.hinhAnh}
							/>
							<p className='ml-2'>{cumRap.tenCumRap}</p>
						</div>
					}
					key={index}>
					{renderDanhSachPhim(cumRap)}
				</TabPane>
			);
		});
	};

	const renderHeThongRap = () => {
		return heThongRapChieu?.map((heThongRap, index) => {
			return (
				<TabPane
					tab={
						<img
							src={heThongRap.logo}
							className='rounded-full w-12'
							alt={heThongRap.logo}
						/>
					}
					key={index}>
					<Tabs tabPosition={"left"}>{renderCumRap(heThongRap.lstCumRap)}</Tabs>
				</TabPane>
			);
		});
	};

	return (
		<div className='homeMenu'>
			<Tabs tabPosition={"left"}>{renderHeThongRap()}</Tabs>
		</div>
	);
}
