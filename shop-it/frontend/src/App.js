import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import store from "./store/store";

function App() {  

  return (
    // <Router>      
    //   <div className="App">   
    //     <Header />
    //     <Routes>
    //       <Route path="/" element={<Home />} exact />
    //     </Routes>
    //     <Footer />
    //   </div>      
    // </Router>    
      <div className="App">   
        <Header />        
          <Router>
              <Routes>
                <Route path="/" element={<Home />} exact></Route>
              </Routes>
          </Router>          
        <Footer />
      </div>      
  );
}

export default App;
