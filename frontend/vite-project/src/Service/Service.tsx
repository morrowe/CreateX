import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Service.module.scss'
import {im} from '../assets/im.ts'

interface ServiceOffer {
  id: number;
  title: string;
  description: string;
}
interface ServiceStep {
  id: number;
  step_number: number;
  title: string;
  description: string;
}
interface PlanFeature {
  id: number;
  name: string;
  note: string | null;
}
interface PricingPlan {
  id: number;
  name: string;
  price_per_m2: number;
  term_days: number;
  features: PlanFeature[];
}
interface FeatureItem {
  id: number;
  name: string;
}
interface ServiceData {
  id: number;
  title: string;
  slug: string;
  short_text: string;
  description: string;
  image_url: string;
  offers: ServiceOffer[];
  steps: ServiceStep[];
  plans: PricingPlan[];
  features: FeatureItem[];
}
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



function Service() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<ServiceData | null>(null);
  const [openOfferIndex, setOpenOfferIndex] = useState<number | null>(0);
  useEffect(() => {
    const currentSlug = slug || 'interior-design';
    fetch(`http://localhost:3000/api/services/${currentSlug}`)
      .then((res) => res.json())
      .then((result: ServiceData) => setData(result))
      .catch((err) => console.error(err));
  }, [slug]);
