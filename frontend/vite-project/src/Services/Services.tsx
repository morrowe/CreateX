import './Services.module.scss'
import {im} from '../assets/im.ts'
import { NavLink, Link } from 'react-router-dom';

function Services() {

  return (
    <>
        <main>
            <section className="w-full py-16 px-10 bg-white font-ubuntu">
                <div className="max-w-[1230px] mx-auto grid grid-cols-2 gap-12 items-center">
                    <div className="w-full">
                        <img src={im.image} alt="" className="w-full h-auto object-cover rounded-sm shadow-sm"/>
                    </div>
                    <div className="flex flex-col gap-6 pl-6">
                        <h2 className="text-4xl font-extrabold text-[#1E212C]">Construction</h2>
                        <p className="text-[#787A80] text-base leading-relaxed font-normal">Sapien, feugiat faucibus orci arcu, vulputate. Tristique varius consectetur vulputate arcu, scelerisque nisi, nibh. Enim semper id sodales ultricies sed ut ut augue. Mattis habitant venenatis, gravida posuere massa ac interdum. Eget aliquam dignissim ut vestibulum.</p>
                        <NavLink to="/service"><button className="w-fit px-8 py-3 border border-[#FF5A30] text-[#FF5A30] font-bold text-sm tracking-wide rounded-sm uppercase hover:bg-[#FF5A30] hover:text-white transition-colors duration-200 cursor-pointer">Learn more</button></NavLink>
                    </div>
                </div>
                </section>

        </main>
    </>
  )
}

export default Services