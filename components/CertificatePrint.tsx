
import React from 'react';
import { Certificate, User, CertificateType } from '../types';
import { Award, ShieldCheck, Printer, X, FileCheck } from 'lucide-react';

interface Props {
  certificate: Certificate;
  student: User;
  onClose: () => void;
}

const CertificatePrint: React.FC<Props> = ({ certificate, student, onClose }) => {
  // Check if we have the actual scan to show instead of the template
  const hasOriginalScan = !!certificate.photo;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center overflow-auto p-4 sm:p-12">
      <div className="no-print mb-8 flex gap-4 sticky top-0 z-20 bg-slate-900/80 backdrop-blur-md p-4 rounded-3xl border border-white/10 shadow-2xl">
        <button 
          onClick={() => window.print()}
          className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-xl"
        >
          <Printer size={16} /> Print Original Document
        </button>
        <button 
          onClick={onClose}
          className="px-8 py-3 bg-white/10 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/20 transition-all flex items-center gap-2"
        >
          <X size={16} /> Close Preview
        </button>
      </div>

      <div className="relative print:m-0 print:p-0">
        {hasOriginalScan ? (
          /* THE ORIGINAL SCAN DISPLAY (Replacing the "Fake" generated one) */
          <div className="max-w-[1100px] w-full bg-white shadow-2xl rounded-[2rem] overflow-hidden border-8 border-white animate-in zoom-in duration-500">
            <div className="no-print absolute top-6 left-6 bg-emerald-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 z-10">
              <FileCheck size={14} /> Official Scan Verified
            </div>
            <img 
              src={certificate.photo} 
              className="w-full h-auto block" 
              alt="Official Certificate Scan" 
            />
          </div>
        ) : (
          /* FALLBACK TEMPLATE (Only if no scan exists) */
          <div className="w-[1000px] h-[710px] border-[20px] border-double border-indigo-900 p-12 bg-white shadow-2xl relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4338ca 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="flex flex-col h-full items-center text-center relative z-10">
              <div className="mb-6 flex items-center gap-4">
                <div className="w-20 h-20 bg-indigo-900 rounded-full flex items-center justify-center text-white">
                  <Award className="w-12 h-12" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">NEWTECH ZHOB</h1>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Technical Training & Excellence</p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-200 mb-8"></div>

              <h2 className="text-5xl font-serif text-indigo-900 mb-8">CERTIFICATE OF ACHIEVEMENT</h2>
              
              <p className="text-xl text-slate-500 italic mb-2">This is to certify that</p>
              <p className="text-6xl font-bold text-slate-900 mb-8 font-serif underline decoration-indigo-200 underline-offset-8">
                {student.name}
              </p>

              <p className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-8">
                has successfully completed the prescribed course of study in 
                <span className="font-bold text-slate-900"> {certificate.title} </span>
                at this institute. Having fulfilled all physical attendance requirements ({student.attendance}%) 
                and demonstrated proficiency in the required technical skills.
              </p>

              <div className="grid grid-cols-3 w-full mt-auto pt-12 items-end">
                <div className="flex flex-col items-center">
                  <div className="w-40 h-px bg-slate-400 mb-2"></div>
                  <p className="text-xs font-bold uppercase text-slate-500 tracking-widest">Office Registrar</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <ShieldCheck className="w-24 h-24 text-indigo-100 absolute -top-12 -left-12 opacity-50" />
                    <div className="w-32 h-32 border-4 border-indigo-900 rounded-full flex items-center justify-center flex-col">
                      <span className="text-indigo-900 font-black text-xl">{certificate.grade}</span>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Grade</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-40 h-px bg-slate-400 mb-2"></div>
                  <p className="text-xs font-bold uppercase text-slate-500 tracking-widest">Institute Director</p>
                </div>
              </div>

              <div className="mt-8 text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                CERT ID: {certificate.certificateNo} | ISSUED: {certificate.issueDate}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <p className="no-print mt-12 text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
        Ready for Physical Print Output
      </p>
    </div>
  );
};

export default CertificatePrint;
