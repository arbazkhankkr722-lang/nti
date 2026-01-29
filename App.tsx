
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { User, UserRole, Event, TimetableSlot, Certificate, CertificateType, Result, InstituteSettings } from './types';
import { MOCK_STUDENTS, MOCK_ADMIN, MOCK_EVENTS, MOCK_TIMETABLE, MOCK_SETTINGS } from './mockData';
import { storageService } from './services/storage';

import Layout from './components/Layout';
import StudentDashboard from './components/StudentDashboard';
import QuizModule from './components/QuizModule';
import TypingTest from './components/TypingTest';
import AdminPanel from './components/AdminPanel';
import AiAssistant from './components/AiAssistant';
import CertificatePrint from './components/CertificatePrint';
import FeeView from './components/FeeView';
import { AboutUs, ContactUs, Gallery, FAQs } from './components/InfoPages';
import { 
  Award, BadgeCheck, Printer, X, ZoomIn, Wallet, ListChecks, Clock, Globe, 
  FileCheck, Eye, ShieldCheck, Lock, User as UserIcon, ArrowDownRight, 
  ChevronRight, Laptop, Users, Target, BookOpen, Star, Sparkles
} from 'lucide-react';

const LandingPage: React.FC<{ settings: InstituteSettings }> = ({ settings }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-32 pb-32 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden rounded-[4rem] bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12 animate-bounce">
            <Sparkles size={12} /> Admissions Open 2024-25
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-none mb-8">
            The Future of <br />
            <span className="text-emerald-500">Tech is Here.</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Zhob's premier institute for specialized technical education. Mastering CIT, DIT, and Professional Web Development.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => navigate('/about')}
              className="px-12 py-6 bg-emerald-600 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-2xl shadow-emerald-900/40 hover:bg-emerald-500 transition-all flex items-center justify-center gap-3"
            >
              Explore Programs <ArrowDownRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all"
            >
              Student Portal Entry
            </button>
          </div>
        </div>
      </section>

      {/* Program Quick Look */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Laptop size={32} />
          </div>
          <h3 className="text-3xl font-black italic mb-4 uppercase tracking-tighter">CIT Program</h3>
          <p className="text-slate-500 font-medium mb-8">6-Month fundamental certificate covering IT essentials and office automation.</p>
          <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
            Details <ChevronRight size={12} />
          </div>
        </div>
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-3xl font-black italic mb-4 uppercase tracking-tighter">DIT Diploma</h3>
          <p className="text-slate-500 font-medium mb-8">Comprehensive 1-year diploma recognized by TTB for professional career paths.</p>
          <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
            Details <ChevronRight size={12} />
          </div>
        </div>
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Globe size={32} />
          </div>
          <h3 className="text-3xl font-black italic mb-4 uppercase tracking-tighter">Web Dev</h3>
          <p className="text-slate-500 font-medium mb-8">Full-stack development training focusing on modern frameworks and technologies.</p>
          <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
            Details <ChevronRight size={12} />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-50 p-20 rounded-[4rem] text-center">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Authorized Excellence</h2>
        <div className="flex flex-wrap justify-center items-center gap-16 opacity-40 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-3 font-black text-2xl tracking-tighter italic"><Award size={32}/> TTB Balochistan</div>
          <div className="flex items-center gap-3 font-black text-2xl tracking-tighter italic"><Target size={32}/> NAVTTC Approved</div>
          <div className="flex items-center gap-3 font-black text-2xl tracking-tighter italic"><ShieldCheck size={32}/> PEC Recognized</div>
        </div>
      </section>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [students, setStudents] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  const [settings, setSettings] = useState<InstituteSettings>(MOCK_SETTINGS);
  const [printingCert, setPrintingCert] = useState<{cert: Certificate, student: User} | null>(null);
  const [viewingCertScan, setViewingCertScan] = useState<string | null>(null);

  const syncAll = () => {
    let savedUsers = storageService.getUsers();
    if (savedUsers.length === 0) {
      const initialUsers = [...MOCK_STUDENTS, MOCK_ADMIN];
      storageService.saveUsers(initialUsers);
      savedUsers = initialUsers;
    }
    
    if (storageService.getEvents().length === 0) storageService.saveEvents(MOCK_EVENTS);
    if (storageService.getTimetable().length === 0) storageService.saveTimetable(MOCK_TIMETABLE);
    
    const savedSettings = storageService.getSettings();
    if (savedSettings) setSettings(savedSettings);
    else storageService.saveSettings(MOCK_SETTINGS);

    setStudents(savedUsers.filter(u => u.role === UserRole.STUDENT));
    setEvents(storageService.getEvents());
    setTimetable(storageService.getTimetable());
    
    const session = sessionStorage.getItem('sms_session');
    if (session) {
      const parsed = JSON.parse(session);
      const fresh = savedUsers.find(u => u.id === parsed.id);
      if (fresh) setUser(fresh);
    }
  };

  useEffect(() => {
    syncAll();
  }, []);

  const handleLogin = (rollOrUsername: string, pass: string) => {
    const allUsers = storageService.getUsers();
    const found = allUsers.find(u => u.rollNo === rollOrUsername || u.username === rollOrUsername);
    if (found && pass === found.password) {
      setUser(found);
      sessionStorage.setItem('sms_session', JSON.stringify(found));
    } else { alert('Access Denied: Invalid Credentials.'); }
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('sms_session');
  };

  if (printingCert) {
    return <CertificatePrint certificate={printingCert.cert} student={printingCert.student} onClose={() => setPrintingCert(null)} />;
  }

  return (
    <HashRouter>
      <Layout user={user!} onLogout={handleLogout}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage settings={settings} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} />

          {/* Secure Portal Routes */}
          <Route path="/dashboard" element={
            !user ? <Navigate to="/login" /> : 
            user.role === UserRole.STUDENT 
              ? <StudentDashboard user={user} events={events} /> 
              : <AdminPanel students={students} onRefresh={syncAll} initialTab="dashboard" onPrintCertificate={(cert, student) => setPrintingCert({ cert, student })} />
          } />
          
          {user?.role === UserRole.STUDENT && (
            <>
              <Route path="/financials" element={<FeeView user={user} />} />
              <Route path="/results" element={<DetailedResultCard student={user} />} />
              <Route path="/timetable" element={<TimetableView slots={timetable} />} />
              <Route path="/certificates" element={<CertificatesView studentId={user.id} onPrint={(cert) => setPrintingCert({ cert, student: user })} onViewScan={(scan) => setViewingCertScan(scan)} />} />
              <Route path="/events" element={<EventsView events={events} />} />
              <Route path="/quiz" element={<QuizModule />} />
              <Route path="/typing" element={<TypingTest />} />
            </>
          )}

          {user?.role === UserRole.ADMIN && (
            <>
              <Route path="/manage-students" element={<AdminPanel students={students} onRefresh={syncAll} initialTab="students" />} />
              <Route path="/manage-fees" element={<AdminPanel students={students} onRefresh={syncAll} initialTab="fees" />} />
              <Route path="/attendance" element={<AdminPanel students={students} onRefresh={syncAll} initialTab="attendance" />} />
              <Route path="/cms" element={<AdminPanel students={students} onRefresh={syncAll} initialTab="cms" />} />
              <Route path="/results" element={<AdminPanel students={students} onRefresh={syncAll} initialTab="results" />} />
              <Route path="/quiz-manager" element={<AdminPanel students={students} onRefresh={syncAll} initialTab="quiz" />} />
              <Route path="/manage-gallery" element={<AdminPanel students={students} onRefresh={syncAll} initialTab="gallery" />} />
              <Route path="/certificates" element={<AdminPanel students={students} onRefresh={syncAll} initialTab="certificates" onPrintCertificate={(cert, student) => setPrintingCert({ cert, student })} />} />
              <Route path="/timetable" element={<AdminPanel students={students} onRefresh={syncAll} initialTab="timetable" />} />
              <Route path="/admin-settings" element={<AdminPanel students={students} onRefresh={syncAll} initialTab="settings" />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {user?.role === UserRole.STUDENT && <AiAssistant />}
      </Layout>

      {viewingCertScan && (
        <div className="fixed inset-0 z-[300] bg-slate-900/98 backdrop-blur-3xl flex flex-col items-center justify-center p-8 sm:p-20 animate-in fade-in duration-500">
           <button onClick={() => setViewingCertScan(null)} className="absolute top-10 right-10 w-16 h-16 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all shadow-2xl group">
             <X size={32} className="group-hover:rotate-90 transition-transform" />
           </button>
           <div className="max-w-[1200px] w-full h-full bg-white rounded-[3rem] overflow-hidden shadow-2xl relative border-[12px] border-white/5 animate-in zoom-in-95 duration-500">
              <img src={viewingCertScan} className="w-full h-full object-contain bg-white" alt="Official Registry Scan" />
           </div>
           <p className="mt-8 text-white/40 text-[10px] font-black uppercase tracking-[0.6em]">Official Digital Archive Evidence</p>
        </div>
      )}
    </HashRouter>
  );
};

const LoginPage: React.FC<{ onLogin: (r: string, p: string) => void }> = ({ onLogin }) => {
  const [roll, setRoll] = useState('');
  const [password, setPassword] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const settings = storageService.getSettings();
    if (settings?.logoUrl) setLogoUrl(settings.logoUrl);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 relative">
      <div className="w-full max-w-xl relative group animate-in zoom-in duration-700">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-indigo-600 rounded-[4rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-slate-900 p-12 lg:p-16 text-center text-white relative">
            <div className="relative z-10 space-y-4">
              {logoUrl ? <img src={logoUrl} className="h-24 w-auto object-contain mx-auto mb-6" alt="Logo" /> : <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto mb-6" />}
              <h1 className="text-4xl lg:text-5xl font-black tracking-tighter italic uppercase leading-none">Institute Portal</h1>
              <p className="text-slate-400 font-black tracking-[0.4em] text-[10px] uppercase">Secure Access Node</p>
            </div>
          </div>
          <div className="p-10 lg:p-16 space-y-8">
            <div className="space-y-6">
              <div className="relative group/input">
                <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input type="text" className="w-full pl-16 pr-6 py-6 bg-slate-50 border-none rounded-[2rem] font-black text-slate-900 outline-none" placeholder="REGISTRY ID" value={roll} onChange={(e) => setRoll(e.target.value)} />
              </div>
              <div className="relative group/input">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input type="password" name="password" className="w-full pl-16 pr-6 py-6 bg-slate-50 border-none rounded-[2rem] font-black text-slate-900 outline-none" placeholder="PASSPHRASE" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && onLogin(roll, password)} />
              </div>
            </div>
            <button onClick={() => onLogin(roll, password)} className="w-full py-7 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-4">
              Authorize Login <ArrowDownRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificatesView = ({ studentId, onPrint, onViewScan }: { studentId: string, onPrint: (cert: Certificate) => void, onViewScan: (scan: string) => void }) => {
  const certs = storageService.getCertificates().filter(c => c.studentId === studentId);
  return (
    <div className="bg-white rounded-[3rem] border p-12 max-w-5xl mx-auto shadow-sm">
      <div className="flex justify-between items-center mb-12 pb-8 border-b">
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">Academic Vault</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Verified Digital Credentials</p>
        </div>
        <Award size={32} className="text-emerald-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {certs.length > 0 ? certs.map(c => (
          <div key={c.id} className="p-10 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-emerald-500 transition-all group hover:bg-white hover:shadow-2xl">
            <div className="mb-8">
              <span className="px-5 py-2 bg-emerald-100 text-emerald-700 rounded-full text-[9px] font-black uppercase tracking-widest leading-none mb-6 inline-block">{c.type} AUTHORIZED</span>
              <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase italic tracking-tight">{c.title}</h3>
              <p className="text-xs text-slate-500 font-mono opacity-60">ID: {c.certificateNo}</p>
              {c.photo && <img src={c.photo} className="mt-8 aspect-[4/3] w-full rounded-3xl border-4 border-white shadow-lg object-cover cursor-pointer" onClick={() => onViewScan(c.photo!)} />}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => c.photo ? onViewScan(c.photo) : null} disabled={!c.photo} className="py-5 bg-white border-2 border-slate-200 text-slate-400 rounded-2xl text-[9px] font-black uppercase tracking-widest">View Scan</button>
              <button onClick={() => onPrint(c)} className="py-5 bg-slate-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest">Print Official</button>
            </div>
          </div>
        )) : <div className="col-span-full py-32 text-center text-slate-300 font-black uppercase text-xs tracking-widest opacity-40">No Digital Awards Found</div>}
      </div>
    </div>
  );
};

const DetailedResultCard = ({ student }: { student: User }) => {
  const results = storageService.getResults().filter(r => r.studentId === student.id);
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="bg-white p-12 rounded-[4rem] shadow-xl border overflow-hidden">
         <div className="flex justify-between items-center pb-12 border-b mb-12">
            <div><h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900">{student.name}</h1><p className="text-[10px] font-black text-emerald-600 uppercase mt-2 tracking-widest">Academic Record • {student.rollNo}</p></div>
            <BadgeCheck size={64} className="text-emerald-500" />
         </div>
         <div className="space-y-6">
            {results.length > 0 ? results.map(r => (
               <div key={r.id} className="p-8 bg-slate-50 rounded-[2.5rem] flex justify-between items-center border">
                  <div><p className="font-black text-xl text-slate-900 uppercase italic">{r.subject}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.date}</p></div>
                  <div className="text-right"><span className="text-4xl font-black text-slate-900">{r.marks}</span><span className="text-sm text-slate-300 font-bold ml-1">/{r.maxMarks}</span></div>
               </div>
            )) : <div className="py-24 text-center opacity-50 font-black uppercase text-xs text-slate-300">No Academic Transcripts Logged</div>}
         </div>
      </div>
    </div>
  );
};

