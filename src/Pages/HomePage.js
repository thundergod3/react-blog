import React, { useContext, useEffect } from "react";
import BlogList from "../components/blogList/BlogList";
import Banner from "../components/banner/Banner";
import { BlogContext } from "../contexts/BlogContextProvider";

const HomePage = () => {
	const { getBlog }  = useContext(BlogContext)

	useEffect(() => {
		getBlog()
	}, [])
	return (
		<>
			<Banner
				backgroundImage="url(assets/img/bg-gift.jpg)"
				title="Lastest Blog Posts"
				subTitle="Read and get updated on how we progress"
			/>
			<BlogList />
		</>
	);
};

export default HomePage;
