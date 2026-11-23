import './Home.module.scss'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { im } from '../assets/im.ts'

interface AdvantageItem {
  id: number;
  section: string;
  title: string;
  description: string;
  icon_url: string;
  sort_order: number;
}
interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  completed_date: string;
  service: string;
  service_slug: string;
  category: string;
}
interface TestimonialItem {
  id: number;
  project_id: number | null;
  author_name: string;
  position: string;
  company: string;
  text: string;
  photo_url: string | null;
}
interface StatisticItem {
  id: number;
  page: string;
  value: string;
  label: string;
  sort_order: number;
}
interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  short_text: string;
  description: string;
  image_url: string;
}
interface StatisticItem {
  id: number;
  page: string;
  value: string;
  label: string;
  sort_order: number;
}
interface NewsPostItem {
  id: number;
  title: string;
  slug: string;
  preview_text: string;
  image_url: string;
  published_at: string;
  category: string;
  comments_count: number;
}

function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    {
      id: '01',
      titleEnd: 'Construction',
      description: 'Cras ultrices leo vitae non viverra. Fringilla nisi quisque consequat, dignissim vitae proin ipsum sed. Pellentesque nec turpis purus eget pellentesque integer ipsum elementum felis.',
      bg: "bg-[url(../src/assets/herobg.png)]"
    },
    {
      id: '02',
      titleEnd: 'Renovation',
      description: 'Dui augue nec mi mi. Ut ac lectus donec fames pellentesque. Laoreet aenean vulputate elementum blandit amet. Imperdiet elementum faucibus dignissim purus.',
      bg: "bg-[url(../src/assets/herobg.png)]"
    },
    {
      id: '03',
      titleEnd: 'Architecture',
      description: 'Adipiscing nunc arcu enim elit mattis eu placerat proin. Fusce parturient diam magna ullamcorper morbi semper massa ac facilisis.',
      bg: "bg-[url(../src/assets/herobg.png)]"
    },
    {
      id: '04',
      titleEnd: 'Engineering',
      description: 'Sit veniam aute dolore adipisicing nulla sit culpa. Minim mollit voluptate ullamco proident ea ad. Veniam velit nostrud aliquip sunt.',
      bg: "bg-[url(../src/assets/herobg.png)]"
    }
  ];
  const prevHeroSlide = () => {
    setHeroIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };
  const nextHeroSlide = () => {
    setHeroIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const [values, setValues] = useState<AdvantageItem[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/advantages?section=core_value')
      .then((res) => res.json())
      .then((result: AdvantageItem[]) => setValues(result))
      .catch((err) => console.error(err));
  }, []);

  const [projectsData, setProjectsData] = useState<ProjectItem[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/projects')
      .then((res) => res.json())
      .then((result: ProjectItem[]) => setProjectsData(result))
      .catch((err) => console.error(err));
  }, []);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const visibleCards = 3;
  const maxIndex = Math.max(0, projectsData.length - visibleCards);
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };
  const stepWidth = 420;
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
    const [testimonialIndex, setTestimonialIndex] = useState<number>(0);
    useEffect(() => {
      fetch('http://localhost:3000/api/testimonials')
        .then((res) => res.json())
        .then((result: TestimonialItem[]) => setTestimonials(result))
        .catch((err) => console.error(err));
    }, []);
    const handlePrevTestimonial = () => {
      setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };
    const handleNextTestimonial = () => {
      setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };
    const currentTestimonial = testimonials[testimonialIndex];

    const [qName, setQName] = useState('');
    const [qPhone, setQPhone] = useState('');
    const [qMessage, setQMessage] = useState('');

    const handleQuestionSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!qName.trim() || !qPhone.trim() || !qMessage.trim()) return;
      const saved = localStorage.getItem('user');
      const user = saved ? JSON.parse(saved) : null;
      const res = await fetch('http://localhost:3000/api/register-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user ? user.id : null,
          name: qName,
          phone: qPhone,
          message: qMessage,
        }),
      });
      if (res.ok) {
        setQName('');
        setQPhone('');
        setQMessage('');
      }
    };
  
    const [services, setServices] = useState<ServiceItem[]>([]);
    const serviceIcons = [im.ic1, im.ic2, im.ic3, im.ic4];

    useEffect(() => {
      fetch('http://localhost:3000/api/services')
        .then((res) => res.json())
        .then((result: ServiceItem[]) => setServices(result))
        .catch((err) => console.error(err));
    }, []);
  
    const [apiStats, setApiStats] = useState<StatisticItem[]>([]);
    const statsIcons = [
      { icon: im.circle1 }, 
      { icon: im.circle2 },
      { icon: im.circle3 },
      { icon: im.circle4 },
    ];
    useEffect(() => {
      fetch('http://localhost:3000/api/statistics?page=home')
        .then((res) => res.json())
        .then((result: StatisticItem[]) => setApiStats(result))
        .catch((err) => console.error(err));
    }, []);
  const [newsPosts, setNewsPosts] = useState<NewsPostItem[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/news-posts?limit=3')
      .then((res) => res.json())
      .then((result) => setNewsPosts(result.items))
      .catch((err) => console.error(err));
  }, []);



  return (
    <>
      <main>
        <section className={`relative w-full min-h-[600px] lg:h-[92vh] flex flex-col justify-center items-center bg-cover bg-center font-ubuntu text-white transition-all duration-500 ${heroSlides[heroIndex].bg}`}>
          <div className="absolute inset-0 bg-[#1E212C]/40"></div>
          <button onClick={prevHeroSlide} aria-label="Previous slide" className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/50 hover:bg-white text-[#424551] transition-all cursor-pointer">←</button>
          <button onClick={nextHeroSlide} aria-label="Next slide" className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#424551] transition-all cursor-pointer shadow-md">→</button>
          <div className="w-full h-[48px] lg:h-[60px]"></div>
          <div className="relative z-10 w-[92%] max-w-[1230px] flex flex-col gap-[56px] sm:gap-[90px] lg:gap-[130px]">
            <div className="w-full max-w-[600px] flex flex-col gap-[24px] sm:gap-[40px]">
              <div className="flex flex-col gap-[16px] sm:gap-[24px]">
                <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-black tracking-wide uppercase leading-[1.15] flex flex-col">
                  <span>CREATE<span className="text-[#FF5A30]">X</span></span>
                  <span className="text-white">{heroSlides[heroIndex].titleEnd}</span>
                </h1>
                <p className="text-white/90 text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-relaxed">{heroSlides[heroIndex].description}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[16px] sm:gap-[24px]">
                <button className="w-full sm:w-[278px] h-[52px] border border-white text-white font-bold text-[14px] sm:text-[16px] tracking-wider uppercase rounded-sm hover:bg-white hover:text-[#1E212C] transition-colors duration-200 cursor-pointer">Learn more about us</button>
                <button className="w-full sm:w-[224px] h-[52px] bg-[#FF5A30] text-white font-bold text-[14px] sm:text-[16px] tracking-wider uppercase rounded-sm hover:bg-[#e04e28] transition-colors duration-200 cursor-pointer">Submit request</button>
              </div>
              <div className="flex xl:hidden items-center gap-[12px]">
                <button onClick={prevHeroSlide} aria-label="Previous slide" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-[#424551] transition-all cursor-pointer">←</button>
                <button onClick={nextHeroSlide} aria-label="Next slide" className="w-11 h-11 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-[#424551] transition-all cursor-pointer shadow-md">→</button>
              </div>
            </div>
            <div className="w-full max-w-[720px] grid grid-cols-4 gap-[8px] sm:gap-[12px] font-bold">
              {heroSlides.map((slide, index) => (
                <div key={slide.id} onClick={() => setHeroIndex(index)} className={`h-[44px] sm:h-[54px] flex items-start border-b-2 cursor-pointer transition-all ${heroIndex === index ? 'border-white text-white' : 'border-white/30 text-white/50 hover:text-white/80'}`}>
                  <span className="text-[20px] sm:text-[28px] leading-none">{slide.id}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[48px] lg:h-[60px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
            <div className="w-[92%] max-w-[1230px] flex flex-col items-center text-center gap-[32px] md:gap-[60px]">
              <div className="max-w-[800px] flex flex-col gap-[16px]">
                <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight">We are Createx Construction Bureau</h2>
                <p className="text-[#787A80] dark:text-[#A0A3AB] text-[16px] sm:text-[18px] font-normal">We are rightfully considered to be the best construction company in the USA.</p>
              </div>
              <div className="w-full h-[260px] sm:h-[400px] lg:h-[500px] flex items-center justify-center rounded-sm bg-[url(../src/assets/video.png)] bg-cover bg-center relative overflow-hidden">
                <img src={im.play} alt="" className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] cursor-pointer hover:scale-105 transition-transform" />
              </div>
            </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
        <section className="w-full flex flex-col items-center dark:bg-[#161920] font-ubuntu transition-colors duration-300">
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
        <section className="relative z-20 w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <form onSubmit={handleQuestionSubmit} className="w-[92%] max-w-[1230px] bg-white dark:bg-[#1A1D24] rounded-xs shadow-[0_8px_24px_rgba(30,33,44,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] flex flex-col items-center relative -top-[48px] sm:-top-[72px] lg:-top-[92px] transition-colors duration-300">
            <div className="w-full h-[28px] sm:h-[36px] lg:h-[48px]"></div>
            <div className="w-[90%] flex flex-col items-center gap-[24px] lg:gap-[32px]">
              <h3 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-[#1E212C] dark:text-white leading-snug text-center">Want to know more? Ask us a question:</h3>
              <div className="w-full flex flex-col lg:flex-row items-end justify-between gap-[20px] lg:gap-[24px]">
                <div className="w-full lg:w-[23%] xl:w-[260px] flex flex-col gap-[8px]">
                  <p className="text-[14px] text-[#424551] dark:text-[#D1D3D8] font-normal">Name</p>
                  <input type="text" required value={qName} onChange={(e) => setQName(e.target.value)} placeholder="Your name" className="w-full h-[44px] bg-[#F4F5F7] dark:bg-[#222630] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[14px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] transition-colors" />
                </div>
                <div className="w-full lg:w-[23%] xl:w-[260px] flex flex-col gap-[8px]">
                  <p className="text-[14px] text-[#424551] dark:text-[#D1D3D8] font-normal">Phone</p>
                  <input type="text" required value={qPhone} onChange={(e) => setQPhone(e.target.value)} placeholder="Your phone" className="w-full h-[44px] bg-[#F4F5F7] dark:bg-[#222630] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[14px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] transition-colors" />
                </div>
                <div className="w-full lg:flex-1 flex flex-col gap-[8px]">
                  <p className="text-[14px] text-[#424551] dark:text-[#D1D3D8] font-normal">Message</p>
                  <input type="text" required value={qMessage} onChange={(e) => setQMessage(e.target.value)} placeholder="Your message" className="w-full h-[44px] bg-[#F4F5F7] dark:bg-[#222630] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[14px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] transition-colors" />
                </div>
                <button type="submit" className="w-full lg:w-[104px] h-[44px] bg-[#FF5A30] text-white text-[14px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer shrink-0">Send</button>
              </div>
            </div>
            <div className="w-full h-[28px] sm:h-[36px] lg:h-[48px]"></div>
          </form>
        </section>
        <section className="w-full flex flex-col items-center bg-[#F4F5F7] dark:bg-[#161920] bg-[url(../src/assets/bg9.png)] bg-cover bg-center bg-no-repeat font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[36px] md:gap-[60px]">
            <div className="flex flex-col items-center gap-[16px] md:gap-[24px] text-center">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] leading-tight">Our services</h2>
              <p className="text-[16px] sm:text-[18px] font-normal text-[#787A80] dark:text-[#A0A3AB]">Createx Construction Bureau is a construction giant with a full range of construction services.</p>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] md:gap-[30px]">
              {services.map((item, index) => (
                <NavLink key={item.id} to="/services" className="group relative w-full h-[240px] sm:h-[260px] lg:h-[285px] bg-white dark:bg-[#1A1D24] border border-[#E5E8ED] dark:border-[#2A2E39] rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col items-center justify-center gap-[24px] transition-all duration-300">
                  <img src={item.image_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-[#1E212C]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img src={serviceIcons[index]} alt={item.title} className="relative z-10 w-[52px] h-[52px] object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300" />
                  <h4 className="relative z-10 text-[18px] sm:text-[20px] font-bold text-[#1E212C] dark:text-white group-hover:text-white text-center transition-colors duration-300">{item.title}</h4>
                </NavLink>
              ))}
            </div>
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-[20px] sm:gap-[40px] text-center">
              <h4 className="text-[22px] sm:text-[28px] font-bold text-[#1E212C]">Learn more about our services</h4>
              <NavLink to="/services" className="w-full sm:w-[207px] h-[52px] flex items-center justify-center bg-[#FF5A30] text-white text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">View services</NavLink>
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
            <div className="w-[92%] max-w-[1230px] flex flex-col gap-[36px] md:gap-[60px]">
              <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[20px]">
                <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-[#1E212C] dark:text-white leading-tight">Related projects</h2>
                <div className="flex gap-[12px]">
                  <button onClick={handlePrev} aria-label="Previous slide" className="w-[48px] h-[48px] flex items-center justify-center rounded-full text-[#424551] dark:text-[#D1D3D8] hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer text-[18px]">←</button>
                  <button onClick={handleNext} aria-label="Next slide" className="w-[48px] h-[48px] flex items-center justify-center rounded-full text-[#424551] dark:text-[#D1D3D8] hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer text-[18px]">→</button>
                </div>
              </div>
                <div className="w-full overflow-hidden flex flex-col gap-[16px]">
                <div className="w-full h-[1px]"></div>
                <div className="flex gap-[20px] md:gap-[30px] transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * stepWidth}px)` }}>
                  {projectsData.map((project) => (
                  <div key={project.id} className="group shrink-0 w-[290px] sm:w-[340px] lg:w-[390px] h-[400px] lg:h-[440px] bg-white dark:bg-[#1A1D24] rounded-xs overflow-hidden flex flex-col justify-between shadow-[0_4px_16px_rgba(30,33,44,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-colors duration-300">
                    <div className="w-full h-[280px] lg:h-[320px] group-hover:h-[210px] lg:group-hover:h-[240px] transition-all duration-300">
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full h-[120px] group-hover:h-[190px] lg:group-hover:h-[200px] flex flex-col items-center justify-center text-center gap-[4px] group-hover:gap-[16px] transition-all duration-300">
                      <div className="w-[90%] flex flex-col items-center gap-[4px]">
                        <p className="text-[18px] lg:text-[20px] font-bold text-[#1E212C] dark:text-white">{project.title}</p>
                        <p className="text-[14px] font-normal text-[#787A80] dark:text-[#A0A3AB]">{project.category}</p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 h-0 group-hover:h-[44px] w-[160px] border-2 border-[#FF5A30] text-[#FF5A30] text-[14px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#FF5A30] hover:text-white transition-all duration-300 cursor-pointer overflow-hidden">View Project</button>
                    </div>
                  </div>
                  ))}
                </div>
                <div className="w-full h-[1px]"></div>
              </div>
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-[20px] sm:gap-[40px] text-center">
                <h4 className="text-[22px] sm:text-[28px] font-bold text-[#1E212C] dark:text-white">Explore all our works</h4>
                <NavLink to="/portfolio"><button className="w-full sm:w-[214px] h-[52px] bg-[#FF5A30] text-white text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">View portfolio</button></NavLink>
              </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-[#F4F5F7] dark:bg-[#161920] transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[72px] lg:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[32px] md:gap-[60px]">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-[#1E212C] dark:text-white leading-tight text-center">Supported by 12+ partners</h2>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center justify-items-center gap-[24px] md:gap-[30px]">
              <img src={im.partner1} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner2} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner3} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner4} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner5} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner6} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[72px] lg:h-[80px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-[#F4F5F7] dark:bg-[#161920] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col lg:flex-row items-center lg:items-start justify-between gap-[36px] lg:gap-[135px]">
            <div className="w-full lg:w-[600px] flex flex-col gap-[32px] md:gap-[60px]">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight">What our clients are saying</h2>
              {currentTestimonial && (
                <div className="flex flex-col gap-[24px]">
                  <img src={currentTestimonial.photo_url} alt="" className="w-[72px] h-[72px] rounded-full object-cover" />
                  <p className="text-[#424551] dark:text-[#D1D3D8] text-[15px] sm:text-[16px] font-normal leading-relaxed">{currentTestimonial.text}</p>
                  <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px]">
                    <div className="flex flex-col gap-[4px]">
                      <p className="text-[16px] font-bold text-[#1E212C] dark:text-white">{currentTestimonial.author_name}</p>
                      <p className="text-[14px] font-normal text-[#787A80] dark:text-[#A0A3AB]">{currentTestimonial.position}, {currentTestimonial.company}</p>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <button onClick={handlePrevTestimonial} className="w-[48px] h-[48px] flex items-center justify-center rounded-full text-[#424551] dark:text-[#D1D3D8] hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer text-[18px]">←</button>
                      <button onClick={handleNextTestimonial} className="w-[48px] h-[48px] flex items-center justify-center rounded-full text-[#424551] dark:text-[#D1D3D8] hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer text-[18px]">→</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <img src={im.clients} alt="" className="w-full lg:w-[495px] h-[300px] sm:h-[420px] lg:h-[550px] object-cover rounded-xs" />
          </div>
          <div className="w-full h-[48px] md:h-[80px]"></div>
        </section>
        <section className="w-full py-[80px] flex justify-center bg-white dark:bg-[#12141A] bg-[url(../src/assets/bg.png)] bg-cover bg-center bg-no-repeat font-ubuntu transition-colors duration-300">
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[60px]">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] leading-tight text-center">Some facts and figures</h2>
            <div className="flex flex-wrap items-start justify-center gap-[48px]">
              {apiStats.map((item, index) => (
                <div key={item.id} className="w-[148px] flex flex-col items-center text-center gap-[20px]">
                  <div className="relative w-[148px] h-[148px] flex items-center justify-center">
                    <img src={statsIcons[index]?.icon} alt={item.label} className="w-full h-full object-contain" />
                    <p className="absolute text-[32px] font-bold text-[#1E212C]">{item.value}</p>
                  </div>
                  <p className="text-[14px] font-normal text-[#1E212C] leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-[80px] flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[60px]">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight text-center">Recent news</h2>
            <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-[30px]">
              {newsPosts[0] && (
                <div className="group w-full lg:w-[705px] bg-white dark:bg-[#1A1D24] rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] overflow-hidden flex flex-col items-center transition-colors duration-300">
                  <div className="w-full h-[220px] sm:h-[300px] lg:h-[360px] overflow-hidden">
                    <img src={newsPosts[0].image_url} alt={newsPosts[0].title} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-full h-[20px] sm:h-[24px]"></div>
                  <div className="w-[90%] flex flex-col gap-[12px] sm:gap-[16px]">
                    <div className="flex flex-col gap-[10px] sm:gap-[12px]">
                      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E212C] dark:text-white group-hover:text-[#FF5A30] transition-colors leading-snug"><NavLink to="/post">{newsPosts[0].title}</NavLink></h3>
                      <div className="flex flex-wrap items-center gap-[8px] sm:gap-[12px] text-[13px] sm:text-[14px] text-[#787A80] dark:text-[#A0A3AB]">
                        <p>{newsPosts[0].category}</p>
                        <span className="text-[#D7D9DF] dark:text-[#3A3E4A]">|</span>
                        <p>{new Date(newsPosts[0].published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        <span className="text-[#D7D9DF] dark:text-[#3A3E4A]">|</span>
                        <p>{newsPosts[0].comments_count === 0 ? 'No comments' : `${newsPosts[0].comments_count} ${newsPosts[0].comments_count === 1 ? 'comment' : 'comments'}`}</p>
                      </div>
                    </div>
                    <p className="text-[15px] sm:text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8] leading-relaxed">{newsPosts[0].preview_text}</p>
                  </div>
                  <div className="w-full h-[20px] sm:h-[24px]"></div>
                </div>
              )}
              <div className="w-full lg:w-[495px] flex flex-col justify-between gap-[30px]">
                {newsPosts.slice(1, 3).map((post) => (
                  <div key={post.id} className="group bg-white dark:bg-[#1A1D24] rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] overflow-hidden flex flex-col items-center transition-colors duration-300">
                    <div className="w-full h-[156px] overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full h-[16px]"></div>
                    <div className="w-[90%] flex flex-col gap-[8px]">
                      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E212C] dark:text-white group-hover:text-[#FF5A30] transition-colors leading-snug"><NavLink to="/post">{post.title}</NavLink></h3>
                      <div className="flex flex-wrap items-center gap-[8px] sm:gap-[12px] text-[13px] sm:text-[14px] text-[#787A80] dark:text-[#A0A3AB]">
                        <p>{post.category}</p>
                        <span className="text-[#D7D9DF] dark:text-[#3A3E4A]">|</span>
                        <p>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        <span className="text-[#D7D9DF] dark:text-[#3A3E4A]">|</span>
                        <p>{post.comments_count === 0 ? 'No comments' : `${post.comments_count} ${post.comments_count === 1 ? 'comment' : 'comments'}`}</p>
                      </div>
                    </div>
                    <div className="w-full h-[20px]"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-[20px] sm:gap-[40px] text-center">
              <h4 className="text-[22px] sm:text-[28px] font-bold text-[#1E212C] dark:text-white">Explore all our news posts</h4>
              <NavLink to="/news"><button className="w-full sm:w-[214px] h-[52px] bg-[#FF5A30] text-white text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">View all news</button></NavLink>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home