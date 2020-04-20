import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { BlogContext } from "../contexts/BlogContextProvider";

const Login = () => {
	const { loginUser } = useContext(BlogContext);

	const reviewSchema = yup.object({
		email: yup.string().required(),
		password: yup.string().required(),
	});

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			onSubmit={(values, actions) => {
				actions.resetForm({});
				loginUser(values);
			}}
			validationSchema={reviewSchema}>
			{(props) => (
				<div
					className="mh-fullscreen bg-img center-vh p-20"
					style={{ backgroundImage: "url(assets/img/bg-girl.jpg)" }}>
					<p className="card card-shadowed p-50 w-400 mb-0" style={{ maxWidth: "100%" }}>
						<h5 className="text-uppercase text-center">Login</h5>
						<br />
						<br />
						<div className="form-group">
							<input
								name="email"
								type="text"
								className="form-control"
								placeholder="Email"
								onChange={props.handleChange("email")}
							/>
						</div>
						<small className="text-danger">{props.touched.email && props.errors.email}</small>
						<div className="form-group">
							<input
								name="password"
								type="password"
								className="form-control"
								placeholder="Password"
								onChange={props.handleChange("password")}
							/>
							<small className="text-danger">{props.touched.email && props.errors.email}</small>
						</div>
						<div className="form-group flexbox py-10">
							<label className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" defaultChecked />
								<span className="custom-control-indicator" />
								<span className="custom-control-description">Remember me</span>
							</label>
							<a className="text-muted hover-primary fs-13" href="#">
								Forgot password?
							</a>
						</div>
						<div className="form-group">
							<button
								className="btn btn-bold btn-block btn-primary"
								type="submit"
								onClick={props.handleSubmit}>
								Login
							</button>
						</div>
						<hr className="w-30" />
						<p className="text-center text-muted fs-13 mt-20">
							Don't have an account?
							<Link to="/signup">Sign up</Link>
						</p>
					</p>
				</div>
			)}
		</Formik>
	);
};

export default Login;
