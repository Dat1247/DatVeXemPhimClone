import { Fragment, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../utils/settings/config";

export const CheckoutTemplate = (props) => {
	const { Component, ...restProps } = props;

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	if (!localStorage.getItem(USER_LOGIN)) {
		return <Redirect to='/login' />;
	}

	return (
		<Route
			{...restProps}
			render={(propsRoute) => {
				return (
					<Fragment>
						<Component {...propsRoute} />
					</Fragment>
				);
			}}
		/>
	);
};
