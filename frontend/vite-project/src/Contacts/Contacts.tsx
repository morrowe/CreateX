import './Contacts.module.scss'
import {im} from '../assets/im.ts'

function Contacts() {

  return (
    <>
      <main>
        <section className="w-full h-[540px] flex justify-center bg-[#F4F5F7] bg-right bg-no-repeat bg-contain font-ubuntu bg-[url('../src/assets/bg7.png')]">
          <div className="max-w-[1230px] w-full flex flex-col justify-center gap-[40px]">
            <div className="flex items-center gap-[8px] text-[14px] text-[#424551]">
              <span>Homepage</span>
              <span className="text-[#9A9CA5]">/</span>
              <span className="text-[#9A9CA5]">Contacts</span>
            </div>
            <div className="w-[600px] flex flex-col gap-[24px]">
              <h1 className="text-[72px] font-black text-[#1E212C] uppercase tracking-wide leading-none">CONTACTS</h1>
              <p className="text-[20px] font-normal text-[#787A80] leading-relaxed">Contact us for all your construction needs. We always welcome any questions and comments.</p>
            </div>
          </div>
        </section>
        <section>
          <h2>Contact us</h2>
          <p>Please complete the form. Detailed information will help us to make a tuned offer.</p>
          <div>
            <div></div>
            <div>
              <div>
                <p>Name*</p>
                <input type="text" placeholder='Your name'/>
              </div>
              <div>
                <p>I am interested in</p>
                <input type="text" placeholder='Your name'/>
              </div>
              <div>
                <p>Phone*</p>
                <input type="text" placeholder='Your phone number'/>
              </div>
              <div>
                <p>Location*</p>
                <input type="text" placeholder='Your name'/>
              </div>
              <div>
                <p>Email*</p>
                <input type="text" placeholder='Your working email'/>
              </div>
              <div>
                <p>Preferred contact method</p>
                <div>
                  <p>Phone</p>
                </div>
              </div>
              <div>
                <p>Message*</p>
                <input type="text" placeholder='Your message'/>
              </div>
              <div>
                <div>
                  <input type="chexbox" />
                  <p>I agree to receive communications from Createx Construction Bureau.</p>
                </div>
                <button>send request</button>
              </div>
            </div>
          </div>
        </section> 
        <section>
          <div>
            <h2>Our offices</h2>
            <p>Give us a call, send us a note or visit our office. We can’t wait to hear from you!</p>
            <div>
              <div>
                <h6>New Jersey, USA</h6>
                <p>2464 Royal Ln. Mesa, New Jersey 45463</p>
                <a href="">See on the map</a>
                <p><span>Call:</span>(808) 555-0111</p>
                <p><span>Email:</span>hello@createx.com</p>
                <p><span>Schedule:</span>Mon - Fri 9:00 - 18:00</p>
              </div>
            </div>
          </div>
          <div>
            <h2>Find us at</h2>
            <div>
              <a href=""></a>
              <a href=""></a>
              <a href=""></a>
              <a href=""></a>
              <a href=""></a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Contacts