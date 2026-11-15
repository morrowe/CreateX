import './About.module.scss'
import {im} from '../assets/im.ts'

interface StatItem {
  id: number;
  icon: string;
  value: string;
  text: string;
  maxWidth?: string;
}
const statsData: StatItem[] = [
  { id: 1, icon: im.like, value: '60%', text: 'Clients on the recommendation of friends', maxWidth: 'max-w-[180px]' },
  { id: 2, icon: im.painting, value: '2400+', text: 'Apartments renovated' },
  { id: 3, icon: im.helmet, value: '670', text: 'Qualified specialists' },
  { id: 4, icon: im.pantone, value: '150000+ m', text: 'Finishing work was carried out' },
];

const values = [
  {
    icon: im.like2,
    title: 'Quality',
    text: 'Culpa nostrud commodo ea consequat aliquip reprehenderit. Veniam velit nostrud aliquip sunt.',
  },
  {
    icon: im.hand,
    title: 'Safety',
    text: 'Anim reprehenderit sint voluptate exercitation adipisicing laborum adipisicing. Minim empor est ea.',
  },
  {
    icon: im.slippers,
    title: 'Comfort',
    text: 'Sit veniam aute dolore adipisicing nulla sit culpa. Minim mollit voluptate ullamco proident ea ad.',
  },
]


function About() {

  return (
    <>
      <main>
        <section className="w-full h-[540px] flex justify-center bg-[#F4F5F7] bg-right bg-no-repeat bg-contain font-ubuntu bg-[url('../src/assets/bg3.png')]">
          <div className="max-w-[1230px] w-full flex flex-col justify-center gap-[40px]">
            <div className="flex items-center gap-[8px] text-[14px] text-[#424551]">
              <span>Homepage</span>
              <span className="text-[#9A9CA5]">/</span>
              <span className="text-[#9A9CA5]">About Us</span>
            </div>
            <div className="w-[600px] flex flex-col gap-[24px]">
              <h1 className="text-[72px] font-black text-[#1E212C] uppercase tracking-wide leading-none">ABOUT US</h1>
              <p className="text-[20px] font-normal text-[#787A80] leading-relaxed">Createx Construction Bureau has been successfully operating in the USA construction market since 2000. We are proud to offer you quality construction and exemplary service.</p>
            </div>
          </div>
        </section>
        <section className="w-full h-[300px] flex items-center justify-center bg-white font-ubuntu">
          <div className="max-w-[1230px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            {statsData.map((item) => (
              <div key={item.id} className="flex flex-col items-center text-center gap-[20px]">
                <img src={item.icon} alt={item.text} className="w-[48px] h-[48px]" />
                <div className="flex flex-col items-center gap-[8px]">
                  <h2 className="text-[46px] font-bold text-[#FF5A30] leading-[1.3]">{item.value}</h2>
                  <p className={`text-[14px] font-normal text-[#1E212C] leading-[1.5] ${item.maxWidth || ''}`}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="w-full h-[650px] flex justify-center bg-white font-ubuntu bg-[url('../src/assets/bg2.png')]">
          <div className="max-w-[1230px] w-full flex items-start justify-between">
            <img src={im.man} alt="" className="w-[525px] h-[580px] object-cover rounded-xs" />
            <div className="w-[735px] h-[480px]  rounded-xs shadow-[0_8px_24px_rgba(30,33,44,0.08)] flex items-center justify-center relative z-10">
              <div className="w-[540px] flex items-start gap-[30px]">
                <img src={im.braces} alt="" className="w-[28px] h-[20px] object-contain" />
                <div className="flex-1 flex flex-col gap-[60px]">
                  <div className="flex flex-col gap-[24px] text-[20px] font-bold text-[#1E212C] leading-relaxed">
                    <p>Dapibus nec vitae ante mattis. Aliquam phasellus ac dui augue in. Sed aliquet in egestas hac at proin sed quam. Etiam aliquet sagittis non, massa cum pulvinar. Et in leo, tempus purus vestibulum ut blandit et mi. Odio massa purus vel praesent arcu enim elit felis viverra.</p>
                    <p>Magna aliquam interdum mattis ipsum arcu. Elit odio elit viverra quis metus amet eleifend amet. Vet suspendisse faucibus tempor ipsum integer.</p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col gap-[4px]">
                      <p className="text-[16px] font-bold text-[#1E212C]">Courtney Alexander</p>
                      <p className="text-[14px] font-normal text-[#787A80]">CEO - Createx Construction Bureau</p>
                    </div>
                    <img src={im.signature} alt="" className="w-[100px] h-[68px] object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-[500px] flex items-center justify-center bg-[#F4F5F7] font-ubuntu">
          <div className="max-w-[1230px] w-full flex flex-col items-center gap-[60px]">
            <div className="flex flex-col items-center gap-[16px] text-center">
              <h2 className="text-[46px] font-extrabold text-[#1E212C] leading-tight">Our core values</h2>
              <p className="text-[18px] font-normal text-[#787A80]">Our mission is to set the highest standards for construction sphere.</p>
            </div>
            <div className="w-full flex items-center justify-between">
              {values.map((item, index) => (
                <div key={index} className="w-[285px] flex flex-col items-center text-center gap-[16px]">
                  <img src={item.icon} alt="" className="w-[48px] h-[48px] object-contain" />
                  <div className="flex flex-col gap-[8px]">
                    <h4 className="text-[20px] font-bold text-[#1E212C]">{item.title}</h4>
                    <p className="text-[16px] font-normal text-[#787A80] leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <div>
            <h2>Our history</h2>
            <div>

            </div>
          </div>
        </section>
        <section className="w-full h-[42vh] flex items-center justify-evenly bg-[#F4F5F7] ">
          <div className="max-w-[1230px] w-full flex flex-col items-center gap-[60px]">
            <h2 className="text-[46px] font-bold text-[#1E212C] leading-tight text-center">Our partners</h2>
            <div className="w-full flex items-center justify-between gap-[20px]">
              <img src={im.partner1} alt="" className=" " />
              <img src={im.partner2} alt="" className=" " />
              <img src={im.partner3} alt="" className=" " />
              <img src={im.partner4} alt="" className=" " />
              <img src={im.partner5} alt="" className=" " />
              <img src={im.partner6} alt="" className=" " />
            </div>
            <div className="w-full flex items-center justify-between gap-[20px]">
              <img src={im.partner7} alt="" className=" " />
              <img src={im.partner8} alt="" className=" " />
              <img src={im.partner9} alt="" className=" " />
              <img src={im.partner10} alt="" className=" " />
              <img src={im.partner11} alt="" className=" " />
              <img src={im.partner12} alt="" className=" " />
            </div>
          </div>
        </section>
        <section>
          <h2>Our team</h2>
          <p>People are at the heart of Createx Construction Bureau</p>
          <div>
            <div>
              <div>
                <div>
                  <a href=""><img src="" alt="" /></a>
                  <a href=""><img src="" alt="" /></a>
                  <a href=""><img src="" alt="" /></a>
                </div>
              </div>
              <div>
                <p>Calvin Fox</p>
                <p>CTO, Co-Founder</p>
              </div>
            </div>
          </div>
          <p>Become a part of the best team in the construction market of the USA. <a href="">Available Positions</a></p>
        </section>
        <section>
          <h2>We work worldwide</h2>
          
        </section>
      </main>
    </>
  )
}

export default About