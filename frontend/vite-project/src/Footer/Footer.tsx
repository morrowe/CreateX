import './Footer.module.scss'
import {im} from '../assets/im.ts'

function Footer() {

  return (
    <>
      <footer>
        <section>
          <div>
            <h3>A quick way to discuss details</h3>
            <div>
              <p>Name*</p>
              <input type="text" placeholder='Your name'/>
            </div>
            <div>
              <p>Phone*</p>
              <input type="text" placeholder='Your phone number'/>
            </div>
            <div>
              <p>Email</p>
              <input type="text" placeholder='Your working email'/>
            </div>
            <div>
              <p>Message*</p>
              <input type="text" placeholder='Your message'/>
            </div>
            <div>
              <input type="checkbox" name="" id="" />
              <p>I agree to receive communications from Createx Construction Bureau.</p>
            </div>
            <button>send request</button>
          </div>
        </section>
        <section>
          <div>
            <div>
              <div>
                <img src="" alt="logo" />
                <div>
                  <a href=""><img src={im.whatsapp} alt="" /></a>
                  <a href=""><img src={im.messanger} alt="" /></a>
                  <a href=""><img src={im.facebook} alt="" /></a>
                  <a href=""><img src={im.twitter} alt="" /></a>
                  <a href=""><img src={im.youtube} alt="" /></a>
                </div>
              </div>
              <p>Createx Construction Bureau has been successfully operating in the USA construction market since 2000. We are proud to offer you quality construction and exemplary service. Our mission is to set the highest standards for construction sphere.</p>
            </div>
            <div>
              <h5>Let’s stay in touch</h5>
              <div>
                <input type="text" placeholder='Your email address '/>
                <button>subscribe</button>
              </div>
              <p>*Subscribe to our newsletter to receive communications and early updates from Createx Construction Bureau.</p>
            </div>
          </div>
          <div>
            
            <div>
              <div>
                <h6>HEAD OFFICE</h6>
                <p><span>Address:</span> 8502 Preston Rd. Inglewood, New York</p>
                <p><span>Call:</span> (405) 555-0128</p>
                <p><span>Email:</span> hello@createx.com</p>
              </div>
              <div>
                <h6>WHO WE ARE</h6>
                <a href="">About Us</a>
                <a href="">Available Positions</a>
                <a href="">Contacts</a>
              </div>
              <div>
                <h6>OUR EXPERIENCE</h6>
                <a href="">Services</a>
                <a href="">Work</a>
                <a href="">News</a>
              </div>
            </div>
            <div>
              <p>© All rights reserved. Made with <span></span> by Createx Studio</p>
              <div>
                <p>GO TO TOP</p>
                <button></button>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  )
}

export default Footer