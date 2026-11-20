import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './About.module.scss'
import {im} from '../assets/im.ts'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'


interface StatisticItem {
  id: number;
  page: string;
  value: string;
  label: string;
  sort_order: number;
}
interface AdvantageItem {
  id: number;
  section: string;
  title: string;
  description: string;
  icon_url: string;
  sort_order: number;
}
interface HistoryItem {
  id: number;
  event_date: string;
  title: string;
  description: string;
}
interface TeamMember {
  id: number;
  full_name: string;
  position: string;
  photo_url: string;
  sort_order: number;
}


const geoUrl = 'https://jsdelivr.net'
const markers = [
  { name: 'Canada', coordinates: [-106.3468, 56.1304] as [number, number], flag: im.flagCanada },
  { name: 'USA', coordinates: [-95.7129, 37.0902] as [number, number], flag: im.flagUsa },
  { name: 'Germany', coordinates: [10.4515, 51.1657] as [number, number], flag: im.flagGermany },
  { name: 'Ukraine', coordinates: [31.1656, 48.3794] as [number, number], flag: im.flagUkraine },
  { name: 'China', coordinates: [104.1954, 35.8617] as [number, number], flag: im.flagChina },
  { name: 'Australia', coordinates: [133.7751, -25.2744] as [number, number], flag: im.flagAustralia },
]

