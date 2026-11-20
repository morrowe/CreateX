import { useEffect, useState } from 'react';
import './News.module.scss'

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


function News() {
  const [newsPosts, setNewsPosts] = useState<NewsPostItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const categories = [
    { id: null, name: 'All News' },
    { id: 1, name: 'Company News' },
    { id: 2, name: 'Innovation' },
    { id: 3, name: 'Industry News' },
    { id: 4, name: 'Expert Tips' },
    { id: 5, name: 'Marketing' },
  ];
  useEffect(() => {
    const url = activeCategory
      ? `http://localhost:3000/api/news-posts?category=${activeCategory}`
      : 'http://localhost:3000/api/news-posts';
    fetch(url)
      .then((res) => res.json())
      .then((result) => setNewsPosts(result.items))
      .catch((err) => console.error(err));
  }, [activeCategory]);


  return (
    <>
      <main>
        <section className="w-full min-h-[380px] sm:min-h-[460px] lg:h-[540px] flex justify-center items-center bg-[#F4F5F7] bg-[100%] bg-no-repeat bg-cover lg:bg-contain font-ubuntu bg-[url('../src/assets/bg6.png')] transition-colors duration-300">
          <div className="w-[92%] max-w-[1230px] flex flex-col justify-center gap-[24px] md:gap-[40px]">
            <div className="flex items-center gap-[8px] text-[14px] text-[#424551] dark:text-[#D1D3D8]">
              <span>Homepage</span>
              <span className="text-[#9A9CA5] dark:text-[#787A80]">/</span>
              <span className="text-[#9A9CA5] dark:text-[#787A80]">News</span>
            </div>
            <div className="w-full lg:w-[600px] flex flex-col gap-[16px] md:gap-[24px]">
              <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-black text-[#1E212C] uppercase tracking-wide leading-none">NEWS</h1>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal text-[#787A80] dark:text-[#A0A3AB] leading-relaxed">Stay tuned with our news, expert tips and articles.</p>
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[48px] md:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[32px] md:gap-[48px]">
            <div className="w-full flex flex-col items-center gap-[24px] md:gap-[40px]">
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight text-center">Categories</h2>
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[10px]">
                {categories.map((cat) => (
                  <button key={cat.name} onClick={() => setActiveCategory(cat.id)} className={activeCategory === cat.id ? 'w-full h-[46px] border border-[#FF5A30] text-[#FF5A30] text-[15px] sm:text-[16px] font-bold rounded-xs cursor-pointer transition-colors' : 'w-full h-[46px] border border-transparent text-[#9A9CA5] dark:text-[#A0A3AB] hover:text-[#FF5A30] dark:hover:text-[#FF5A30] text-[15px] sm:text-[16px] font-bold rounded-xs cursor-pointer transition-colors'}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-[30px] gap-y-[32px] md:gap-y-[60px]">
              {newsPosts.map((post) => (
                <div key={post.id} className="group bg-white dark:bg-[#1A1D24] rounded-xs shadow-[0_4px_16px_rgba(30,33,44,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col items-center transition-colors duration-300">
                  <div className="w-full h-[220px] sm:h-[280px] lg:h-[306px] overflow-hidden">
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-full h-[20px] sm:h-[24px]"></div>
                  <div className="w-[90%] flex flex-col gap-[12px] sm:gap-[16px]">
                    <div className="flex flex-col gap-[10px] sm:gap-[12px]">
                      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E212C] dark:text-white group-hover:text-[#FF5A30] transition-colors leading-snug">{post.title}</h3>
                      <div className="flex flex-wrap items-center gap-[8px] sm:gap-[12px] text-[13px] sm:text-[14px] text-[#787A80] dark:text-[#A0A3AB]">
                        <p>{post.category}</p>
                        <span className="text-[#D7D9DF] dark:text-[#3A3E4A]">|</span>
                        <p>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        <span className="text-[#D7D9DF] dark:text-[#3A3E4A]">|</span>
                        <p>{post.comments_count === 0 ? 'No comments' : `${post.comments_count} ${post.comments_count === 1 ? 'comment' : 'comments'}`}</p>
                      </div>
                    </div>
                    <p className="text-[15px] sm:text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8] leading-relaxed">{post.preview_text}</p>
                  </div>
                  <div className="w-full h-[20px] sm:h-[24px]"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[48px] md:h-[80px]"></div>
        </section>
      </main>
    </>
  )
}

export default News