import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachBannerAction } from "../../../../redux/actions/CarouselAction";
import "./HomeCarousel.css";

const contentStyle = {
	height: "600px",
	color: "#fff",
	lineHeight: "160px",
	textAlign: "center",
	background: "#364d79",
};

export default function HomeCarousel(props) {
	const { arrBanner } = useSelector((state) => state.CarouselReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(layDanhSachBannerAction());
	}, []);

	const renderBanner = () => {
		return arrBanner.map((item, index) => {
			return (
				<div key={index}>
					<div
						style={{
							...contentStyle,
							backgroundImage: `url('${item.hinhAnh}')`,
							backgroundPosition: "center",
							backgroundSize: "100%",
							backgroundRepeat: "no-repeat",
						}}>
						<img
							src={item.hinhAnh}
							className='w-full opacity-0'
							alt={item.hinhAnh}
						/>
					</div>
				</div>
			);
		});
	};

	return (
		<Carousel
			effect='fade'
			className='relative z-10'
			autoplay='true'
			autoplaySpeed={5000}>
			{renderBanner()}
		</Carousel>
	);
}
