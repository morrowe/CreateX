import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Portfolio.module.scss'
import {im} from '../assets/im.ts'

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

function Portfolio() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activeService, setActiveService] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 9;
  const tabs = [
    { label: 'All Projects', slug: '', icon: im.ic1 },
    { label: 'Construction', slug: 'construction', icon: im.ic2 },
    { label: 'Project Development', slug: 'project-development', icon: im.ic3 },
    { label: 'Interior Design', slug: 'interior-design', icon: im.ic4 },
    { label: 'Repairs', slug: 'repairs', icon: im.ic5 },
  ];
  useEffect(() => {
    const query = activeService
      ? `http://localhost:3000/api/projects?service=${activeService}&limit=${limit}&offset=0`
      : `http://localhost:3000/api/projects?limit=${limit}&offset=0`;

    fetch(query)
      .then((res) => res.json())
      .then((result: ProjectItem[]) => {
        setProjects(result);
        setOffset(result.length);
        setHasMore(result.length === limit);
      })
      .catch((err) => console.error(err));
  }, [activeService]);
  const handleLoadMore = () => {
    const query = activeService
      ? `http://localhost:3000/api/projects?service=${activeService}&limit=${limit}&offset=${offset}`
      : `http://localhost:3000/api/projects?limit=${limit}&offset=${offset}`;
    fetch(query)
      .then((res) => res.json())
      .then((result: ProjectItem[]) => {
        setProjects((prev) => [...prev, ...result]);
        setOffset((prev) => prev + result.length);
        setHasMore(result.length === limit);
      })
      .catch((err) => console.error(err));
  };

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


  return (
    <>
      <main>
        <section className="w-full min-h-[420px] sm:min-h-[480px] lg:h-[540px] flex justify-center items-center bg-[#F4F5F7] bg-[100%] bg-right bg-no-repeat bg-cover lg:bg-contain font-ubuntu bg-[url('../src/assets/bg5.png')] transition-colors duration-300">
          <div className="w-[92%] max-w-[1230px] flex flex-col justify-center gap-[24px] md:gap-[40px]">
            <div className="flex items-center gap-[8px] text-[14px] text-[#424551] dark:text-[#D1D3D8]">
              <span>Homepage</span>
              <span className="text-[#9A9CA5] dark:text-[#787A80]">/</span>
              <span className="text-[#9A9CA5] dark:text-[#787A80]">Work</span>
            </div>
            <div className="w-full lg:w-[600px] flex flex-col gap-[16px] md:gap-[24px]">
              <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-black text-[#1E212C] uppercase tracking-wide leading-none">OUR WORK</h1>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal text-[#787A80] dark:text-[#A0A3AB] leading-relaxed">Our portfolio represents 20 years of construction experience backed by a passion for perfect client service, quality and innovations in consctuction industry.</p>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[36px] md:gap-[60px] relative -top-[36px] sm:-top-[56px] lg:-top-[77px]">
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[12px] sm:gap-[20px]">
              {tabs.map((tab) => (
                <button key={tab.label} onClick={() => setActiveService(tab.slug)} className={ activeService === tab.slug
                    ? 'w-full h-[120px] sm:h-[140px] lg:h-[154px] bg-[#FF5A30] text-white rounded-xs shadow-[0_8px_24px_rgba(255,90,48,0.25)] flex flex-col items-center justify-center gap-[12px] sm:gap-[16px] cursor-pointer'
                    : 'w-full h-[120px] sm:h-[140px] lg:h-[154px] bg-white dark:bg-[#1A1D24] text-[#9A9CA5] dark:text-[#A0A3AB] hover:bg-[#FF5A30] hover:text-white dark:hover:bg-[#FF5A30] dark:hover:text-white rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center gap-[12px] sm:gap-[16px] transition-colors duration-200 cursor-pointer'
                  }>
                  <img src={tab.icon} alt="" className="w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] object-contain" />
                  <p className="text-[14px] sm:text-[16px] font-bold">{tab.label}</p>
                </button>
              ))}
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[30px]">
              {projects.map((project) => (
                <div key={project.id} className="group w-full h-[400px] lg:h-[440px] bg-white dark:bg-[#1A1D24] rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col justify-between transition-colors duration-300">
                  <div className="w-full h-[280px] lg:h-[320px] group-hover:h-[210px] lg:group-hover:h-[240px] transition-all duration-300">
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-full h-[120px] group-hover:h-[190px] lg:group-hover:h-[200px] flex flex-col items-center justify-center text-center gap-[4px] group-hover:gap-[16px] transition-all duration-300">
                    <div className="w-[90%] flex flex-col items-center gap-[4px]">
                      <p className="text-[18px] lg:text-[20px] font-bold text-[#1E212C] dark:text-white"><NavLink to="/project">{project.title}</NavLink></p>
                      <p className="text-[14px] font-normal text-[#787A80] dark:text-[#A0A3AB]">{project.category}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 h-0 group-hover:h-[44px] w-[160px] border-2 border-[#FF5A30] text-[#FF5A30] text-[14px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#FF5A30] hover:text-white transition-all duration-300 cursor-pointer overflow-hidden">View Project</button>
                  </div>
                </div>
              ))}
            </div>
            {hasMore && (
              <button onClick={handleLoadMore} className="flex items-center gap-[16px] sm:gap-[20px] h-[60px] text-[#424551] dark:text-[#D1D3D8] hover:text-[#FF5A30] dark:hover:text-[#FF5A30] text-[16px] font-bold transition-colors cursor-pointer">
                <img src={im.convert} alt="" className="w-[24px] h-[24px] object-contain" />
                <span>Load more</span>
              </button>
            )}
          </div>
          <div className="w-full h-[24px] md:h-[40px]"></div>
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
        <section className="w-full flex flex-col items-center bg-[#FFFFFF] dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[32px] md:gap-[60px]">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-[#1E212C] dark:text-white leading-tight text-center">Our clients</h2>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center justify-items-center gap-[24px] md:gap-[30px]">
              <img src={im.partner1} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner2} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner3} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner4} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner5} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
              <img src={im.partner6} alt="" className="max-w-[120px] object-contain dark:brightness-90 dark:contrast-125" />
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
      </main>
    </>
  )
}

export default Portfolio