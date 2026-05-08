import { LayoutGrid, BarChart, Settings, UserCircle } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Layout() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/devices', icon: Settings, label: t('navDevice') },
    { path: '/dashboard', icon: LayoutGrid, label: t('navSummary') },
    { path: '/analysis', icon: BarChart, label: t('navAnalysis') },
    { path: '/profile', icon: UserCircle, label: t('navProfile') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <div className="flex-grow pb-24 w-full max-w-lg mx-auto">
        <Outlet />
      </div>
      <nav className="fixed bottom-0 w-full flex justify-around p-4 bg-slate-900 border-t border-slate-800 z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center ${isActive ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'}`}>
              <item.icon size={24} />
              <span className="text-[10px] mt-1 font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
