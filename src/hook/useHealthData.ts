import { useState, useEffect } from 'react';
import { getCookie, getActivitySummary, getSleepSummary } from '../utils/api';
import { MOCK_DATA, DEFAULT_MOCK_DATA } from '../lib/mockData';

// --- Format Helpers ---
const formatDuration = (totalMinutes: number) => {
	if (!totalMinutes) return "0h 0m";
	const h = Math.floor(totalMinutes / 60);
	const m = Math.floor(totalMinutes % 60);
	return `${h}h ${m}m`;
};

const formatTime = (isoString: string) => {
	if (!isoString) return "--:--";
	return new Date(isoString).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

const formatK = (num: number) => {
	return num > 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();
};
// ----------------------

export function useHealthData(connectedDevice: any) {
	const [data, setData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadData() {
			// 1. Fallback base data (keeps workouts/analysis intact)
			const fallbackData = connectedDevice ? (MOCK_DATA[connectedDevice.name] || DEFAULT_MOCK_DATA) : null;

			if (!connectedDevice) {
				setData(null);
				setIsLoading(false);
				return;
			}

			const token = getCookie("access_token");

			if (!token) {
				console.warn("No access token. Using mock data.");
				setData(fallbackData);
				setIsLoading(false);
				return;
			}

			try {
				// 2. Setup dates
				const today = new Date();
				const lastWeek = new Date();
				lastWeek.setDate(today.getDate() - 7);

				const endDate = today.toISOString();
				const startDate = lastWeek.toISOString();

				// 3. Fetch from FastAPI
				const [activityRes, sleepRes] = await Promise.all([
					getActivitySummary(token, startDate, endDate),
					getSleepSummary(token, startDate, endDate)
				]);

				// 4. Start with Mock Data as a base
				let transformedData = { ...fallbackData };

				// 5. Map FastAPI Activity Data
				if (activityRes && activityRes.data && activityRes.data.length > 0) {
					const latestActivity = activityRes.data[0];

					const GOAL_STEPS = 10000;
					const GOAL_ENERGY = 2000;
					const GOAL_ACTIVE_MINS = 60;

					transformedData.activity = {
						steps: formatK(latestActivity.steps || 0),
						energy: (latestActivity.total_calories_kcal || 0).toString(),
						active: (latestActivity.active_minutes || 0) + 'm',

						stepPct: Math.min(((latestActivity.steps || 0) / GOAL_STEPS) * 100, 100),
						energyPct: Math.min(((latestActivity.total_calories_kcal || 0) / GOAL_ENERGY) * 100, 100),
						activePct: Math.min(((latestActivity.active_minutes || 0) / GOAL_ACTIVE_MINS) * 100, 100)
					};
				}

				// 6. Map FastAPI Sleep Data
				if (sleepRes && sleepRes.data && sleepRes.data.length > 0) {
					const latestSleep = sleepRes.data[0];

					const inBedMins = latestSleep.time_in_bed_minutes || 0;
					const durationMins = latestSleep.duration_minutes || 0;
					const efficiency = latestSleep.efficiency_percent || 0;

					// Calculate sleep stage percentages for the UI Bar Chart
					let stagesArray = [25, 25, 40, 10]; // Fallback mock percentages

					if (latestSleep.stages) {
						const { deep_minutes, light_minutes, rem_minutes, awake_minutes } = latestSleep.stages;
						const totalStageMins = (deep_minutes + light_minutes + rem_minutes + awake_minutes) || 1; // Prevent divide by zero

						if (totalStageMins > 1) {
							stagesArray = [
								(deep_minutes / totalStageMins) * 100,
								(light_minutes / totalStageMins) * 100,
								(rem_minutes / totalStageMins) * 100,
								(awake_minutes / totalStageMins) * 100
							];
						}
					}

					transformedData.sleep = {
						time: formatDuration(inBedMins),
						efficiency: `${Math.round(efficiency)}%`,
						stages: stagesArray,
						detailed: {
							efficiency: `${Math.round(efficiency)}%`,
							duration: formatDuration(durationMins),
							timeInBed: formatDuration(inBedMins),
							bedtime: formatTime(latestSleep.start_time),
							wake: formatTime(latestSleep.end_time)
						}
					};
				}

				// 7. Apply the mapped data
				setData(transformedData);

			} catch (error) {
				console.error("API fetch failed, falling back to mock data:", error);
				setData(fallbackData);
			} finally {
				setIsLoading(false);
			}
		}

		loadData();
	}, [connectedDevice]);

	return { data, isLoading };
}