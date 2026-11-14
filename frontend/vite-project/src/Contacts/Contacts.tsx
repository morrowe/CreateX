import './Contacts.module.scss'


function Contacts() {

  return (
    <>
      <main>
        <section>
          <p>Homepage / Contacts</p>
          <h1>CONTACTS</h1>
          <p>Contact us for all your construction needs. We always welcome any questions and comments.</p>
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
