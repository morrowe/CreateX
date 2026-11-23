import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const url = isLogin ? 'http://localhost:3000/api/login' : 'http://localhost:3000/api/register';
    const body = isLogin ? { email, password } : { full_name: fullName, email, phone, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ошибка авторизации');
        return;
      }

      // На бэкенде объект пользователя лежит в data.user
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('authChange'));

      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch {
      setError('Ошибка соединения с сервером');
    }
  };

  return (
    <section className="w-full min-h-[700px] py-[80px] flex items-center justify-center bg-[#F4F5F7] font-ubuntu">
      <div className="w-[486px] bg-white rounded-xs shadow-[0_8px_24px_rgba(30,33,44,0.08)] p-[48px] flex flex-col gap-[24px]">
        <div className="flex items-center border-b border-[#E5E8ED]">
          <button type="button" onClick={() => { setIsLogin(true); setError(''); }} className={`flex-1 pb-[16px] text-[18px] font-bold cursor-pointer transition-colors ${isLogin ? 'text-[#FF5A30] border-b-2 border-[#FF5A30]' : 'text-[#9A9CA5]'}`}>Sign in</button>
          <button type="button" onClick={() => { setIsLogin(false); setError(''); }} className={`flex-1 pb-[16px] text-[18px] font-bold cursor-pointer transition-colors ${!isLogin ? 'text-[#FF5A30] border-b-2 border-[#FF5A30]' : 'text-[#9A9CA5]'}`}>Sign up</button>
        </div>

        <div className="flex flex-col gap-[8px] text-center">
          <h2 className="text-[28px] font-bold text-[#1E212C]">{isLogin ? 'Sign in' : 'Sign up'}</h2>
          <p className="text-[14px] text-[#787A80]">{isLogin ? 'Sign in to your account using email and password provided during registration.' : 'Registration takes less than a minute but gives you full control over your orders.'}</p>
        </div>

        {error && <p className="text-[14px] text-[#FF5A30] bg-[#FF5A30]/10 p-[12px] rounded-xs text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
          {!isLogin && (
            <div className="flex flex-col gap-[8px]">
              <p className="text-[14px] text-[#424551]">Full Name*</p>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" className="w-full h-[44px] bg-[#F4F5F7] border border-[#D7D9DF] rounded-xs text-[14px] text-[#1E212C] outline-none focus:border-[#FF5A30] indent-[16px]" />
            </div>
          )}

          <div className="flex flex-col gap-[8px]">
            <p className="text-[14px] text-[#424551]">Email*</p>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your working email" className="w-full h-[44px] bg-[#F4F5F7] border border-[#D7D9DF] rounded-xs text-[14px] text-[#1E212C] outline-none focus:border-[#FF5A30] indent-[16px]" />
          </div>

          {!isLogin && (
            <div className="flex flex-col gap-[8px]">
              <p className="text-[14px] text-[#424551]">Phone</p>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(405) 555-0128" className="w-full h-[44px] bg-[#F4F5F7] border border-[#D7D9DF] rounded-xs text-[14px] text-[#1E212C] outline-none focus:border-[#FF5A30] indent-[16px]" />
            </div>
          )}

          <div className="flex flex-col gap-[8px]">
            <p className="text-[14px] text-[#424551]">Password*</p>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full h-[44px] bg-[#F4F5F7] border border-[#D7D9DF] rounded-xs text-[14px] text-[#1E212C] outline-none focus:border-[#FF5A30] indent-[16px]" />
          </div>

          <button type="submit" className="w-full h-[44px] bg-[#FF5A30] text-white text-[14px] font-bold uppercase tracking-wider rounded-sm hover:bg-[#e04e28] transition-colors cursor-pointer mt-[4px]">{isLogin ? 'Sign in' : 'Sign up'}</button>
        </form>
      </div>
    </section>
  );
}

export default Auth