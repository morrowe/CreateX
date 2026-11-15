import './News.module.scss'


function News() {

  return (
    <>
      <main>
        <section className="w-full h-[540px] flex justify-center bg-[#F4F5F7] bg-right bg-no-repeat bg-contain font-ubuntu bg-[url('../src/assets/bg6.png')]">
          <div className="max-w-[1230px] w-full flex flex-col justify-center gap-[40px]">
            <div className="flex items-center gap-[8px] text-[14px] text-[#424551]">
              <span>Homepage</span>
              <span className="text-[#9A9CA5]">/</span>
              <span className="text-[#9A9CA5]">News</span>
            </div>
            <div className="w-[600px] flex flex-col gap-[24px]">
              <h1 className="text-[72px] font-black text-[#1E212C] uppercase tracking-wide leading-none">NEWS</h1>
              <p className="text-[20px] font-normal text-[#787A80] leading-relaxed">Stay tuned with our news, expert tips and articles.</p>
            </div>
          </div>
        </section>
        <section>
          <h2>Categories</h2>
          <div>
            <button>All News</button>
            <button>Company News</button>
            <button>Innovation</button>
            <button>Industry News</button>
            <button>Expert Tips</button>
            <button>Marketing</button>
          </div>
          <div>

            <div>
              <div></div>
              <div>
                <h3>How to Build Climate Change-Resilient Infrastructure</h3>
                <div>
                  <p>Industry News</p>
                  <p>June 24, 2020</p>
                  <p>4 comments</p>
                </div>
                <p>Ipsum aliquet nisi, hendrerit rhoncus quam tortor, maecenas faucibus. Tincidunt aliquet sit vel, venenatis nulla. Integer bibendum turpis convallis...</p>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}

export default News