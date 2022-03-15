import React from "react";
import { Carousel } from "antd";

const contentStyle = {
	height: "400px",
	color: "#fff",
	lineHeight: "160px",
	textAlign: "center",
	background: "#364d79",
};

export default function HomeCarousel(props) {
	return (
		<Carousel effect='fade' className='relative z-10'>
			<div>
				<div style={contentStyle}>
					<img src='https://picsum.photos/1000' className='w-full' alt='1' />
				</div>
			</div>
			<div>
				<div style={contentStyle}>
					{" "}
					<img src='https://picsum.photos/1000' className='w-full' alt='1' />
				</div>
			</div>
			<div>
				<div style={contentStyle}>
					{" "}
					<img src='https://picsum.photos/1000' className='w-full' alt='1' />
				</div>
			</div>
			<div>
				<div style={contentStyle}>
					{" "}
					<img src='https://picsum.photos/1000' className='w-full' alt='1' />
				</div>
			</div>
		</Carousel>
	);
}
