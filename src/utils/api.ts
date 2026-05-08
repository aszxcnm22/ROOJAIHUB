// src/utils/api.js

export function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
	return null;
}

const USER_ID = import.meta.env.VITE_TARGET_ID;
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// Generic fetch function that now handles URL Query Parameters
async function fetchSummary(endpointName, token, params = {}) {
	try {
		// Convert the params object into a URL query string (e.g., start_date=...&end_date=...)
		const queryString = new URLSearchParams(params).toString();

		// Append the query string to the URL if there are parameters
		const url = `${BASE_URL}/api/v1/users/${USER_ID}/summaries/${endpointName}${queryString ? `?${queryString}` : ''}`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch ${endpointName} data: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`Error in get${endpointName.charAt(0).toUpperCase() + endpointName.slice(1)}Summary:`, error);
		return null;
	}
}

// ---------------------------------------------------------
// Specific API Wrappers matching your FastAPI endpoints
// ---------------------------------------------------------

// Requires dates. Optional: cursor, limit (defaults to 50), sort_order
export const getActivitySummary = (token, startDate, endDate, limit = 50, sortOrder = "asc") =>
	fetchSummary('activity', token, {
		start_date: startDate,
		end_date: endDate,
		limit,
		sort_order: sortOrder
	});

// Requires dates. Optional: cursor, limit (defaults to 50)
export const getSleepSummary = (token, startDate, endDate, limit = 50) =>
	fetchSummary('sleep', token, {
		start_date: startDate,
		end_date: endDate,
		limit
	});

// Requires dates. Optional: cursor, limit (defaults to 50)
// Note: Your backend returns 501 Not Implemented, but the frontend is ready when you build it!
export const getRecoverySummary = (token, startDate, endDate, limit = 50) =>
	fetchSummary('recovery', token, {
		start_date: startDate,
		end_date: endDate,
		limit
	});

// No dates required. Optional: average_period (default 7), latest_window_hours (default 4)
export const getBodySummary = (token, averagePeriod = 7, latestWindowHours = 4) =>
	fetchSummary('body', token, {
		average_period: averagePeriod,
		latest_window_hours: latestWindowHours
	});

// No extra parameters required at all
export const getDataSummary = (token) =>
	fetchSummary('data', token);

export async function runAgent(token: string, targetDate: string) {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/agent/users/${USER_ID}/run`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                target_date: targetDate,
                trigger: "manual"
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to run agent: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in runAgent:", error);
        return null;
    }
}