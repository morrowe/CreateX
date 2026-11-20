import './Avaible.module.scss'
import {im} from '../assets/im.ts'
import { useEffect, useState } from 'react';

interface VacancyItem {
  id: number;
  title: string;
  employment_type: string;
  description: string | null;
  city: string;
}
interface AdvantageItem {
  id: number;
  section: string;
  title: string;
  description: string;
  icon_url: string;
  sort_order: number;
}


function Avaible() {

  const [vacancies, setVacancies] = useState<VacancyItem[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/vacancies')
      .then((res) => res.json())
      .then((result: VacancyItem[]) => setVacancies(result))
      .catch((err) => console.error(err));
  }, []);

  const [benefits, setBenefits] = useState<AdvantageItem[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/advantages?section=employee_benefit')
      .then((res) => res.json())
      .then((result: AdvantageItem[]) => setBenefits(result))
      .catch((err) => console.error(err));
  }, []);


  return (
    <>
      <main>
        <section className="w-full min-h-[380px] sm:min-h-[460px] lg:h-[540px] flex justify-center items-center bg-[#F4F5F7] bg-[100%] bg-no-repeat bg-cover lg:bg-contain font-ubuntu bg-[url('../src/assets/bg4.png')] transition-colors duration-300">
          <div className="w-[92%] max-w-[1230px] flex flex-col justify-center gap-[24px] md:gap-[40px]">
            <div className="flex items-center gap-[8px] text-[14px] text-[#424551] dark:text-[#D1D3D8]">
              <span>Homepage</span>
                <span className="text-[#9A9CA5] dark:text-[#787A80]">/</span>
              <span className="text-[#9A9CA5] dark:text-[#787A80]">About Us</span>
            </div>
            <div className="w-full lg:w-[600px] flex flex-col gap-[16px] md:gap-[24px]">
              <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-black text-[#1E212C] uppercase tracking-wide leading-none">AVAILABLE <br /> POSITIONS</h1>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal text-[#787A80] dark:text-[#A0A3AB] leading-relaxed">Build your career with Createx Construction Bureau.</p>
            </div>
        </div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col lg:flex-row items-start justify-between gap-[48px] lg:gap-[80px] xl:gap-[135px]">
            <div className="w-full lg:w-[60%] xl:w-[705px] flex flex-col gap-[20px] sm:gap-[24px]">
              {vacancies.map((item) => (
              <div key={item.id} className="group w-full min-h-[124px] bg-white dark:bg-[#1A1D24] border border-[#E5E8ED] dark:border-[#2A2E39] rounded-xs hover:shadow-[0_12px_32px_rgba(30,33,44,0.08)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)] hover:border-transparent transition-all duration-200 flex flex-col items-center justify-center">
                <div className="w-full h-[20px] sm:h-[24px]"></div>
                <div className="w-[90%] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px]">
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex flex-wrap items-center gap-[10px] sm:gap-[12px] text-[14px] text-[#787A80] dark:text-[#A0A3AB]">
                      <div className="flex items-center gap-[8px]">
                        <img src={im.pin} alt="" className="w-[16px] h-[16px] object-contain" />
                        <p>{item.city}</p>
                      </div>
                      <span className="text-[#D7D9DF] dark:text-[#3A3E4A]">|</span>
                      <div className="flex items-center gap-[8px]">
                        <img src={im.clock} alt="" className="w-[16px] h-[16px] object-contain" />
                        <p>{item.employment_type}</p>
                      </div>
                    </div>
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E212C] dark:text-white group-hover:text-[#FF5A30] transition-colors">{item.title}</h3>
                  </div>
                  <button className="w-full sm:w-[152px] h-[44px] shrink-0 border border-[#FF5A30] text-[#FF5A30] text-[14px] font-bold uppercase tracking-wider rounded-sm group-hover:bg-[#FF5A30] group-hover:text-white transition-colors cursor-pointer">Apply now</button>
                </div>
                <div className="w-full h-[20px] sm:h-[24px]"></div>
              </div>
              ))}
            </div>
            <div className="w-full lg:w-[35%] xl:w-[390px] flex flex-col gap-[32px] sm:gap-[48px]">
              <div className="flex flex-col gap-[16px] sm:gap-[24px]">
                <h4 className="text-[24px] sm:text-[28px] font-bold text-[#1E212C] dark:text-white leading-snug">Didn’t find what you were looking for?</h4>
                <p className="text-[16px] sm:text-[18px] font-normal text-[#424551] dark:text-[#A0A3AB] leading-relaxed">Send your CV or subscribe to our newsletter to receive information about new vacancies.</p>
              </div>
              <div className="w-full flex flex-col sm:flex-row items-center gap-[16px] sm:gap-[30px]">
                <button className="w-full sm:w-[180px] h-[52px] border border-[#FF5A30] text-[#FF5A30] text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer">subscribe</button>
                <button className="w-full sm:w-[180px] h-[52px] bg-[#FF5A30] text-white text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">send cv</button>
              </div>
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-[#F4F5F7] dark:bg-[#161920] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[36px] md:gap-[60px]">
            <div className="flex flex-col items-center gap-[16px] text-center">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight">Employee benefits</h2>
              <p className="text-[16px] sm:text-[18px] font-normal text-[#787A80] dark:text-[#A0A3AB]">There’s always room for talent.</p>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px] lg:gap-[40px]">
              {benefits.map((item) => (
                <div key={item.id} className="w-full flex flex-col items-center text-center gap-[16px]">
                  <img src={item.icon_url} alt="" className="w-[48px] h-[48px] object-contain" />
                  <div className="w-[90%] flex flex-col items-center gap-[8px]">
                    <h4 className="text-[20px] font-bold text-[#1E212C] dark:text-white">{item.title}</h4>
                    <p className="text-[16px] font-normal text-[#787A80] dark:text-[#A0A3AB] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>

      </main>
    </>
  )
}

export default Avaible