import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Project.module.scss'
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

interface ProjectSolution {
  id: number;
  text: string;
}
interface ProjectDetailData {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  goal: string;
  location: string;
  client_name: string;
  architect: string;
  size_sq_feet: number;
  value_usd: number;
  completed_date: string;
  solutions?: ProjectSolution[];
  project_solutions?: ProjectSolution[];
}



function Project() {
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

  const slides = [
    im.cottage1,
    im.cottage2,
    im.cottage3,
    im.cottage4,
    im.cottage5,
    im.cottage6,
  ];
  const [active, setActive] = useState(0);
  const prevSlide = () => {
    setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setActive((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectDetailData | null>(null);
  useEffect(() => {
    const currentSlug = slug || 'modern-cottage';
    fetch(`http://localhost:3000/api/projects/${currentSlug}`)
      .then((res) => res.json())
      .then((result: ProjectDetailData) => setProject(result))
      .catch((err) => console.error(err));
  }, [slug]);

  const solutionsList = project?.solutions || project?.project_solutions || [];

  return (
    <>
      <main>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[32px] md:h-[60px] lg:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col gap-[36px] md:gap-[60px]">
            <div className="w-full flex flex-col gap-[24px] md:gap-[40px]">
              <div className="flex flex-col gap-[16px] md:gap-[24px]">
                <p className="text-[14px] text-[#424551] dark:text-[#D1D3D8]">Homepage / Work <span className="text-[#9A9CA5] dark:text-[#787A80]">/ {project?.title}</span></p>
                <h1 className="text-[36px] sm:text-[48px] lg:text-[64px] font-black text-[#1E212C] dark:text-white leading-none">{project?.title}</h1>
              </div>
              <div className="w-full flex flex-col gap-[12px] sm:gap-[20px]">
                <div className="relative w-full h-[260px] sm:h-[400px] lg:h-[500px] rounded-xs overflow-hidden flex items-center justify-center">
                  <img src={slides[active]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="relative z-10 w-[92%] sm:w-[94%] flex items-center justify-between">
                    <button onClick={prevSlide} className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] flex items-center justify-center rounded-full bg-white/70 dark:bg-[#1A1D24]/80 hover:bg-white dark:hover:bg-[#1A1D24] text-[#424551] dark:text-white transition-colors cursor-pointer text-[18px]">←</button>
                    <button onClick={nextSlide} className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] flex items-center justify-center rounded-full bg-white/70 dark:bg-[#1A1D24]/80 hover:bg-white dark:hover:bg-[#1A1D24] text-[#424551] dark:text-white transition-colors cursor-pointer text-[18px]">→</button>
                  </div>
                </div>
                <div className="flex items-center gap-[10px] sm:gap-[20px] overflow-x-auto">
                  {slides.map((slide, index) => (
                    <button key={index} onClick={() => setActive(index)} className={`shrink-0 w-[64px] h-[64px] sm:w-[100px] sm:h-[100px] rounded-xs overflow-hidden cursor-pointer transition-opacity ${active === index ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                      <img src={slide} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-[36px] lg:gap-[105px]">
              <div className="w-full lg:w-[600px] flex flex-col gap-[16px] md:gap-[24px]">
                <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight">Project goal</h2>
                <div className="flex flex-col gap-[16px] text-[#424551] dark:text-[#A0A3AB] text-[16px] sm:text-[18px] font-normal leading-relaxed">
                  <p>{project?.goal}</p>
                  <p>Modern design and care for each family member to feel as comfortable as possible in the new home.</p>
                </div>
              </div>
              <div className="w-full lg:w-[495px] bg-white dark:bg-[#1A1D24] rounded-xs shadow-[0_8px_24px_rgba(30,33,44,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)] flex flex-col items-center transition-colors duration-300">
                <div className="w-full h-[24px] sm:h-[40px]"></div>
                <div className="w-[86%] sm:w-[84%] flex items-start gap-[20px] sm:gap-[32px]">
                  <div className="flex flex-col gap-[16px] text-[14px] sm:text-[16px] font-bold text-[#1E212C] dark:text-white uppercase tracking-wider">
                    <p>LOCATION</p>
                    <p>CLIENT</p>
                    <p>ARCHITECT</p>
                    <p>SIZE</p>
                    <p>VALUE</p>
                    <p>COMPLETED</p>
                  </div>
                  <div className="flex flex-col gap-[16px] text-[14px] sm:text-[16px] font-normal text-[#787A80] dark:text-[#A0A3AB]">
                    <p>{project?.location}</p>
                    <p>{project?.client_name}</p>
                    <p>{project?.architect}</p>
                    <p>{project?.size_sq_feet} sq. feet</p>
                    <p>${project?.value_usd ? `${project.value_usd / 1000000} million` : ''}</p>
                    <p>{project?.completed_date ? new Date(project.completed_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}</p>
                  </div>
                </div>
                <div className="w-full h-[24px] sm:h-[40px]"></div>
              </div>
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-[#F4F5F7] dark:bg-[#161920] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-[36px] lg:gap-[135px]">
            <img src={im.imag} alt="" className="w-full lg:w-[495px] h-[300px] sm:h-[420px] lg:h-[550px] object-cover rounded-xs" />
            <div className="w-full lg:w-[600px] flex flex-col gap-[24px] md:gap-[32px]">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight">Constructive decisions</h2>
              <div className="flex flex-col gap-[16px] sm:gap-[20px]">
                {solutionsList.map((item) => (
                  <div key={item.id} className="flex items-start sm:items-center gap-[16px]">
                    <img src={im.check} alt="" className="w-[20px] h-[20px] object-contain shrink-0" />
                    <p className="text-[#424551] dark:text-[#D1D3D8] text-[15px] sm:text-[16px] font-normal leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col gap-[36px] md:gap-[60px]">
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[20px]">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-[#1E212C] dark:text-white leading-tight">Similar projects</h2>
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
              <NavLink to="/portfolio" className="w-full sm:w-[214px] h-[52px] flex items-center justify-center bg-[#FF5A30] text-white text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">View portfolio</NavLink>
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
      </main>
    </>
  )
}

export default Project