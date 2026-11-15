import { useState } from 'react'
import './Project.module.scss'
import {im} from '../assets/im.ts'

function Project() {
  const slides = [
    im.cottage1,
    im.cottage2,
    im.cottage3,
    im.cottage4,
    im.cottage5,
    im.cottage6,
  ]

  const [active, setActive] = useState(0)

  const prevSlide = () => {
    setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }
  return (
    <>
      <main>
        <section className="w-full flex flex-col items-center bg-white font-ubuntu">
          <div className="max-w-[1230px] w-full flex flex-col gap-[60px]">
            <div className="w-full flex flex-col gap-[40px]">
              <div className="flex flex-col gap-[24px]">
                <p className="text-[14px] text-[#424551]">Homepage / Work <span className="text-[#9A9CA5]">/ Modern Cottage</span></p>
                <h1 className="text-[64px] font-black text-[#1E212C] leading-none">Modern Cottage</h1>
              </div>
              <div className="w-full flex flex-col gap-[20px]">
                <div className="relative w-full h-[500px] rounded-xs overflow-hidden flex items-center justify-between">
                  <img src={slides[active]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <button onClick={prevSlide} className="relative z-10 w-[48px] h-[48px] flex items-center justify-center rounded-full bg-white/60 hover:bg-white text-[#424551] transition-colors cursor-pointer text-[18px] ml-[32px]">←</button>
                  <button onClick={nextSlide} className="relative z-10 w-[48px] h-[48px] flex items-center justify-center rounded-full bg-white/60 hover:bg-white text-[#424551] transition-colors cursor-pointer text-[18px] mr-[32px]">→</button>
                </div>
                <div className="flex items-center gap-[20px]">
                  {slides.map((slide, index) => (
                    <button key={index} onClick={() => setActive(index)} className={`w-[100px] h-[100px] rounded-xs overflow-hidden cursor-pointer transition-opacity ${active === index ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                      <img src={slide} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full flex items-start justify-between gap-[105px]">
              <div className="w-[600px] flex flex-col gap-[24px]">
                <h2 className="text-[46px] font-extrabold text-[#1E212C] leading-tight">Project goal</h2>
                <div className="flex flex-col gap-[16px] text-[#424551] text-[18px] font-normal leading-relaxed">
                  <p>Build a private house 840 sq. feet with a large living room, three bedrooms, two bathrooms, a terrace, a pool and a garage for two cars.</p>
                  <p>Modern design and care for each family member to feel as comfortable as possible in the new home.</p>
                </div>
              </div>
              <div className="w-[495px] bg-white rounded-xs shadow-[0_8px_24px_rgba(30,33,44,0.08)] flex items-start gap-[32px] p-[40px]">
                <div className="flex flex-col gap-[16px] text-[16px] font-bold text-[#1E212C] uppercase tracking-wider">
                  <p>LOCATION</p>
                  <p>CLIENT</p>
                  <p>ARCHITECT</p>
                  <p>SIZE</p>
                  <p>VALUE</p>
                  <p>COMPLETED</p>
                </div>
                <div className="flex flex-col gap-[16px] text-[16px] font-normal text-[#787A80]">
                  <p>2464 Royal Ln. Mesa, New Jersey</p>
                  <p>Darlene Robertson</p>
                  <p>HIK Architecture</p>
                  <p>840 sq. feet</p>
                  <p>$2 million</p>
                  <p>May 2020</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-[550px] flex justify-center bg-[#F4F5F7] font-ubuntu">
          <div className="max-w-[1230px] w-full flex items-start justify-between gap-[135px]">
            <img src={im.imag} alt="" className="w-[495px] h-[550px] object-cover rounded-xs mt-[80px]" />
            <div className="w-[600px] flex flex-col gap-[32px] mt-[80px]">
              <h2 className="text-[46px] font-extrabold text-[#1E212C] leading-tight">Constructive decisions</h2>
              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center gap-[16px]">
                  <img src={im.check} alt="" className="w-[20px] h-[20px] object-contain" />
                  <p className="text-[#424551] text-[16px] font-normal leading-relaxed">Vitae ultrices ornare eu sed in est quisque duis id.</p>
                </div>
                <div className="flex items-center gap-[16px]">
                  <img src={im.check} alt="" className="w-[20px] h-[20px] object-contain" />
                  <p className="text-[#424551] text-[16px] font-normal leading-relaxed">A fermentum in morbi pretium aliquam adipiscing donec tempus.</p>
                </div>
                <div className="flex items-center gap-[16px]">
                  <img src={im.check} alt="" className="w-[20px] h-[20px] object-contain" />
                  <p className="text-[#424551] text-[16px] font-normal leading-relaxed">Mauris odio pellentesque commodo, diam.</p>
                </div>
                <div className="flex items-center gap-[16px]">
                  <img src={im.check} alt="" className="w-[20px] h-[20px] object-contain" />
                  <p className="text-[#424551] text-[16px] font-normal leading-relaxed">Fermentum vestibulum est fermentum, egestas gravida scelerisque quis.</p>
                </div>
                <div className="flex items-center gap-[16px]">
                  <img src={im.check} alt="" className="w-[20px] h-[20px] object-contain" />
                  <p className="text-[#424551] text-[16px] font-normal leading-relaxed">At pharetra libero blandit risus, fringilla sed commodo diam.</p>
                </div>
                <div className="flex items-center gap-[16px]">
                  <img src={im.check} alt="" className="w-[20px] h-[20px] object-contain" />
                  <p className="text-[#424551] text-[16px] font-normal leading-relaxed">Integer ultricies viverra ut enim viverra ut.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div>
            <div>
              <h2>Similar projects</h2>
              <div>
                <button></button>
                <button></button>
              </div>
            </div>
            <div>

            </div>
            <div>
              <h4>Explore all our works</h4>
              <button>View portfolio</button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Project