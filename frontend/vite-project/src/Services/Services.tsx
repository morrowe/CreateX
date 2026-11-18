import { useEffect, useState } from 'react';
import axios from "axios"
import './Services.module.scss'
// import {im} from '../assets/im.ts'
import { NavLink } from 'react-router-dom';

interface ServicesItem {
  id: number;
  image_url: string;
  title: string;
  description: string;
}

function Services() {
    const [services, setServices] = useState<ServicesItem[]>([]); 
    useEffect(() => {
        axios.get<ServicesItem[]>("http://localhost:3000/api/services")
        .then(res => setServices(res.data))
        .catch(err => console.error(err));
    }, []);

  return (
    <>
        <main className="w-full flex flex-col font-ubuntu bg-white dark:bg-[#12141A] transition-colors duration-300">
            <section className="w-full min-h-[380px] sm:min-h-[460px] lg:h-[540px] flex justify-center items-center bg-[#F4F5F7] bg-[100%] bg-no-repeat bg-cover lg:bg-contain bg-[url('../src/assets/bg1.png')] transition-colors duration-300">
                <div className="w-[92%] max-w-[1230px] flex flex-col justify-center gap-[24px] md:gap-[40px]">
                    <div className="flex items-center gap-[8px] text-[14px] text-[#424551] dark:text-[#D1D3D8]">
                        <span>Homepage</span>
                        <span className="text-[#9A9CA5] dark:text-[#787A80]">/</span>
                        <span className="text-[#9A9CA5] dark:text-[#787A80]">Services</span>
                    </div>
                    <div className="w-full lg:w-[600px] flex flex-col gap-[16px] md:gap-[24px]">
                        <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-black text-[#1E212C] uppercase tracking-wide leading-none">SERVICES</h1>
                        <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal text-[#787A80] dark:text-[#A0A3AB] leading-relaxed">If you are looking for a full-service construction company, look to Createx Construction Bureau. We are doing our best to be a partner for all of your construction needs.</p>
                    </div>
                </div>
            </section>
            <section className="w-full flex justify-center bg-white dark:bg-[#12141A] transition-colors duration-300">
                <div className="w-[92%] max-w-[1230px] flex flex-col gap-[48px] md:gap-[80px] lg:gap-[120px]">
                    <div className="w-full h-[1px]"></div>
                    {services.map((item, index) => (
                        <div key={item.id} className={`w-full flex flex-col lg:flex-row items-center justify-between gap-[24px] md:gap-[40px] lg:gap-[80px] ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="w-full lg:w-[575px] h-[260px] sm:h-[340px] lg:h-[420px]">
                                <img src={item.image_url} alt={item.title || ''} className="w-full h-full object-cover rounded-sm shadow-sm dark:shadow-black/40" />
                            </div>
                            <div className="w-full lg:w-[575px] flex flex-col gap-[16px] md:gap-[24px]">
                                <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-extrabold text-[#1E212C] dark:text-white leading-tight">{item.title}</h2>
                                <p className="text-[#787A80] dark:text-[#A0A3AB] text-[15px] sm:text-[16px] leading-relaxed font-normal">{item.description}</p>
                                <NavLink to="/service" className="w-full sm:w-[160px] h-[44px] flex items-center justify-center border border-[#FF5A30] text-[#FF5A30] font-bold text-[14px] tracking-wider rounded-sm uppercase hover:bg-[#FF5A30] hover:text-white transition-colors duration-200 cursor-pointer">Learn more</NavLink>
                            </div>
                        </div>
                    ))}
                    <div className="w-full h-[1px]"></div>
                </div>
            </section>
        </main>
    </>
  )
}

export default Services