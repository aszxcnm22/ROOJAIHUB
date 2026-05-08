import { type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Login() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    navigate('/devices');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 relative overflow-hidden">
      
      {/* Language Toggle */}
      <div className="absolute top-6 right-6 flex gap-2 z-10 bg-slate-900/50 p-1 rounded-lg backdrop-blur-sm border border-slate-800">
        <button 
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${language === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          EN
        </button>
        <button 
          onClick={() => setLanguage('th')}
          className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${language === 'th' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          TH
        </button>
      </div>

      {/* Abstract 3D-like Background Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -top-20 -left-20 pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute w-80 h-80 bg-violet-500/20 rounded-full blur-[100px] bottom-10 -right-20 pointer-events-none"
      />

      <motion.div 
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="relative z-10"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center font-bold text-white text-3xl mb-6 shadow-2xl shadow-indigo-500/50 mx-auto transform perspective-1000">
          R
        </div>
      </motion.div>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-black mb-8 tracking-tighter uppercase relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400"
      >
        {t('loginTitle')}
      </motion.h1>
      <motion.form 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleLogin} 
        className="w-full max-w-sm relative z-10"
      >
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder={t('username')}
            className="w-full p-4 mb-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl text-slate-100 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors shadow-inner" 
          />
          <input 
            type="password" 
            placeholder={t('password')}
            className="w-full p-4 mb-6 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl text-slate-100 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors shadow-inner" 
          />
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit" 
          className="w-full p-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all mb-6"
        >
          {t('loginBtn')}
        </motion.button>

        <div className="text-center mt-4 border-t border-slate-800 pt-6">
          <p className="text-slate-400 text-sm">
            {t('notUser')} <button type="button" className="text-indigo-400 font-bold hover:text-indigo-300 ml-1 transition-colors">{t('register')}</button>
          </p>
        </div>
      </motion.form>
    </div>
  );
}
