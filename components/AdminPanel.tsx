
import React, { useState, useEffect } from 'react';
import { User, UserRole, CertificateType, CertificateStatus, Certificate, Event, TimetableSlot, Result, PaymentRecord, QuizQuestion, GalleryItem, InstituteSettings } from '../types';
import { storageService } from '../services/storage';
import { 
  Plus, Trash2, Edit, Award, Search, UserPlus, 
  Wallet, Globe, Users, Activity, 
  Clock, ListChecks, Camera, Eye, 
  X, Save, CheckCircle2, Megaphone,
  Printer, BadgeCheck, Percent, Building2, BookOpen, Image as ImageIcon, Video, ArrowDownRight, History, Settings, UserCircle, Lock, ShieldCheck
} from 'lucide-react';
import { MOCK_SETTINGS } from '../mockData';

export type AdminTab = 'dashboard' | 'students' | 'fees' | 'cms' | 'certificates' | 'attendance' | 'timetable' | 'results' | 'quiz' | 'gallery' | 'settings';

interface Props {
  students: User[];
  onRefresh: () => void;
  initialTab?: AdminTab;
  onPrintCertificate?: (cert: Certificate, student: User) => void;
}

const AdminPanel: React.FC<Props> = ({ students, onRefresh, initialTab = 'dashboard', onPrintCertificate }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Registry states
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [settings, setSettings] = useState<InstituteSettings>(MOCK_SETTINGS);
  const [adminProfile, setAdminProfile] = useState<Partial<User>>({});

  // Modal states
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showTimetableModal, setShowTimetableModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Form States
  const [studentForm, setStudentForm] = useState<Partial<User>>({
    name: '', fatherName: '', cnic: '', class: '', address: '', totalFee: 30000, username: '', password: ''
  });
  
  const [certForm, setCertForm] = useState<Partial<Certificate>>({ 
    studentId: '', title: '', duration: '', type: CertificateType.NTI, grade: 'A', certificateNo: '', photo: '' 
  });

  const [resultForm, setResultForm] = useState<Partial<Result>>({
    studentId: '', subject: '', marks: 0, maxMarks: 100
  });
  
  const [timetableForm, setTimetableForm] = useState<Partial<TimetableSlot>>({ 
    day: 'Monday', subject: '', startTime: '08:00 AM', endTime: '10:00 AM' 
  });
  
  const [eventForm, setEventForm] = useState<Partial<Event>>({ 
    title: '', date: new Date().toISOString().split('T')[0], description: '' 
  });

  const [quizForm, setQuizForm] = useState<Partial<QuizQuestion>>({
    question: '', options: ['', '', '', ''], correctAnswer: 0
  });

  const [galleryForm, setGalleryForm] = useState<Partial<GalleryItem>>({
    title: '', url: '', type: 'image'
  });
  
  const [payingStudent, setPayingStudent] = useState<User | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  // Sync Logic
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  const refreshRegistry = () => {
    setCertificates(storageService.getCertificates());
    setTimetable(storageService.getTimetable());
    setEvents(storageService.getEvents());
    setResults(storageService.getResults());
    setQuizQuestions(storageService.getQuiz());
    setGalleryItems(storageService.getGallery());
    
    const savedSettings = storageService.getSettings();
    if (savedSettings) setSettings(savedSettings);
    
    const admin = storageService.getUsers().find(u => u.role === UserRole.ADMIN);
    if (admin) setAdminProfile(admin);
    
    onRefresh();
  };

  useEffect(() => {
    refreshRegistry();
  }, [activeTab]);

  // --- HANDLERS ---

  const handleSaveSettings = () => {
    storageService.saveSettings(settings);
    alert('Global settings and branding updated successfully.');
    refreshRegistry();
  };

  const handleSaveAdminProfile = () => {
    const users = storageService.getUsers();
    const updatedUsers = users.map(u => u.role === UserRole.ADMIN ? { ...u, ...adminProfile } : u);
    storageService.saveUsers(updatedUsers);
    alert('Administrator profile updated.');
    refreshRegistry();
  };

  const handleSaveStudent = () => {
    if (!studentForm.name || !studentForm.class || !studentForm.username || !studentForm.password) {
      alert('REQUIRED: Name, Class, Username, and Password.');
      return;
    }
    const current = storageService.getUsers();
    if (isEditMode && selectedId) {
      storageService.saveUsers(current.map(u => u.id === selectedId ? { ...u, ...studentForm } : u));
    } else {
      const newUser: User = {
        ...studentForm as any,
        id: Date.now().toString(),
        rollNo: `NTZ-${Date.now().toString().slice(-4)}`,
        role: UserRole.STUDENT,
        paidFee: 0,
        attendance: 0,
        paymentHistory: [],
        attendanceHistory: [{ month: 'Reg', percentage: 0 }]
      };
      storageService.saveUsers([...current, newUser]);
    }
    setShowStudentModal(false);
    refreshRegistry();
  };

  const handleSaveTimetable = () => {
    if (!timetableForm.subject || !timetableForm.startTime) {
      alert('REQUIRED: Subject and Start Time.');
      return;
    }
    const current = storageService.getTimetable();
    const newSlot: TimetableSlot = {
      id: Date.now().toString(),
      day: timetableForm.day || 'Monday',
      subject: timetableForm.subject,
      startTime: timetableForm.startTime,
      endTime: timetableForm.endTime || '12:00 PM'
    };
    storageService.saveTimetable([...current, newSlot]);
    setShowTimetableModal(false);
    setTimetableForm({ day: 'Monday', subject: '', startTime: '08:00 AM', endTime: '10:00 AM' });
    refreshRegistry();
  };

  const handleSaveResult = () => {
    if (!resultForm.studentId || !resultForm.subject) {
      alert('REQUIRED: Select a Student and enter the Subject name.');
      return;
    }
    const current = storageService.getResults();
    const newRes: Result = {
      id: Date.now().toString(),
      studentId: resultForm.studentId,
      subject: resultForm.subject,
      marks: resultForm.marks || 0,
      maxMarks: resultForm.maxMarks || 100,
      date: new Date().toLocaleDateString(),
      grade: (resultForm.marks || 0) >= 80 ? 'A+' : (resultForm.marks || 0) >= 60 ? 'B' : 'C'
    };
    storageService.saveResults([...current, newRes]);
    setShowResultModal(false);
    setResultForm({ studentId: '', subject: '', marks: 0, maxMarks: 100 });
    refreshRegistry();
  };

  const handleIssueCert = () => {
    if (!certForm.studentId || !certForm.title || !certForm.photo) {
      alert('REQUIRED: Student, Title, and Scan Image.');
      return;
    }
    const current = storageService.getCertificates();
    const newCert: Certificate = {
      id: Date.now().toString(),
      studentId: certForm.studentId,
      title: certForm.title,
      duration: certForm.duration,
      type: certForm.type as CertificateType || CertificateType.NTI,
      grade: certForm.grade || 'A',
      certificateNo: certForm.certificateNo || `CERT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      issueDate: new Date().toLocaleDateString(),
      status: CertificateStatus.ISSUED,
      photo: certForm.photo
    };
    storageService.saveCertificates([...current, newCert]);
    setShowCertModal(false);
    setCertForm({ studentId: '', title: '', duration: '', type: CertificateType.NTI, grade: 'A', certificateNo: '', photo: '' });
    refreshRegistry();
  };

  const handleSaveEvent = () => {
    if (!eventForm.title || !eventForm.description) return;
    const current = storageService.getEvents();
    const newEv: Event = { id: Date.now().toString(), title: eventForm.title, date: eventForm.date || '', description: eventForm.description };
    storageService.saveEvents([...current, newEv]);
    setShowEventModal(false);
    refreshRegistry();
  };

  const handleSaveQuiz = () => {
    if (!quizForm.question || quizForm.options?.some(o => !o)) {
      alert('REQUIRED: Question and all 4 Options.');
      return;
    }
    const current = storageService.getQuiz();
    const newQ: QuizQuestion = {
      id: Date.now().toString(),
      question: quizForm.question,
      options: quizForm.options as string[],
      correctAnswer: quizForm.correctAnswer || 0
    };
    storageService.saveQuiz([...current, newQ]);
    setShowQuizModal(false);
    setQuizForm({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
    refreshRegistry();
  };

  const handleSaveGalleryItem = () => {
    if (!galleryForm.title || !galleryForm.url) {
      alert('REQUIRED: Title and Media File.');
      return;
    }
    const current = storageService.getGallery();
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: galleryForm.title,
      url: galleryForm.url,
      type: galleryForm.type as 'image' | 'video' || 'image'
    };
    storageService.saveGallery([...current, newItem]);
    setShowGalleryModal(false);
    setGalleryForm({ title: '', url: '', type: 'image' });
    refreshRegistry();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'student' | 'cert' | 'gallery' | 'logo' | 'admin') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (target === 'student') setStudentForm(prev => ({ ...prev, photo: result }));
        else if (target === 'cert') setCertForm(prev => ({ ...prev, photo: result }));
        else if (target === 'gallery') setGalleryForm(prev => ({ ...prev, url: result }));
        else if (target === 'logo') setSettings(prev => ({ ...prev, logoUrl: result }));
        else if (target === 'admin') setAdminProfile(prev => ({ ...prev, photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateAttendance = (id: string, val: number) => {
    const users = storageService.getUsers();
    storageService.saveUsers(users.map(u => u.id === id ? { ...u, attendance: val } : u));
    refreshRegistry();
  };

  const handleCashEntry = () => {
    if (!payingStudent) return;
    const users = storageService.getUsers();
    storageService.saveUsers(users.map(u => {
      if (u.id === payingStudent.id) {
        const p: PaymentRecord = { id: `p-${Date.now()}`, amount: paymentAmount, date: new Date().toISOString().split('T')[0], method: 'Cash' };
        return { ...u, paidFee: (u.paidFee || 0) + paymentAmount, paymentHistory: [...(u.paymentHistory || []), p] };
      }
      return u;
    }));
    setPayingStudent(null);
    setPaymentAmount(0);
    refreshRegistry();
  };

  const filtered = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.rollNo.includes(searchTerm));

  return (
    <div className="space-y-6 lg:space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Tab Header - Sticky for easy access */}
      <div className="flex justify-between items-end border-b pb-6 sticky top-0 bg-slate-50/80 backdrop-blur-xl z-20 pt-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase flex items-center gap-3">
             <Activity className="text-emerald-500" /> {activeTab.replace('-', ' ')}
          </h1>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Zhob Administrative Node • Validated Instance</p>
        </div>
      </div>

      {/* DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Registry" value={students.length} icon={<Users />} color="bg-indigo-600" trend="Active Students" />
          <StatCard label="Awards Logged" value={certificates.length} icon={<Award />} color="bg-emerald-600" trend="Registry Verified" />
          <StatCard label="Total Cash" value={`Rs. ${students.reduce((a, s) => a + (s.paidFee || 0), 0).toLocaleString()}`} icon={<Wallet />} color="bg-rose-600" trend="Ledger Balance" />
          <StatCard label="Broadcasts" value={events.length} icon={<Globe />} color="bg-slate-900" trend="News Items" />
        </div>
      )}

      {/* SETTINGS & PROFILE MANAGEMENT */}
      {activeTab === 'settings' && (
        <div className="max-w-5xl mx-auto space-y-12">
          {/* LOGO MANAGEMENT */}
          <section className="bg-white p-10 rounded-[3rem] border shadow-sm">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center"><ImageIcon size={24}/></div>
                <div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter">App Branding</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Update Institute Logo</p>
                </div>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                   <p className="text-slate-500 font-medium leading-relaxed">Select a high-resolution logo for your portal. This will appear on the sidebar, login screen, and official documents.</p>
                   <div className="relative group">
                      <button className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3">
                         <Camera size={18} /> Select New Logo
                      </button>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'logo')} />
                   </div>
                   <button onClick={handleSaveSettings} className="w-full py-6 border-2 border-emerald-500 text-emerald-600 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-lg">Apply Branding Changes</button>
                </div>
                <div className="flex justify-center">
                   <div className="w-64 h-64 rounded-full border-4 border-dashed border-slate-200 flex items-center justify-center overflow-hidden bg-slate-50 group transition-all hover:border-emerald-500/50">
                      {settings.logoUrl ? (
                        <img src={settings.logoUrl} className="w-full h-full object-contain p-8" alt="Branding Preview" />
                      ) : (
                        <div className="text-center opacity-20">
                          <ShieldCheck size={48} className="mx-auto" />
                          <p className="text-[10px] font-black uppercase mt-2">No Logo Set</p>
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </section>

          {/* ADMIN PROFILE MANAGEMENT */}
          <section className="bg-white p-10 rounded-[3rem] border shadow-sm">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center"><UserCircle size={24}/></div>
                <div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter">Admin Profile</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Security & Identity Node</p>
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Official Name</label>
                   <input 
                     className="w-full p-5 bg-slate-50 rounded-2xl font-black text-slate-900 border-none outline-none focus:ring-2 focus:ring-indigo-500" 
                     value={adminProfile.name || ''} 
                     onChange={e => setAdminProfile({...adminProfile, name: e.target.value})}
                   />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Admin Registry ID</label>
                   <input 
                     disabled
                     className="w-full p-5 bg-slate-50 rounded-2xl font-mono text-slate-400 border-none outline-none opacity-50" 
                     value={adminProfile.rollNo || ''} 
                   />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Secure Username</label>
                   <div className="relative">
                      <UserCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      <input 
                        className="w-full pl-14 pr-5 py-5 bg-slate-50 rounded-2xl font-black text-slate-900 border-none outline-none focus:ring-2 focus:ring-indigo-500" 
                        value={adminProfile.username || ''} 
                        onChange={e => setAdminProfile({...adminProfile, username: e.target.value})}
                      />
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Access Passphrase</label>
                   <div className="relative">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      <input 
                        type="password"
                        className="w-full pl-14 pr-5 py-5 bg-slate-50 rounded-2xl font-black text-slate-900 border-none outline-none focus:ring-2 focus:ring-indigo-500" 
                        value={adminProfile.password || ''} 
                        onChange={e => setAdminProfile({...adminProfile, password: e.target.value})}
                      />
                   </div>
                </div>
                <div className="md:col-span-2">
                   <button onClick={handleSaveAdminProfile} className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all">
                      <Save size={18} /> Update Profile Credentials
                   </button>
                </div>
             </div>
          </section>

          {/* INSTITUTE METADATA */}
          <section className="bg-white p-10 rounded-[3rem] border shadow-sm">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center"><Building2 size={24}/></div>
                <div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter">Public Metadata</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">General Institute Info</p>
                </div>
             </div>
             
             <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">About The Institute</label>
                      <textarea 
                        className="w-full p-8 bg-slate-50 rounded-[2.5rem] h-48 border-none outline-none focus:ring-2 focus:ring-indigo-500 font-medium leading-relaxed resize-none" 
                        value={settings.aboutText} 
                        onChange={e => setSettings({...settings, aboutText: e.target.value})}
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Strategic Mission</label>
                      <textarea 
                        className="w-full p-8 bg-slate-50 rounded-[2.5rem] h-48 border-none outline-none focus:ring-2 focus:ring-indigo-500 font-medium leading-relaxed resize-none" 
                        value={settings.mission} 
                        onChange={e => setSettings({...settings, mission: e.target.value})}
                      />
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Campus HQ (Physical Address)</label>
                   <input 
                     className="w-full p-5 bg-slate-50 rounded-2xl font-black text-slate-900 border-none outline-none focus:ring-2 focus:ring-indigo-500" 
                     value={settings.location} 
                     onChange={e => setSettings({...settings, location: e.target.value})}
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Hotline</label>
                      <input className="w-full p-5 bg-slate-50 rounded-2xl font-black border-none outline-none focus:ring-2 focus:ring-indigo-500" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Support Email</label>
                      <input className="w-full p-5 bg-slate-50 rounded-2xl font-black border-none outline-none focus:ring-2 focus:ring-indigo-500" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} />
                   </div>
                </div>
                <button onClick={handleSaveSettings} className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl hover:bg-black transition-all">Save Institute Meta Data</button>
             </div>
          </section>
        </div>
      )}

      {/* FINANCIAL LEDGER */}
      {activeTab === 'fees' && (
        <div className="space-y-6">
          <div className="bg-rose-600 p-10 rounded-[3rem] text-white flex justify-between items-center shadow-xl relative overflow-hidden">
            <History className="absolute -right-8 -top-8 w-64 h-64 opacity-10" />
            <div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Finance Desk</h2>
              <p className="text-rose-100 font-medium">Record and track student installment payments.</p>
            </div>
            <Wallet size={64} className="opacity-40" />
          </div>
          <div className="bg-white rounded-[3rem] border shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Identity</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Ledger Status</th>
                  <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {students.map(s => {
                  const dues = (s.totalFee || 0) - (s.paidFee || 0);
                  return (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="px-8 py-6">
                        <p className="font-black text-slate-900">{s.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{s.rollNo}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-8">
                          <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase">Paid</p>
                            <p className="text-sm font-black text-emerald-600">Rs. {s.paidFee?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase">Remaining</p>
                            <p className={`text-sm font-black ${dues > 0 ? 'text-rose-500' : 'text-slate-300'}`}>Rs. {dues.toLocaleString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => { setPayingStudent(s); setPaymentAmount(0); }}
                          className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black uppercase text-[9px] hover:bg-black transition-all shadow-lg"
                        >
                          Add Payment
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TIMETABLE EDITOR */}
      {activeTab === 'timetable' && (
        <div className="space-y-8">
          <div className="bg-emerald-600 p-10 rounded-[3rem] text-white flex justify-between items-center shadow-xl">
             <div>
               <h2 className="text-4xl font-black italic uppercase tracking-tighter">Schedule Engine</h2>
               <p className="text-emerald-100 font-medium">Coordinate academic sessions across all disciplines.</p>
             </div>
             <button 
               onClick={() => setShowTimetableModal(true)}
               className="px-8 py-4 bg-white text-emerald-600 rounded-2xl font-black uppercase text-[10px] shadow-2xl"
             >
               Configure New Slot
             </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => {
               const daySlots = timetable.filter(s => s.day === day);
               return (
                 <div key={day} className="bg-white rounded-[2.5rem] p-8 border shadow-sm">
                   <h3 className="font-black text-emerald-600 uppercase text-xs mb-8 pb-3 border-b-2 border-emerald-50 tracking-[0.2em]">{day}</h3>
                   <div className="space-y-4">
                     {daySlots.length > 0 ? daySlots.map(s => (
                       <div key={s.id} className="p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-emerald-100 group transition-all relative">
                          <button 
                            onClick={() => { if(confirm('Remove slot?')) { storageService.saveTimetable(timetable.filter(x => x.id !== s.id)); refreshRegistry(); } }}
                            className="absolute top-4 right-4 text-slate-200 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={16}/>
                          </button>
                          <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 mb-2 uppercase">
                            <Clock size={12}/> {s.startTime} — {s.endTime}
                          </div>
                          <p className="font-black text-slate-800 text-lg uppercase italic leading-tight">{s.subject}</p>
                       </div>
                     )) : <p className="text-[10px] font-black text-slate-300 uppercase italic py-12 text-center border-2 border-dashed rounded-3xl">No Sessions Registered</p>}
                   </div>
                 </div>
               );
             })}
          </div>
        </div>
      )}

      {/* ATTENDANCE LOGS */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="bg-indigo-900 p-10 rounded-[3rem] text-white flex justify-between items-center shadow-xl">
            <div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Attendance Registry</h2>
              <p className="text-indigo-300 font-medium">Log cumulative physical presence for all students.</p>
            </div>
            <Percent size={64} className="opacity-20" />
          </div>
          <div className="bg-white rounded-[3rem] border shadow-sm overflow-hidden">
             <div className="p-8 border-b bg-slate-50 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Student Inventory</span>
                <span className="text-[10px] font-black uppercase text-emerald-600">Threshold: 75% MIN</span>
             </div>
             <div className="divide-y">
                {students.map(s => (
                  <div key={s.id} className="px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400">{s.name.charAt(0)}</div>
                      <div>
                        <p className="font-black text-slate-900 text-lg">{s.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.rollNo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <input 
                         type="number" 
                         min="0" max="100" 
                         className="w-24 p-4 bg-slate-50 rounded-xl font-black text-center text-indigo-600 border-none outline-none focus:ring-2 focus:ring-indigo-500" 
                         value={s.attendance || 0}
                         onChange={(e) => updateAttendance(s.id, parseInt(e.target.value) || 0)}
                       />
                       <span className="text-xl font-black text-slate-200">%</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* ACADEMIC RESULTS */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex justify-between items-center shadow-xl relative overflow-hidden">
            <BadgeCheck className="absolute -right-8 -top-8 w-64 h-64 opacity-10" />
            <div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Transcript Registry</h2>
              <p className="text-slate-400 font-medium">Publish official examination results to student nodes.</p>
            </div>
            <button 
              onClick={() => setShowResultModal(true)}
              className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase text-[10px] shadow-2xl relative z-10 hover:bg-emerald-600 transition-colors"
            >
              Log New Result
            </button>
          </div>
          <div className="bg-white rounded-[3rem] border shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Candidate</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Course/Subject</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Score Data</th>
                  <th className="px-8 py-6 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {results.map(r => {
                  const student = students.find(s => s.id === r.studentId);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-8 py-6">
                        <p className="font-black text-slate-900">{student?.name || 'Unknown'}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{student?.rollNo}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-black text-slate-800 uppercase italic tracking-tighter">{r.subject}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{r.date}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-2xl font-black text-slate-900">{r.marks}</span>
                        <span className="text-slate-300 font-bold ml-1">/{r.maxMarks}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => { if(confirm('Erase this record?')) { storageService.saveResults(results.filter(x => x.id !== r.id)); refreshRegistry(); } }}
                          className="text-slate-200 hover:text-rose-600 transition-colors p-2"
                        >
                          <Trash2 size={20}/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {results.length === 0 && <div className="py-24 text-center border-4 border-dashed m-12 rounded-[3rem] opacity-30 font-black uppercase text-xs tracking-widest">No Transcripts Recorded</div>}
          </div>
        </div>
      )}

      {/* CERTIFICATE ISSUANCE */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          <div className="bg-amber-500 p-10 rounded-[3rem] text-white flex justify-between items-center shadow-xl">
             <div>
               <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2">Award Vault</h2>
               <p className="text-amber-100 font-medium">Issue and archive verified digital credentials.</p>
             </div>
             <button 
               onClick={() => setShowCertModal(true)}
               className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] shadow-2xl"
             >
               Issue New Award
             </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map(cert => {
              const student = students.find(s => s.id === cert.studentId);
              return (
                <div key={cert.id} className="bg-white rounded-[3rem] border shadow-sm p-8 flex flex-col justify-between group hover:shadow-2xl transition-all">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                       <span className="px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-100">{cert.type} VERIFIED</span>
                       <button onClick={() => { if(confirm('Delete award?')) { storageService.saveCertificates(certificates.filter(x => x.id !== cert.id)); refreshRegistry(); } }} className="text-slate-200 hover:text-rose-600"><Trash2 size={18}/></button>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-tight mb-2">{cert.title}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{student?.name} • {student?.rollNo}</p>
                    {cert.photo && (
                       <div className="aspect-[4/3] rounded-3xl overflow-hidden border-4 border-slate-50 mb-6 bg-slate-50">
                          <img src={cert.photo} className="w-full h-full object-cover" />
                       </div>
                    )}
                  </div>
                  <button 
                    onClick={() => onPrintCertificate?.(cert, student!)}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-black"
                  >
                    <Printer size={16}/> Preview Original
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GALLERY MANAGER */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white flex justify-between items-center relative overflow-hidden shadow-xl">
            <ImageIcon className="absolute -right-8 -top-8 w-48 h-48 opacity-10" />
            <div>
              <h2 className="text-3xl font-black italic uppercase">Visual Assets</h2>
              <p className="text-slate-400 font-medium">Curate the public institute gallery.</p>
            </div>
            <button onClick={() => setShowGalleryModal(true)} className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] shadow-xl">Add New Media</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map(item => (
              <div key={item.id} className="bg-white rounded-[2rem] border overflow-hidden group shadow-sm">
                <div className="aspect-video relative bg-slate-100">
                  {item.type === 'image' ? (
                    <img src={item.url} className="w-full h-full object-cover" />
                  ) : (
                    <video src={item.url} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => { if(confirm('Erase media?')) { storageService.saveGallery(galleryItems.filter(x => x.id !== item.id)); refreshRegistry(); } }}
                      className="p-3 bg-white/90 backdrop-blur-sm text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-xl"
                    >
                      <Trash2 size={16}/>
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-2">
                      {item.type === 'image' ? <ImageIcon size={10}/> : <Video size={10}/>} {item.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-black text-slate-900 uppercase italic truncate">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CMS (Events) */}
      {activeTab === 'cms' && (
        <div className="space-y-6">
           <div className="bg-slate-800 p-10 rounded-[2.5rem] text-white flex justify-between items-center shadow-xl">
              <div>
                <h2 className="text-3xl font-black italic uppercase leading-none mb-2">Broadcast Engine</h2>
                <p className="text-slate-400 font-medium">Dispatch news alerts to student dashboards.</p>
              </div>
              <button onClick={() => setShowEventModal(true)} className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase text-[10px] shadow-2xl">New Broadcast</button>
           </div>
           <div className="grid grid-cols-1 gap-4">
              {events.map(ev => (
                <div key={ev.id} className="bg-white p-8 rounded-[2rem] border shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
                  <div className="min-w-0 pr-6">
                    <h3 className="text-xl font-black text-slate-900 uppercase italic mb-1 truncate">{ev.title}</h3>
                    <p className="text-slate-500 text-sm font-medium line-clamp-1">{ev.date} • {ev.description}</p>
                  </div>
                  <button onClick={() => { if(confirm('Remove news item?')) { storageService.saveEvents(events.filter(x => x.id !== ev.id)); refreshRegistry(); } }} className="text-slate-100 hover:text-rose-600 transition-colors"><Trash2 size={24}/></button>
                </div>
              ))}
           </div>
        </div>
      )}

      {/* STUDENTS DIRECTORY */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
              <input type="text" placeholder="Search student records..." className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-[1.5rem] shadow-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <button onClick={() => { setIsEditMode(false); setStudentForm({ name: '', fatherName: '', class: '', address: '', totalFee: 30000, username: '', password: '' }); setShowStudentModal(true); }} className="px-10 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3 hover:bg-black shadow-xl"><UserPlus size={18}/> Enroll Candidate</button>
          </div>
          <div className="bg-white rounded-[3rem] border overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Identity Node</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Academic Discipline</th>
                  <th className="px-10 py-6 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 group transition-all">
                    <td className="px-10 py-6">
                      <p className="font-black text-slate-900 text-lg italic tracking-tight">{s.name}</p>
                      <p className="text-[10px] text-emerald-600 font-mono font-bold">{s.rollNo}</p>
                    </td>
                    <td className="px-10 py-6">
                      <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-200">{s.class} AUTHORIZED</span>
                    </td>
                    <td className="px-10 py-6 text-right space-x-3">
                      <button onClick={() => { setIsEditMode(true); setSelectedId(s.id); setStudentForm(s); setShowStudentModal(true); }} className="p-3 bg-white text-slate-300 hover:text-indigo-600 border border-slate-100 rounded-xl hover:shadow-lg transition-all"><Edit size={16}/></button>
                      <button onClick={() => { if(confirm('Erase student record?')) { storageService.saveUsers(storageService.getUsers().filter(u => u.id !== s.id)); refreshRegistry(); } }} className="p-3 bg-white text-slate-300 hover:text-rose-600 border border-slate-100 rounded-xl hover:shadow-lg transition-all"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QUIZ MANAGER */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-indigo-600 p-10 rounded-[3rem] text-white flex justify-between items-center relative overflow-hidden shadow-xl">
            <BookOpen className="absolute -right-8 -top-8 w-48 h-48 opacity-10" />
            <div>
              <h2 className="text-3xl font-black italic uppercase">Assessment Lab</h2>
              <p className="text-indigo-100 font-medium">Create and deploy evaluative queries for students.</p>
            </div>
            <button onClick={() => setShowQuizModal(true)} className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase text-[10px] shadow-xl">New Question</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizQuestions.map((q, idx) => (
              <div key={q.id} className="bg-white p-8 rounded-[2rem] border shadow-sm relative group">
                <button 
                  onClick={() => { if(confirm('Delete query?')) { storageService.saveQuiz(quizQuestions.filter(x => x.id !== q.id)); refreshRegistry(); } }} 
                  className="absolute top-8 right-8 text-slate-200 hover:text-rose-500"
                >
                  <Trash2 size={18}/>
                </button>
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Question {idx + 1}</p>
                <h3 className="text-lg font-black text-slate-900 mb-4 italic leading-tight">{q.question}</h3>
                <div className="grid grid-cols-1 gap-2">
                   {q.options.map((opt, i) => (
                     <div key={i} className={`p-3 rounded-xl text-xs font-bold border ${i === q.correctAnswer ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-transparent text-slate-500'}`}>
                        {i === q.correctAnswer && <CheckCircle2 className="inline-block mr-2 w-3 h-3" />}
                        {opt}
                     </div>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MODALS --- */}

      {/* Results Modal - Fully functional transcript entry */}
      {showResultModal && (
        <div className="fixed inset-0 bg-slate-900/98 backdrop-blur-2xl z-[300] flex items-center justify-center p-4">
           <div className="bg-white rounded-[3rem] w-full max-w-xl p-10 shadow-2xl relative animate-in zoom-in-95 duration-300">
              <button onClick={() => setShowResultModal(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors"><X size={32}/></button>
              <h2 className="text-3xl font-black italic mb-8 uppercase tracking-tighter">Transcript Entry</h2>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Target Candidate</label>
                    <select 
                      className="w-full p-5 bg-slate-50 rounded-2xl font-black text-xs border-2 border-transparent focus:border-emerald-500/20 outline-none transition-all" 
                      value={resultForm.studentId} 
                      onChange={e => setResultForm({...resultForm, studentId: e.target.value})}
                    >
                       <option value="">-- Select Student from Registry --</option>
                       {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.rollNo})</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Subject / Exam Module</label>
                    <input 
                      placeholder="E.g., Intro to Algorithms" 
                      className="w-full p-5 bg-slate-50 rounded-2xl font-bold border-2 border-transparent focus:border-emerald-500/20 outline-none transition-all" 
                      value={resultForm.subject} 
                      onChange={e => setResultForm({...resultForm, subject: e.target.value})} 
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Obtained Marks</label>
                      <input 
                        type="number" 
                        className="w-full p-5 bg-slate-50 rounded-2xl font-black text-2xl text-emerald-600 border-none outline-none" 
                        value={resultForm.marks} 
                        onChange={e => setResultForm({...resultForm, marks: parseInt(e.target.value) || 0})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Total Possible</label>
                      <input 
                        type="number" 
                        className="w-full p-5 bg-slate-50 rounded-2xl font-black text-2xl text-slate-400 border-none outline-none" 
                        value={resultForm.maxMarks} 
                        onChange={e => setResultForm({...resultForm, maxMarks: parseInt(e.target.value) || 0})} 
                      />
                    </div>
                 </div>
              </div>
              <button 
                onClick={handleSaveResult} 
                className="w-full mt-10 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs shadow-xl flex items-center justify-center gap-3 hover:bg-black transition-all"
              >
                <Save size={18} /> Commit Result to Registry
              </button>
           </div>
        </div>
      )}

      {/* Enrollment Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-slate-900/98 backdrop-blur-2xl z-[200] flex items-center justify-center p-4 lg:p-8">
           <div className="bg-white rounded-[4rem] w-full max-w-5xl p-10 lg:p-16 shadow-2xl relative overflow-y-auto max-h-[95vh] animate-in zoom-in-95 duration-300">
              <button onClick={() => setShowStudentModal(false)} className="absolute top-10 right-10 text-slate-300"><X size={32}/></button>
              <h2 className="text-4xl lg:text-5xl font-black italic mb-12 uppercase tracking-tighter">Student Enrollment</h2>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                 <div className="lg:col-span-4 space-y-8 flex flex-col items-center">
                    <div className="w-48 h-48 lg:w-64 lg:h-64 bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-200 overflow-hidden relative group cursor-pointer">
                       {studentForm.photo ? <img src={studentForm.photo} className="w-full h-full object-cover" /> : <Camera size={64} className="m-auto absolute inset-0 opacity-10" />}
                       <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, 'student')} />
                    </div>
                    <div className="w-full space-y-3">
                       <input placeholder="Username" className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-xs" value={studentForm.username} onChange={e => setStudentForm({...studentForm, username: e.target.value})} />
                       <input placeholder="Password" type="text" className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-xs" value={studentForm.password} onChange={e => setStudentForm({...studentForm, password: e.target.value})} />
                    </div>
                 </div>
                 <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input placeholder="Official Name" className="sm:col-span-2 w-full p-5 bg-slate-50 rounded-2xl font-black text-2xl border-none" value={studentForm.name} onChange={e => setStudentForm({...studentForm, name: e.target.value})} />
                    <input placeholder="Father Name" className="w-full p-5 bg-slate-50 rounded-2xl font-bold text-sm border-none" value={studentForm.fatherName} onChange={e => setStudentForm({...studentForm, fatherName: e.target.value})} />
                    <input placeholder="Identity ID" className="w-full p-5 bg-slate-50 rounded-2xl font-mono text-xs border-none" value={studentForm.cnic} onChange={e => setStudentForm({...studentForm, cnic: e.target.value})} />
                    <select className="w-full p-5 bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest border-none" value={studentForm.class} onChange={e => setStudentForm({...studentForm, class: e.target.value})}>
                       <option value="">-- Choose Trade --</option><option value="CIT">CIT</option><option value="DIT">DIT</option><option value="Web">Web Dev</option>
                    </select>
                    <input type="number" placeholder="Total Installment" className="w-full p-5 bg-slate-50 rounded-2xl font-black text-emerald-600 border-none" value={studentForm.totalFee} onChange={e => setStudentForm({...studentForm, totalFee: parseInt(e.target.value) || 0})} />
                    <textarea placeholder="Residential Address Zhob" className="sm:col-span-2 w-full p-8 bg-slate-50 rounded-[2.5rem] h-40 border-none resize-none font-medium leading-relaxed" value={studentForm.address} onChange={e => setStudentForm({...studentForm, address: e.target.value})} />
                 </div>
              </div>
              <button onClick={handleSaveStudent} className="w-full mt-12 py-8 bg-slate-900 text-white rounded-[3rem] font-black uppercase text-xs flex items-center justify-center gap-4 hover:bg-black transition-all"><Save size={20}/> Authorize Entry</button>
           </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon, color, trend }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
    <div className={`absolute -right-6 -top-6 p-12 opacity-5 group-hover:opacity-10 transition-opacity ${color} rounded-full`}>{React.cloneElement(icon, { size: 96 })}</div>
    <div className={`w-14 h-14 ${color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>{React.cloneElement(icon, { size: 28 })}</div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-black text-slate-900 italic mb-2 tracking-tighter">{value}</p>
    <div className="flex items-center gap-2">
       <CheckCircle2 className="w-3 h-3 text-emerald-500" />
       <span className="text-[9px] font-bold text-emerald-500 uppercase">{trend}</span>
    </div>
  </div>
);

export default AdminPanel;
