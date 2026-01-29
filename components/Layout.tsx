
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LogOut, User as UserIcon, Calendar, Award, BookOpen, Clock, 
  LayoutDashboard, Settings, ListChecks, Info, Phone, Image as ImageIcon, HelpCircle,
  Wallet, Globe, Menu, X, BadgeCheck, ShieldCheck, Home, Key
} from 'lucide-react';
import { User, UserRole } from '../types';
import { storageService } from '../services/storage';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const settings = storageService.getSettings();
    if (settings?.logoUrl) {
      setLogoUrl(settings.logoUrl);
    }
  }, [location.pathname]);

  // Determine navigation items based on authentication state
  const menuItems = !user 
    ? [
        { label: 'Home', icon: <Home className="w-5 h-5" />, path: '/' },
        { label: 'About NTZ', icon: <Info className="w-5 h-5" />, path: '/about' },
        { label: 'Campus Gallery', icon: <ImageIcon className="w-5 h-5" />, path: '/gallery' },
        { label: 'Knowledge Base', icon: <HelpCircle className="w-5 h-5" />, path: '/faqs' },
        { label: 'Contact Us', icon: <Phone className="w-5 h-5" />, path: '/contact' },
      ]
    : user.role === UserRole.STUDENT 
    ? [
        { label: 'Home Page', icon: <Home className="w-5 h-5" />, path: '/' },
        { label: 'Student Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
        { label: 'My Financials', icon: <Wallet className="w-5 h-5" />, path: '/financials' },
        { label: 'Academic Results', icon: <ListChecks className="w-5 h-5" />, path: '/results' },
        { label: 'Timetable', icon: <Clock className="w-5 h-5" />, path: '/timetable' },
        { label: 'My Certificates', icon: <Award className="w-5 h-5" />, path: '/certificates' },
        { label: 'Quiz Center', icon: <BookOpen className="w-5 h-5" />, path: '/quiz' },
        { label: 'Typing Test', icon: <Settings className="w-5 h-5" />, path: '/typing' },
        { type: 'divider' },
        { label: 'About NTZ', icon: <Info className="w-5 h-5" />, path: '/about' },
        { label: 'Gallery', icon: <ImageIcon className="w-5 h-5" />, path: '/gallery' },
        { label: 'FAQs', icon: <HelpCircle className="w-5 h-5" />, path: '/faqs' },
        { label: 'Contact', icon: <Phone className="w-5 h-5" />, path: '/contact' },
      ]
    : [
        { label: 'Home Page', icon: <Home className="w-5 h-5" />, path: '/' },
        { label: 'Admin Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
        { label: 'Student Directory', icon: <UserIcon className="w-5 h-5" />, path: '/manage-students' },
        { label: 'Financial Ledger', icon: <Wallet className="w-5 h-5" />, path: '/manage-fees' },
        { label: 'Attendance Logs', icon: <ListChecks className="w-5 h-5" />, path: '/attendance' },
        { label: 'Results Registry', icon: <BadgeCheck className="w-5 h-5" />, path: '/results' },
        { label: 'Quiz Manager', icon: <BookOpen className="w-5 h-5" />, path: '/quiz-manager' },
        { label: 'Gallery Manager', icon: <ImageIcon className="w-5 h-5" />, path: '/manage-gallery' },
        { label: 'Content Manager', icon: <Globe className="w-5 h-5" />, path: '/cms' },
        { label: 'Issue Certificates', icon: <Award className="w-5 h-5" />, path: '/certificates' },
        { label: 'Timetable Editor', icon: <Clock className="w-5 h-5" />, path: '/timetable' },
        { label: 'Branding & Profile', icon: <Settings className="w-5 h-5" />, path: '/admin-settings' },
      ];

  const handleNav = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden no-print"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Sticky with Dynamic Branding */}
      <aside className={`
        fixed lg:sticky lg:top-0 h-screen w-64 bg-slate-950 text-white flex-shrink-0 flex flex-col z-50 transition-transform duration-300 transform no-print border-r border-slate-800/50
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 flex flex-col items-center border-b border-slate-900 bg-slate-900/20 relative">
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden absolute top-4 right-4 text-slate-500 p-2">
            <X size={20} />
          </button>
          
          <div className="w-24 h-24 rounded-full border-4 border-emerald-500/20 bg-white shadow-2xl flex items-center justify-center overflow-hidden mb-4 group transition-all">
            {logoUrl ? (
              <img src={logoUrl} className="w-full h-full object-contain p-2" alt="Logo" />
            ) : (
              <div className="bg-emerald-600 w-full h-full flex items-center justify-center">
                <ShieldCheck className="text-white w-10 h-10" />
              </div>
            )}
          </div>
          
          <div className="text-center">
            <h1 className="text-sm font-black tracking-[0.2em] uppercase text-white leading-tight">
              NewTech <span className="text-emerald-500">Zhob</span>
            </h1>
            <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-[0.3em]">{user ? 'Administrative Node' : 'Public Website'}</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item, idx) => {
            if ('type' in item && item.type === 'divider') {
              return <div key={idx} className="my-4 border-t border-slate-900 opacity-50" />;
            }
            const it = item as any;
            const active = location.pathname === it.path;
            return (
              <button
                key={it.label}
                onClick={() => handleNav(it.path)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all text-xs font-black uppercase tracking-widest ${
                  active 
                    ? 'bg-emerald-600 text-white shadow-lg' 
                    : 'text-slate-500 hover:text-white hover:bg-slate-900'
                }`}
              >
                {React.cloneElement(it.icon as React.ReactElement<any>, { size: 18 })}
                <span>{it.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Auth Section Pinned Bottom */}
        <div className="p-4 bg-slate-950 border-t border-slate-900">
          {user ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-rose-900/20 text-slate-500 hover:text-rose-500 transition-all font-black uppercase text-[10px] tracking-widest group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                <LogOut size={16} />
              </div>
              <span>Sign Out Session</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-3 w-full px-4 py-3 bg-emerald-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest group shadow-lg shadow-emerald-900/40"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Key size={16} />
              </div>
              <span>Portal Login</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Responsive Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 no-print shadow-sm z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <span className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                {user ? 'Authenticated Entry' : 'Public Access'}
              </span>
              <span className="text-slate-900 font-black leading-none text-xs lg:text-sm uppercase italic">
                {user ? user.name : 'Welcome Visitor'}
              </span>
            </div>
          </div>
          {user && (
            <div className="flex items-center gap-2 lg:gap-6">
              <div className="text-right border-r pr-4 lg:pr-6 hidden sm:block">
                <p className="text-xs font-black text-emerald-600 font-mono">{user.rollNo}</p>
                <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest">{user.class}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 border flex items-center justify-center text-slate-900 font-black text-lg shadow-inner">
                {user.name.charAt(0)}
              </div>
            </div>
          )}
        </header>

        {/* Content Body */}
        <main className="p-4 lg:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
