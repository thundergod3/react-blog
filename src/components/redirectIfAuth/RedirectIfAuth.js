import React from "react";
import { Route, Redirect } from "react-router";

const RedirectIfAuth = ({ component: Component, isAuthentication, path }) => {
	return (
		<Route
			exact
			to={path}
			render={(props) => {
				if (!isAuthentication) {
					return <Component />;
				}
				return <Redirect to="/" />;
			}}
		/>
	);
};

export default RedirectIfAuth;
