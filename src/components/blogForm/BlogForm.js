import React, { useContext, useEffect } from "react";
import { BlogContext } from "../../contexts/BlogContextProvider";
import { Formik } from "formik";
import * as yup from "yup";

let _ = require("lodash");

const BlogForm = ({ props }) => {
	const {
		categories,
		createBlogPost,
		blogUser,
		getUserBlog,
		refreshEditUserBlog,
		editUserBlog,
		updateBlog,
	} = useContext(BlogContext);
	let editingBlog = localStorage.getItem("editing");
	let { blogEdit } = useContext(BlogContext);

	if (!props) {
		editingBlog = false;
	} else {
		if ((blogEdit = _.isEmpty())) {
			blogEdit = JSON.parse(localStorage.getItem("blog-edit"));
		}
	}

	const reviewSchema = yup.object({
		title: yup.string().required(),
		images: yup.array().required(),
		content: yup.string().required(),
		categoryList: yup.string().required(),
	});

	return (
		<Formik
			validationSchema={reviewSchema}
			method="POST"
			data-form="mailer"
			initialValues={{
				title: editingBlog ? blogEdit.title : "",
				images: [],
				content: editingBlog ? blogEdit.content : "",
				categoryList: {
					category: editingBlog && blogEdit.category.name,
					category_id: editingBlog && blogEdit.category_id,
				},
			}}
			onSubmit={(values, actions) => {
				if (editingBlog) {
					updateBlog(values);
				} else {
					createBlogPost(values);
				}
				actions.resetForm();
			}}>
			{(props) => (
				<>
					<div className="p-30 bg-gray rounded">
						<div className="row">
							<div className="form-group col-md-12 my-5">
								<input
									type="file"
									className="form-control"
									onChange={(e) => {
										console.log(e.currentTarget.files[0]);
										props.setFieldValue(
											"images",
											props.values.images.concat([e.currentTarget.files[0]])
										);
									}}
									onBlur={props.handleBlur("images")}
								/>
								<small className="text-danger">{props.touched.images && props.errors.images}</small>
							</div>
							<div className="form-group col-12 col-md-6">
								<input
									value={props.values.title}
									className="form-control form-control-lg"
									type="text"
									name="title"
									placeholder="Title"
									onChange={props.handleChange("title")}
									onBlur={props.handleBlur("title")}
								/>
								<small className="text-danger">{props.touched.title && props.errors.title}</small>
							</div>
							<div className="form-group col-12 col-md-6">
								<select
									value={props.values.categoryList.category}
									name="category"
									id={props.values.categoryList.category_id}
									className="form-control form-control-lg"
									onChange={props.handleChange("categoryList")}
									onBlur={props.handleBlur("categoryList")}>
									<option value>Select category</option>
									{categories.map((category) => (
										<option
											key={category.id}
											value={JSON.stringify({
												category: category.name,
												category_id: category.id,
											})}>
											{category.name}
										</option>
									))}
								</select>
								<small className="text-danger">
									{props.touched.categoryList && props.errors.categoryList}
								</small>
							</div>
						</div>
						<div className="form-group">
							<textarea
								value={props.values.content}
								className="form-control form-control-lg"
								rows={4}
								placeholder="Content"
								name="content"
								onChange={props.handleChange("content")}
								onBlur={props.handleBlur("content")}
							/>
							<small className="text-danger">{props.touched.content && props.errors.content}</small>
						</div>
						<div className="text-center">
							<button className="btn btn-lg btn-primary" type="submit" onClick={props.handleSubmit}>
								{editingBlog ? "Update Blog" : "Create Blog"}
							</button>
						</div>
					</div>
				</>
			)}
		</Formik>
	);
};

export default BlogForm;
