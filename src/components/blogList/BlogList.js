import React, { useContext } from "react";
import BLogItem from "../blogItem/BLogItem";
import { BlogContext } from "../../contexts/BlogContextProvider";

const BlogList = () => {
	const { blogs, handlePagination } = useContext(BlogContext);
	console.log(blogs)

	return (
		<main className="main-content bg-gray">
			{blogs.data ? (
				<div className="row">
					<div className="col-12 col-lg-6 offset-lg-3">
						{blogs.data.data.map((blog) => {
							return (
								<>
									<BLogItem blog={blog} />
									<hr />
								</>
							);
						})}
						<nav className="flexbox mt-50 mb-50">
							<a
								href="#"
								className={`btn btn-white ${blogs.data.prev_page_url ? "" : "disabled"}`}
								onClick={() => handlePagination(blogs.data.prev_page_url)}>
								<i className="ti-arrow-left fs-9 mr-4" /> Older
							</a>
							<a
								className={`btn btn-white ${blogs.data.next_page_url ? "" : "disabled"}`}
								href="#"
								onClick={() => handlePagination(blogs.data.next_page_url)}>
								Newer
								<i className="ti-arrow-right fs-9 ml-4" />
							</a>
						</nav>
					</div>
				</div>
			) : (
				"Loading..."
			)}
		</main>
	);
};

export default BlogList;
