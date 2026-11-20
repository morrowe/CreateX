import { Fragment, useEffect, useState } from 'react';
import './Contacts.module.scss'
import {im} from '../assets/im.ts'

interface OfficeItem {
  id: number;
  city: string;
  address: string;
  phone: string;
  email: string;
  schedule: string;
  is_head: boolean;
}
interface ServiceOption {
  id: number;
  title: string;
}
interface OfficeOption {
  id: number;
  city: string;
}


function Contacts() {
  const [offices, setOffices] = useState<OfficeItem[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/offices')
      .then((res) => res.json())
      .then((result: OfficeItem[]) => setOffices(result))
      .catch((err) => console.error(err));
  }, []);

  const [servicesList, setServicesList] = useState<ServiceOption[]>([]);
  const [officesList, setOfficesList] = useState<OfficeOption[]>([]);
  const [name, setName] = useState('');
  const [serviceId, setServiceId] = useState<string>('');
  const [phone, setPhone] = useState('');
  const [officeId, setOfficeId] = useState<string>('');
  const [email, setEmail] = useState('');
  const [contactMethod, setContactMethod] = useState<'phone' | 'email' | 'viber'>('phone');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(true);
  useEffect(() => {
    fetch('http://localhost:3000/api/services')
      .then((res) => res.json())
      .then((result: ServiceOption[]) => setServicesList(result))
      .catch((err) => console.error(err));
    fetch('http://localhost:3000/api/offices')
      .then((res) => res.json())
      .then((result: OfficeOption[]) => setOfficesList(result))
      .catch((err) => console.error(err));
  }, []);
  const handleRequestSubmit = async () => {
    if (!name.trim() || !phone.trim() || !message.trim() || !agreed) return;
    const res = await fetch('http://localhost:3000/api/register-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId ? Number(serviceId) : null,
        office_id: officeId ? Number(officeId) : null,
        name,
        phone,
        email: email || null,
        message,
        contact_method: contactMethod,
      }),
    });
    if (res.ok) {
      setName('');
      setServiceId('');
      setPhone('');
      setOfficeId('');
      setEmail('');
      setContactMethod('phone');
      setMessage('');
    }
  };

  return (
    <>
      <main>
        <section className="w-full min-h-[380px] sm:min-h-[460px] lg:h-[540px] flex justify-center items-center bg-[#F4F5F7] bg-[100%] bg-no-repeat bg-cover lg:bg-contain font-ubuntu bg-[url('../src/assets/bg7.png')] transition-colors duration-300">
          <div className="w-[92%] max-w-[1230px] flex flex-col justify-center gap-[24px] md:gap-[40px]">
            <div className="flex items-center gap-[8px] text-[14px] text-[#424551] dark:text-[#D1D3D8]">
                <span>Homepage</span>
                <span className="text-[#9A9CA5] dark:text-[#787A80]">/</span>
                <span className="text-[#9A9CA5] dark:text-[#787A80]">Contacts</span>
            </div>
            <div className="w-full lg:w-[600px] flex flex-col gap-[16px] md:gap-[24px]">
                <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-black text-[#1E212C] uppercase tracking-wide leading-none">CONTACTS</h1>
                <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal text-[#787A80] dark:text-[#A0A3AB] leading-relaxed">Contact us for all your construction needs. We always welcome any questions and comments.</p>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[36px] md:gap-[60px]">
            <div className="flex flex-col items-center gap-[16px] md:gap-[24px] text-center">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight">Contact us</h2>
              <p className="text-[16px] sm:text-[18px] font-normal text-[#787A80] dark:text-[#A0A3AB]">Please complete the form. Detailed information will help us to make a tuned offer.</p>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-[36px] lg:gap-[60px]">
              <div className="w-full lg:w-[42%] xl:w-[495px] h-[320px] sm:h-[450px] lg:h-[586px] rounded-xs overflow-hidden bg-[#F4F5F7] dark:bg-[#1A1D24]">
                  <img src={im.contact} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="w-full lg:w-[54%] xl:w-[600px] flex flex-col gap-[24px]">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-[30px] gap-y-[24px]">
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">Name*</p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full h-[52px] bg-[#F4F5F7] dark:bg-[#1A1D24] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[16px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">I am interested in</p>
                    <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} className="w-full h-[52px] bg-[#F4F5F7] dark:bg-[#1A1D24] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[16px] text-[#1E212C] dark:text-white outline-none focus:border-[#FF5A30] indent-[12px] transition-colors">
                      <option value="">Interior Design</option>
                      {servicesList.map((srv) => (
                        <option key={srv.id} value={srv.id}>{srv.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">Phone*</p>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" className="w-full h-[52px] bg-[#F4F5F7] dark:bg-[#1A1D24] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[16px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">Location*</p>
                    <select value={officeId} onChange={(e) => setOfficeId(e.target.value)} className="w-full h-[52px] bg-[#F4F5F7] dark:bg-[#1A1D24] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[16px] text-[#1E212C] dark:text-white outline-none focus:border-[#FF5A30] indent-[12px] transition-colors">
                      <option value="">New York</option>
                      {officesList.map((off) => (
                        <option key={off.id} value={off.id}>{off.city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">Email*</p>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your working email" className="w-full h-[52px] bg-[#F4F5F7] dark:bg-[#1A1D24] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[16px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">Preferred contact method</p>
                    <div className="min-h-[52px] flex flex-wrap items-center gap-[20px] sm:gap-[24px]">
                      <label onClick={() => setContactMethod('phone')} className="flex items-center gap-[12px] cursor-pointer">
                        <span className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center ${contactMethod === 'phone' ? 'border-[#FF5A30]' : 'border-[#B3B7BC] dark:border-[#5E626E]'}`}>{contactMethod === 'phone' && <span className="w-[8px] h-[8px] rounded-full bg-[#FF5A30]"></span>}</span>
                        <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">Phone</p>
                      </label>
                      <label onClick={() => setContactMethod('email')} className="flex items-center gap-[12px] cursor-pointer">
                        <span className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center ${contactMethod === 'email' ? 'border-[#FF5A30]' : 'border-[#B3B7BC] dark:border-[#5E626E]'}`}>{contactMethod === 'email' && <span className="w-[8px] h-[8px] rounded-full bg-[#FF5A30]"></span>}</span>
                        <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">Email</p>
                      </label>
                      <label onClick={() => setContactMethod('viber')} className="flex items-center gap-[12px] cursor-pointer">
                        <span className={`w-[16px] h-[16px] rounded-full border flex items-center justify-center ${contactMethod === 'viber' ? 'border-[#FF5A30]' : 'border-[#B3B7BC] dark:border-[#5E626E]'}`}>{contactMethod === 'viber' && <span className="w-[8px] h-[8px] rounded-full bg-[#FF5A30]"></span>}</span>
                        <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">Viber</p>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-[8px]">
                  <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">Message*</p>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" className="w-full h-[128px] bg-[#F4F5F7] dark:bg-[#1A1D24] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[16px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] leading-[44px] resize-none transition-colors"></textarea>
                </div>
                <div className="w-full flex flex-col gap-[16px]">
                  <div className="w-full h-[1px]"></div>
                  <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[20px]">
                    <div className="flex items-start gap-[12px] max-w-[315px]">
                      <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-[16px] h-[16px] shrink-0 relative top-[4px] accent-[#FF5A30] cursor-pointer" />
                      <p className="text-[14px] text-[#424551] dark:text-[#D1D3D8] font-normal leading-relaxed">I agree to receive communications from Createx Construction Bureau.</p>
                    </div>
                    <button onClick={handleRequestSubmit} className="w-full sm:w-[210px] h-[52px] bg-[#FF5A30] text-white text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">send request</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-[#F4F5F7] dark:bg-[#161920] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[48px] md:gap-[80px]">
            <div className="w-full flex flex-col items-center gap-[36px] md:gap-[60px]">
              <div className="flex flex-col items-center gap-[16px] md:gap-[24px] text-center">
                <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight">Our offices</h2>
                <p className="text-[16px] sm:text-[18px] font-normal text-[#787A80] dark:text-[#A0A3AB]">Give us a call, send us a note or visit our office. We can’t wait to hear from you!</p>
              </div>
              <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-[32px]">
                {offices.map((office, index) => (
                  <Fragment key={office.id}>
                    <div className="w-full lg:w-[300px] flex flex-col items-start gap-[20px] sm:gap-[24px]">
                      <h6 className="text-[24px] sm:text-[28px] font-bold text-[#1E212C] dark:text-white leading-snug">{office.city}, USA</h6>
                      <div className="flex flex-col items-start gap-[4px]">
                        <p className="text-[16px] font-normal text-[#1E212C] dark:text-[#D1D3D8] leading-relaxed">{office.address}</p>
                        <a href={`https://google.com{encodeURIComponent(office.address)}`} target="_blank" rel="noreferrer" className="text-[16px] font-normal text-[#FF5A30] underline hover:text-[#e04e28] transition-colors">See on the map</a>
                      </div>
                      <div className="flex flex-col items-start gap-[4px]">
                        <p className="text-[16px] font-normal text-[#1E212C] dark:text-[#D1D3D8] leading-relaxed"><span className="text-[#787A80] dark:text-[#A0A3AB]">Call: </span>{office.phone}</p>
                        <p className="text-[16px] font-normal text-[#1E212C] dark:text-[#D1D3D8] leading-relaxed"><span className="text-[#787A80] dark:text-[#A0A3AB]">Email: </span>{office.email}</p>
                        <p className="text-[16px] font-normal text-[#1E212C] dark:text-[#D1D3D8] leading-relaxed"><span className="text-[#787A80] dark:text-[#A0A3AB]">Schedule: </span>{office.schedule}</p>
                      </div>
                    </div>
                    {index < offices.length - 1 && (
                      <div className="w-full h-px lg:w-px lg:h-[250px] bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-[#D7D9DF] dark:via-[#2A2E39] to-transparent"></div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-[24px] md:gap-[40px]">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight text-center">Find us at</h2>
              <div className="flex items-center gap-[24px]">
                <a href="" className="w-[32px] h-[32px] flex items-center justify-center brightness-50"><img src={im.youtube} alt="" /></a>
                <a href="" className="w-[32px] h-[32px] flex items-center justify-center brightness-50"><img src={im.whatsapp} alt="" /></a>
                <a href="" className="w-[32px] h-[32px] flex items-center justify-center brightness-50"><img src={im.messanger} alt="" /></a>
                <a href="" className="w-[32px] h-[32px] flex items-center justify-center brightness-50"><img src={im.facebook} alt="" /></a>
                <a href="" className="w-[32px] h-[32px] flex items-center justify-center brightness-50"><img src={im.twitter} alt="" /></a>
              </div>
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px]"></div>
        </section>
      </main>
    </>
  )
}

export default Contacts