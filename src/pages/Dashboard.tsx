import { Circle, Watch } from 'lucide-react';
import { motion } from 'motion/react';
import { useDevices } from '../contexts/DeviceContext';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_DATA, DEFAULT_MOCK_DATA } from '../lib/mockData';

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

export default function Dashboard() {
  const { devices } = useDevices();
  const { t } = useLanguage();
  const connectedDevice = devices.find(d => d.status === 'Connected' || d.status === 'Sync');
  const data = connectedDevice ? (MOCK_DATA[connectedDevice.name] || DEFAULT_MOCK_DATA) : null;

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
    <motion.div 
      className="p-4 sm:p-6 bg-slate-950 min-h-screen w-full max-w-lg mx-auto overflow-hidden pb-32"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-end mb-6">
        <h1 className="text-2xl font-bold text-slate-100">{t('myHealthData')}</h1>
        <span className="text-xs text-indigo-400 font-bold bg-indigo-500/10 px-2 py-1 rounded-lg">{data.brandName}</span>
      </motion.div>
      
      <motion.div variants={itemVariants} className="space-y-4 mb-8">
        {/* Workout Cards */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            {data.workouts.map((workout: any, idx: number) => (
              <div key={workout.id}>
                <div className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                    <div className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-slate-800 rounded-full flex items-center justify-center ${workout.color} border border-slate-700`}>
                        <span className="font-bold text-base sm:text-lg">{workout.letter}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <h2 className="font-bold text-base sm:text-lg truncate">{workout.type}</h2>
                        <p className="text-xs sm:text-sm text-slate-400 truncate">{workout.date}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs sm:text-sm">
                            <span className="text-rose-500 font-bold whitespace-nowrap">{workout.hr} bpm <span className='text-slate-500 font-normal'>{t('avgHr')}</span></span>
                            <span className="text-orange-500 font-bold whitespace-nowrap">{workout.kcal} kcal <span className='text-slate-500 font-normal'>{t('energy')}</span></span>
                        </div>
                    </div>
                </div>
                {idx < data.workouts.length - 1 && <div className='border-t border-slate-800'/>}
              </div>
            ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-slate-100 text-xl font-bold mb-4">{t('activity')}</h2>
        <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-3xl">
          <p className='text-slate-400 text-sm mb-4 sm:mb-6'>{t('dailyRings')}</p>
          <div className="flex justify-between items-center px-1 sm:px-2">
            <div className='flex flex-col items-center w-1/3'>
                <div className='relative flex items-center justify-center'>
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 -rotate-90">
                        <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                        <motion.circle 
                          initial={{ strokeDashoffset: 219.9 }}
                          animate={{ strokeDashoffset: 219.9 - (219.9 * data.activity.stepPct) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="219.9" className="text-emerald-500" strokeLinecap="round" />
                    </svg>
                    <span className='absolute font-black text-sm sm:text-xl'>{data.activity.steps}</span>
                </div>
                <span className='text-[10px] sm:text-xs text-slate-400 mt-2 truncate max-w-full'>{t('steps')}</span>
            </div>
            <div className='flex flex-col items-center w-1/3'>
                <div className='relative flex items-center justify-center'>
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 -rotate-90">
                        <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                        <motion.circle 
                          initial={{ strokeDashoffset: 219.9 }}
                          animate={{ strokeDashoffset: 219.9 - (219.9 * data.activity.energyPct) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                          cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="219.9" className="text-orange-500" strokeLinecap="round" />
                    </svg>
                    <span className='absolute font-black text-sm sm:text-xl'>{data.activity.energy}</span>
                </div>
                <span className='text-[10px] sm:text-xs text-slate-400 mt-2 truncate max-w-full'>{t('energy')}</span>
            </div>
            <div className='flex flex-col items-center w-1/3'>
                <div className='relative flex items-center justify-center'>
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 -rotate-90">
                        <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                        <motion.circle 
                          initial={{ strokeDashoffset: 219.9 }}
                          animate={{ strokeDashoffset: 219.9 - (219.9 * data.activity.activePct) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                          cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="219.9" className="text-cyan-400" strokeLinecap="round" />
                    </svg>
                    <span className='absolute font-black text-sm sm:text-xl'>{data.activity.active}</span>
                </div>
                <span className='text-[10px] sm:text-xs text-slate-400 mt-2 truncate max-w-full'>{t('active')}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-slate-100 text-xl font-bold mb-4">{t('sleep')}</h2>
        <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-3xl">
            <div className='flex justify-between items-center mb-4 sm:mb-6 gap-2'>
                <div className="min-w-0">
                    <p className="text-2xl sm:text-3xl font-black truncate">{data.sleep.time}</p>
                    <p className="text-xs sm:text-sm text-slate-400 truncate">{t('timeInBed')}</p>
                </div>
                <div className='text-right min-w-0'>
                    <p className="text-2xl sm:text-3xl font-black text-emerald-400 truncate">{data.sleep.efficiency}</p>
                    <p className="text-xs sm:text-sm text-slate-400 truncate">{t('efficiency')}</p>
                </div>
            </div>
            <div className="w-full h-3 sm:h-4 bg-slate-800 rounded-full overflow-hidden flex">
                {data.sleep.stages.map((stage: number, i: number) => {
                  const colors = ['bg-indigo-500', 'bg-violet-500', 'bg-cyan-400', 'bg-indigo-300', 'bg-slate-700'];
                  return (
                    <motion.div 
                      key={i}
                      initial={{ width: 0 }}
                      animate={{ width: `${stage}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      className={`h-full ${colors[i % colors.length]}`} 
                    />
                  );
                })}
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
