import React from "react";
import Banner from "../components/banner/Banner";
import BlogForm from "../components/blogForm/BlogForm";

const CreateBlog = () => {
	return (
		<>
			<Banner backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-gift.jpg)`} title="Create Blog" />
			<main className="main-content">
				<section className="section">
					<div className="container">
						<div className="row">
							<div className="col-12 col-lg-12">
								<BlogForm />
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default CreateBlog;
