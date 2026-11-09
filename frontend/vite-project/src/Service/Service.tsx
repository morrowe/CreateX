import './Service.module.scss'
import {im} from '../assets/im.ts'

function Service() {

  return (
    <>
      <main className=' font-ubuntu'>
        <section className="w-full h-[50vh] flex items-center justify-evenly justify-center">
          <div className="max-w-[1230px] w-full flex items-center justify-between gap-[124px]">
            <div className="w-[495px] h-[378px]">
              <img src={im.offer} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-[600px] flex flex-col gap-[24px]">
              <h2 className="text-[46px] font-bold text-[#1E212C] leading-tight">We offer</h2>
              <div className="flex flex-col gap-[20px]">
                <div className="flex gap-[16px] items-start">
                  <span className="text-[#FF5A30] text-[28px] font-bold leading-none">—</span>
                  <div className="flex flex-col gap-[12px]">
                    <h4 className="text-[24px] font-bold text-[#1E212C] leading-snug">Interior design of apartments</h4>
                    <p className="text-[#787A80] text-[16px] font-normal leading-relaxed">Adipiscing nunc arcu enim elit mattis eu placerat proin. Imperdiet elementum faucibus dignissim purus. Fusce parturient diam magna ullamcorper morbi semper massa ac facilisis.</p>
                  </div>
                </div>
                <div className="flex gap-[16px] items-center">
                  <span className="text-[#FF5A30] text-[28px] font-bold leading-none">+</span>
                  <h4 className="text-[24px] font-bold text-[#1E212C] leading-snug">Interior design of private houses</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-[50vh] flex items-center justify-evenly justify-center">
          <div className="max-w-[1230px] w-full flex flex-col gap-[64px]">
            <h2 className="text-[46px] font-bold text-[#1E212C] leading-tight">That’s how we do it</h2>
            <div className="w-full flex gap-[30px]">
              <div className="w-[285px] flex flex-col gap-[16px]">
                <div className="flex items-center w-full">
                  <span className="text-[46px] font-bold text-[#D7D9DF] leading-none">01</span>
                  <div className="flex-1 h-px border-t border-dashed border-[#B3B7BC] ml-[20px]"></div>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[16px] font-bold text-[#1E212C]">Work Estimate</p>
                  <p className="text-[#787A80] text-[14px] font-normal leading-relaxed">Culpa nostrud commodo ea consequat aliquip reprehenderit.</p>
                </div>
              </div>
              <div className="w-[285px] flex flex-col gap-[16px]">
                <div className="flex items-center w-full">
                  <span className="text-[46px] font-bold text-[#D7D9DF] leading-none">02</span>
                  <div className="flex-1 h-px border-t border-dashed border-[#B3B7BC] ml-[20px]"></div>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[16px] font-bold text-[#1E212C]">Contract</p>
                  <p className="text-[#787A80] text-[14px] font-normal leading-relaxed">Laoreet ultrices curabitur luctus quisque consequat. Leo lorem velit imperdiet auctor et tempor.</p>
                </div>
              </div>
              <div className="w-[285px] flex flex-col gap-[16px]">
                <div className="flex items-center w-full">
                  <span className="text-[46px] font-bold text-[#D7D9DF] leading-none">03</span>
                  <div className="flex-1 h-px border-t border-dashed border-[#B3B7BC] ml-[20px]"></div>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[16px] font-bold text-[#1E212C]">Mobilization</p>
                  <p className="text-[#787A80] text-[14px] font-normal leading-relaxed">Odio massa scelerisque purus arcu sed velit eleifend cursus leo.</p>
                </div>
              </div>
              <div className="w-[285px] flex flex-col gap-[16px]">
                <span className="text-[46px] font-bold text-[#D7D9DF] leading-none">04</span>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[16px] font-bold text-[#1E212C]">Construction Work</p>
                  <p className="text-[#787A80] text-[14px] font-normal leading-relaxed">Adipiscing esse aliqua aliquip qui amet. Aute eiusmod dolore dolore et ad et veniam ad deserunt.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-[56vh] flex items-center justify-center bg-[#1E212C] font-ubuntu text-white">
          <div className="max-w-[1230px] w-full flex flex-col items-center gap-[60px]">
            <div className="flex flex-col items-center gap-[16px] text-center">
              <h2 className="text-[46px] font-bold leading-tight">Our benefits</h2>
              <p className="text-[18px] font-normal text-white/60">Our mission is to set the highest standards for construction sphere.</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="w-[285px] flex flex-col items-center text-center gap-[16px]">
                <img src={im.project1} alt="" className="w-[40px] h-[40px] object-contain" />
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[20px] font-bold text-white">Fixed Terms & Cost</p>
                  <p className="text-[16px] font-normal text-white/60 leading-relaxed">Culpa nostrud commodo ea consequat aliquip reprehenderit. Veniam velit nostrud aliquip sunt.</p>
                </div>
              </div>
              <div className="w-px h-[140px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              <div className="w-[285px] flex flex-col items-center text-center gap-[16px]">
                <img src={im.project2} alt="" className="w-[40px] h-[40px] object-contain" />
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[20px] font-bold text-white">Qualified Workers</p>
                  <p className="text-[16px] font-normal text-white/60 leading-relaxed">Anim reprehenderit sint voluptate exercitation adipisicing laborum adipisicing. Minim empor est ea.</p>
                </div>
              </div>
              <div className="w-px h-[140px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              <div className="w-[285px] flex flex-col items-center text-center gap-[16px]">
                <img src={im.project3} alt="" className="w-[40px] h-[40px] object-contain" />
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[20px] font-bold text-white">Supervision & Control</p>
                  <p className="text-[16px] font-normal text-white/60 leading-relaxed">Sit veniam aute dolore adipisicing nulla sit culpa. Minim mollit voluptate ullamco proident ea ad.</p>
                </div>
              </div>
            </div>
            <button className="w-[242px] h-[52px] bg-[#FF5A30] text-white text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer relative top-15">Discuss a project</button>
          </div>
        </section>
        <section className="w-full h-[90vh] flex items-center justify-evenly bg-white font-ubuntu">
          <div className="max-w-[1230px] w-full flex flex-col gap-[60px]">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-[46px] font-bold text-[#1E212C] leading-tight">Related projects</h2>
              <div className="flex gap-[12px]">
                <button className="w-[48px] h-[48px] flex items-center justify-center rounded-full text-[#424551] hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer text-[18px]">←</button>
                <button className="w-[48px] h-[48px] flex items-center justify-center rounded-full text-[#424551] hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer text-[18px]">→</button>
              </div>
            </div>
            <div className="w-full flex gap-[30px]">
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
              <div className="group w-[390px] h-[440px] bg-white rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] overflow-hidden flex flex-col justify-between">
                <div className="w-full h-[320px] group-hover:h-[240px] transition-all duration-300">
                  <img src={im.image2} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-full h-[120px] group-hover:h-[200px] flex flex-col items-center justify-center text-center gap-[4px] group-hover:gap-[16px] transition-all duration-300 px-[20px]">
                  <div className="flex flex-col items-center gap-[4px]">
                    <p className="text-[20px] font-bold text-[#1E212C]">Modern Double Bedroom</p>
                    <p className="text-[14px] font-normal text-[#787A80]">Apartments & flats</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 h-0 group-hover:h-[44px] w-[160px] border-2 border-[#FF5A30] text-[#FF5A30] text-[14px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#FF5A30] hover:text-white transition-all duration-300 cursor-pointer overflow-hidden">View Project</button>
                </div>
              </div>
              <div className="group w-[390px] h-[440px] bg-white rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] overflow-hidden flex flex-col justify-between">
                <div className="w-full h-[320px] group-hover:h-[240px] transition-all duration-300">
                  <img src={im.image3} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-full h-[120px] group-hover:h-[200px] flex flex-col items-center justify-center text-center gap-[4px] group-hover:gap-[16px] transition-all duration-300 px-[20px]">
                  <div className="flex flex-col items-center gap-[4px]">
                    <p className="text-[20px] font-bold text-[#1E212C]">Scandinavian Style Interior</p>
                    <p className="text-[14px] font-normal text-[#787A80]">Private houses</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 h-0 group-hover:h-[44px] w-[160px] border-2 border-[#FF5A30] text-[#FF5A30] text-[14px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#FF5A30] hover:text-white transition-all duration-300 cursor-pointer overflow-hidden">View Project</button>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center gap-[40px]">
              <h4 className="text-[28px] font-bold text-[#1E212C]">Explore all our works</h4>
              <button className="w-[214px] h-[52px] bg-[#FF5A30] text-white text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">View portfolio</button>
            </div>
          </div>
        </section>
        <section className="w-full h-[110vh] flex items-center justify-evenly bg-[url(../src/assets/bg.png)] bg-cover bg-no-repeat">
          <div className="max-w-[1230px] w-full flex flex-col gap-[60px]">
            <div className="flex flex-col items-center gap-[16px] text-center">
              <h2 className="text-[46px] font-bold text-[#1E212C] leading-tight">Pricing</h2>
              <p className="text-[18px] font-normal text-[#787A80]">We offer you three categories of construction.</p>
            </div>
            <div className="w-full bg-white rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.04)] overflow-hidden flex flex-col">
              <div className="w-full h-[100px] flex items-center bg-white border-b border-[#E5E8ED] px-[24px]">
                <div className="w-[410px] text-[18px] font-bold text-[#1E212C]">Items</div>
                <div className="w-[240px] flex flex-col items-center text-center">
                  <span className="text-[18px] font-bold text-[#1E212C] uppercase tracking-wider">Basic</span>
                  <span className="text-[14px] text-[#787A80] font-normal">$20 per m2</span>
                </div>
                <div className="w-[240px] flex flex-col items-center text-center">
                  <span className="text-[18px] font-bold text-[#1E212C] uppercase tracking-wider">Standard</span>
                  <span className="text-[14px] text-[#787A80] font-normal">$30 per m2</span>
                </div>
                <div className="w-[240px] flex flex-col items-center text-center">
                  <span className="text-[18px] font-bold text-[#1E212C] uppercase tracking-wider">Business</span>
                  <span className="text-[14px] text-[#787A80] font-normal">$40 per m2</span>
                </div>
              </div>
              <div className="w-full h-[58px] flex items-center bg-[#F4F5F7] px-[24px]">
                <div className="w-[410px] text-[16px] font-normal text-[#424551]">Installation plan</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
              </div>
              <div className="w-full h-[58px] flex items-center bg-white px-[24px]">
                <div className="w-[410px] text-[16px] font-normal text-[#424551]">Planning solutions (2-3 options)</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
              </div>
              <div className="w-full h-[58px] flex items-center bg-[#F4F5F7] px-[24px]">
                <div className="w-[410px] text-[16px] font-normal text-[#424551]">Lighting plan</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
              </div>
              <div className="w-full h-[58px] flex items-center bg-white px-[24px]">
                <div className="w-[410px] text-[16px] font-normal text-[#424551]">Flooring plan</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
              </div>
              <div className="w-full h-[58px] flex items-center bg-[#F4F5F7] px-[24px]">
                <div className="w-[410px] text-[16px] font-normal text-[#424551]">Heating floor laying scheme</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
              </div>
              <div className="w-full h-[58px] flex items-center bg-white px-[24px]">
                <div className="w-[410px] text-[16px] font-normal text-[#424551]">Air conditioner zones layout</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
              </div>
              <div className="w-full h-[58px] flex items-center bg-[#F4F5F7] px-[24px]">
                <div className="w-[410px] text-[16px] font-normal text-[#424551]">3D visualization of all rooms</div>
                <div className="w-[240px] text-center text-[#424551] text-[16px] font-normal">simplified</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
              </div>
              <div className="w-full h-[58px] flex items-center bg-white px-[24px]">
                <div className="w-[410px] text-[16px] font-normal text-[#424551]">Visualization of each room (3-4 angles)</div>
                <div className="w-[240px] text-center text-transparent text-[20px]">—</div>
                <div className="w-[240px] text-center text-transparent text-[20px]">—</div>
                <div className="w-[240px] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
              </div>
              <div className="w-full h-[58px] flex items-center bg-[#F4F5F7] px-[24px] border-b border-[#E5E8ED]">
                <div className="w-[410px] text-[16px] font-normal text-[#424551]">Terms</div>
                <div className="w-[240px] text-center text-[#424551] text-[16px] font-normal">10 days</div>
                <div className="w-[240px] text-center text-[#424551] text-[16px] font-normal">20 days</div>
                <div className="w-[240px] text-center text-[#424551] text-[16px] font-normal">30 days</div>
              </div>
              <div className="w-full h-[90px] flex items-center bg-white px-[24px]">
                <div className="w-[410px]"></div>
                <div className="w-[240px] flex justify-center">
                  <button className="w-[144px] h-[44px] border border-[#FF5A30] text-[#FF5A30] text-[12px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer">Send request</button>
                </div>
                <div className="w-[240px] flex justify-center">
                  <button className="w-[144px] h-[44px] border border-[#FF5A30] text-[#FF5A30] text-[12px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer">Send request</button>
                </div>
                <div className="w-[240px] flex justify-center">
                  <button className="w-[144px] h-[44px] bg-[#FF5A30] text-white text-[12px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">Send request</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-[42vh] flex items-center justify-evenly bg-[#F4F5F7] ">
          <div className="max-w-[1230px] w-full flex flex-col items-center gap-[60px]">
            <h2 className="text-[46px] font-bold text-[#1E212C] leading-tight text-center">Supported by 12+ partners</h2>
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

export default Service