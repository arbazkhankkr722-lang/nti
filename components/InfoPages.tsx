
import React, { useState, useEffect } from 'react';
import { Shield, Target, Users, Mail, MapPin, Phone, MessageSquare, PlayCircle, Globe, Award, Laptop, Plus, ChevronLeft, ChevronRight, X, ArrowUpRight } from 'lucide-react';
import { storageService } from '../services/storage';
import { InstituteSettings, GalleryItem } from '../types';
import { MOCK_SETTINGS, MOCK_GALLERY } from '../mockData';

export const AboutUs: React.FC = () => {
  const [settings, setSettings] = useState<InstituteSettings>(MOCK_SETTINGS);

  useEffect(() => {
    const saved = storageService.getSettings();
    if (saved) setSettings(saved);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700 pb-20">
      <div className="bg-slate-900 p-16 rounded-[4rem] shadow-2xl overflow-hidden relative text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full -mr-64 -mt-64 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full -ml-48 -mb-48 blur-[80px]" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em] mb-6">Our Legacy & Future</h2>
            <h1 className="text-6xl font-black tracking-tighter italic leading-none mb-8 italic">
              Empowering Zhob's <br />
              <span className="text-emerald-400">Digital Frontier</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              {settings.aboutText}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/10">
              <h4 className="text-4xl font-black text-emerald-400 mb-2 italic">15+</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expert Instructors</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/10">
              <h4 className="text-4xl font-black text-indigo-400 mb-2 italic">500+</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Successful Alumni</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/10">
              <h4 className="text-4xl font-black text-amber-400 mb-2 italic">98%</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Graduation Rate</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/10">
              <h4 className="text-4xl font-black text-rose-400 mb-2 italic">100%</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Market Relevant</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm group hover:shadow-2xl transition-all duration-500">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-4 italic">Strategic Mission</h3>
          <p className="text-slate-500 font-medium leading-relaxed">{settings.mission}</p>
        </div>
        
        <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm group hover:shadow-2xl transition-all duration-500">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-4 italic">National Affiliation</h3>
          <p className="text-slate-500 font-medium leading-relaxed">Fully accredited by the Trade Testing Board (TTB) and provincial education councils for official certification.</p>
        </div>

        <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm group hover:shadow-2xl transition-all duration-500">
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <Laptop className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-4 italic">Advanced Labs</h3>
          <p className="text-slate-500 font-medium leading-relaxed">State-of-the-art computer laboratories with high-speed internet and high-end hardware for professional training.</p>
        </div>
      </div>
    </div>
  );
};

