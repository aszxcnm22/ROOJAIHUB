import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Watch, LineChart, Moon, Zap, Bed, Clock, ClipboardList, Send, UserSquare, X, ChevronRight, Activity, Flame, HeartPulse, BrainCircuit, AlertTriangle } from 'lucide-react';
import { useDevices } from '../contexts/DeviceContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getCookie, runAgent } from '../utils/api';
import { useHealthData } from '../hook/useHealthData';

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.1 }
	}
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const labels = [
	{ id: 'skull', side: 'left', text: 'SKULL', top: '8%', horizontal: '15%', lineAngle: 25, lineWidth: '30px' },
	{ id: 'joints', side: 'right', text: 'JOINTS', top: '21%', horizontal: '12%', lineAngle: -15, lineWidth: '35px' },
	{ id: 'bones', side: 'left', text: 'BONES', top: '30%', horizontal: '5%', lineAngle: 10, lineWidth: '45px' },
	{ id: 'ribs', side: 'right', text: 'RIBS', top: '32%', horizontal: '15%', lineAngle: -5, lineWidth: '30px' },
	{ id: 'spine', side: 'left', text: 'SPINE', top: '45%', horizontal: '10%', lineAngle: 5, lineWidth: '45px' },
	{ id: 'cartilage', side: 'right', text: 'CARTILAGE', top: '43%', horizontal: '15%', lineAngle: 0, lineWidth: '35px' },
	{ id: 'marrow', side: 'left', text: 'BONE MARROW', top: '60%', horizontal: '2%', lineAngle: -10, lineWidth: '40px' },
	{ id: 'ligaments', side: 'right', text: 'LIGAMENTS', top: '73%', horizontal: '15%', lineAngle: -5, lineWidth: '30px' },
	{ id: 'tendons', side: 'right', text: 'TENDONS', top: '86%', horizontal: '15%', lineAngle: 0, lineWidth: '30px' },
];

