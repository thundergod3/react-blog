import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { BlogContext } from "../contexts/BlogContextProvider";

const SignUp = () => {
	const { registerUser } = useContext(BlogContext);

	const reviewSchema = yup.object({
		name: yup.string().required(),
		email: yup.string().required(),
		password: yup.string().required().min(6, "Password must have less 6 characters"),
		passwordConfirm: yup
			.string()
			.required()
			.oneOf([yup.ref("password"), null], "Password not matched"),
	});

	return (
		<Formik
			initialValues={{ name: "", email: "", password: "", passwordConfirm: "" }}
			validationSchema={reviewSchema}
			onSubmit={(values, actions) => {
				actions.resetForm({});
				registerUser(values);
			}}>
			{(props) => (
				<div
					className="mh-fullscreen bg-img center-vh p-20"
					style={{ backgroundImage: "url(assets/img/bg-girl.jpg)" }}>
					<div className="card card-shadowed p-50 w-400 mb-0" style={{ maxWidth: "100%" }}>
						<h5 className="text-uppercase text-center">Register</h5>
						<br />
						<br />
						{/* <form className="form-type-material" onSubmit={handleSubmit}>
							
						</form> */}
						<div className="form-group">
							<input
								name="name"
								type="text"
								onChange={props.handleChange("name")}
								onBlur={props.handleBlur("name")}
								className="form-control"
								placeholder="Username"
							/>
							<small className="text-danger">{props.touched.name && props.errors.name}</small>
						</div>
						<div className="form-group">
							<input
								name="email"
								type="text"
								onChange={props.handleChange("email")}
								onBlur={props.handleBlur("email")}
								className="form-control"
								placeholder="Email address"
							/>
							<small className="text-danger">{props.touched.email && props.errors.email}</small>
						</div>
						<div className="form-group">
							<input
								name="password"
								type="password"
								onChange={props.handleChange("password")}
								onBlur={props.handleBlur("password")}
								className="form-control"
								placeholder="Password"
							/>
							<small className="text-danger">{props.touched.password && props.errors.password}</small>
						</div>
						<div className="form-group">
							<input
								name="passwordConfirm"
								type="password"
								onChange={props.handleChange("passwordConfirm")}
								onBlur={props.handleBlur("passwordConfirm")}
								className="form-control"
								placeholder="Password (confirm)"
							/>
							<small className="text-danger">
								{props.touched.passwordConfirm && props.errors.passwordConfirm}
							</small>
						</div>
						<br />
						<button
							className="btn btn-bold btn-block btn-primary"
							type="submit"
							onClick={props.handleSubmit}>
							Register
						</button>
						<hr className="w-30" />
						<p className="text-center text-muted fs-13 mt-20">
							Already have an account?
							<Link to="/login">Sign in</Link>
						</p>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default SignUp;
