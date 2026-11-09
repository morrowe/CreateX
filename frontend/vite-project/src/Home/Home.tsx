import './Home.module.scss'
import { im } from '../assets/im.ts'

function Home() {

  return (
    <>
      <main>
        <section className="relative w-full h-[100vh] min-h-[600px] flex items-center bg-cover bg-center font-ubuntu text-white bg-[url(../src/assets/herobg.png)]">
          <button className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-between justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer backdrop-blur-xs">←</button>
          <button className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-between justify-center rounded-full bg-white text-[#424551] hover:bg-gray-100 transition-all cursor-pointer shadow-md">→</button>
          <div className="w-full max-w-[1230px] mx-auto px-10 flex flex-col gap-6">
            <div className="flex flex-col gap-2 max-w-[600px]">
              <h1 className="text-6xl font-black tracking-wide uppercase leading-tight">Create<span className="text-[#FF5A30]">x</span><span className="block mt-1 text-white">Construction</span></h1>
              <p className="text-gray-300 text-lg font-normal leading-relaxed mt-4">Cras ultrices leo vitae non viverra. Fringilla nisi quisque consequat, dignissim vitae proin ipsum sed. Pellentesque nec turpis purus eget pellentesque integer ipsum elementum felis.</p>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <button className="px-10 py-4 border border-white text-white font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-white hover:text-[#1E212C] transition-colors duration-200 cursor-pointer">Learn more about us</button>
              <button className="px-10 py-4 bg-[#FF5A30] text-white font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-[#e04e28] transition-colors duration-200 cursor-pointer">Submit request</button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full border-t border-white/20">
            <div className="max-w-[1230px] mx-auto px-10 grid grid-cols-4 font-bold text-xl text-white/40">
              <div className="py-6 border-t-2 border-white text-white cursor-pointer transition-all">
                <span className="text-2xl mr-2">01</span>
              </div>
              <div className="py-6 border-t-2 border-transparent hover:text-white/80 cursor-pointer transition-all">
                <span className="text-2xl mr-2">02</span>
              </div>
              <div className="py-6 border-t-2 border-transparent hover:text-white/80 cursor-pointer transition-all">
                <span className="text-2xl mr-2">03</span>
              </div>
              <div className="py-6 border-t-2 border-transparent hover:text-white/80 cursor-pointer transition-all">
                <span className="text-2xl mr-2">04</span>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-20 px-10 bg-white font-ubuntu">
          <div className="max-w-[1230px] mx-auto flex flex-col items-center text-center">
            <div className="max-w-[800px] mb-12 flex flex-col gap-3">
              <h2 className="text-4xl font-extrabold text-[#1E212C]">We are Createx Construction Bureau</h2>
              <p className="text-[#787A80] text-lg font-normal">We are rightfully considered to be the best construction company in the USA.</p>
            </div>
            <div className="w-full h-[500px] flex items-center justify-center rounded-sm bg-[url(../src/assets/video.png)] bg-cover bg-center relative">
              <img src={im.play} alt="" className="cursor-pointer"/>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default Home