function About() {
  const [apiStats, setApiStats] = useState<StatisticItem[]>([]);
  const statsIcons = [
    { icon: im.like, maxWidth: 'max-w-[160px]' }, 
    { icon: im.painting, maxWidth: '' },
    { icon: im.helmet, maxWidth: '' },
    { icon: im.pantone, maxWidth: 'max-w-[160px]' },
  ];
  useEffect(() => {
    fetch('http://localhost:3000/api/statistics?page=about')
      .then((res) => res.json())
      .then((result: StatisticItem[]) => setApiStats(result))
      .catch((err) => console.error(err));
  }, []);

  const [values, setValues] = useState<AdvantageItem[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/advantages?section=core_value')
      .then((res) => res.json())
      .then((result: AdvantageItem[]) => setValues(result))
      .catch((err) => console.error(err));
  }, []);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeHistory, setActiveHistory] = useState<number>(0);
  useEffect(() => {
    fetch('http://localhost:3000/api/history')
      .then((res) => res.json())
      .then((result: HistoryItem[]) => setHistory(result))
      .catch((err) => console.error(err));
  }, []);
  const handlePrevHistory = () => {
    setActiveHistory((prev) => (prev === 0 ? history.length - 1 : prev - 1));
  };
  const handleNextHistory = () => {
    setActiveHistory((prev) => (prev === history.length - 1 ? 0 : prev + 1));
  };
  const currentHistory = history[activeHistory];
  const formatHistoryDate = (item: HistoryItem) => {
    if (item.title === 'Present') return 'Present';
    return new Date(item.event_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const [team, setTeam] = useState<TeamMember[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/team')
      .then((res) => res.json())
      .then((result: TeamMember[]) => setTeam(result))
      .catch((err) => console.error(err));
  }, []);


  return (
    <>
      <main>
        <section className="w-full min-h-[380px] sm:min-h-[460px] lg:h-[540px] flex justify-center items-center bg-[#F4F5F7] bg-[100%] bg-no-repeat bg-cover lg:bg-contain font-ubuntu bg-[url('../src/assets/bg3.png')] transition-colors duration-300">
          <div className="w-[92%] max-w-[1230px] flex flex-col justify-center gap-[24px] md:gap-[40px]">
            <div className="flex items-center gap-[8px] text-[14px] text-[#424551] dark:text-[#D1D3D8]">
              <span>Homepage</span>
              <span className="text-[#9A9CA5] dark:text-[#787A80]">/</span>
              <span className="text-[#9A9CA5] dark:text-[#787A80]">About Us</span>
            </div>
            <div className="w-full lg:w-[600px] flex flex-col gap-[16px] md:gap-[24px]">
              <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-black text-[#1E212C] uppercase tracking-wide leading-none">ABOUT US</h1>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal text-[#787A80] dark:text-[#A0A3AB] leading-relaxed">Createx Construction Bureau has been successfully operating in the USA construction market since 2000. We are proud to offer you quality construction and exemplary service.</p>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
          <div className="w-[92%] max-w-[1230px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px] lg:gap-[30px]">
            {apiStats.map((item, index) => (
              <div key={item.id} className="flex flex-col items-center text-center gap-[16px] sm:gap-[20px]">
                <img src={statsIcons[index]?.icon} alt={item.label} className="w-[48px] h-[48px] object-contain" />
                <div className="flex flex-col items-center gap-[8px]">
                  <h2 className="text-[36px] sm:text-[42px] lg:text-[46px] font-bold text-[#FF5A30] leading-[1.3]">{item.value}</h2>
                  <p className={`text-[14px] font-normal text-[#1E212C] dark:text-[#D1D3D8] leading-[1.5] ${statsIcons[index]?.maxWidth || ''}`}>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu bg-[url('../src/assets/bg2.png')] bg-no-repeat bg-cover transition-colors duration-300">
          <div className="w-[92%] max-w-[1230px] flex flex-col lg:flex-row items-center lg:items-start justify-between gap-[24px] lg:gap-0">
            <img src={im.man} alt="" className="w-full lg:w-[44%] xl:w-[525px] h-[340px] sm:h-[460px] lg:h-[580px] object-cover rounded-xs" />
            <div className="w-full lg:w-[60%] xl:w-[735px] bg-white dark:bg-[#1A1D24] rounded-xs shadow-[0_8px_24px_rgba(30,33,44,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] flex flex-col items-center relative z-10 lg:-left-[30px] lg:top-[60px] transition-colors duration-300">
              <div className="w-full h-[32px] sm:h-[48px] lg:h-[64px]"></div>
              <div className="w-[88%] sm:w-[82%] max-w-[540px] flex flex-col sm:flex-row items-start gap-[20px] sm:gap-[30px]">
                <img src={im.braces} alt="" className="w-[28px] h-[20px] object-contain shrink-0" />
                <div className="flex-1 flex flex-col gap-[32px] sm:gap-[48px] lg:gap-[60px]">
                  <div className="flex flex-col gap-[16px] sm:gap-[24px] text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#1E212C] dark:text-white leading-relaxed">
                    <p>Dapibus nec vitae ante mattis. Aliquam phasellus ac dui augue in. Sed aliquet in egestas hac at proin sed quam. Etiam aliquet sagittis non, massa cum pulvinar. Et in leo, tempus purus vestibulum ut blandit et mi. Odio massa purus vel praesent arcu enim elit felis viverra.</p>
                    <p>Magna aliquam interdum mattis ipsum arcu. Elit odio elit viverra quis metus amet eleifend amet. Vet suspendisse faucibus tempor ipsum integer.</p>
                  </div>
                  <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px]">
                    <div className="flex flex-col gap-[4px]">
                      <p className="text-[16px] font-bold text-[#1E212C] dark:text-white">Courtney Alexander</p>
                      <p className="text-[14px] font-normal text-[#787A80] dark:text-[#A0A3AB]">CEO - Createx Construction Bureau</p>
                    </div>
                    <img src={im.signature} alt="" className="w-[100px] h-[68px] object-contain" />
                  </div>
                </div>
              </div>
              <div className="w-full h-[32px] sm:h-[48px] lg:h-[64px]"></div>
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[120px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-[#F4F5F7] dark:bg-[#161920] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[36px] md:gap-[60px]">
            <div className="flex flex-col items-center gap-[16px] text-center">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight">Our core values</h2>
              <p className="text-[16px] sm:text-[18px] font-normal text-[#787A80] dark:text-[#A0A3AB]">Our mission is to set the highest standards for construction sphere.</p>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px] lg:gap-[40px]">
                {values.map((item) => (
                  <div key={item.id} className="w-full flex flex-col items-center text-center gap-[16px]">
                    <img src={item.icon_url} alt="" className="w-[48px] h-[48px] object-contain" />
                    <div className="w-[90%] flex flex-col items-center gap-[8px]">
                        <h4 className="text-[20px] font-bold text-[#1E212C] dark:text-white">{item.title}</h4>
                        <p className="text-[16px] font-normal text-[#787A80] dark:text-[#A0A3AB] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-[#F4F5F7] dark:bg-[#161920] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col gap-[32px] md:gap-[60px]">
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[20px]">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight">Our history</h2>
              <div className="flex items-center gap-[12px]">
                <button onClick={handlePrevHistory} className="w-[48px] h-[48px] flex items-center justify-center rounded-full text-[#424551] dark:text-[#D1D3D8] hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer text-[18px]">←</button>
                <button onClick={handleNextHistory} className="w-[48px] h-[48px] flex items-center justify-center rounded-full text-[#424551] dark:text-[#D1D3D8] hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer text-[18px]">→</button>
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-[32px] lg:gap-[60px] xl:gap-[105px]">
              <div className="w-full lg:w-[245px] shrink-0 flex flex-row lg:flex-col gap-[20px] overflow-x-auto">
                {history.map((item, index) => (
                  <button key={item.id} onClick={() => setActiveHistory(index)} className="shrink-0 flex items-center gap-[12px] sm:gap-[20px] text-left cursor-pointer group">
                    <span className={`w-[8px] h-[8px] rounded-full transition-colors ${activeHistory === index ? 'bg-[#FF5A30]' : 'bg-[#9A9CA5] dark:bg-[#5E626E] group-hover:bg-[#FF5A30]'}`}></span>
                    <span className={`text-[20px] sm:text-[24px] lg:text-[28px] font-bold leading-tight transition-colors ${activeHistory === index ? 'text-[#FF5A30]' : 'text-[#9A9CA5] dark:text-[#787A80] group-hover:text-[#FF5A30]'}`}>{formatHistoryDate(item)}</span>
                  </button>
                ))}
              </div>
              {currentHistory && (
                <div className="w-full lg:flex-1 lg:max-w-[810px] flex flex-col gap-[24px] md:gap-[36px]">
                  <img src={im.history} alt={currentHistory.title} className="w-full h-[240px] sm:h-[360px] lg:h-[450px] object-cover rounded-xs" />
                  <p className="text-[15px] sm:text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8] leading-relaxed">{currentHistory.description}</p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[32px] md:gap-[60px]">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-[#1E212C] dark:text-white leading-tight text-center">Our partners</h2>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center justify-items-center gap-x-[20px] gap-y-[32px] md:gap-y-[40px]">
              <img src={im.partner1} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner2} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner3} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner4} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner5} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner6} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner7} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner8} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner9} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner10} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner11} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner12} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[36px] md:gap-[60px]">
            <div className="flex flex-col items-center gap-[16px] md:gap-[24px] text-center">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight">Our team</h2>
              <p className="text-[16px] sm:text-[18px] font-normal text-[#787A80] dark:text-[#A0A3AB]">People are at the heart of Createx Construction Bureau</p>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[24px] md:gap-x-[30px] gap-y-[32px] md:gap-y-[60px]">
              {team.map((member) => (
                <div key={member.id} className="group flex flex-col items-center gap-[16px]">
                  <div className="relative w-full h-[300px] sm:h-[340px] rounded-xs overflow-hidden">
                    <img src={member.photo_url} alt={member.full_name} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 w-full h-[60px] bg-[#FF5A30]/70 flex items-center justify-center gap-[12px] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                      <a href=""><img src={im.lin} alt="" className="w-[20px] h-[20px] object-contain" /></a>
                      <a href=""><img src={im.twi} alt="" className="w-[20px] h-[20px] object-contain" /></a>
                      <a href=""><img src={im.fac} alt="" className="w-[20px] h-[20px] object-contain" /></a>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center gap-[4px]">
                    <p className="text-[18px] sm:text-[20px] font-bold text-[#424551] dark:text-[#D1D3D8]">{member.full_name}</p>
                    <p className="text-[15px] sm:text-[16px] font-normal text-[#787A80] dark:text-[#A0A3AB]">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[16px] sm:text-[18px] font-normal text-[#1E212C] dark:text-[#D1D3D8] text-center">Become a part of the best team in the construction market of the USA. <a href="" className="text-[#e04e28] underline">Available Positions</a></p>
          </div>
          <div className="w-full h-[48px] md:h-[80px]"></div>
        </section>

        <section className="w-full flex flex-col items-center bg-[#F4F5F7] dark:bg-[#161920] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[32px] md:gap-[60px]">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight text-center">We work worldwide</h2>
            <div className="w-full h-[280px] sm:h-[420px] lg:h-[560px]">
              {/* <ComposableMap projectionConfig={{ scale: 170 }} className="w-full h-full">
                <ZoomableGroup center={[15, 15]} zoom={1}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#B3B7BC"
                          stroke="#F4F5F7"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { fill: '#FF5A30', outline: 'none', transition: 'all 0.2s' },
                            pressed: { outline: 'none' },
                          }}
                        />
                      ))
                    }
                  </Geographies>
                  {markers.map(({ name, coordinates, flag }) => (
                    <Marker key={name} coordinates={coordinates}>
                      <image href={flag} x={-16} y={-16} width={32} height={32} className="cursor-pointer" />
                    </Marker>
                  ))}
                </ZoomableGroup>
              </ComposableMap> */}
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px]"></div>
        </section>
      </main>
    </>
  )
}

export default About