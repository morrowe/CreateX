import './Project.module.scss'
import {im} from '../assets/im.ts'

function Project() {

  return (
    <>
      <main>
        <section>
          <div>
            <p>Homepage / Work <span>/ Modern Cottage</span></p>
            <h1>Modern Cottage</h1>
            <div>
              
            </div>
          </div>
          <div>
            <div>
              <h2>Project goal</h2>
              <p>Build a private house 840 sq. feet with a large living room, three bedrooms, two bathrooms, a terrace, a pool and a garage for two cars.</p>
              <p>Modern design and care for each family member to feel as comfortable as possible in the new home.</p>
            </div>
            <div>
              <div>
                <p>LOCATION</p>
                <p>CLIENT</p>
                <p>ARCHITECT</p>
                <p>SIZE</p>
                <p>VALUE</p>
                <p>COMPLETED</p>
              </div>
              <div>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div>
            <img src="" alt="" />
            <div>
              <h2>Constructive decisions</h2>
              <div>
                <div>
                  <img src={im.check} alt="" />
                  <p>Vitae ultrices ornare eu sed in est quisque duis id.</p>
                </div>
                <div>
                  <img src={im.check} alt="" />
                  <p>A fermentum in morbi pretium aliquam adipiscing donec tempus.</p>
                </div>
                <div>
                  <img src={im.check} alt="" />
                  <p>Mauris odio pellentesque commodo, diam.</p>
                </div>
                <div>
                  <img src={im.check} alt="" />
                  <p>Fermentum vestibulum est fermentum, egestas gravida scelerisque quis.</p>
                </div>
                <div>
                  <img src={im.check} alt="" />
                  <p>At pharetra libero blandit risus, fringilla sed commodo diam.</p>
                </div>
                <div>
                  <img src={im.check} alt="" />
                  <p>Integer ultricies viverra ut enim viverra ut.</p>
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
