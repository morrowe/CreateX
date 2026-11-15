import './Portfolio.module.scss'
import {im} from '../assets/im.ts'


function Portfolio() {

  return (
    <>
      <main>
        <section className="w-full h-[540px] flex justify-center bg-[#F4F5F7] bg-right bg-no-repeat bg-contain font-ubuntu bg-[url('../src/assets/bg5.png')]">
          <div className="max-w-[1230px] w-full flex flex-col justify-center gap-[40px]">
            <div className="flex items-center gap-[8px] text-[14px] text-[#424551]">
              <span>Homepage</span>
              <span className="text-[#9A9CA5]">/</span>
              <span className="text-[#9A9CA5]">Work</span>
            </div>
            <div className="w-[600px] flex flex-col gap-[24px]">
              <h1 className="text-[72px] font-black text-[#1E212C] uppercase tracking-wide leading-none">OUR WORK</h1>
              <p className="text-[20px] font-normal text-[#787A80] leading-relaxed">Our portfolio represents 20 years of construction experience backed by a passion for perfect client service, quality and innovations in consctuction industry.</p>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center bg-white font-ubuntu">
          <div className="max-w-[1230px] w-full flex flex-col items-center gap-[60px] -mt-[77px]">
            <div className="w-full flex items-center justify-between gap-[20px]">
              <button className="w-[230px] h-[154px] bg-[#FF5A30] text-white rounded-xs shadow-[0_8px_24px_rgba(255,90,48,0.25)] flex flex-col items-center justify-center gap-[16px] cursor-pointer">
                <img src={im.ic1} alt="" className="w-[48px] h-[48px] object-contain" />
                <p className="text-[16px] font-bold">All Projects</p>
              </button>
              <button className="w-[230px] h-[154px] bg-white text-[#9A9CA5] hover:bg-[#FF5A30] hover:text-white rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] flex flex-col items-center justify-center gap-[16px] transition-colors duration-200 cursor-pointer">
                <img src={im.ic2} alt="" className="w-[48px] h-[48px] object-contain" />
                <p className="text-[16px] font-bold">Construction</p>
              </button>
              <button className="w-[230px] h-[154px] bg-white text-[#9A9CA5] hover:bg-[#FF5A30] hover:text-white rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] flex flex-col items-center justify-center gap-[16px] transition-colors duration-200 cursor-pointer">
                <img src={im.ic3} alt="" className="w-[48px] h-[48px] object-contain" />
                <p className="text-[16px] font-bold">Project Development</p>
              </button>
              <button className="w-[230px] h-[154px] bg-white text-[#9A9CA5] hover:bg-[#FF5A30] hover:text-white rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] flex flex-col items-center justify-center gap-[16px] transition-colors duration-200 cursor-pointer">
                <img src={im.ic4} alt="" className="w-[48px] h-[48px] object-contain" />
                <p className="text-[16px] font-bold">Interior Design</p>
              </button>
              <button className="w-[230px] h-[154px] bg-white text-[#9A9CA5] hover:bg-[#FF5A30] hover:text-white rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] flex flex-col items-center justify-center gap-[16px] transition-colors duration-200 cursor-pointer">
                <img src={im.ic5} alt="" className="w-[48px] h-[48px] object-contain" />
                <p className="text-[16px] font-bold">Repairs</p>
              </button>
            </div>
            <div className="w-full flex flex-wrap gap-[30px]">
              <div className="group w-[390px] h-[440px] bg-white rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] overflow-hidden flex flex-col justify-between">
                <div className="w-full h-[320px] group-hover:h-[240px] transition-all duration-300">
                  <img src={im.image1} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-full h-[120px] group-hover:h-[200px] flex flex-col items-center justify-center text-center gap-[4px] group-hover:gap-[16px] transition-all duration-300 px-[20px]">
                  <div className="flex flex-col items-center gap-[4px]">
                    <p className="text-[20px] font-bold text-[#1E212C]">Kids Bedroom With Decorations</p>
                    <p className="text-[14px] font-normal text-[#787A80]">Apartments & flats</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 h-0 group-hover:h-[44px] w-[160px] border-2 border-[#FF5A30] text-[#FF5A30] text-[14px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#FF5A30] hover:text-white transition-all duration-300 cursor-pointer overflow-hidden">View Project</button>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-[16px] text-[#424551] hover:text-[#FF5A30] text-[16px] font-bold transition-colors cursor-pointer">
              <img src={im.convert} alt="" className="w-[24px] h-[24px] object-contain" />
              <span>Load more</span>
            </button>
          </div>
        </section>
        <section className="w-full h-[550px] flex justify-center bg-[#F4F5F7] font-ubuntu">
          <div className="max-w-[1230px] w-full flex items-start justify-between gap-[135px]">
            <div className="w-[600px] flex flex-col gap-[60px] mt-[80px]">
              <h2 className="text-[46px] font-extrabold text-[#1E212C] leading-tight">What our clients are saying</h2>
              <div className="flex flex-col gap-[24px]">
                <img src={im.profile} alt="" className="w-[72px] h-[72px] rounded-full object-cover" />
                <p className="text-[#424551] text-[16px] font-normal leading-relaxed">Ipsum aute sunt aliquip aute et occaecat. Anim minim do cillum eiusmod enim. Consectetur magna cillum consequat minim laboris cillum laboris voluptate minim proident exercitation ullamco.</p>
                <div className="w-full flex items-center justify-between">
                  <div className="flex flex-col gap-[4px]">
                    <p className="text-[16px] font-bold text-[#1E212C]">Shawn Edwards</p>
                    <p className="text-[14px] font-normal text-[#787A80]">Position, Company name</p>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <button className="w-[48px] h-[48px] flex items-center justify-center rounded-full text-[#424551] hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer text-[18px]">←</button>
                    <button className="w-[48px] h-[48px] flex items-center justify-center rounded-full text-[#424551] hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer text-[18px]">→</button>
                  </div>
                </div>
              </div>
            </div>
            <img src={im.clients} alt="" className="w-[495px] h-[550px] object-cover rounded-xs mt-[80px]" />
          </div>
        </section>
        <section className="w-full h-[42vh] flex items-center justify-evenly bg-[#FFFFFF] ">
          <div className="max-w-[1230px] w-full flex flex-col items-center gap-[60px]">
            <h2 className="text-[46px] font-bold text-[#1E212C] leading-tight text-center">Our clients</h2>
            <div className="w-full flex items-center justify-between gap-[20px]">
              <img src={im.partner1} alt="" className=" " />
              <img src={im.partner2} alt="" className=" " />
              <img src={im.partner3} alt="" className=" " />
              <img src={im.partner4} alt="" className=" " />
              <img src={im.partner5} alt="" className=" " />
              <img src={im.partner6} alt="" className=" " />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Portfolio