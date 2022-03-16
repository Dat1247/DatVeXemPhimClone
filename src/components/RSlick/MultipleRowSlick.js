import React, { Component } from "react";
import Slider from "react-slick";

import Film_Flip from "../Film/Film_Flip";
import styleSlick from "./MultipleRowSlick.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
	SET_PHIM_DANG_CHIEU,
	SET_PHIM_SAP_CHIEU,
} from "../../redux/types/QuanLyPhimType";

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className} ${styleSlick["slick-next"]}`}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		/>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={`${className} ${styleSlick["slick-prev"]}`}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		/>
	);
}

export default function MultipleRowsSlick(props) {
	const { dangChieu, sapChieu } = useSelector(
		(state) => state.QuanLyPhimReducer
	);
	const dispatch = useDispatch();

	const renderPhim = () => {
		return props.arrPhim.slice(0, 12).map((item, index) => {
			return (
				<div key={index} className='mt-2'>
					<Film_Flip phim={item} />
					<div
						className='bg-indigo-300 text-center cursor-pointer py-2 my-2 text-green-50 font-bold mb-4'
						style={{ width: "250px" }}>
						ĐẶT VÉ
					</div>
				</div>
			);
		});
	};

	let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
	let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

	const settings = {
		className: "center variable-width",
		centerMode: true,
		infinite: true,
		centerPadding: "60px",
		slidesToShow: 2,
		speed: 500,
		rows: 2,
		slidesPerRow: 2,
		variableWidth: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	return (
		<div>
			<div>
				<button
					className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded text-gray-800 bg-white border-gray-800 border-2 mr-2`}
					onClick={() => {
						dispatch({
							type: SET_PHIM_DANG_CHIEU,
						});
					}}>
					PHIM ĐANG CHIẾU
				</button>
				<button
					className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded text-gray-800 bg-white border-gray-800 border-2`}
					onClick={() => {
						dispatch({
							type: SET_PHIM_SAP_CHIEU,
						});
					}}>
					PHIM SẮP CHIẾU
				</button>
			</div>
			<Slider {...settings}>{renderPhim()}</Slider>
		</div>
	);
}
