import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { im } from '../assets/im.ts';

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const syncUser = () => {
      const saved = localStorage.getItem('user');
      setUser(saved ? JSON.parse(saved) : null);
    };
    window.addEventListener('authChange', syncUser);
    return () => window.removeEventListener('authChange', syncUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/home');
  };
  return (
    <>
    <header className="sticky top-0 z-50 w-full min-h-[72px] lg:min-h-[88px] flex flex-col items-center justify-center bg-white/80 dark:bg-[#12141A]/80 backdrop-blur-md border-b border-[#E5E8ED]/50 dark:border-[#2A2E39]/50 font-ubuntu font-bold transition-colors duration-300">
      <div className="w-full h-[12px] lg:hidden"></div>
      <div className="w-[92%] max-w-[1230px] flex flex-wrap items-center justify-between gap-y-[16px] gap-x-[24px]">
        <div className="flex flex-wrap items-center gap-[24px] lg:gap-[40px] xl:gap-16">
          <NavLink to="/home"><img src={im.logo} alt="logo" className="" /></NavLink>
          <nav className="flex flex-wrap items-center gap-[16px] sm:gap-[24px] lg:gap-10 text-[14px] sm:text-[16px] text-[#424551] dark:text-white">
            <NavLink to="/about" className="hover:text-[#FF5A30] transition-colors">About Us</NavLink>
            <NavLink to="/services" className="hover:text-[#FF5A30] transition-colors">Services</NavLink>
            <NavLink to="/portfolio" className="hover:text-[#FF5A30] transition-colors">Work</NavLink>
            <NavLink to="/news" className="hover:text-[#FF5A30] transition-colors">News</NavLink>
            <NavLink to="/contacts" className="hover:text-[#FF5A30] transition-colors">Contacts</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-[20px] xl:gap-8">
          <div className="hidden md:flex items-center gap-3">
            <img src={im.phone} alt="" className="w-[24px] h-[24px] object-contain" />
            <div className="text-sm font-normal text-[#424551] dark:text-[#D1D3D8]">
              <p className="text-xs text-[#787A80] dark:text-[#A0A3AB]">Call us</p>
              <p className="font-bold text-[#1E212C] dark:text-white">(405) 555-0128</p>
            </div>
          </div>
          <div className="hidden xl:flex items-center gap-3">
            <img src={im.chat} alt="" className="w-[24px] h-[24px] object-contain" />
            <div className="text-sm font-normal text-[#424551] dark:text-[#D1D3D8]">
              <p className="text-xs text-[#787A80] dark:text-[#A0A3AB]">Talk to us</p>
              <p className="font-bold text-[#1E212C] dark:text-white">hello@createx.com</p>
            </div>
          </div>
          {user ? (
            <div className="flex items-center gap-3">
              <img src={im.user} alt="" className="w-[24px] h-[24px] object-contain" />
              <div className="text-sm font-normal text-[#424551] dark:text-[#D1D3D8] flex flex-col">
                <p className="font-bold text-[#1E212C] dark:text-white">{user.full_name}</p>
                <div className="flex items-center gap-2 text-xs">
                  {user.role === 'admin' && <NavLink to="/admin" className="text-[#FF5A30] font-bold hover:underline">Admin</NavLink>}
                  <button onClick={handleLogout} className="text-[#787A80] dark:text-[#A0A3AB] hover:text-[#FF5A30] transition-colors cursor-pointer">Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <NavLink to="/auth" className="flex items-center gap-3 cursor-pointer">
              <img src={im.user} alt="" className="w-[24px] h-[24px] object-contain" />
              <div className="text-sm font-normal text-[#424551] dark:text-[#D1D3D8]">
                <p className="text-xs text-[#787A80] dark:text-[#A0A3AB] hover:text-[#FF5A30] transition-colors">Authorization</p>
              </div>
            </NavLink>
          )}
        </div>
      </div>
      <div className="w-full h-[12px] lg:hidden"></div>
    </header>
    </>
  )
}

export default Header
