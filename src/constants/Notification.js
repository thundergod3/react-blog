import Noty from "noty";

const success = (message) => {
	setTimeout(() => {
		new Noty({
			text: message,
			type: "success",
		}).show();
	}, 2000);
};

const failed = (message) => {
	setTimeout(() => {
		new Noty({
			text: message,
			type: "error",
		}).show();
	}, 2000);
};

export { success, failed };
