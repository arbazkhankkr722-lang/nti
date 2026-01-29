
import React from 'react';
import { User, Event } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Award, BookOpen, AlertCircle, Clock, TrendingUp, Wallet, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: User;
  events: Event[];
}

const StudentDashboard: React.FC<Props> = ({ user, events }) => {
  const navigate = useNavigate();
  const dues = (user.totalFee || 0) - (user.paidFee || 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Attendance Insights */}
        <div className="bg-white p-5 lg:p-8 rounded-[2rem] lg:rounded-3xl shadow-sm border border-slate-100 col-span-1 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-black text-slate-900 leading-tight truncate">Attendance Metrics</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Physical Registry</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4 sm:text-right sm:block">
              <span className={`text-3xl font-black ${user.attendance && user.attendance >= 75 ? 'text-emerald-600' : 'text-red-500'}`}>
                {user.attendance}%
              </span>
              <p className="text-[10px] text-slate-400 font-black uppercase ml-2 sm:ml-0">Cumulative Avg</p>
            </div>
          </div>
          
          <div className="h-48 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={user.attendanceHistory || []}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} fontWeight="bold" />
                <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" domain={[0, 100]} hide={window.innerWidth < 640} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorAtt)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 rounded-2xl gap-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Threshold Progress</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex-1 sm:w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${user.attendance && user.attendance >= 75 ? 'bg-emerald-500' : 'bg-red-400'}`} 
                  style={{ width: `${user.attendance}%` }}
                />
              </div>
              <span className="text-[10px] font-black text-slate-400">75% MIN</span>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-900 p-6 lg:p-8 rounded-[2rem] lg:rounded-3xl text-white shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BookOpen className="w-24 h-24 lg:w-32 lg:h-32" />
            </div>
            <div className="relative z-10">
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Official Student Card</p>
              <h4 className="text-3xl lg:text-4xl font-black mb-1 truncate leading-tight italic uppercase">{user.name}</h4>
              <p className="text-slate-400 font-bold mb-8 uppercase tracking-widest text-xs">{user.class} Discipline</p>
              
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">Registration Key</p>
                  <p className="text-base lg:text-lg font-mono font-bold tracking-widest">{user.rollNo}</p>
                </div>
                <div 
                  onClick={() => navigate('/financials')}
                  className={`p-4 rounded-2xl border flex items-center justify-between group cursor-pointer transition-all ${dues === 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}
                >
                   <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 lg:w-6 lg:h-6" />
                    <div>
                      <p className="text-[9px] font-bold uppercase opacity-80">Fee Status</p>
                      <p className="text-[11px] lg:text-sm font-black">{dues === 0 ? 'SETTLED' : `DUE: Rs. ${dues.toLocaleString()}`}</p>
                    </div>
                   </div>
                   <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </div>
              </div>
            </div>
            <div className="pt-6 text-[9px] font-bold text-slate-500 uppercase tracking-widest text-center border-t border-white/10 mt-8">
              NewTech Institute v2.5
            </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Campus Events */}
        <div className="bg-white p-6 lg:p-8 rounded-[2rem] lg:rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            Campus Calendar
          </h3>
          <div className="space-y-4">
            {events.slice(0, 3).map(event => (
              <div key={event.id} className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100 group">
                <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-slate-900 text-white flex flex-col items-center justify-center rounded-2xl group-hover:bg-emerald-600 transition-colors">
                  <span className="text-[8px] lg:text-[10px] font-black uppercase opacity-60 leading-none">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-lg lg:text-xl font-black leading-none mt-1">{new Date(event.date).getDate()}</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-slate-900 text-sm lg:text-base truncate">{event.title}</h4>
                  <p className="text-xs text-slate-500 font-medium truncate">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Quick Links */}
        <div className="bg-white p-6 lg:p-8 rounded-[2rem] lg:rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            Quick Portal Access
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
             <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-all flex flex-col justify-between">
                <div>
                  <p className="font-black text-slate-900 mb-1 text-sm uppercase italic">Validated Awards</p>
                  <p className="text-[10px] text-slate-500 mb-4 font-medium leading-tight">Registry issued technical transcripts.</p>
                </div>
                <button 
                  onClick={() => navigate('/certificates')}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all"
                >
                  Open Vault
                </button>
             </div>
             <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all flex flex-col justify-between">
                <div>
                  <p className="font-black text-slate-900 mb-1 text-sm uppercase italic">Ledger Summary</p>
                  <p className="text-[10px] text-slate-500 mb-4 font-medium leading-tight">Review installments and current dues.</p>
                </div>
                <button 
                  onClick={() => navigate('/financials')}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                >
                  Financials
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
