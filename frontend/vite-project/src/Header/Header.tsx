import './Header.module.scss'
import { NavLink, Link } from 'react-router-dom';
import { im } from '../assets/im.ts'

function Header() {
  return (
    <>
      <header className='w-full h-[8vh] flex items-center justify-between px-10 font-ubuntu font-bold bg-white'>
        <div className='flex items-center gap-16'>
          <NavLink to="/home"><img src={im.logo} alt="logo"/></NavLink>
          <nav className='flex items-center gap-10 text-[#424551]'>
            <NavLink to="/about" className='hover:text-[#FF5A30] transition-colors'>About Us</NavLink>
            <NavLink to="/services" className='hover:text-[#FF5A30] transition-colors'>Services</NavLink>
            <NavLink to="/portfolio" className='hover:text-[#FF5A30] transition-colors'>Work</NavLink>
            <NavLink to="/news" className='hover:text-[#FF5A30] transition-colors'>News</NavLink>
            <NavLink to="/contacts" className='hover:text-[#FF5A30] transition-colors'>Contacts</NavLink>
          </nav>
        </div>
        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-3'>
            <img src={im.phone} alt="" />
            <div className='text-sm font-normal text-[#424551]'>
              <p className='text-xs text-[#787A80]'>Call us</p>
              <p className='font-bold'>(405) 555-0128</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <img src={im.chat} alt="" />
            <div className='text-sm font-normal text-[#424551]'>
              <p className='text-xs text-[#787A80]'>Talk to us</p>
              <p className='font-bold'>hello@createx.com</p>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
