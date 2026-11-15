import './Avaible.module.scss'
import {im} from '../assets/im.ts'

const vacancies = [
  { location: 'New York', type: 'Full Time', title: 'Heavy Equipment Operator' },
  { location: 'San Francisco', type: 'Full Time', title: 'Financial Compliance Analyst' },
  { location: 'New Jersey', type: 'Full Time', title: 'Project Manager - Buildings' },
  { location: 'New York', type: 'Part Time', title: 'Environment Specialist' },
  { location: 'New York', type: 'Full Time', title: 'Accountant' },
]

const benefits = [
  {
    icon: im.brain,
    title: 'Training',
    text: 'Culpa nostrud commodo ea consequat aliquip reprehenderit. Veniam velit nostrud aliquip sunt.',
  },
  {
    icon: im.success,
    title: 'Professional Growth',
    text: 'Anim reprehenderit sint voluptate exercitation adipisicing laborum adipisicing. Minim empor est ea.',
  },
  {
    icon: im.budget,
    title: 'Growing Salary',
    text: 'Sit veniam aute dolore adipisicing nulla sit culpa. Minim mollit voluptate ullamco proident ea ad.',
  },
]

function Avaible() {

  return (
    <>
      <main>
        <section className="w-full h-[540px] flex justify-center bg-[#F4F5F7] bg-right bg-no-repeat bg-contain font-ubuntu bg-[url('../src/assets/bg4.png')]">
          <div className="max-w-[1230px] w-full flex flex-col justify-center gap-[40px]">
            <div className="flex items-center gap-[8px] text-[14px] text-[#424551]">
              <span>Homepage</span>
              <span className="text-[#9A9CA5]">/</span>
              <span className="text-[#9A9CA5]">About Us</span>
            </div>
            <div className="w-[600px] flex flex-col gap-[24px]">
              <h1 className="text-[72px] font-black text-[#1E212C] uppercase tracking-wide leading-none">AVAILABLE <br /> POSITIONS</h1>
              <p className="text-[20px] font-normal text-[#787A80] leading-relaxed">Build your career with Createx Construction Bureau.</p>
            </div>
          </div>
        </section>
        <section className="w-full h-[900px] flex items-center justify-center bg-white font-ubuntu">
          <div className="max-w-[1230px] w-full flex items-start justify-between gap-[135px]">
            <div className="w-[705px] flex flex-col gap-[24px]">
              {vacancies.map((item, index) => (
                <div key={index} className="group w-full h-[124px] bg-white border border-[#E5E8ED] rounded-xs hover:shadow-[0_12px_32px_rgba(30,33,44,0.08)] hover:border-transparent transition-all duration-200 flex items-center justify-center">
                  <div className="w-[625px] flex items-center justify-between">
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex items-center gap-[12px] text-[14px] text-[#787A80]">
                        <div className="flex items-center gap-[8px]">
                          <img src={im.pin} alt="" className="w-[16px] h-[16px] object-contain" />
                          <p>{item.location}</p>
                        </div>
                        <span className="text-[#D7D9DF]">|</span>
                        <div className="flex items-center gap-[8px]">
                          <img src={im.clock} alt="" className="w-[16px] h-[16px] object-contain" />
                          <p>{item.type}</p>
                        </div>
                      </div>
                      <h3 className="text-[20px] font-bold text-[#1E212C] group-hover:text-[#FF5A30] transition-colors">{item.title}</h3>
                    </div>
                    <button className="w-[152px] h-[44px] border border-[#FF5A30] text-[#FF5A30] text-[14px] font-bold uppercase tracking-wider rounded-sm group-hover:bg-[#FF5A30] group-hover:text-white transition-colors cursor-pointer">Apply now</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-[390px] flex flex-col gap-[48px]">
              <div className="flex flex-col gap-[24px]">
                <h4 className="text-[28px] font-bold text-[#1E212C] leading-snug">Didn’t find what you were looking for?</h4>
                <p className="text-[18px] font-normal text-[#424551] leading-relaxed">Send your CV or subscribe to our newsletter to receive information about new vacancies.</p>
              </div>
              <div className="flex items-center gap-[30px]">
                <button className="w-[180px] h-[52px] border border-[#FF5A30] text-[#FF5A30] text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer">subscribe</button>
                <button className="w-[180px] h-[52px] bg-[#FF5A30] text-white text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">send cv</button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-[500px] flex items-center justify-center bg-white font-ubuntu">
          <div className="max-w-[1230px] w-full flex flex-col items-center gap-[60px]">
            <div className="flex flex-col items-center gap-[16px] text-center">
              <h2 className="text-[46px] font-extrabold text-[#1E212C] leading-tight">Employee benefits</h2>
              <p className="text-[18px] font-normal text-[#787A80]">There’s always room for talent.</p>
            </div>
            <div className="w-full flex items-center justify-between">
              {benefits.map((item, index) => (
                <div key={index} className="w-[285px] flex flex-col items-center text-center gap-[16px]">
                  <img src={item.icon} alt="" className="w-[48px] h-[48px] object-contain" />
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="text-[20px] font-bold text-[#1E212C]">{item.title}</h4>
                    <p className="text-[16px] font-normal text-[#787A80] leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Avaible