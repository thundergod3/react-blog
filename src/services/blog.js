import axios from "axios";

const baseURl = "https://react-blog-api.bahdcasts.com/api";

export const fetchCategories = async () => {
	try {
		const categories = await axios.get(`${baseURl}/categories`);
		return categories.data.categories;
	} catch (error) {
		console.log(error.response);
	}
};

const uploadToCloudinary = async (image) => {
	const uploaders = image.map(async (file) => {
		const form = new FormData();
		form.append("file", file);
		form.append("upload_preset", "ml_default");
		const response = await axios.post("https://api.cloudinary.com/v1_1/dldk8bdfj/image/upload", form);
		return response.data;
	});

	const results = await axios.all(uploaders);
	return results;
};

export const putBlogPost = async (data, token) => {
	const categoryData = JSON.parse(data.categoryList);
	const images = await uploadToCloudinary(data.images);
	const response = await axios.post(
		`${baseURl}/articles`,
		{
			title: data.title,
			content: data.content,
			category: categoryData.category,
			category_id: categoryData.category_id,
			imageUrl: images[0].secure_url,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	console.log(response);
	return response.data;
};

export const fetchBlogs = async (url = `${baseURl}/articles`) => {
	const respoonse = await axios.get(url);
	return respoonse.data;
};

export const fetchBlogDetail = async (slug) => {
	const response = await axios.get(`${baseURl}/article/${slug}`);
	return response.data.data;
};

export const fetchUserBLogs = async (token) => {
	const response = await axios.get(`${baseURl}/user/articles`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return (response.data);
};

export const removeUserBlog = async (id, token) => {
	await axios.delete(`${baseURl}/articles/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return true;
};

export const updateUserBlog = async (data, editBlog,  token) => {
	const categoryData = JSON.parse(data.categoryList);
	const images = await uploadToCloudinary(data.images);
	const response = await axios.put(
		`${baseURl}/articles/${editBlog.id}`,
		{
			title: data.title,
			content: data.content,
			category: categoryData.category,
			category_id: categoryData.category_id,
			imageUrl: images[0].secure_url,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return response.data;
};