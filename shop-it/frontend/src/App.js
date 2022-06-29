import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductDetails from "./components/product/ProductDetails";


function App() {  

  return (
     <Router>
       <div className="App">
         <Header />
         <Routes>
             <Route path="/" element={<Home />} exact />
             <Route path="/search/:keyword" element={<Home />} exact />
             <Route path="/product/:id" element={<ProductDetails />}  exact />
         </Routes>
         <Footer />
       </div>
     </Router>
  );
}

export default App;
