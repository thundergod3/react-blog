import React, { useContext } from "react";
import { BlogContext } from "../../contexts/BlogContextProvider";
import BLogItem from "../blogItem/BLogItem";

const BlogUserList = () => {
	const { blogUserServer, blogUser, handlePagination, deleteUserBlog, editUserBlog } = useContext(BlogContext);

	return (
		<main className="main-content bg-gray">
			{blogUser ? (
				blogUser.length === 0 ? (
					<div className="text-center">You don't have any blogs"</div>
				) : (
					<div className="row">
						<div className="col-12 col-lg-6 offset-lg-3">
							{blogUser.map((blog) => {
								console.log(blog.slug)
								return (
									<>
										<BLogItem blog={blog} />
										<div className="text-center">
											<button
												className="btn btn-info mr-3"
												onClick={() => editUserBlog(blog.slug)}>
												Edit BLog
											</button>
											<button className="btn btn-danger" onClick={() => deleteUserBlog(blog.id)}>
												Delete Blog
											</button>
										</div>
										<hr />
									</>
								);
							})}
							<nav className="flexbox mt-50 mb-50">
								<a
									href="#"
									className={`btn btn-white ${blogUserServer.data.prev_page_url ? "" : "disabled"}`}
									onClick={() => handlePagination(blogUser.data.prev_page_url)}>
									<i className="ti-arrow-left fs-9 mr-4" /> Older
								</a>
								<a
									className={`btn btn-white ${blogUserServer.data.next_page_url ? "" : "disabled"}`}
									href="#"
									onClick={() => handlePagination(blogUser.data.next_page_url)}>
									Newer
									<i className="ti-arrow-right fs-9 ml-4" />
								</a>
							</nav>
						</div>
					</div>
				)
			) : (
				"Loading..."
			)}
		</main>
	);
};

export default BlogUserList;
