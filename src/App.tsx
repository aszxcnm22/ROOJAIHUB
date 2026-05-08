/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DeviceProvider } from './contexts/DeviceContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DeviceList from './pages/DeviceList';
import Analysis from './pages/Analysis';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import { getActivitySummary, getBodySummary, getCookie, getDataSummary, getSleepSummary } from './utils/api';
import { login } from './utils/auth';

export default function App() {
	useEffect(() => {
		console.log("App component has mounted!");

		const handleAuthAndFetch = async () => {
			let token = getCookie("access_token");

			if (token) {
				console.log("✅ Access token found in cookies.");
			} else {
				console.log("❌ No access token found. Attempting automatic login...");

				const authData = await login();

				if (authData && authData.access_token) {
					console.log("✅ Successfully logged in and got a new token.");
					token = authData.access_token;
				} else {
					console.error("❌ Login failed. Cannot proceed with fetching data.");
					return;
				}
			}

			try {
				console.log("⏳ Fetching user data...");

				const today = new Date();
				const lastWeek = new Date();
				lastWeek.setDate(today.getDate() - 7);

				const endDateString = today.toISOString();
				const startDateString = lastWeek.toISOString();

				const [activityData, sleepData, bodyData, userSummaryData] = await Promise.all([
					getActivitySummary(token, startDateString, endDateString),
					getSleepSummary(token, startDateString, endDateString),
					getBodySummary(token),
					getDataSummary(token)
				]);

				console.log("📊 --- Data Fetch Complete --- 📊");
				console.log("Activity:", activityData);
				console.log("Sleep:", sleepData);
				console.log("Body:", bodyData);
				console.log("User Data Count:", userSummaryData);

			} catch (error) {
				console.error("❌ Fetch error:", error);
			}
		};

		handleAuthAndFetch();

		return () => {
			console.log("App component unmounting!");
		};
	}, []);

	return (
		<LanguageProvider>
			<DeviceProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route element={<Layout />}>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/devices" element={<DeviceList />} />
							<Route path="/analysis" element={<Analysis />} />
							<Route path="/profile" element={<Profile />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</DeviceProvider>
		</LanguageProvider>
	);
}
