import React, { useContext, useEffect } from "react";
import BlogList from "../components/blogList/BlogList";
import Banner from "../components/banner/Banner";
import { BlogContext } from "../contexts/BlogContextProvider";
import BlogUserList from "../components/blogUserList/BlogUserList";

const UserBlog = () => {
	const { blogUser, getUserBlog } = useContext(BlogContext);

	useEffect(() => {
		getUserBlog()
	}, [])

	return (
		<>
			<Banner backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-gift.jpg)`} title="My Blog Posts" />
			<BlogUserList />
		</>
	);
};

export default UserBlog;