//
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

  const [benefits, setBenefits] = useState<AdvantageItem[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/advantages?section=benefit')
      .then((res) => res.json())
      .then((result: AdvantageItem[]) => setBenefits(result))
      .catch((err) => console.error(err));
  }, []);


  return (
    <>
      <main className="w-full flex flex-col font-ubuntu bg-white dark:bg-[#12141A] transition-colors duration-300">
        <section className="w-full min-h-[380px] sm:min-h-[460px] lg:h-[540px] flex justify-center items-center bg-[#F4F5F7] bg-[100%] bg-no-repeat bg-cover lg:bg-contain bg-[url('../src/assets/bg8.png')] transition-colors duration-300">
          <div className="w-[92%] max-w-[1230px] flex flex-col justify-center gap-[24px] md:gap-[40px]">
            <div className="flex items-center gap-[8px] text-[14px] text-[#424551] dark:text-[#D1D3D8]">
              <span>Homepage / Services</span>
              <span className="text-[#9A9CA5] dark:text-[#787A80]">/</span>
              <span className="text-[#9A9CA5] dark:text-[#787A80]">Interior Design</span>
            </div>
            <div className="w-full lg:w-[600px] flex flex-col gap-[16px] md:gap-[24px]">
              <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-black text-[#1E212C] uppercase tracking-wide leading-none">INTERIOR <br /> DESIGN</h1>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal text-[#787A80] dark:text-[#A0A3AB] leading-relaxed">Dui augue nec mi mi. Ut ac lectus donec fames pellentesque. Laoreet aenean vulputate elementum blandit amet.</p>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col lg:flex-row items-center justify-between gap-[32px] md:gap-[60px] lg:gap-[124px]">
            <div className="w-full lg:w-[495px] h-[260px] sm:h-[340px] lg:h-[378px]">
              <img src={data?.image_url || im.offer} alt="" className="w-full h-full object-cover rounded-sm" />
            </div>
            <div className="w-full lg:w-[600px] flex flex-col gap-[20px] md:gap-[24px]">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-[#1E212C] dark:text-white leading-tight">We offer</h2>
              <div className="flex flex-col gap-[20px]">
                {data?.offers.map((offer, index) =>
                  openOfferIndex === index ? (
                    <div key={offer.id} onClick={() => setOpenOfferIndex(null)} className="flex gap-[16px] items-start">
                      <span className="text-[#FF5A30] text-[28px] font-bold leading-none">—</span>
                      <div className="flex flex-col gap-[12px]">
                        <h4 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-[#1E212C] dark:text-white leading-snug">{offer.title}</h4>
                        <p className="text-[#787A80] dark:text-[#A0A3AB] text-[15px] sm:text-[16px] font-normal leading-relaxed">{offer.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div key={offer.id} onClick={() => setOpenOfferIndex(index)} className="flex gap-[16px] items-center">
                      <span className="text-[#FF5A30] text-[28px] font-bold leading-none">+</span>
                      <h4 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-[#1E212C] dark:text-white leading-snug">{offer.title}</h4>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] transition-colors duration-300">
          <div className="w-[92%] max-w-[1230px] flex flex-col gap-[32px] md:gap-[48px] lg:gap-[64px]">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-[#1E212C] dark:text-white leading-tight">That’s how we do it</h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
              {data?.steps.map((step, index) => (
                <div key={step.id} className="w-full flex flex-col gap-[16px]">
                  {index < data.steps.length - 1 ? (
                    <div className="flex items-center gap-[20px] w-full">
                      <span className="text-[36px] lg:text-[46px] font-bold text-[#D7D9DF] dark:text-[#3A3E4A] leading-none">{String(step.step_number).padStart(2, '0')}</span>
                      <div className="flex-1 h-px border-t border-dashed border-[#B3B7BC] dark:border-[#4A4E5A]"></div>
                    </div>
                  ) : (
                    <span className="text-[36px] lg:text-[46px] font-bold text-[#D7D9DF] dark:text-[#3A3E4A] leading-none">{String(step.step_number).padStart(2, '0')}</span>
                  )}
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-[16px] font-bold text-[#1E212C] dark:text-white">{step.title}</p>
                    <p className="text-[#787A80] dark:text-[#A0A3AB] text-[14px] font-normal leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-[#1E212C] dark:bg-[#0D0F14] font-ubuntu text-white transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[72px] lg:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[36px] md:gap-[60px]">
            <div className="flex flex-col items-center gap-[16px] text-center">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold leading-tight">Our benefits</h2>
              <p className="text-[16px] sm:text-[18px] font-normal text-white/60">Our mission is to set the highest standards for construction sphere.</p>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-[32px] lg:gap-[20px]">
              {benefits.map((item, index) => (
                <div key={item.id} className="w-full lg:w-auto flex flex-col lg:flex-row items-center justify-between gap-[32px] lg:gap-[94px]">
                  <div className="w-full lg:w-[285px] flex flex-col items-center text-center gap-[16px]">
                    <img src={item.icon_url} alt="" className="w-[40px] h-[40px] object-contain" />
                    <div className="flex flex-col gap-[8px]">
                      <p className="text-[20px] font-bold text-white">{item.title}</p>
                      <p className="text-[16px] font-normal text-white/60 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  {index < benefits.length - 1 && (
                    <div className="w-full h-px lg:w-px lg:h-[140px] bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
            <button className="w-[242px] h-[52px] bg-[#FF5A30] text-white text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer relative top-[48px] md:top-[72px] lg:top-[106px]">Discuss a project</button>
          </div>
          <div className="w-full h-[48px] md:h-[72px] lg:h-[80px]"></div>
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
        <section className="w-full flex flex-col items-center bg-[#F4F5F7] dark:bg-[#161920] bg-[url(../src/assets/bg.png)] bg-cover bg-no-repeat transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col gap-[36px] md:gap-[60px]">
            <div className="flex flex-col items-center gap-[16px] text-center">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-[#1E212C] leading-tight">Pricing</h2>
              <p className="text-[16px] sm:text-[18px] font-normal text-[#787A80] dark:text-[#A0A3AB]">We offer you three categories of construction.</p>
            </div>
            <div className="w-full overflow-x-auto bg-white dark:bg-[#1A1D24] rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.04)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-colors duration-300">
              <div className="min-w-[800px] w-full flex flex-col">
                <div className="w-full h-[100px] flex justify-center bg-white dark:bg-[#1A1D24] border-b border-[#E5E8ED] dark:border-[#2A2E39]">
                  <div className="w-[96%] h-full flex items-center">
                    <div className="w-[38%] text-[18px] font-bold text-[#1E212C] dark:text-white">Items</div>
                    <div className="w-[20.6%] flex flex-col items-center text-center">
                      <span className="text-[18px] font-bold text-[#1E212C] dark:text-white uppercase tracking-wider">Basic</span>
                      <span className="text-[14px] text-[#787A80] dark:text-[#A0A3AB] font-normal">$20 per m2</span>
                    </div>
                    <div className="w-[20.6%] flex flex-col items-center text-center">
                      <span className="text-[18px] font-bold text-[#1E212C] dark:text-white uppercase tracking-wider">Standard</span>
                      <span className="text-[14px] text-[#787A80] dark:text-[#A0A3AB] font-normal">$30 per m2</span>
                    </div>
                    <div className="w-[20.6%] flex flex-col items-center text-center">
                      <span className="text-[18px] font-bold text-[#1E212C] dark:text-white uppercase tracking-wider">Business</span>
                      <span className="text-[14px] text-[#787A80] dark:text-[#A0A3AB] font-normal">$40 per m2</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[58px] flex justify-center bg-[#F4F5F7] dark:bg-[#222630]">
                  <div className="w-[96%] h-full flex items-center">
                    <div className="w-[38%] text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">Installation plan</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                  </div>
                </div>
                <div className="w-full h-[58px] flex justify-center bg-white dark:bg-[#1A1D24]">
                  <div className="w-[96%] h-full flex items-center">
                    <div className="w-[38%] text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">Planning solutions (2-3 options)</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                  </div>
                </div>
                <div className="w-full h-[58px] flex justify-center bg-[#F4F5F7] dark:bg-[#222630]">
                  <div className="w-[96%] h-full flex items-center">
                    <div className="w-[38%] text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">Lighting plan</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                  </div>
                </div>
                <div className="w-full h-[58px] flex justify-center bg-white dark:bg-[#1A1D24]">
                  <div className="w-[96%] h-full flex items-center">
                    <div className="w-[38%] text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">Flooring plan</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                  </div>
                </div>
                <div className="w-full h-[58px] flex justify-center bg-[#F4F5F7] dark:bg-[#222630]">
                  <div className="w-[96%] h-full flex items-center">
                    <div className="w-[38%] text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">Heating floor laying scheme</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                  </div>
                </div>
                <div className="w-full h-[58px] flex justify-center bg-white dark:bg-[#1A1D24]">
                  <div className="w-[96%] h-full flex items-center">
                    <div className="w-[38%] text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">Air conditioner zones layout</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                  </div>
                </div>
                <div className="w-full h-[58px] flex justify-center bg-[#F4F5F7] dark:bg-[#222630]">
                  <div className="w-[96%] h-full flex items-center">
                    <div className="w-[38%] text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">3D visualization of all rooms</div>
                    <div className="w-[20.6%] text-center text-[#424551] dark:text-[#D1D3D8] text-[16px] font-normal">simplified</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                  </div>
                </div>
                <div className="w-full h-[58px] flex justify-center bg-white dark:bg-[#1A1D24]">
                  <div className="w-[96%] h-full flex items-center">
                    <div className="w-[38%] text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">Visualization of each room (3-4 angles)</div>
                    <div className="w-[20.6%] text-center text-transparent text-[20px]">—</div>
                    <div className="w-[20.6%] text-center text-transparent text-[20px]">—</div>
                    <div className="w-[20.6%] text-center text-[#FF5A30] text-[20px] font-bold">✓</div>
                  </div>
                </div>
                <div className="w-full h-[58px] flex justify-center bg-[#F4F5F7] dark:bg-[#222630] border-b border-[#E5E8ED] dark:border-[#2A2E39]">
                  <div className="w-[96%] h-full flex items-center">
                    <div className="w-[38%] text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">Terms</div>
                    <div className="w-[20.6%] text-center text-[#424551] dark:text-[#D1D3D8] text-[16px] font-normal">10 days</div>
                    <div className="w-[20.6%] text-center text-[#424551] dark:text-[#D1D3D8] text-[16px] font-normal">20 days</div>
                    <div className="w-[20.6%] text-center text-[#424551] dark:text-[#D1D3D8] text-[16px] font-normal">30 days</div>
                  </div>
                </div>
                <div className="w-full h-[90px] flex justify-center bg-white dark:bg-[#1A1D24]">
                  <div className="w-[96%] h-full flex items-center">
                    <div className="w-[38%]"></div>
                    <div className="w-[20.6%] flex justify-center">
                      <button className="w-[144px] h-[44px] border border-[#FF5A30] text-[#FF5A30] text-[12px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer">Send request</button>
                    </div>
                    <div className="w-[20.6%] flex justify-center">
                      <button className="w-[144px] h-[44px] border border-[#FF5A30] text-[#FF5A30] text-[12px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#FF5A30] hover:text-white transition-colors cursor-pointer">Send request</button>
                    </div>
                    <div className="w-[20.6%] flex justify-center">
                      <button className="w-[144px] h-[44px] bg-[#FF5A30] text-white text-[12px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">Send request</button>
                    </div>
                  </div>
                </div>
              </div>
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
      </main>
    </>
  )
}

export default Service