export default function Analysis() {
	const { devices } = useDevices();
	const { t } = useLanguage();
	const connectedDevice = devices.find(d => d.status === 'Connected' || d.status === 'Sync');

	const { data, isLoading } = useHealthData(connectedDevice);

	const [formData, setFormData] = useState({
		painLocation: '',
		accidentDetails: '',
		durationHours: '',
		characteristics: ''
	});

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isAgentLoading, setIsAgentLoading] = useState(false);
	const [answerList, setAnswerList] = useState<any[]>([]);
	const [showBodyMap, setShowBodyMap] = useState(false);
	const [selectedParts, setSelectedParts] = useState<string[]>([]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSubmitted(true);
		setIsAgentLoading(true);

		const token = getCookie("access_token");
		if (token) {
			const todayStr = new Date().toISOString().split('T')[0];
			const agentResponse = await runAgent(token, todayStr);

			if (agentResponse) {
				setAnswerList(prev => [agentResponse, ...prev]);
			}
		} else {
			console.error("No token found. Cannot run agent.");
		}

		setIsAgentLoading(false);
	};

	// --- NEW RESET FUNCTION ---
	const handleReset = () => {
		setIsSubmitted(false);
		setFormData({
			painLocation: '',
			accidentDetails: '',
			durationHours: '',
			characteristics: ''
		});
		setSelectedParts([]);
	};
	// --------------------------

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handlePartClick = (partText: string) => {
		setSelectedParts(prev => {
			const newParts = prev.includes(partText) ? prev.filter(p => p !== partText) : [...prev, partText];
			return newParts;
		});
	};

	useEffect(() => {
		if (selectedParts.length > 0) {
			setFormData(curr => ({ ...curr, painLocation: selectedParts.join(', ') }));
		}
	}, [selectedParts]);

	if (isLoading) {
		return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading analysis...</div>;
	}

	if (!data) {
		return (
			<div className="p-4 sm:p-6 bg-slate-950 min-h-screen w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center">
				<Watch size={48} className="text-slate-700 mb-4" />
				<h1 className="text-2xl font-bold mb-2 text-slate-100">{t('noDeviceData')}</h1>
				<p className="text-slate-400">{t('noDeviceDataDesc')}</p>
			</div>
		);
	}

	return (
		<>
			<motion.div
				className="p-4 sm:p-6 bg-slate-950 min-h-screen w-full max-w-lg mx-auto overflow-y-auto overflow-x-hidden"
				variants={containerVariants}
				initial="hidden"
				animate="show"
			>
				<motion.div variants={itemVariants} className="flex justify-between items-end mb-6">
					<h1 className="text-2xl font-bold text-slate-100">{t('analysis')}</h1>
					<span className="text-xs text-indigo-400 font-bold bg-indigo-500/10 px-2 py-1 rounded-lg">{data.brandName}</span>
				</motion.div>

				<div className="space-y-6 pb-8">
					<motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-3xl">
						<div className="flex items-center gap-2 mb-4">
							<LineChart size={20} className="text-indigo-400" />
							<h2 className="text-slate-400 text-xs uppercase tracking-widest font-bold">{t('workoutAnalysis')}</h2>
						</div>
						<p className='text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50'>
							{data.analysis.workoutText}
						</p>

						<div className="mt-6 grid grid-cols-2 gap-4">
							<div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/30">
								<div className="flex items-center gap-2 text-indigo-400 mb-1">
									<Activity size={16} />
									<span className="text-xs font-bold uppercase tracking-wider">{t('duration')}</span>
								</div>
								<div className="text-xl font-bold text-slate-100">45 <span className="text-sm font-medium text-slate-400">min</span></div>
							</div>
							<div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/30">
								<div className="flex items-center gap-2 text-rose-400 mb-1">
									<Flame size={16} />
									<span className="text-xs font-bold uppercase tracking-wider">Calories</span>
								</div>
								<div className="text-xl font-bold text-slate-100">320 <span className="text-sm font-medium text-slate-400">kcal</span></div>
							</div>
							<div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/30 col-span-2">
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center gap-2 text-emerald-400">
										<HeartPulse size={16} />
										<span className="text-xs font-bold uppercase tracking-wider">Heart Rate Zones</span>
									</div>
								</div>
								<div className="flex h-4 bg-slate-800 rounded-full overflow-hidden mt-2">
									<div className="bg-blue-400 w-[15%]" title="Warm Up"></div>
									<div className="bg-emerald-400 w-[45%]" title="Fat Burn"></div>
									<div className="bg-amber-400 w-[30%]" title="Cardio"></div>
									<div className="bg-rose-500 w-[10%]" title="Peak"></div>
								</div>
								<div className="flex justify-between text-[10px] text-slate-400 mt-1 uppercase font-bold">
									<span>Fat Burn 45%</span>
									<span>Cardio 30%</span>
								</div>
							</div>
						</div>

						<div className="mt-6 h-32 flex items-end gap-2 px-2">
							{[40, 70, 45, 90, 65, 85, 55].map((height, i) => (
								<motion.div
									key={i}
									initial={{ height: 0 }}
									animate={{ height: `${height}%` }}
									transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
									className="bg-indigo-500/80 rounded-t-sm flex-1"
								/>
							))}
						</div>
					</motion.div>

					<motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-3xl">
						<div className="flex items-center gap-2 mb-4">
							<Moon size={20} className="text-violet-400" />
							<h2 className="text-slate-400 text-xs uppercase tracking-widest font-bold">{t('sleepAnalysis')}</h2>
						</div>
						<p className='text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 mb-6'>
							{data.analysis.sleepText}
						</p>

						<div className="space-y-4">
							<div className="w-full h-3 sm:h-4 bg-slate-800 rounded-full overflow-hidden flex">
								<div className="h-full bg-indigo-500 w-[25%]" />
								<div className="h-full bg-violet-400 w-[30%]" />
								<div className="h-full bg-cyan-400 w-[40%]" />
								<div className="h-full bg-slate-500 w-[5%]" />
							</div>

							<div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4">
								<div className="flex flex-col gap-1">
									<div className="flex items-center gap-2">
										<Zap size={16} className="text-emerald-400" />
										<span className="font-bold text-slate-100">{data.sleep.detailed.efficiency}</span>
									</div>
									<span className="text-xs text-slate-400 pl-6">{t('efficiency')}</span>
								</div>

								<div className="flex flex-col gap-1">
									<div className="flex items-center gap-2">
										<Moon size={16} className="text-indigo-400" />
										<span className="font-bold text-slate-100">{data.sleep.detailed.duration}</span>
									</div>
									<span className="text-xs text-slate-400 pl-6">{t('duration')}</span>
								</div>

								<div className="flex flex-col gap-1">
									<div className="flex items-center gap-2">
										<Bed size={16} className="text-purple-400" />
										<span className="font-bold text-slate-100">{data.sleep.detailed.timeInBed}</span>
									</div>
									<span className="text-xs text-slate-400 pl-6">{t('timeInBed')}</span>
								</div>

								<div className="flex flex-col gap-1">
									<div className="flex items-center gap-2">
										<Clock size={16} className="text-cyan-500" />
										<span className="font-bold text-slate-100">{data.sleep.detailed.bedtime}</span>
									</div>
									<span className="text-xs text-slate-400 pl-6">{t('bedtime')}</span>
								</div>

								<div className="flex flex-col gap-1">
									<div className="flex items-center gap-2">
										<Clock size={16} className="text-amber-500" />
										<span className="font-bold text-slate-100">{data.sleep.detailed.wake}</span>
									</div>
									<span className="text-xs text-slate-400 pl-6">{t('wake')}</span>
								</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="bg-slate-900 border border-slate-800 p-5 rounded-3xl cursor-pointer hover:bg-slate-800/80 transition-colors group relative overflow-hidden"
						onClick={() => setShowBodyMap(true)}
					>
						<div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-colors" />
						<div className="flex items-center justify-between relative z-10">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
									<UserSquare size={24} />
								</div>
								<div>
									<h2 className="text-slate-100 font-bold mb-0.5">{t('bodyMap')}</h2>
									<p className="text-slate-400 text-xs">{t('bodyMapDesc')}</p>
								</div>
							</div>
							<ChevronRight className="text-slate-500 group-hover:text-slate-300 transition-colors" />
						</div>
						{selectedParts.length > 0 && (
							<div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-2 relative z-10">
								{selectedParts.map(part => (
									<span key={part} className="text-[10px] uppercase font-bold text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded">
										{part}
									</span>
								))}
							</div>
						)}
					</motion.div>

					<motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-3xl">
						<div className="flex items-center gap-2 mb-6">
							<ClipboardList size={20} className="text-emerald-400" />
							<h2 className="text-slate-100 text-lg font-bold">{t('questionnaire')}</h2>
						</div>

						{isSubmitted ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl text-center flex flex-col items-center justify-center"
							>
								<div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400">
									<Send size={24} />
								</div>
								<h3 className="text-emerald-400 font-bold mb-2">{t('thankYou')}</h3>
								<p className="text-slate-400 text-sm mb-4">
									{isAgentLoading ? "Analyzing your data with AI..." : "Analysis complete. Your results are below."}
								</p>

								{/* --- Reset Button displays after loading finishes --- */}
								{!isAgentLoading && (
									<button
										onClick={handleReset}
										className="bg-slate-800 hover:bg-slate-700 text-indigo-400 font-bold py-2.5 px-6 rounded-xl transition-colors text-sm border border-slate-700"
									>
										+ Ask Another Question
									</button>
								)}
							</motion.div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-5">
								<div className="space-y-2">
									<label htmlFor="painLocation" className="block text-sm font-medium text-slate-300">
										{t('q1')}
									</label>
									<input
										type="text"
										id="painLocation"
										name="painLocation"
										value={formData.painLocation}
										onChange={handleInputChange}
										className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
										placeholder="e.g., หัวเข่าซ้าย, ไหล่ขวา (use Body Map)"
										required
									/>
								</div>

								<div className="space-y-2">
									<label htmlFor="accidentDetails" className="block text-sm font-medium text-slate-300">
										{t('q2')}
									</label>
									<textarea
										id="accidentDetails"
										name="accidentDetails"
										value={formData.accidentDetails}
										onChange={handleInputChange}
										rows={3}
										className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
										placeholder="Describe what happened..."
										required
									/>
								</div>

								<div className="space-y-2">
									<label htmlFor="durationHours" className="block text-sm font-medium text-slate-300">
										{t('q3')}
									</label>
									<input
										type="number"
										id="durationHours"
										name="durationHours"
										value={formData.durationHours}
										onChange={handleInputChange}
										min="0"
										className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
										placeholder="e.g., 2"
										required
									/>
								</div>

								<div className="space-y-2">
									<label htmlFor="characteristics" className="block text-sm font-medium text-slate-300">
										{t('q4')}
									</label>
									<textarea
										id="characteristics"
										name="characteristics"
										value={formData.characteristics}
										onChange={handleInputChange}
										rows={3}
										className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
										placeholder="e.g., ปวดจี๊ดๆ, ปวดตุบๆ, เสียวแปล๊บ"
										required
									/>
								</div>

								<button
									type="submit"
									disabled={isAgentLoading}
									className={`w-full text-white font-bold py-4 rounded-xl transition-colors mt-4 flex items-center justify-center gap-2 shadow-lg ${isAgentLoading ? 'bg-indigo-800 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'}`}
								>
									{isAgentLoading ? (
										<span className="animate-pulse">Processing...</span>
									) : (
										<>
											<Send size={18} />
											{t('submit')}
										</>
									)}
								</button>
							</form>
						)}

						{/* --- AI AGENT RESPONSE RENDERER --- */}
						{answerList.length > 0 && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								className="mt-6 pt-6 border-t border-slate-800 space-y-4"
							>
								<div className="flex items-center gap-2 mb-4">
									<BrainCircuit size={18} className="text-indigo-400" />
									<h3 className="text-slate-100 font-bold">Agent Results</h3>
								</div>

								{answerList.map((ans, idx) => (
									<div key={ans.id || idx} className="bg-slate-950 border border-slate-700/50 p-4 sm:p-5 rounded-2xl relative overflow-hidden group">

										{/* Background Glow based on Risk */}
										<div className={`absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-20 pointer-events-none ${ans.risk_level?.toLowerCase() === 'high' ? 'bg-rose-500' : 'bg-indigo-500'}`} />

										{/* Header / Risk Level */}
										<div className="flex items-center justify-between mb-4 relative z-10">
											<span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
												<Clock size={12} />
												{new Date(ans.created_at || Date.now()).toLocaleTimeString()}
											</span>
											<div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black uppercase ${ans.risk_level?.toLowerCase() === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
												<AlertTriangle size={12} />
												{ans.risk_level || 'EVALUATING'}
											</div>
										</div>

										{/* Reasoning */}
										<p className="text-sm text-slate-200 leading-relaxed mb-4 relative z-10">
											{ans.reasoning}
										</p>

										{/* Observations List */}
										{ans.observations && ans.observations.length > 0 && (
											<div className="relative z-10 bg-slate-900/50 rounded-xl p-3 border border-slate-800">
												<p className="text-xs text-indigo-300 font-bold mb-2 uppercase tracking-wider">Key Observations</p>
												<ul className="space-y-1.5">
													{ans.observations.map((obs: string, i: number) => (
														<li key={i} className="text-xs text-slate-400 flex gap-2">
															<span className="text-indigo-500/50">•</span>
															{obs}
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
								))}
							</motion.div>
						)}
						{/* --------------------------------- */}

					</motion.div>
				</div>
			</motion.div>

			<AnimatePresence>
				{showBodyMap && (
					<motion.div
						initial={{ opacity: 0, y: '100%' }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: '100%' }}
						transition={{ type: 'spring', damping: 25, stiffness: 200 }}
						className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col"
					>
						<div className="p-4 sm:p-6 flex items-center justify-between border-b border-slate-800 bg-slate-900">
							<div className="flex items-center gap-3">
								<button
									onClick={() => setShowBodyMap(false)}
									className="p-2 border border-slate-700/50 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
								>
									<X size={20} />
								</button>
								<h2 className="text-xl font-black uppercase tracking-widest text-slate-100">{t('skeletalSystem')}</h2>
							</div>
							<button
								onClick={() => setShowBodyMap(false)}
								className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
							>
								{t('done')}
							</button>
						</div>

						<div className="flex-1 overflow-auto p-4 relative flex justify-center bg-slate-950">
							<div className="relative w-full max-w-sm mx-auto h-[600px] mt-4">

								<div className="absolute top-[5%] bottom-[5%] left-[20%] right-[20%] bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

								{/* Custom Inline SVG Skeleton Mannequin - Clean Abstract Design */}
								<svg viewBox="0 0 200 500" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl">
									<g stroke="rgba(99, 102, 241, 0.4)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
										{/* Head */}
										<circle cx="100" cy="50" r="25" fill="rgba(30, 41, 59, 0.8)" stroke="rgba(129, 140, 248, 0.8)" />
										{/* Spine */}
										<path d="M 100 75 V 200" strokeWidth="8" />
										{/* Shoulders */}
										<path d="M 60 100 Q 100 80 140 100" strokeWidth="10" />
										{/* Arms (Left) */}
										<path d="M 60 100 L 40 180 L 30 260" />
										{/* Arms (Right) */}
										<path d="M 140 100 L 160 180 L 170 260" />
										{/* Ribs */}
										<path d="M 80 120 Q 100 130 120 120 M 80 140 Q 100 150 120 140 M 80 160 Q 100 170 120 160" strokeWidth="4" />
										{/* Pelvis */}
										<path d="M 70 200 Q 100 230 130 200" strokeWidth="12" />
										{/* Legs (Left) */}
										<path d="M 70 200 L 60 330 L 60 450" strokeWidth="8" />
										{/* Legs (Right) */}
										<path d="M 130 200 L 140 330 L 140 450" strokeWidth="8" />
										{/* Joints Highlights */}
										<g fill="rgba(167, 139, 250, 0.6)" stroke="none">
											{/* Shoulders */} <circle cx="60" cy="100" r="6" /> <circle cx="140" cy="100" r="6" />
											{/* Elbows */} <circle cx="40" cy="180" r="5" /> <circle cx="160" cy="180" r="5" />
											{/* Wrists */} <circle cx="30" cy="260" r="4" /> <circle cx="170" cy="260" r="4" />
											{/* Hips */} <circle cx="70" cy="200" r="8" /> <circle cx="130" cy="200" r="8" />
											{/* Knees */} <circle cx="60" cy="330" r="7" /> <circle cx="140" cy="330" r="7" />
											{/* Ankles */} <circle cx="60" cy="450" r="5" /> <circle cx="140" cy="450" r="5" />
										</g>
									</g>
								</svg>

								{labels.map(lbl => {
									const isSelected = selectedParts.includes(lbl.text);
									return (
										<div
											key={lbl.id}
											onClick={() => handlePartClick(lbl.text)}
											className={`absolute flex items-center gap-1 cursor-pointer transition-all hover:scale-105 ${lbl.side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
											style={{ top: lbl.top, [lbl.side]: lbl.horizontal }}
										>
											<span className={`text-[10px] sm:text-xs font-black tracking-widest transition-colors select-none px-2 py-1 rounded shadow-lg backdrop-blur-sm ${isSelected ? 'bg-indigo-600 text-white shadow-indigo-600/20' : 'bg-slate-900/80 text-indigo-400 border border-slate-700/50 hover:border-indigo-500 hover:text-indigo-300'}`}>
												{lbl.text}
											</span>
											<div
												className={`transition-all ${isSelected ? 'bg-indigo-600 h-[2px]' : 'bg-slate-700 h-[1px]'}`}
												style={{
													width: lbl.lineWidth,
													transform: `rotate(${lbl.lineAngle}deg)`,
													transformOrigin: lbl.side === 'left' ? 'left center' : 'right center'
												}}
											/>
										</div>
									);
								})}
							</div>

							<div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none px-4">
								<span className="bg-slate-900/80 border border-slate-800 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-slate-300 shadow-xl">
									{t('tapLabel')}
								</span>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}