export function getAuthToken() {
	return localStorage.getItem("token");
}

export function setAuthToken(token) {
	localStorage.setItem("token", token);
}

export function removeAuthToken() {
	localStorage.removeItem("token");
}

export function isAuthenticated() {
	return localStorage.getItem("token") === null;
}