import { Fragment } from "react";
import { Route } from "react-router-dom";

export const HomeTemplate = (props) => {
	const { Component, ...restProps } = props;

	return (
		<Route
			{...restProps}
			render={(propsRoute) => {
				return (
					<Fragment>
						<h1>Header</h1>
						<Component {...propsRoute} />
					</Fragment>
				);
			}}
		/>
	);
};
