import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Chart from './components/Chart';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactDOM } from 'react';



function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
   <Router>
    <Routes>
      <Route path = '/' element = {<Home />}/>
      <Route path = '/Chart' element = {<Chart/>}/>
      
    </Routes>
   </Router>
    </div>
  );
}

export default App;