const TimetableView = ({ slots }: { slots: TimetableSlot[] }) => (
  <div className="bg-white rounded-[3rem] border p-12 shadow-sm max-w-5xl mx-auto">
    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-12">Lecture Schedule</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => {
        const daySlots = slots.filter(s => s.day === day);
        return (
          <div key={day} className="border rounded-[2.5rem] p-8 bg-slate-50">
            <h3 className="font-black text-emerald-600 uppercase text-xs mb-6 pb-2 border-b tracking-widest">{day}</h3>
            {daySlots.length > 0 ? daySlots.map(s => (
               <div key={s.id} className="p-5 bg-white rounded-2xl border mb-4 shadow-sm">
                  <p className="text-[10px] font-black text-slate-300 mb-1">{s.startTime}</p>
                  <p className="font-black text-slate-800 text-sm uppercase italic">{s.subject}</p>
               </div>
            )) : <p className="text-[9px] font-black text-slate-300 uppercase italic py-8 text-center opacity-40">No Sessions</p>}
          </div>
        );
      })}
    </div>
  </div>
);

const EventsView = ({ events }: { events: Event[] }) => (
  <div className="space-y-8 max-w-4xl mx-auto">
    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-8">News Broadcast</h2>
    {events.length > 0 ? events.map(e => (
      <div key={e.id} className="bg-white p-10 rounded-[3rem] border shadow-sm flex gap-8 group hover:shadow-2xl transition-all">
        <div className="w-24 shrink-0 bg-slate-900 text-white flex flex-col items-center justify-center rounded-3xl group-hover:bg-emerald-600 transition-colors">
           <span className="text-[10px] font-black uppercase opacity-60 leading-none">{new Date(e.date).toLocaleString('default', { month: 'short' })}</span>
           <span className="text-4xl font-black leading-none mt-2">{new Date(e.date).getDate()}</span>
        </div>
        <div>
           <h3 className="text-3xl font-black mb-3 uppercase italic tracking-tighter text-slate-900">{e.title}</h3>
           <p className="text-slate-500 font-medium leading-relaxed text-lg">{e.description}</p>
        </div>
      </div>
    )) : <div className="py-32 text-center opacity-50 font-black uppercase text-xs text-slate-300">No Announcements Found</div>}
  </div>
);

export default App;
