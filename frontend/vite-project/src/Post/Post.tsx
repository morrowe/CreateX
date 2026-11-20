import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Post.module.scss'
import {im} from '../assets/im.ts'

interface PostDetail {
  id: number;
  title: string;
  slug: string;
  preview_text: string;
  content: string;
  image_url: string;
  published_at: string;
  category: string;
  author: string;
  comments_count: number;
}
interface CommentItem {
  id: number;
  parent_id: number | null;
  content: string;
  created_at: string;
  author: string;
}

function Post() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const loadComments = (postId: number) => {
    fetch(`http://localhost:3000/api/comments/${postId}`)
      .then((res) => res.json())
      .then((result: CommentItem[]) => setComments(result))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    const currentSlug = slug || 'climate-resilient-infrastructure';
    fetch(`http://localhost:3000/api/news-posts/${currentSlug}`)
      .then((res) => res.json())
      .then((result: PostDetail) => {
        setPost(result);
        loadComments(result.id);
      })
      .catch((err) => console.error(err));
  }, [slug]);
  const handleReply = (comment: CommentItem) => {
    setReplyTo(comment.id);
    setContent(`@${comment.author} `);
  };
  const handleCommentSubmit = async () => {
    if (!post || !authorName.trim() || !content.trim()) return;
    const res = await fetch('http://localhost:3000/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        post_id: post.id,
        parent_id: replyTo,
        author_name: authorName,
        email,
        content,
      }),
    });
    if (res.ok) {
      setAuthorName('');
      setEmail('');
      setContent('');
      setReplyTo(null);
      loadComments(post.id);
    }
  };

  return (
    <>
      <main>
        <section className="w-full flex flex-col items-center bg-[#F4F5F7] dark:bg-[#1A1D24] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[40px] sm:h-[64px] lg:h-[80px]"></div>
          <div className="w-[92%] max-w-[1230px] flex flex-col gap-[24px] md:gap-[40px]">
            <p className="text-[14px] text-[#424551] dark:text-[#D1D3D8]">Homepage / News <span className="text-[#9A9CA5] dark:text-[#787A80]">/ How to Build Climate Change-Resilient Infrastructure</span></p>
            <h1 className="text-[32px] sm:text-[48px] lg:text-[64px] font-black text-[#1E212C] dark:text-white leading-tight">How to Build Climate Change-Resilient Infrastructure</h1>
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px]">
              <div className="flex flex-wrap items-center gap-[10px] sm:gap-[12px] text-[14px] sm:text-[16px]">
                <p className="font-bold text-[#FF5A30]">Industry News</p>
                <span className="text-[#787A80]">|</span>
                <div className="flex items-center gap-[8px] text-[#787A80] dark:text-[#A0A3AB]">
                  <img src={im.clock} alt="" className="w-[16px] h-[16px] object-contain" />
                  <p>June 24, 2020</p>
                </div>
                <span className="text-[#787A80]">|</span>
                <div className="flex items-center gap-[8px] text-[#787A80] dark:text-[#A0A3AB]">
                  <img src={im.chat2} alt="" className="w-[16px] h-[16px] object-contain" />
                  <p>4 comments</p>
                </div>
              </div>
              <div className="flex items-center gap-[12px]">
                <a href=""><img src={im.facebook} alt="" className="w-[24px] h-[24px] brightness-50 " /></a>
                <a href=""><img src={im.messanger} alt="" className="w-[24px] h-[24px] brightness-50" /></a>
                <a href=""><img src={im.twitter} alt="" className="w-[24px] h-[24px] brightness-50" /></a>
              </div>
            </div>
          </div>
          <div className="w-full h-[64px] sm:h-[90px] lg:h-[110px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-[92%] max-w-[1230px] flex flex-col items-center gap-[40px] md:gap-[80px] relative -top-[32px] sm:-top-[50px]">
            <div className="w-full h-[240px] sm:h-[380px] lg:h-[500px] rounded-xs overflow-hidden shadow-sm dark:shadow-black/40">
              <img src={im.news1} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full max-w-[810px] flex flex-col gap-[20px] sm:gap-[24px]">
              <h6 className="text-[18px] sm:text-[20px] font-bold text-[#1E212C] dark:text-white leading-relaxed">Vulputate vitae pellentesque scelerisque luctus consequat mattis pellentesque dui odio. Interdum aenean sit malesuada ornare sed gravida rhoncus, congue. Purus auctor nullam diam quis est hendrerit ac euismod.</h6>
              <p className="text-[15px] sm:text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8] leading-relaxed">At facilisi sapien posuere eget nunc senectus proin nullam. Tortor senectus in et sagittis, vitae diam cras dignissim. Varius adipiscing eget diam nisi. Orci, consectetur vulputate metus ornare pharetra, neque, fermentum. Vel nec rhoncus, non nunc, neque in massa. Feugiat leo nam nisl lacinia amet, odio. Mi varius viverra risus vel.</p>
              <p className="text-[15px] sm:text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8] leading-relaxed">Amet, morbi sed pharetra, elit eget mi potenti. Condimentum orci interdum feugiat lectus libero duis. Nisl massa, elementum varius sit. Nunc felis, porttitor aliquam urna, accumsan et sed. Aliquet non sed duis diam vehicula rhoncus. In dictum nullam tincidunt semper pellentesque purus morbi sed. Ut aliquet velit pharetra, nisi nunc, non.</p>
              <div className="flex flex-col sm:flex-row items-start gap-[16px] sm:gap-[30px]">
                <img src={im.braces} alt="" className="w-[28px] h-[20px] object-contain shrink-0" />
                <h6 className="text-[18px] sm:text-[20px] font-bold text-[#1E212C] dark:text-white leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Justo, amet lectus quam viverra mus lobortis fermentum amet, eu. Pulvinar eu sed purus facilisi. Vitae id turpis tempus ornare turpis quis non. Congue tortor in tot euismod vulputate etiam eros. Vel accumsan at elit neque, ipsum.</h6>
              </div>
              <p className="text-[15px] sm:text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8] leading-relaxed">Mauris amet arcu nisl vel dictum tellus. Sed rhoncus, ut sed id ut erat mattis. Vitae mus blandit in neque amet non fringilla blandit:</p>
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-start sm:items-center gap-[16px]">
                  <img src={im.check} alt="" className="w-[16px] h-[16px] object-contain shrink-0" />
                  <p className="text-[15px] sm:text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">A fermentum in morbi pretium aliquam adipiscing donec tempus.</p>
                </div>
                <div className="flex items-start sm:items-center gap-[16px]">
                  <img src={im.check} alt="" className="w-[16px] h-[16px] object-contain shrink-0" />
                  <p className="text-[15px] sm:text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">Vulputate placerat amet pulvinar lorem nisl.</p>
                </div>
                <div className="flex items-start sm:items-center gap-[16px]">
                  <img src={im.check} alt="" className="w-[16px] h-[16px] object-contain shrink-0" />
                  <p className="text-[15px] sm:text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">Consequat feugiat habitant gravida quisque elit bibendum id adipiscing sed.</p>
                </div>
                <div className="flex items-start sm:items-center gap-[16px]">
                  <img src={im.check} alt="" className="w-[16px] h-[16px] object-contain shrink-0" />
                  <p className="text-[15px] sm:text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8]">Etiam duis lobortis in fames ultrices commodo nibh.</p>
                </div>
              </div>
              <p className="text-[15px] sm:text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8] leading-relaxed">Enim, vel massa odio diam. Blandit massa gravida feugiat elementum id nec sed leo. Nisi in ornare lectus eget. Urna, risus, consectetur volutpat lorem purus. Velit aliquet nibh vitae maecenas. Consectetur neque ut aliquam eros, purus enim dignissim aenean vitae. Ultrices fames augue mattis tortor est justo, pharetra nibh risus. Facilisi at porttitor volutpat natoque proin amet, nulla. Vivamus ut lobortis sagittis curabitur tellus convallis eget netus vitae.</p>
              <div className="flex items-center gap-[12px]">
                <p className="text-[16px] font-bold text-[#1E212C] dark:text-white">Share:</p>
                <a href=""><img src={im.facebook} alt="" className="w-[24px] h-[24px] brightness-50" /></a>
                <a href=""><img src={im.messanger} alt="" className="w-[24px] h-[24px] brightness-50" /></a>
                <a href=""><img src={im.twitter} alt="" className="w-[24px] h-[24px] brightness-50" /></a>
              </div>
            </div>
          </div>
          <div className="w-full h-[24px] md:h-[40px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[32px] md:h-[60px]"></div>
          <div className="w-[92%] max-w-[810px] flex flex-col items-center gap-[36px] md:gap-[60px]">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight text-center">{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</h2>
            <div className="w-full flex flex-col gap-[32px] md:gap-[60px]">
              {comments.map((item) => {
                const mentionMatch = item.content.match(/^(@\S+\s+\S+)\s+(.*)$/);
                const mention = mentionMatch ? mentionMatch[1] : null;
                const text = mentionMatch ? mentionMatch[2] : item.content;
                return (
                  <div key={item.id} className="w-full flex flex-col sm:flex-row items-start justify-between gap-[12px] sm:gap-[30px]">
                    <div className="w-full sm:w-[150px] shrink-0 flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-[8px]">
                      <h5 className="text-[16px] sm:text-[18px] font-bold text-[#1E212C] dark:text-white leading-snug">{item.author}</h5>
                      <p className="text-[13px] sm:text-[14px] font-normal text-[#787A80] dark:text-[#A0A3AB]">{new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div className="w-full sm:flex-1 flex flex-col gap-[12px] sm:gap-[16px]">
                      <p className="text-[15px] sm:text-[16px] font-normal text-[#424551] dark:text-[#D1D3D8] leading-relaxed">{mention && <span className="font-bold text-[#FF5A30]">{mention} </span>}{text}</p>
                      <div onClick={() => handleReply(item)} className="flex items-center gap-[8px] text-[#787A80] dark:text-[#A0A3AB] hover:text-[#FF5A30] cursor-pointer transition-colors w-fit">
                        <img src={im.reply} alt="" className="w-[16px] h-[16px] object-contain" />
                        <p className="text-[14px] font-normal">Reply</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full h-[32px] md:h-[60px]"></div>
        </section>
        <section className="w-full flex flex-col items-center bg-white dark:bg-[#12141A] font-ubuntu transition-colors duration-300">
          <div className="w-full h-[24px] md:h-[40px]"></div>
          <div className="w-[92%] max-w-[810px] flex flex-col items-center gap-[32px] md:gap-[48px]">
            <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#1E212C] dark:text-white leading-tight text-center">Leave your comment</h2>
            <div className="w-full flex flex-col gap-[20px] sm:gap-[24px]">
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-[20px] sm:gap-[30px]">
                <div className="w-full sm:flex-1 flex flex-col gap-[8px]">
                  <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">Name*</p>
                  <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Your name" className="w-full h-[52px] bg-[#F4F5F7] dark:bg-[#1A1D24] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[16px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] transition-colors" />
                </div>
                <div className="w-full sm:flex-1 flex flex-col gap-[8px]">
                  <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">Email*</p>
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your working email" className="w-full h-[52px] bg-[#F4F5F7] dark:bg-[#1A1D24] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[16px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] transition-colors" />
                </div>
              </div>
              <div className="w-full flex flex-col gap-[8px]">
                <p className="text-[16px] text-[#424551] dark:text-[#D1D3D8] font-normal">Your comment*</p>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type comment here" className="w-full h-[100px] bg-[#F4F5F7] dark:bg-[#1A1D24] border border-[#D7D9DF] dark:border-[#2A2E39] rounded-xs text-[16px] text-[#1E212C] dark:text-white placeholder:text-[#9A9CA5] dark:placeholder:text-[#787A80] outline-none focus:border-[#FF5A30] indent-[16px] leading-[44px] resize-none transition-colors"></textarea>
              </div>
            </div>
            <button onClick={handleCommentSubmit} className="w-full sm:w-[215px] h-[52px] bg-[#FF5A30] text-white text-[16px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer">Post comment</button>
          </div>
          <div className="w-full h-[48px] md:h-[80px] lg:h-[100px]"></div>
        </section>
      </main>
    </>
  )
}

export default Post