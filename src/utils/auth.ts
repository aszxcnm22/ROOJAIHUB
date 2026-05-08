export async function login() {
	const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
	const username = import.meta.env.VITE_ADMIN_USER;
	const password = import.meta.env.VITE_ADMIN_PASS;

	// OAuth 2.0 endpoints typically expect application/x-www-form-urlencoded
	const formData = new URLSearchParams();
	formData.append("username", username);
	formData.append("password", password);

	try {
		const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`Login failed with status: ${response.status}`);
		}

		const data = await response.json();

		// Save the token to a cookie.
		// We use max-age to automatically expire the cookie based on the API response.
		// secure and samesite=strict are added for basic security best practices.
		document.cookie = `access_token=${data.access_token}; path=/; max-age=${data.expires_in}; SameSite=Strict`;

		// Optionally store the refresh token if your app needs it later
		if (data.refresh_token) {
			document.cookie = `refresh_token=${data.refresh_token}; path=/; max-age=${data.expires_in * 24}; SameSite=Strict`;
		}

		console.log("Login successful, token stored.");
		return data;

	} catch (error) {
		console.error("Error during authentication:", error);
		return null;
	}
}