import React, { useContext } from "react";
import "./App.css";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import About from "./Pages/About";
import HomePage from "./Pages/HomePage";
import CreateBlog from "./Pages/CreateBlog";
import Login from "./Pages/Login";
import BlogDetail from "./Pages/BlogDetail";
import SignUp from "./Pages/SignUp";
import { BlogContext } from "./contexts/BlogContextProvider";
import UserBlog from "./Pages/UserBlog";
import RedirectIfAuth from "./components/redirectIfAuth/RedirectIfAuth";
import Authentication from "./components/authentication/Authentication";
import EditBlog from "./Pages/EditBlog";

const App = (props) => {
	const { location } = props;
	const { authUser } = useContext(BlogContext);

	const user = JSON.parse(localStorage.getItem("user"));

	return (
		<>
			{location.pathname !== "/login" && location.pathname !== "/signup" && <Navbar />}
			<Switch>
				<Route exact path="/" component={HomePage} />
				{/* <Route exact path="/user/blog" component={UserBlog} /> */}
				<Authentication path="/user/blog" component={UserBlog} isAuthentication={user} />
				<Route exact path="/about" component={About} />
				{/* {user ? <Redirect to="/" /> : <Route exact path="/login" component={Login} />} */}
				<RedirectIfAuth component={Login} path="/login" isAuthentication={user} />
				{/* {user ? <Redirect to="/" /> : <Route exact path="/signup" component={SignUp} />} */}
				<RedirectIfAuth component={SignUp} path="/signup" isAuthentication={user} />
				<Route exact path="/blog/:slug" component={BlogDetail} />
				{/* {user ? <Route exact path="/user/create" component={CreateBlog} /> : <Redirect to="/login" />} */}
				<Authentication path="/user/create" component={CreateBlog} isAuthentication={user} />
				<Authentication path="/user/edit/:slug" component={() => <EditBlog props={props}/>} isAuthentication={user}/>
			</Switch>
			{location.pathname !== "/login" && location.pathname !== "/signup" && <Footer />}
		</>
	);
};

export default withRouter(App);
