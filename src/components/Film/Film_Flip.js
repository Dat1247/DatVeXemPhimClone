import React from "react";
import "./Film_Flip.css";
import { PlayCircleOutlined } from "@ant-design/icons";
import { showVideoAction } from "../../redux/actions/ShowVideoAction";

export default function Film_Flip(props) {
	const { phim, dispatch } = props;
	return (
		<div className='flip-card'>
			<div className='flip-card-inner'>
				<div className='flip-card-front'>
					<img
						src={phim.hinhAnh}
						alt={phim.hinhAnh}
						style={{ width: 250, height: 300 }}
					/>
				</div>
				<div className='flip-card-back' style={{ left: 0, top: 0 }}>
					<div style={{ position: "absolute", top: 0, left: 0 }}>
						<img
							src={phim.hinhAnh}
							alt={phim.hinhAnh}
							style={{ width: 250, height: 300 }}
						/>
					</div>
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							backgroundColor: "rgba(0,0,0,0.5)",
							width: "100%",
							height: "100%",
						}}
						className='flex items-center justify-center flex-col'>
						<div
							className='rounded-full cursor-pointer'
							onClick={() => {
								dispatch(showVideoAction(phim.trailer));
							}}>
							<PlayCircleOutlined style={{ fontSize: "50px" }} />
						</div>
						<div className='text-2xl mt-2 font-bold'>{phim.tenPhim}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
