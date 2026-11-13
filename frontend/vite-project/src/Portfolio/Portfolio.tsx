import './Portfolio.module.scss'
import {im} from '../assets/im.ts'


function Portfolio() {

  return (
    <>
      <main>
        <section></section>
        <section>
          <div>
            <button><img src={im.ic1} alt="" /> <p>All Projects</p></button>
            <button><img src={im.ic2} alt="" /> <p>Construction</p></button>
            <button><img src={im.ic3} alt="" /> <p>Project Development</p></button>
            <button><img src={im.ic4} alt="" /> <p>Interior Design</p></button>
            <button><img src={im.ic5} alt="" /> <p>Repairs</p></button>
          </div>
          <div>

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
          <button><img src={im.convert} alt="" /> Load more</button>
        </section>
        <section>
          <div>
              <div>
                <h2>What our clients are saying</h2>
                <div>

                </div>
              </div>
              <img src="" alt="" />
          </div>
        </section>
        <section className="w-full h-[42vh] flex items-center justify-evenly bg-[#F4F5F7] ">
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