export const ContactUs: React.FC = () => {
  const [settings, setSettings] = useState<InstituteSettings>(MOCK_SETTINGS);

  useEffect(() => {
    const saved = storageService.getSettings();
    if (saved) setSettings(saved);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('userName') as HTMLInputElement).value;
    const email = (form.elements.namedItem('userEmail') as HTMLInputElement).value;
    const subject = (form.elements.namedItem('userSubject') as HTMLInputElement).value;
    const message = (form.elements.namedItem('userMessage') as HTMLTextAreaElement).value;

    const mailtoLink = `mailto:arbazkhankkr733@gmail.com?subject=${encodeURIComponent(subject || 'Portal Inquiry')}&body=${encodeURIComponent(
      `From: ${name}\nEmail: ${email}\n\nInquiry:\n${message}`
    )}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Official Inquiries</h2>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">Connect With Us</h1>
        <p className="text-slate-400 max-w-xl mx-auto font-medium italic">Your journey towards technical mastery starts with a single conversation. Reach out to the registrar today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100">
          <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight italic">Send a Secure Message</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                <input name="userName" type="text" required className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-bold" placeholder="Ahmed Abdullah" />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                <input name="userEmail" type="email" required className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-bold" placeholder="student@mail.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Inquiry Subject</label>
              <input name="userSubject" type="text" required className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all font-bold" placeholder="Admission into DIT / Fee Structure" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Detailed Message</label>
              <textarea name="userMessage" required className="w-full p-6 bg-slate-50 border-none rounded-[2rem] h-48 resize-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium leading-relaxed" placeholder="Tell us about your background and what you're looking for..."></textarea>
            </div>
            <button type="submit" className="w-full py-6 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-black transition-all shadow-2xl shadow-slate-200 uppercase tracking-widest text-xs flex items-center justify-center gap-4">
              <Mail className="w-5 h-5 text-emerald-400" />
              Transmit Message
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden h-full">
            <Globe className="absolute -right-12 -bottom-12 w-64 h-64 opacity-10" />
            <h3 className="text-3xl font-black mb-12 italic tracking-tighter">Campus Registry</h3>
            <div className="space-y-12">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/10 group-hover:bg-emerald-500 group-hover:text-white transition-all"><MapPin className="w-6 h-6" /></div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Campus HQ</p>
                  <p className="text-lg font-bold leading-tight">{settings.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 border border-white/10 group-hover:bg-indigo-500 group-hover:text-white transition-all"><Phone className="w-6 h-6" /></div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Office Hotline</p>
                  <p className="text-lg font-bold leading-tight">{settings.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-rose-400 border border-white/10 group-hover:bg-rose-500 group-hover:text-white transition-all"><Mail className="w-6 h-6" /></div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Support Email</p>
                  <p className="text-lg font-bold leading-tight">{settings.email}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-20 pt-10 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Office Hours: 8:00 AM - 5:00 PM</span>
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center cursor-pointer hover:bg-emerald-500 transition-all"><MessageSquare className="w-5 h-5" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    const saved = storageService.getGallery();
    if (saved && saved.length > 0) {
      setItems(saved);
    } else {
      setItems(MOCK_GALLERY);
    }
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx === 0 ? items.length - 1 : activeIdx - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx(activeIdx === items.length - 1 ? 0 : activeIdx + 1);
    }
  };

  const goToSlide = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setActiveIdx(index);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 px-4">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em]">The Visual Registry</h2>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic leading-none">Institute <br/><span className="text-emerald-500">Chronicles</span></h1>
          <p className="text-slate-400 font-bold italic text-lg leading-relaxed">Archiving the technical evolution and campus spirit of Zhob's premier digital hub.</p>
        </div>
        <div className="hidden lg:flex items-center gap-6 pb-2">
           <div className="text-right">
              <p className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none">{items.length}</p>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Archived Assets</p>
           </div>
           <div className="w-px h-12 bg-slate-100"></div>
           <Award className="w-10 h-10 text-emerald-500" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 px-4">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            onClick={() => setActiveIdx(index)}
            className="group relative bg-slate-900 rounded-[3.5rem] overflow-hidden shadow-2xl cursor-pointer ring-1 ring-slate-200 hover:ring-emerald-400 transition-all duration-700 hover:-translate-y-2"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-110"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video 
                    src={item.url} 
                    className="w-full h-full object-cover transition-all duration-1000"
                    muted
                    loop
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 group-hover:bg-transparent transition-all">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-125 group-hover:bg-emerald-500 transition-all duration-500">
                      <PlayCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                <div className="flex items-center gap-3 mb-3">
                   <div className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[8px] font-black uppercase tracking-[0.2em]">
                    {item.type} Evidence
                   </div>
                </div>
                <h3 className="text-3xl font-black text-white italic tracking-tighter leading-none mb-4 group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-white/40 text-[9px] font-black uppercase tracking-widest group-hover:text-emerald-400 transition-colors">
                  Inspect Digital Archive <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic Transparent Slider / Lightbox */}
      {activeIdx !== null && (
        <div 
          className="fixed inset-0 z-[1000] bg-slate-950/80 backdrop-blur-2xl flex items-center justify-center animate-in fade-in duration-500"
          onClick={() => setActiveIdx(null)}
        >
          {/* Subtle Technical HUD Pattern Overlay */}
          <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
             <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, #10b981 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
          </div>

          {/* HUD Top Bar */}
          <div className="absolute top-0 left-0 right-0 h-24 flex items-center justify-between px-10 z-[1100]">
            <div className="text-white/40 font-black text-2xl italic tracking-tighter">
               {activeIdx + 1} <span className="text-white/10 text-sm font-mono mx-2">/</span> <span className="text-white/10 text-sm">{items.length}</span>
            </div>
            <button 
              className="text-white/30 hover:text-white transition-all p-3 bg-white/5 hover:bg-emerald-500 rounded-full group"
              onClick={() => setActiveIdx(null)}
            >
              <X size={28} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button 
            className="absolute left-6 lg:left-12 text-white/20 hover:text-emerald-400 hover:scale-110 transition-all p-4 z-[1100] group"
            onClick={handlePrev}
          >
            <div className="bg-white/5 p-6 rounded-full border border-white/5 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5">
              <ChevronLeft size={48} strokeWidth={1} />
            </div>
          </button>

          <button 
            className="absolute right-6 lg:right-12 text-white/20 hover:text-emerald-400 hover:scale-110 transition-all p-4 z-[1100] group"
            onClick={handleNext}
          >
            <div className="bg-white/5 p-6 rounded-full border border-white/5 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5">
              <ChevronRight size={48} strokeWidth={1} />
            </div>
          </button>

          {/* Main Media Content */}
          <div className="w-full h-full flex flex-col items-center justify-center relative select-none p-6 lg:p-24 z-[1050]">
            <div 
              className="max-w-6xl w-full h-full relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
                {items[activeIdx].type === 'image' ? (
                  <img 
                    src={items[activeIdx].url} 
                    className="max-w-full max-h-full object-contain rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.7)] border border-white/10 ring-1 ring-white/5"
                    alt={items[activeIdx].title}
                  />
                ) : (
                  <video 
                    src={items[activeIdx].url} 
                    className="max-w-full max-h-full rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.7)] border border-white/10 ring-1 ring-white/5"
                    controls
                    autoPlay
                  />
                )}
              </div>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="mt-12 w-full flex flex-col items-center space-y-6 animate-in slide-in-from-bottom-8 duration-1000">
               <div className="text-center px-6">
                  <h3 className="text-white text-4xl lg:text-6xl font-black uppercase italic tracking-tighter leading-none mb-4 drop-shadow-2xl">
                    {items[activeIdx].title}
                  </h3>
                  <div className="flex items-center gap-4 justify-center">
                    <span className="h-px w-8 bg-white/10"></span>
                    <p className="text-emerald-400/80 font-black text-[9px] uppercase tracking-[0.5em]">
                      SECURE ASSET ID: NTZ-GALLERY-{items[activeIdx].id}
                    </p>
                    <span className="h-px w-8 bg-white/10"></span>
                  </div>
               </div>

               {/* Indicator Dots */}
               <div className="flex gap-4 p-5 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => goToSlide(e, i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                        activeIdx === i 
                          ? 'bg-emerald-500 scale-150 shadow-[0_0_15px_rgba(16,185,129,0.8)]' 
                          : 'bg-white/10 hover:bg-white/30'
                      }`}
                    />
                  ))}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const FAQs: React.FC = () => (
  <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20 px-4">
    <div className="text-center">
      <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4">Knowledge Base</h2>
      <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">Common Queries</h1>
    </div>
    <div className="space-y-4">
      {[
        { q: "What are the core prerequisites for the DIT program?", a: "The DIT program requires a minimum of Matriculation (Science or Arts). Students must demonstrate a basic aptitude for computing during the orientation interview." },
        { q: "Is NewTech Zhob affiliated with national boards?", a: "Yes, we are officially affiliated with the Trade Testing Board (TTB) Balochistan and recognized for high-standard vocational training nationwide." },
        { q: "Does the institute offer job placement support?", a: "Our dedicated Alumni Office works tirelessly to bridge the gap between education and industry, hosting bi-annual job fairs and technical networking events." },
        { q: "Are there installment options for the course fees?", a: "Absolutely. We offer a 3-part installment plan for all major diploma courses. Deserving students can also apply for merit-based scholarships." }
      ].map((faq, idx) => (
        <details key={idx} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-slate-200">
          <summary className="p-8 cursor-pointer flex justify-between items-center font-black text-slate-900 list-none text-xl italic tracking-tight">
            {faq.q}
            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-open:rotate-180 transition-transform duration-500">
              <Plus className="w-5 h-5 text-indigo-500 group-open:hidden" />
              <div className="w-4 h-0.5 bg-indigo-500 hidden group-open:block" />
            </div>
          </summary>
          <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed text-lg animate-in slide-in-from-top-2">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  </div>
);
