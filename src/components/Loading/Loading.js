import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export default function Loading(props) {
	const { isLoading } = useSelector((state) => state.LoadingReducer);

	return (
		<Fragment>
			{isLoading ? (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(255,255,255,0.8)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: "1000",
						flexDirection: "column",
					}}>
					<img
						src={require("../../assets/img/loading.gif")}
						style={{ width: "150px", height: "150px" }}
						alt=''
					/>
					<p className='text-2xl font-semibold tracking-widest'>Loading...</p>
				</div>
			) : (
				""
			)}
		</Fragment>
	);
}
