import React, { createContext, useState, useEffect } from "react";
import { signUpUser, signInUser } from "../services/auth";
import { withRouter } from "react-router";
import {
	fetchCategories,
	putBlogPost,
	fetchBlogs,
	fetchBlogDetail,
	fetchUserBLogs,
	removeUserBlog,
	updateUserBlog,
} from "../services/blog";
import { success, failed } from "../constants/Notification";

const BlogContext = createContext();

const user = localStorage.getItem("user");

const BlogContextProvider = (props) => {
	const { children, history } = props;
	const [authUser, setAuthUser] = useState(null);
	const [categories, setCategories] = useState([]);
	const [blogs, setBlogs] = useState([]);
	const [blogDetail, setBlogDetial] = useState(null);
	const [loading, setLoading] = useState(true);
	const [blogUser, setBlogUser] = useState([]);
	const [blogUserServer, setBlogUserServer] = useState([]);
	const [blogEdit, setBlogEdit] = useState({});

	const registerUser = async (name, email, password) => {
		try {
			const user = await signUpUser(name, email, password);
			setAuthUser(user.data.data);
			localStorage.setItem("user", JSON.stringify(user.data.data));
			history.push("/");
			success("Successfuly register !");
		} catch (error) {}
	};

	const loginUser = async (email, password) => {
		try {
			const user = await signInUser(email, password);
			setAuthUser(user.data.data);
			localStorage.setItem("user", JSON.stringify(user.data.data));
			history.push("/");
			success("Successfuly log in !");
		} catch (error) {
			console.log(error);
		}
	};

	const getCategories = async () => {
		try {
			const categoriesData = await fetchCategories();
			setCategories(categoriesData);
		} catch (error) {
			failed(error);
		}
	};

	const createBlogPost = async (data) => {
		try {
			await putBlogPost(data, authUser.token);
			history.push("/");
		} catch (error) {
			failed("Create blog failed, check your info");
		}
	};

	const getBlog = async () => {
		try {
			const data = await fetchBlogs();
			console.log(data);
			setBlogs(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePagination = async (url) => {
		try {
			const data = await fetchBlogs(url);
			setBlogs(data);
		} catch (error) {
			console.log(error);
		}
	};

	const getBlogDetaill = async (slug) => {
		const findBlog = blogs.data && blogs.data.data.find((blog) => blog.slug === slug);
		if (findBlog) {
			setBlogDetial(findBlog);
			setLoading(false);
		} else {
			try {
				const data = await fetchBlogDetail(slug);
				setBlogDetial(data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const getUserBlog = async () => {
		const user = JSON.parse(localStorage.getItem("user"));

		try {
			const response = await fetchUserBLogs(user.token);
			setBlogUserServer(response);
			setBlogUser(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteUserBlog = async (id) => {
		const user = JSON.parse(localStorage.getItem("user"));
		try {
			await removeUserBlog(id, user.token);
			let tempUserBlog = blogUser;
			tempUserBlog = tempUserBlog.filter((blog) => blog.id !== id);
			console.log(tempUserBlog);
			setBlogUser(tempUserBlog);
			success("Delete blog successful !");
		} catch (error) {
			failed("Delete blog failed !");
			console.log(error);
		}
	};

	const editUserBlog = async (slug) => {
		if (blogUser.length !== 0) {
			localStorage.setItem("editing", true);
			const findBlogEdit = blogUser.find((blog) => blog.slug === slug);
			setBlogEdit(findBlogEdit);
			history.push(`/user/edit/${slug}`);
			localStorage.setItem("blog-edit", JSON.stringify(findBlogEdit));
		}
	};

	const updateBlog = async (data) => {
		try {
			await updateUserBlog(data, authUser.token, blogEdit);
			success("Edit blog successful !")
			history.push("/");
		} catch (error) {
			success("Edit blog failed !")
			console.log(error);
		}
	};

	const logOutUser = async () => {
		setAuthUser(null);
		localStorage.setItem("user", JSON.stringify(null));
		success("Sign out successful !")
	};

	useEffect(() => {
		if (user) {
			setAuthUser(JSON.parse(user));
			getCategories();
			getBlog();
		} else {
			getBlog();
		}
	}, []);

	return (
		<BlogContext.Provider
			value={{
				getBlog,
				registerUser,
				authUser,
				loginUser,
				categories,
				createBlogPost,
				blogs,
				handlePagination,
				getBlogDetaill,
				blogDetail,
				loading,
				getUserBlog,
				blogUser,
				deleteUserBlog,
				blogUserServer,
				editUserBlog,
				blogEdit,
				updateBlog,
				logOutUser,
			}}>
			{children}
		</BlogContext.Provider>
	);
};

const BlogProviderWithRouter = withRouter(BlogContextProvider);

export { BlogProviderWithRouter, BlogContext };
