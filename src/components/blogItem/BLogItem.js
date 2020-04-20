import React from "react";
import { Link } from "react-router-dom";

const BLogItem = ({ blog }) => {
	console.log(blog);

	return (
		<article className="mt-90">
			<header className="text-center mb-40">
				<h3>
					<Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
				</h3>
				<div className="link-color-default fs-12">
					<a href="#">{blog.category && blog.category.name}</a>,
					<time>{new Date(blog.created_at).toDateString()}</time>
				</div>
			</header>
			<a href="blog-single.html" style={{ display: "flex", flexDirection: "column" }}>
				<img className="rounded" src={blog.imageUrl} alt="..." />
			</a>
			<div className="card-block">
				<p className="text-justify">{`${blog.content.substring(0, 90)} ...`}</p>
				<p className="text-center mt-40">
					<Link className="btn btn-primary btn-round" to={`/blog/${blog.slug} `}>
						Read more
					</Link>
				</p>
			</div>
		</article>
	);
};

export default BLogItem;
