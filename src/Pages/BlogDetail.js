import React, { useEffect, useContext } from "react";
import { BlogContext } from "../contexts/BlogContextProvider";

const BlogDetail = (props) => {
	const { getBlogDetaill, blogDetail, loading } = useContext(BlogContext);

	useEffect(() => {
		getBlogDetaill(props.match.params.slug);
	}, []);

	return (
		<div>
			{/* Main container */}
			<main className="main-content">
				{!loading ? (
					<>
						{/* Header */}
						<header
							className="header header-inverse h-fullscreen pb-80"
							style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-cup.jpg)` }}
							data-overlay={8}>
							<div className="container text-center">
								<div className="row h-full">
									<div className="col-12 col-lg-8 offset-lg-2 align-self-center">
										<p className="opacity-70">{blogDetail.category && blogDetail.category.name}</p>
										<br />
										<h1 className="display-4 hidden-sm-down">{blogDetail.title}</h1>
										<h1 className="hidden-md-up">{blogDetail.title}</h1>
										<br />
										<br />
										<p>
											<span className="opacity-70 mr-8">By</span>
											<a className="text-white" href="#">
												{blogDetail.user.name}
											</a>
										</p>
										<p>
											<img
												className="rounded-circle w-40"
												src={`${process.env.PUBLIC_URL}/assets/img/avatar/2.jpg`}
												alt="..."
											/>
										</p>
									</div>
									<div className="col-12 align-self-end text-center">
										<a
											className="scroll-down-1 scroll-down-inverse"
											href="#"
											data-scrollto="section-content">
											<span />
										</a>
									</div>
								</div>
							</div>
						</header>
						{/* END Header */}
						{/*
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
| Blog content
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
!*/}
						<div className="section" id="section-content">
							<div className="container">
								<div className="row">
									<div className="col-12 col-lg-8 offset-lg-2">{blogDetail.content}</div>
								</div>
							</div>
						</div>
						{/*
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
| Comments
|‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
!*/}
						<div className="section bt-1 bg-grey">
							<div className="container">
								<div className="row text-center">
									<div className="text-center p-5">COMMENTS HERE.</div>
								</div>
							</div>
						</div>
					</>
				) : (
					"Loading ..."
				)}
			</main>
			{/* END Main container */}
		</div>
	);
};

export default BlogDetail;
