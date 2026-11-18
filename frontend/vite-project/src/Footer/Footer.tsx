import './Footer.module.scss'
import {im} from '../assets/im.ts'

function Footer() {

  return (
    <>
      <footer className="w-full flex flex-col font-ubuntu">
        <section className="w-full h-[826px] flex items-center justify-center bg-cover bg-center bg-[url('../src/assets/bgfooter.png')]">
          <div className="max-w-[1230px] w-full flex justify-end">
            <div className="w-[495px] h-[666px] bg-white rounded-xs shadow-[0_60px_80px_-20px_rgba(30,33,44,0.16)] flex items-center justify-center">
              <div className="w-[415px] flex flex-col gap-[24px]">
                <h3 className="text-[28px] font-bold text-[#1E212C] text-center leading-snug">A quick way to discuss details</h3>
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[14px] text-[#424551] font-normal">Name*</p>
                    <input type="text" placeholder="Your name" className="w-full h-[44px] bg-[#F4F5F7] border border-[#D7D9DF] rounded-xs text-[14px] text-[#1E212C] placeholder:text-[#9A9CA5] outline-none focus:border-[#FF5A30] indent-[16px]" />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[14px] text-[#424551] font-normal">Phone*</p>
                    <input type="text" placeholder="Your phone number" className="w-full h-[44px] bg-[#F4F5F7] border border-[#D7D9DF] rounded-xs text-[14px] text-[#1E212C] placeholder:text-[#9A9CA5] outline-none focus:border-[#FF5A30] indent-[16px]" />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[14px] text-[#424551] font-normal">Email</p>
                    <input type="text" placeholder="Your working email" className="w-full h-[44px] bg-[#F4F5F7] border border-[#D7D9DF] rounded-xs text-[14px] text-[#1E212C] placeholder:text-[#9A9CA5] outline-none focus:border-[#FF5A30] indent-[16px]" />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[14px] text-[#424551] font-normal">Message*</p>
                    <input type="text" placeholder="Your message" className="w-full h-[66px] bg-[#F4F5F7] border border-[#D7D9DF] rounded-xs text-[14px] text-[#1E212C] placeholder:text-[#9A9CA5] outline-none focus:border-[#FF5A30] indent-[16px]" />
                  </div>
                  <div className="flex items-start gap-[12px]">
                    <input type="checkbox" className="w-[16px] h-[16px] accent-[#FF5A30] cursor-pointer" />
                    <p className="text-[14px] text-[#424551] leading-snug">I agree to receive communications from Createx Construction Bureau.</p>
                  </div>
                </div>
                <button className="w-[174px] h-[44px] self-center bg-[#FF5A30] text-white text-[14px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">send request</button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-[566px] flex items-center justify-center bg-[#1E212C] text-white">
          <div className="max-w-[1230px] w-full flex flex-col gap-[48px]">
            <div className="w-full flex items-start justify-between">
              <div className="w-[495px] flex flex-col gap-[24px]">
                <div className="flex items-center gap-[60px]">
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
              <div className="w-[495px] flex flex-col gap-[24px]">
                <h5 className="text-[24px] font-bold text-white leading-snug">Let’s stay in touch</h5>
                <div className="w-full flex items-center">
                  <input type="text" placeholder="Your email address " className="w-[364px] h-[44px] bg-white/12 border border-white/20 rounded-l-xs text-[14px] text-white placeholder:text-white/60 outline-none focus:border-[#FF5A30] indent-[16px]" />
                  <button className="w-[131px] h-[44px] bg-[#FF5A30] text-white text-[14px] font-bold uppercase tracking-wider rounded-r-xs hover:bg-[#e04e28] transition-colors cursor-pointer">subscribe</button>
                </div>
                <p className="text-[12px] text-white/60 leading-relaxed font-normal">*Subscribe to our newsletter to receive communications and early updates from Createx Construction Bureau.</p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-[60px]">
              <div className="w-full flex items-start gap-[125px]">
                <div className="flex flex-col gap-[12px]">
                  <h6 className="text-[16px] font-bold uppercase tracking-wider text-white">HEAD OFFICE</h6>
                  <div className="flex flex-col gap-[4px] text-[16px] text-white/60">
                    <p><span className="text-white">Address:</span> 8502 Preston Rd. Inglewood, New York</p>
                    <p><span className="text-white">Call:</span> (405) 555-0128</p>
                    <p><span className="text-white">Email:</span> hello@createx.com</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <h6 className="text-[16px] font-bold uppercase tracking-wider text-white">WHO WE ARE</h6>
                  <div className="flex flex-col gap-[4px] text-[16px] text-white/60">
                    <a href="" className="hover:text-white transition-colors">About Us</a>
                    <a href="" className="hover:text-white transition-colors">Available Positions</a>
                    <a href="" className="hover:text-white transition-colors">Contacts</a>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <h6 className="text-[16px] font-bold uppercase tracking-wider text-white">OUR EXPERIENCE</h6>
                  <div className="flex flex-col gap-[4px] text-[16px] text-white/60">
                    <a href="" className="hover:text-white transition-colors">Services</a>
                    <a href="" className="hover:text-white transition-colors">Work</a>
                    <a href="" className="hover:text-white transition-colors">News</a>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-[12px] text-white flex items-center gap-[4px]">© All rights reserved. Made with <span className="text-[#FF5A30] text-[16px]">♡</span> by Createx Studio</p>
                <div className="flex items-end gap-[16px]">
                  <p className="text-[14px] text-white uppercase tracking-wider">GO TO TOP</p>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-[40px] h-[40px] bg-[#FF5A30] text-white rounded-xs flex items-center justify-center hover:bg-[#e04e28] transition-colors cursor-pointer text-[18px]">↑</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>

    </>
  )
}

export default Footer