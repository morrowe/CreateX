import { useState } from 'react';
import './Footer.module.scss'
import {im} from '../assets/im.ts'

function Footer() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(true);
  const handleFooterRequest = async () => {
    if (!name.trim() || !phone.trim() || !message.trim() || !agreed) return;
    const saved = localStorage.getItem('user');
    const user = saved ? JSON.parse(saved) : null;
    const res = await fetch('http://localhost:3000/api/register-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user ? user.id : null,
        name,
        phone,
        email: email || null,
        message,
      }),
    });
    if (res.ok) {
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }
  };
  const [subEmail, setSubEmail] = useState('');
  const handleSubscribe = async () => {
    if (!subEmail.trim()) return;

    const saved = localStorage.getItem('user');
    const user = saved ? JSON.parse(saved) : null;

    const res = await fetch('http://localhost:3000/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: subEmail,
        name: user ? user.full_name : null,
      }),
    });
    if (res.ok) {
      setSubEmail('');
    }
  };

  return (
    <>
      <footer className="w-full flex flex-col font-ubuntu">
        <section className="w-full min-h-[600px] lg:h-[826px] flex flex-col items-center justify-center bg-cover bg-center bg-[url('../src/assets/bgfooter.png')]">
          <div className="w-full h-[48px] lg:hidden"></div>
          <div className="w-[92%] max-w-[1230px] flex justify-center lg:justify-end">
            <div className="w-full max-w-[495px] bg-white dark:bg-[#1A1D24] rounded-xs shadow-[0_60px_80px_-20px_rgba(30,33,44,0.16)] dark:shadow-[0_60px_80px_-20px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center transition-colors duration-300">
              <div className="w-full h-[32px] sm:h-[48px]"></div>
              <div className="w-[86%] sm:w-[84%] flex flex-col gap-[20px] sm:gap-[24px]">
                <h3 className="text-[24px] sm:text-[28px] font-bold text-[#1E212C] dark:text-white text-center leading-snug">A quick way to discuss details</h3>
                <div className="flex flex-col gap-[16px] sm:gap-[20px]">
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[14px] text-[#424551] dark:text-[#D1D3D8] font-normal">Name*</p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full h-[44px] bg-[#F4F5F7] dark:bg-[#222630] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[14px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[14px] text-[#424551] dark:text-[#D1D3D8] font-normal">Phone*</p>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" className="w-full h-[44px] bg-[#F4F5F7] dark:bg-[#222630] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[14px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[14px] text-[#424551] dark:text-[#D1D3D8] font-normal">Email</p>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your working email" className="w-full h-[44px] bg-[#F4F5F7] dark:bg-[#222630] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[14px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[14px] text-[#424551] dark:text-[#D1D3D8] font-normal">Message*</p>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" className="w-full h-[66px] bg-[#F4F5F7] dark:bg-[#222630] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[14px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] transition-colors" />
                  </div>
                  <div className="flex items-start gap-[12px]">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-[16px] h-[16px] shrink-0 relative top-[3px] accent-[#FF5A30] cursor-pointer" />
                    <p className="text-[14px] text-[#424551] dark:text-[#D1D3D8] leading-snug">I agree to receive communications from Createx Construction Bureau.</p>
                  </div>
                </div>
                <button onClick={handleFooterRequest} className="w-full sm:w-[174px] h-[44px] self-center bg-[#FF5A30] text-white text-[14px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">send request</button>
              </div>
              <div className="w-full h-[32px] sm:h-[48px]"></div>
            </div>
          </div>
          <div className="w-full h-[48px] lg:hidden"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-[#1E212C] dark:bg-[#0D0F14] font-ubuntu text-white transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col gap-[36px] md:gap-[48px]">
            <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-[36px] lg:gap-[48px]">
              <div className="w-full lg:w-[495px] flex flex-col gap-[20px] sm:gap-[24px]">
                <div className="flex flex-wrap items-center justify-between sm:justify-start gap-[24px] sm:gap-[60px]">
                  <img src={im.logo2} alt="logo" className="h-[24px] object-contain" />
                  <div className="flex items-center gap-[16px]">
                    <a href=""><img src={im.whatsapp} alt="" className="w-[24px] h-[24px] opacity-60 hover:opacity-100 transition-opacity" /></a>
                    <a href=""><img src={im.messanger} alt="" className="w-[24px] h-[24px] opacity-60 hover:opacity-100 transition-opacity" /></a>
                    <a href=""><img src={im.facebook} alt="" className="w-[24px] h-[24px] opacity-60 hover:opacity-100 transition-opacity" /></a>
                    <a href=""><img src={im.twitter} alt="" className="w-[24px] h-[24px] opacity-60 hover:opacity-100 transition-opacity" /></a>
                    <a href=""><img src={im.youtube} alt="" className="w-[24px] h-[24px] opacity-60 hover:opacity-100 transition-opacity" /></a>
                  </div>
                </div>
                <p className="text-[14px] text-white/60 leading-relaxed font-normal">Createx Construction Bureau has been successfully operating in the USA construction market since 2000. We are proud to offer you quality construction and exemplary service. Our mission is to set the highest standards for construction sphere.</p>
              </div>
              <div className="w-full lg:w-[495px] flex flex-col gap-[16px] sm:gap-[24px]">
                <h5 className="text-[20px] sm:text-[24px] font-bold text-white leading-snug">Let’s stay in touch</h5>
                <div className="w-full flex items-center">
                  <input type="text" value={subEmail} onChange={(e) => setSubEmail(e.target.value)} placeholder="Your email address" className="flex-1 min-w-0 h-[44px] bg-white/12 border border-white/20 rounded-l-xs text-[14px] text-white placeholder:text-white/60 outline-none focus:border-[#FF5A30] indent-[16px]" />
                  <button onClick={handleSubscribe} className="w-[115px] sm:w-[131px] shrink-0 h-[44px] bg-[#FF5A30] text-white text-[13px] sm:text-[14px] font-bold uppercase tracking-wider rounded-r-xs hover:bg-[#e04e28] transition-colors cursor-pointer">subscribe</button>
                </div>
                <p className="text-[12px] text-white/60 leading-relaxed font-normal">*Subscribe to our newsletter to receive communications and early updates from Createx Construction Bureau.</p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-[40px] md:gap-[60px]">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-start gap-[32px] lg:gap-[80px] xl:gap-[125px]">
                <div className="flex flex-col gap-[12px]">
                  <h6 className="text-[16px] font-bold uppercase tracking-wider text-white">HEAD OFFICE</h6>
                  <div className="flex flex-col gap-[4px] text-[15px] sm:text-[16px] text-white/60">
                    <p><span className="text-white">Address:</span> 8502 Preston Rd. Inglewood, New York</p>
                    <p><span className="text-white">Call:</span> (405) 555-0128</p>
                    <p><span className="text-white">Email:</span> hello@createx.com</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <h6 className="text-[16px] font-bold uppercase tracking-wider text-white">WHO WE ARE</h6>
                  <div className="flex flex-col gap-[4px] text-[15px] sm:text-[16px] text-white/60">
                    <a href="" className="hover:text-white transition-colors">About Us</a>
                    <a href="" className="hover:text-white transition-colors">Available Positions</a>
                    <a href="" className="hover:text-white transition-colors">Contacts</a>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <h6 className="text-[16px] font-bold uppercase tracking-wider text-white">OUR EXPERIENCE</h6>
                  <div className="flex flex-col gap-[4px] text-[15px] sm:text-[16px] text-white/60">
                    <a href="" className="hover:text-white transition-colors">Services</a>
                    <a href="" className="hover:text-white transition-colors">Work</a>
                    <a href="" className="hover:text-white transition-colors">News</a>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-[20px]">
                <p className="text-[12px] text-white flex items-center gap-[4px] text-center sm:text-left">© All rights reserved. Made with <span className="text-[#FF5A30] text-[16px]">♡</span> by Createx Studio</p>
                <div className="flex items-end gap-[16px]">
                  <p className="text-[14px] text-white uppercase tracking-wider">GO TO TOP</p>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-[40px] h-[40px] bg-[#FF5A30] text-white rounded-xs flex items-center justify-center hover:bg-[#e04e28] transition-colors cursor-pointer text-[18px]">↑</button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px]"></div>
        </section>
      </footer>
    </>
  )
}

export default Footer