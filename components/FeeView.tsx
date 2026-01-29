
import React from 'react';
import { User } from '../types';
import { Wallet, CheckCircle2, AlertTriangle, ArrowDownRight, History } from 'lucide-react';

interface Props {
  user: User;
}

const FeeView: React.FC<Props> = ({ user }) => {
  const total = user.totalFee || 0;
  const paid = user.paidFee || 0;
  const dues = total - paid;
  const paidPercent = total > 0 ? (paid / total) * 100 : 0;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-slate-900 italic tracking-tight">Financial Overview</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">Dues & Payment Records</p>
        </div>
        {dues === 0 ? (
          <div className="px-6 py-3 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest">
            <CheckCircle2 className="w-5 h-5" />
            Account Fully Settled
          </div>
        ) : (
          <div className="px-6 py-3 bg-amber-100 text-amber-700 rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest">
            <AlertTriangle className="w-5 h-5" />
            Outstanding Dues
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Course Fee</p>
          <p className="text-3xl font-black text-slate-900">Rs. {total.toLocaleString()}</p>
        </div>
        <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-5"><Wallet className="w-24 h-24" /></div>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Total Paid Amount</p>
          <p className="text-3xl font-black text-emerald-700">Rs. {paid.toLocaleString()}</p>
        </div>
        <div className={`p-8 rounded-3xl border shadow-sm ${dues > 0 ? 'bg-red-50 border-red-100 text-red-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
          <p className="text-[10px] font-black uppercase tracking-widest mb-2">Remaining Dues</p>
          <p className="text-3xl font-black">Rs. {dues.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Wallet className="w-5 h-5" /></div>
          Payment Progress
        </h3>
        <div className="space-y-4">
          <div className="h-12 bg-slate-100 rounded-2xl overflow-hidden relative">
            <div 
              className="h-full bg-emerald-500 transition-all duration-1000 ease-out flex items-center justify-end pr-4" 
              style={{ width: `${paidPercent}%` }}
            >
              {paidPercent > 15 && <span className="text-white font-black text-xs">{Math.round(paidPercent)}%</span>}
            </div>
          </div>
          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <span>Registration Started</span>
            <span>Completion Goal</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center"><History className="w-5 h-5" /></div>
          Recent Ledger Entries
        </h3>
        <div className="space-y-3">
          {user.paymentHistory && user.paymentHistory.length > 0 ? (
            user.paymentHistory.map((payment) => (
              <div key={payment.id} className="p-5 bg-slate-50 rounded-2xl flex items-center justify-between hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm border border-slate-100">
                    <ArrowDownRight className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">Payment Received</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{payment.date} • {payment.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-slate-900">Rs. {payment.amount.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Successful</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
              <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No Payment History Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeeView;
