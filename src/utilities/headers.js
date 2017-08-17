import * as utils from "./tokenUtilities";

export function getAuthHeaders() {
	let token = utils.getAuthToken();
	return {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Authorization": "Basic " + btoa(token + ":unused")
	};
}