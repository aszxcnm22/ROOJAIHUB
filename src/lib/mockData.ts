export const MOCK_DATA: Record<string, any> = {
  'AppleWatch': {
    brandName: 'Apple Watch',
    workouts: [
      { id: 1, type: 'Cycling', date: 'Today · Indoor', hr: 145, kcal: 320, color: 'text-orange-500', bg: 'bg-orange-500/20', letter: 'C' },
      { id: 2, type: 'Walking', date: 'Yesterday · Outdoor', hr: 105, kcal: 150, color: 'text-blue-500', bg: 'bg-blue-500/20', letter: 'W' }
    ],
    activity: { steps: '12.4k', energy: '520', active: '45m', stepPct: 80, energyPct: 60, activePct: 75 },
    sleep: { time: '7h 25m', efficiency: '88%', stages: [20, 30, 40, 10], detailed: { efficiency: '88%', duration: '7h 10m', timeInBed: '7h 25m', bedtime: '10:30 PM', wake: '5:55 AM' } },
    analysis: {
      workoutText: 'Your cycling sessions show improved cardiovascular performance compared to last week.',
      sleepText: 'Deep sleep ratio is optimal. Maintain consistent bedtimes for better recovery.'
    }
  },
  'Garmin Fenix 7': {
    brandName: 'Garmin Fenix 7',
    workouts: [
      { id: 1, type: 'Running', date: 'Today · Trail', hr: 165, kcal: 540, color: 'text-emerald-500', bg: 'bg-emerald-500/20', letter: 'R' },
      { id: 2, type: 'Swimming', date: 'Yesterday · Pool', hr: 135, kcal: 410, color: 'text-cyan-500', bg: 'bg-cyan-500/20', letter: 'S' }
    ],
    activity: { steps: '18.2k', energy: '980', active: '110m', stepPct: 95, energyPct: 85, activePct: 90 },
    sleep: { time: '6h 45m', efficiency: '75%', stages: [15, 45, 25, 15], detailed: { efficiency: '75%', duration: '6h 15m', timeInBed: '6h 45m', bedtime: '11:45 PM', wake: '6:30 AM' } },
    analysis: {
      workoutText: 'Training load is high. Consider a recovery day to prevent overtraining.',
      sleepText: 'Sleep patterns disrupted. Focus on hydration and earlier wind-down routines.'
    }
  },
  'Suunto Race S': {
    brandName: 'Suunto Race S',
    workouts: [
      { id: 1, type: 'Bouldering', date: 'Dec 30 · Unknown gym', hr: 132, kcal: 116, color: 'text-amber-500', bg: 'bg-amber-500/20', letter: 'B' },
      { id: 2, type: 'Surfing', date: 'Dec 30 · Unknown gym', hr: 120, kcal: 96, color: 'text-blue-500', bg: 'bg-blue-500/20', letter: 'S' }
    ],
    activity: { steps: '8.4k', energy: '700', active: '51m', stepPct: 50, energyPct: 80, activePct: 40 },
    sleep: { time: '6h 53m', efficiency: '90%', stages: [25, 25, 45, 5], detailed: { efficiency: '90%', duration: '6h 53m', timeInBed: '6h 53m', bedtime: '5:28 AM', wake: '12:21 PM' } },
    analysis: {
      workoutText: 'Excellent aerobic endurance during surfing. Bouldering sessions show explosive power spikes.',
      sleepText: 'Your sleep timing shifted significantly. Monitor your circadian rhythm.'
    }
  },
  'Polar Vantage V3': {
    brandName: 'Polar Vantage V3',
    workouts: [
      { id: 1, type: 'Strength', date: 'Today · Gym', hr: 142, kcal: 380, color: 'text-rose-500', bg: 'bg-rose-500/20', letter: 'S' }
    ],
    activity: { steps: '5.2k', energy: '450', active: '35m', stepPct: 35, energyPct: 45, activePct: 30 },
    sleep: { time: '8h 10m', efficiency: '95%', stages: [25, 25, 35, 15], detailed: { efficiency: '95%', duration: '7h 55m', timeInBed: '8h 10m', bedtime: '9:30 PM', wake: '5:40 AM' } },
    analysis: {
      workoutText: 'Good strength session, but overall daily activity is low. Try to move more.',
      sleepText: 'ANS charge is excellent. Very good nervous system recovery.'
    }
  },
  'Whoop 4.0': {
    brandName: 'Whoop 4.0',
    workouts: [
      { id: 1, type: 'CrossFit', date: 'Today · Box', hr: 172, kcal: 620, color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/20', letter: 'C' }
    ],
    activity: { steps: '7.1k', energy: '1250', active: '85m', stepPct: 45, energyPct: 95, activePct: 80 },
    sleep: { time: '7h 12m', efficiency: '81%', stages: [10, 40, 30, 20], detailed: { efficiency: '81%', duration: '6h 45m', timeInBed: '7h 12m', bedtime: '12:15 AM', wake: '7:27 AM' } },
    analysis: {
      workoutText: 'High strain today. Your cardiovascular system is working at peak capacity.',
      sleepText: 'Recovery is in the yellow zone. Prioritize sleep debt repayment tonight.'
    }
  },
  'Oura Ring Gen 3': {
    brandName: 'Oura Ring Gen 3',
    workouts: [
      { id: 1, type: 'Yoga', date: 'Today · Studio', hr: 95, kcal: 180, color: 'text-violet-500', bg: 'bg-violet-500/20', letter: 'Y' }
    ],
    activity: { steps: '4.5k', energy: '310', active: '25m', stepPct: 30, energyPct: 35, activePct: 20 },
    sleep: { time: '8h 55m', efficiency: '96%', stages: [30, 20, 40, 10], detailed: { efficiency: '96%', duration: '8h 30m', timeInBed: '8h 55m', bedtime: '10:00 PM', wake: '6:55 AM' } },
    analysis: {
      workoutText: 'Light activity day. Good for active recovery. Readiness score is high.',
      sleepText: 'Excellent sleep latency and resting heart rate dip. Fully recovered.'
    }
  }
};

export const DEFAULT_MOCK_DATA = MOCK_DATA['Suunto Race S'];
