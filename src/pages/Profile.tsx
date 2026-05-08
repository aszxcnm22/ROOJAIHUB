import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Watch, Edit2, Check, X, LogOut, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useDevices } from '../contexts/DeviceContext';
import { useLanguage } from '../contexts/LanguageContext';

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

export default function Profile() {
  const { devices } = useDevices();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const connectedDevices = devices.filter(d => d.status === 'Connected' || d.status === 'Sync');
  
  const [profile, setProfile] = useState({
    name: 'Norman Lee',
    email: 'norman@roojaihub.com'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  return (
    <motion.div 
      className="p-4 sm:p-6 w-full max-w-lg mx-auto bg-slate-950 min-h-screen text-slate-100 overflow-y-auto pb-32"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('profile')}</h1>
        <div className="flex gap-2">
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Edit2 size={14} /> {t('edit')}
            </button>
          )}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg transition-colors"
            title="Toggle Language"
          >
            <Globe size={14} /> {language === 'en' ? 'TH' : 'EN'}
          </button>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl mb-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isEditing ? (
             <motion.div 
               key="view"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               className="flex items-center gap-4"
             >
                <div className="shrink-0 w-16 h-16 bg-slate-800 border-2 border-indigo-500/30 rounded-full flex items-center justify-center">
                    <UserCircle size={48} className='text-slate-400'/>
                </div>
                <div className="min-w-0 flex-1">
                    <h2 className="font-bold text-xl truncate mb-1">{profile.name}</h2>
                    <p className="text-sm text-slate-400 truncate">{profile.email}</p>
                </div>
             </motion.div>
          ) : (
            <motion.div 
              key="edit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t('name')}</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={16} /> {t('save')}
                </button>
                <button 
                  onClick={handleCancel}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <X size={16} /> {t('cancel')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl mb-6">
        <h2 className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-4">{t('devicesTitle')}</h2>
        {connectedDevices.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-4">
            <Watch size={24} className="text-slate-600 mb-2" />
            <p className="text-slate-400 text-xs">{t('noDevices')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {connectedDevices.map((device, i) => (
              <div key={device.id}>
                {i > 0 && <div className="border-t border-slate-800 pb-4" />}
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="hidden sm:flex w-8 h-8 rounded-full bg-slate-800 items-center justify-center text-slate-400 shrink-0">
                        <Watch size={14} />
                      </div>
                      <span className='font-bold truncate pr-4'>{device.name}</span>
                    </div>
                    <span className='shrink-0 text-emerald-500 text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md flex items-center gap-1.5'>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.button
        variants={itemVariants}
        onClick={() => setShowLogoutConfirm(true)}
        className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 p-4 rounded-2xl font-bold transition-all border border-red-500/20"
      >
        <LogOut size={20} /> {t('logout')}
      </motion.button>

      {/* Logout Confirmation Dialog */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl w-full max-w-sm shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-2">{t('logoutConfirmTitle')}</h3>
              <p className="text-slate-400 mb-6">{t('logoutConfirmDesc')}</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 p-3 rounded-xl font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  {t('no')}
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 p-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-500 transition-colors"
                >
                  {t('yes')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
