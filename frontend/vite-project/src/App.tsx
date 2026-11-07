import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from './Home/Home';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route index path="/" element={<Home />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
