import './Post.module.scss'


function Post() {

  return (
    <>
      <main>
        <section>
          <p>Homepage / News / How to Build Climate Change-Resilient Infrastructure</p>
          <h1>How to Build Climate Change-Resilient Infrastructure</h1>
          <div>
            <div>
              <p>Industry News</p>
              <p>June 24, 2020</p>
              <p>4 comments</p>
            </div>
            <div>
              <a href=""></a>
              <a href=""></a>
              <a href=""></a>
            </div>
          </div>
        </section>
        <section>
          <div></div>
          <div>
            <h6>Vulputate vitae pellentesque scelerisque luctus consequat mattis pellentesque dui odio. Interdum aenean sit malesuada ornare sed gravida rhoncus, congue. Purus auctor nullam diam quis est hendrerit ac euismod. </h6>
            <p>At facilisi sapien posuere eget nunc senectus proin nullam. Tortor senectus in et sagittis, vitae diam cras dignissim. Varius adipiscing eget diam nisi. Orci, consectetur vulputate metus ornare pharetra, neque, fermentum. Vel nec rhoncus, non nunc, neque in massa. Feugiat leo nam nisl lacinia amet, odio. Mi varius viverra risus vel.</p>
            <p>Amet, morbi sed pharetra, elit eget mi potenti. Condimentum orci interdum feugiat lectus libero duis. Nisl massa, elementum varius sit. Nunc felis, porttitor aliquam urna, accumsan et sed. Aliquet non sed duis diam vehicula rhoncus. In dictum nullam tincidunt semper pellentesque purus morbi sed. Ut aliquet velit pharetra, nisi nunc, non.</p>
            <div>
              <img src="" alt="" />
              <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo, amet lectus quam viverra mus lobortis fermentum amet, eu. Pulvinar eu sed purus  facilisi. Vitae id turpis tempus ornare turpis quis non. Congue tortor in tot euismod vulputate etiam eros. Vel accumsan at elit neque, ipsum.</h6>
            </div>
            <p>Mauris amet arcu nisl vel dictum tellus. Sed rhoncus, ut sed id ut erat mattis. Vitae mus blandit in neque amet non fringilla blandit:</p>
            <div>
              <div>
                <img src={im.check} alt="" />
                <p>A fermentum in morbi pretium aliquam adipiscing donec tempus.</p>
              </div>
              <div>
                <img src={im.check} alt="" />
                <p>Vulputate placerat amet pulvinar lorem nisl.</p>
              </div>
              <div>
                <img src={im.check} alt="" />
                <p>Consequat feugiat habitant gravida quisque elit bibendum id adipiscing sed.</p>
              </div>
              <div>
                <img src={im.check} alt="" />
                <p>Etiam duis lobortis in fames ultrices commodo nibh.</p>
              </div>
            </div>
            <p>Enim, vel massa odio diam. Blandit massa gravida feugiat elementum id nec sed leo. Nisi in ornare lectus eget. Urna, risus, consectetur volutpat lorem purus. Velit aliquet nibh vitae maecenas. Consectetur neque ut aliquam eros, purus enim dignissim aenean vitae. Ultrices fames augue mattis tortor est justo, pharetra nibh risus. Facilisi at porttitor volutpat natoque proin amet, nulla. Vivamus ut lobortis sagittis curabitur tellus convallis eget netus vitae.</p>
            <div>
              <p>Share:</p>
              <a href=""></a>
              <a href=""></a>
              <a href=""></a>
            </div>
          </div>
        </section>
        <section>
          <h2>4 comments</h2>
          <div>

            <div>
              <div>
                <h5>Devon Lane</h5>
                <p>July 15, 2020</p>
              </div>
              <div>
                <p>Phasellus varius faucibus ultrices odio in. Massa neque dictum natoque ornare rutrum malesuada et phasellus. Viverra natoque nulla cras vel nisl proin senectus. Tortor sed eleifend ante tristique felis sed urna aliquet. Suspendisse fames egestas sed duis purus diam et.</p>
                <div>
                  <img src="" alt="" />
                  <p>Reply</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2>Leave your comment</h2>
          <div>
            <div>
              <p>Name*</p>
              <input type="text" placeholder='Your name'/>
            </div>
            <div>
              <p>Email*</p>
              <input type="text" placeholder='Your working email'/>
            </div>
            <div>
              <p>Your comment*</p>
              <input type="text" placeholder='Type comment here'/>
            </div>
          </div>
          <button>Post comment</button>
        </section>
      </main>
    </>
  )
}

export default Post
