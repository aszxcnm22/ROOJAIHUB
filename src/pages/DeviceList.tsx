import { useState } from 'react';
import { Bluetooth, Watch, X, Check, Loader2, Unplug } from 'lucide-react';
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

export default function DeviceList() {
  const { devices, addDevice, updateDeviceStatus, removeDevice } = useDevices();
  const { t } = useLanguage();
  const [isAdding, setIsAdding] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const availableBrands = [
    'Garmin Fenix 7',
    'Suunto Race S',
    'Polar Vantage V3',
    'AppleWatch',
    'Whoop 4.0',
    'Oura Ring Gen 3'
  ];

  const handleAddDevice = () => {
    setIsAdding(true);
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
    }, 1500);
  };

  const selectBrand = (brand: string) => {
    // Check if it already exists
    if (devices.some(d => d.name === brand)) {
       setIsAdding(false);
       return;
    }
    
    addDevice({ id: Date.now().toString(), name: brand, status: 'Connect' });
    setIsAdding(false);
  };

  const handleConnect = (id: string) => {
    updateDeviceStatus(id, 'Connecting');

    setTimeout(() => {
      updateDeviceStatus(id, 'Connected');
    }, 2000);
  };

  const handleDisconnect = (id: string) => {
    removeDevice(id);
  };

  return (
    <motion.div 
      className="p-4 sm:p-6 w-full max-w-lg mx-auto bg-slate-950 min-h-[calc(100vh-80px)] pb-32"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h1 variants={itemVariants} className="text-2xl font-bold mb-6 text-slate-100">{t('devicesTitle')}</motion.h1>
      
      {!isAdding ? (
        <>
          <motion.button 
            variants={itemVariants}
            onClick={handleAddDevice}
            className="bg-indigo-600 p-4 w-full rounded-2xl text-left font-bold hover:bg-indigo-500 transition-colors flex items-center justify-between"
          >
            <span>{t('addNewDevice')}</span>
            <Bluetooth size={20} className="text-indigo-200" />
          </motion.button>

          <motion.div variants={itemVariants} className="mt-8">
            <h2 className="text-slate-500 mb-3 text-xs uppercase tracking-widest font-bold">{t('deviceList')}</h2>
            {devices.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                <Watch size={32} className="text-slate-600 mb-3" />
                <p className="text-slate-400 text-sm">{t('noDevices')}</p>
                <p className="text-slate-500 text-xs mt-1">{t('noDevicesDesc')}</p>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                <AnimatePresence>
                  {devices.map((device, index) => (
                    <motion.div 
                      key={device.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {index > 0 && <div className="border-t border-slate-800" />}
                      <div className="p-4 flex justify-between items-center transition-all overflow-hidden relative">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                          <Watch size={20} />
                        </div>
                        <span className="font-medium truncate pr-2 max-w-[120px] sm:max-w-[160px]">{device.name}</span>
                      </div>
                      
                      {device.status === 'Sync' && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button className="bg-slate-800 text-slate-300 px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors">
                            {t('sync')}
                          </button>
                          <button 
                            onClick={() => handleDisconnect(device.id)} 
                            className="text-slate-500 hover:text-red-400 p-1.5 rounded-full hover:bg-red-500/10 transition-colors"
                            title="Disconnect"
                          >
                            <Unplug size={16} />
                          </button>
                        </div>
                      )}
                      {device.status === 'Connect' && (
                        <button 
                          onClick={() => handleConnect(device.id)}
                          className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-indigo-500 transition-colors shrink-0"
                        >
                          {t('connect')}
                        </button>
                      )}
                      {device.status === 'Connecting' && (
                        <button disabled className="bg-slate-800 text-slate-400 px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0">
                          <Loader2 size={14} className="animate-spin" /> {t('connecting')}
                        </button>
                      )}
                      {device.status === 'Connected' && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button disabled className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 min-w-0">
                            <Check size={14} strokeWidth={3} className="shrink-0" /> <span className="hidden sm:inline">{t('connected')}</span>
                          </button>
                          <button 
                            onClick={() => handleDisconnect(device.id)} 
                            className="text-slate-500 hover:text-red-400 p-1.5 rounded-full hover:bg-red-500/10 transition-colors"
                            title="Disconnect"
                          >
                            <Unplug size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden"
        >
          <button 
            onClick={() => setIsAdding(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center justify-center mb-8 mt-4">
            <div className="relative">
              <div className={`w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center text-indigo-400 mb-4 ${isScanning ? 'animate-pulse' : ''}`}>
                <Bluetooth size={32} />
              </div>
              {isScanning && (
                <>
                  <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-full animate-ping"></div>
                  <div className="absolute -inset-4 border border-indigo-500/10 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                </>
              )}
            </div>
            <h2 className="text-lg font-bold text-center">
              {isScanning ? t('searching') : t('selectDevice')}
            </h2>
            <p className="text-sm text-slate-400 text-center mt-1">
              {isScanning ? t('searchingDesc') : t('foundDesc')}
            </p>
          </div>

          {!isScanning && (
            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.05 } }
              }}
              className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide"
            >
              {availableBrands.map((brand) => (
                <motion.button
                  variants={itemVariants}
                  key={brand}
                  onClick={() => selectBrand(brand)}
                  className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-indigo-500 hover:bg-slate-900 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Watch size={20} className="text-slate-500 group-hover:text-indigo-400" />
                    <span className="font-medium text-slate-200 group-hover:text-white truncate max-w-[180px] text-left">{brand}</span>
                  </div>
                  <div className="text-xs font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t('add')}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
