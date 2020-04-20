import axios from "axios";
import { failed } from "../constants/Notification";

const baseURl = "https://react-blog-api.bahdcasts.com/api";

export const signUpUser = async ({ name, email, password }) => {
	try {
		const response = await axios.post(`${baseURl}/auth/register`, { name, email, password });
		return response;
	} catch (error) {
		failed(error.response.data["email"][0])
	}
};

export const signInUser = async ({ email, password }) => {
	try {
		const response = await axios.post(`${baseURl}/auth/login`, { email, password });
		return response;
	} catch (error) {
		failed("User or Password invalid")
	}
};
