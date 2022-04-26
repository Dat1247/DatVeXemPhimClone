import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { closeVideoAction } from "../../redux/actions/ShowVideoAction";

export default function ShowVideo(props) {
	const { isShow, link } = useSelector((state) => state.ShowVideoReducer);
	const dispatch = useDispatch();

	return (
		<Fragment>
			{isShow ? (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0,0,0,0.7)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: "1000",
						flexDirection: "column",
					}}>
					<div
						style={{
							position: "absolute",
							top: "30px",
							right: "30px",
							zIndex: "1500",
							color: "white",
						}}>
						<CloseOutlined
							className='text-2xl cursor-pointer '
							onClick={() => {
								dispatch(closeVideoAction);
							}}
						/>
					</div>
					<div className='video'>
						<iframe
							src={link}
							width='800'
							height='450'
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							title='Trailer'
						/>
					</div>
				</div>
			) : (
				""
			)}
		</Fragment>
	);
}
