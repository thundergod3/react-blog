import React, { useContext, useEffect } from "react";
import Banner from "../components/banner/Banner";
import BlogForm from "../components/blogForm/BlogForm";
import { BlogContext } from "../contexts/BlogContextProvider";

const EditBlog = ({ props }) => {
	const { editUserBlog, getUserBlog } = useContext(BlogContext);
	const blogEdit = JSON.parse(localStorage.getItem("blog-edit"));

	return (
		<>
			<Banner
				backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-gift.jpg)`}
				title={`Edit Blog: : ${blogEdit.title}`}
			/>
			<main className="main-content">
				<section className="section">
					<div className="container">
						<div className="row">
							<div className="col-12 col-lg-12">
								<BlogForm props={props} />
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default EditBlog;
