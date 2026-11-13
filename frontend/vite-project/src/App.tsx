import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import Services from './Services/Services';
import Service from './Service/Service';
import Portfolio from './Portfolio/Portfolio';
import Project from './Project/Project';
import About from './About/About';
import Avaible from './Avaible/Avaible';
import News from './News/News';
import Post from './Post/Post';
import Contacts from './Contacts/Contacts';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route index path="/home" element={<Home />} />
            <Route index path="/services" element={<Services/>} />
            <Route index path="/service" element={<Service/>} />
            <Route index path="/portfolio" element={<Portfolio/>} />
            <Route index path="/project" element={<Project/>} />
            <Route index path="/about" element={<About/>} />
            <Route index path="/avaible" element={<Avaible/>} />
            <Route index path="/news" element={<News/>} />
            <Route index path="/post" element={<Post/>} />
            <Route index path="/contacts" element={<Contacts/>} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App

