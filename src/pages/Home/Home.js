import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleRowsSlick from "../../components/RSlick/MultipleRowSlick";
import ShowVideo from "../../components/ShowVideo/ShowVideo";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layThongTinHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import HomeMenu from "./HomeMenu/HomeMenu";

export default function Home(props) {
	const { arrPhim } = useSelector((state) => state.QuanLyPhimReducer);
	const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(layDanhSachPhimAction());
		dispatch(layThongTinHeThongRapAction());
	}, []);

	return (
		<div>
			<ShowVideo />
			<HomeCarousel />

			<div className='container mb-24'>
				<section className='text-gray-600 body-font'>
					<div className='px-5 py-24 mx-auto'>
						<MultipleRowsSlick arrPhim={arrPhim} />
					</div>
				</section>

				<HomeMenu heThongRapChieu={heThongRapChieu} />
			</div>
		</div>
	);
}
